import * as functions from "firebase-functions/v2";
import { db } from './utils/firebase';
import { FirestoreContact, GmbData, ScoredKeyword, ArbitrageDataDocument, LlmInputObjects } from './types/firestore';
import { VertexAI } from '@google-cloud/vertexai';
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const appendFile = util.promisify(fs.appendFile);
const mkdir = util.promisify(fs.mkdir);

const LOG_FILE_PATH = path.join(__dirname, '../logs/function_debug_logs.txt');

async function logToDisk(functionName: string, type: "info" | "error" | "warn", message: string, data: any = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    function: functionName,
    type: type,
    message: message,
    data: data,
  };
  const logLine = JSON.stringify(logEntry) + "\n";

  try {
    await mkdir(path.dirname(LOG_FILE_PATH), { recursive: true });
    await appendFile(LOG_FILE_PATH, logLine, "utf8");
  } catch (fileError) {
    console.error("Failed to write log to local file:", fileError);
  }
}

// New interfaces for chart requests (keep these as they define the request structure)
interface dataRequest {
  requestId: string;
  type: "bar" | "line" | "pie_chart" | "blog_benchmarks" | "funnel_chart" | "cluster_chart" | "top_keyword_opportunities_chart" | "arbitrage_opportunity_scatter_chart";
  city?: string;
  category?: string;
  title?: string;
  data?: any;
  innerRadius?: number;
}

interface GetPageMetadataData {
  pageId: string;
  contactHash: string;
  contentArray: Array<{ id: string; string: string }>;

  dataRequest?: dataRequest[];
  targetedBlob?: any;
}

// Helper function to generate chart data based on request (simplified)
async function generateChartData(dataObjects: LlmInputObjects, request: dataRequest): Promise<any> {
  if (request.type === "arbitrage_opportunity_scatter_chart") {
    if (!dataObjects.arbitrageData || !dataObjects.arbitrageData.scored_keywords) {
      await logToDisk("generateChartData", "warn", `Arbitrage data or scored_keywords not available for arbitrage_opportunity_scatter_chart.`);
      return { requestId: request.requestId, error: `Arbitrage data or scored_keywords not available.` };
    }

    const arbitrageData = dataObjects.arbitrageData;
    const allBandedClusters = arbitrageData.all_banded_clusters;
    const scoredKeywords: ScoredKeyword[] = arbitrageData.scored_keywords;

    // Identify top 4 short-term clusters
    const shortTermKeywords = new Set<string>();
    let minShortTermRoi = Infinity;

    if (allBandedClusters) {
      const bands = Object.keys(allBandedClusters).sort((a, b) => parseFloat(a.replace('Band ', '')) - parseFloat(b.replace('Band ', '')));
      let clustersConsidered = 0;
      for (const band of bands) {
        for (const cluster of allBandedClusters[band]) {
          if (clustersConsidered < 4) {
            cluster.cluster_keywords_details.forEach(keywordDetail => {
              shortTermKeywords.add(keywordDetail.keyword);
              if (keywordDetail.potential_roi !== undefined && keywordDetail.potential_roi < minShortTermRoi) {
                minShortTermRoi = keywordDetail.potential_roi;
              }
            });
            clustersConsidered++;
          } else {
            break;
          }
        }
        if (clustersConsidered >= 4) {
          break;
        }
      }
    }

    // Calculate xAxisMax (max estimated_time + 1 week buffer)
    const maxEstimatedTime = Math.max(...(arbitrageData.all_banded_clusters ? Object.values(arbitrageData.all_banded_clusters).flat().map(c => c.llm_content_ideas?.average_estimated_time_to_rank_weeks || 0) : [0]));
    const xAxisMax = maxEstimatedTime > 0 ? Math.ceil(maxEstimatedTime) + 1 : 100;

    // Calculate yAxisMax (max potential_roi + buffer)
    const maxPotentialRoi = Math.max(...scoredKeywords.map(k => k.potential_roi || 0));
    const yAxisMax = maxPotentialRoi > 0 ? Math.ceil(maxPotentialRoi * 1.1) : 100;

    // Determine top 4 overall highest arbitrage opportunities (based on arbitrage_score)
    const topArbitrageKeywords = scoredKeywords
      .sort((a, b) => (b.arbitrage_score || 0) - (a.arbitrage_score || 0))
      .slice(0, 4)
      .map(k => k.keyword);

    const chartDataPoints = scoredKeywords.map(keywordDetail => {
      const isShortTerm = shortTermKeywords.has(keywordDetail.keyword);
      const isTopArbitrage = topArbitrageKeywords.includes(keywordDetail.keyword);

      return {
        x: keywordDetail.ranking_estimates_by_authority?.mid?.t?.base || 0, // Use keyword-level time for individual points
        y: keywordDetail.potential_roi || 0,
        id: keywordDetail.keyword,
        keyword: keywordDetail.keyword,
        volume: keywordDetail.search_volume,
        roi_mid: keywordDetail.arbitrage_score,
        expected_time_to_rank: keywordDetail.ranking_estimates_by_authority?.mid?.t?.base || 0,
        size: isShortTerm || isTopArbitrage ? 8 : 5,
        color: isShortTerm ? 'red' : (isTopArbitrage ? 'blue' : 'gray'),
      };
    });

    // Calculate secondXAxisGridLine (time boundary for quick wins, e.g., 8 weeks)
    const secondXAxisGridLine = 8;

    // Calculate secondYAxisGridLine (revenue boundary for quick wins, slightly below lowest ROI in Q1)
    const secondYAxisGridLine = minShortTermRoi !== Infinity ? Math.max(0, minShortTermRoi * 0.9) : 0;

    return {
      requestId: request.requestId,
      title: "Keyword Arbitrage Opportunity",
      xAxisLabel: "Time (Weeks)",
      yAxisLabel: "Revenue (ROI)",
      xAxisMin: 0,
      xAxisMax: xAxisMax,
      yAxisMin: 0,
      yAxisMax: yAxisMax,
      secondXAxisGridLine: secondXAxisGridLine,
      secondYAxisGridLine: secondYAxisGridLine,
      data: chartDataPoints,
    };
  }
  await logToDisk("generateChartData", "warn", `Chart type ${request.type} requested. Re-implementation needed.`);
  return { requestId: request.requestId, error: `Chart type ${request.type} not yet re-implemented.` };
}

// Initialize Vertex AI outside the function for efficiency
let generativeModel: any;
const initializeVertexAI = async () => {
  if (!generativeModel) {
    const PROJECT_ID = 'fourth-outpost-470409-u3'; // Replace with your actual project ID
    const LOCATION = 'us-central1'; // Replace with your actual location

    const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION });
    generativeModel = vertex_ai.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }
};


export const getPageMetadata = functions.https.onCall(
  async (request) => {
    await logToDisk("getPageMetadata", "info", "getPageMetadata called with request data:", request.data);

    const { pageId, contactHash, contentArray, dataRequest, targetedBlob } = request.data as GetPageMetadataData;

    if (!pageId || !contactHash || !contentArray || !Array.isArray(contentArray)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with pageId, contactHash, and contentArray."
      );
    }
    await initializeVertexAI();

    let contactData: FirestoreContact | null = null;
    let arbitrageDocument: ArbitrageDataDocument | null = null;
    let avgJobAmount: number = 0;

    try {
      // 1. Retrieve contact object using contactHash
      const contactSnapshot = await db.collection("contacts").where("hash", "==", contactHash).limit(1).get();
      if (contactSnapshot.empty) {
        await logToDisk("getPageMetadata", "warn", `Contact with hash ${contactHash} not found. Proceeding without contact-specific data.`);
        contactData = null;
      } else {
        contactData = contactSnapshot.docs[0].data() as FirestoreContact;
        // contactDocId = contactSnapshot.docs[0].id; // Removed unused variable
        await logToDisk("getPageMetadata", "info", "Contact data retrieved:", contactData);
      }

      // 2. Fetch arbitrage data from Firestore
      if (contactData?.raw_contact?.city && contactData?.raw_contact?.state && contactData?.category) {
        const city = contactData.raw_contact.city.toLowerCase().replace(/ /g, '-');
        const state = contactData.raw_contact.state.toLowerCase();
        const category = contactData.category; // Use the top-level category

        let sanitizedCategory = category;
        if (sanitizedCategory) {
          sanitizedCategory = sanitizedCategory.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
        } else {
          sanitizedCategory = "unknown-category";
        }

        const path = `dataUsaKeyPoints/${city}-${state}/serp/arbitrage-lite/${sanitizedCategory}/data`;
        await logToDisk("getPageMetadata", "info", "Constructed Firestore doc path:", path);

        const docRef = db.doc(path);
        const arbitrageSnapshot = await docRef.get();
        if (arbitrageSnapshot.exists) {
          const fetchedData = arbitrageSnapshot.data();
          await logToDisk("getPageMetadata", "info", `Raw data from Firestore for ${docRef.path}:`, fetchedData);

          if (fetchedData && fetchedData.arbitrageData) {
            arbitrageDocument = fetchedData.arbitrageData as ArbitrageDataDocument;
            avgJobAmount = arbitrageDocument.avgJobAmount ?? 0;
            await logToDisk("getPageMetadata", "info", `Successfully extracted nested arbitrageData from ${docRef.path}.`);
            await logToDisk("getPageMetadata", "info", "Extracted Arbitrage Document Content:", arbitrageDocument);
            await logToDisk("getPageMetadata", "info", "Extracted avgJobAmount:", avgJobAmount);
            await logToDisk("getPageMetadata", "info", `Scored Keywords count: ${arbitrageDocument.scored_keywords?.length || 0}`);
            await logToDisk("getPageMetadata", "info", `All Banded Clusters count: ${Object.keys(arbitrageDocument.all_banded_clusters || {}).length}`);
          } else {
            await logToDisk("getPageMetadata", "warn", `Arbitrage data for ${docRef.path} found, but nested arbitrageData object is missing or malformed.`);
            arbitrageDocument = null;
            avgJobAmount = 0;
          }
        } else {
          await logToDisk("getPageMetadata", "warn", `Arbitrage data for ${docRef.path} not found in Firestore.`);
          arbitrageDocument = null;
          avgJobAmount = 0;
        }
      } else {
        await logToDisk("getPageMetadata", "warn", "City, state, or category is not available for arbitrage data enrichment.");
      }

      const gmbData: GmbData = (contactData?.enriched_data?.gmb_data as GmbData) ?? { business: [], competitors_zip: [], competitors_city: [] };


      // Prepare LLM input (simplified)
      const llmInputObjects: LlmInputObjects = {
        contact: contactData,
        gmbData: gmbData,
        annualRevenueGain: 0, // Placeholder
        targetedBlob: targetedBlob,
        arbitrageData: arbitrageDocument ?? undefined, // Pass the nested arbitrageData
        avgJobAmount: avgJobAmount,
        lead_serp: {
          estimated_revenue_range: ["0", "0"], // Will be calculated
          total_search_volume: 0, // Not explicitly requested, keep as 0
          total_keywords_in_pool: arbitrageDocument?.scored_keywords?.length || 0,
          visit_projection_range: ["0", "0"], // Ignore for now
          top_4_clusters: [], // Not explicitly requested, keep as empty
          agr_top_4_roi: ["0", "0"], // Will be calculated
          scored_keywords: arbitrageDocument?.scored_keywords || [],
          customer_domain_authority: arbitrageDocument?.customer_domain_authority || {},
          estimated_conversions_aggressive: 0, // Not explicitly requested, keep as 0
          cluster_long_distance_search_volume: 0, // Not explicitly requested, keep as 0
          cluster_residential_search_volume: 0, // Not explicitly requested, keep as 0
          cluster_office_commercial_search_volume: 0, // Not explicitly requested, keep as 0
          cluster_other_search_volume: 0, // Not explicitly requested, keep as 0
          high_value_keywords_summary_html: "No data available.", // Will be generated by LLM
          potential_roi_summary_html: "No data available.", // Will be generated by LLM
          hidden_gems_summary_html: "No data available.", // Not explicitly requested, keep as placeholder
          strategic_opportunity_prioritization_html: "No data available.", // Will be generated by LLM
        }
      };

      // Calculate estimated_revenue_range and agr_top_4_roi
      if (arbitrageDocument && arbitrageDocument.scored_keywords) {
        const allPotentialRois = arbitrageDocument.scored_keywords.map(k => k.potential_roi || 0);
        if (allPotentialRois.length > 0) {
          const minOverallRoi = Math.min(...allPotentialRois);
          const maxOverallRoi = Math.max(...allPotentialRois);

          // estimated_revenue_range
          llmInputObjects.lead_serp.estimated_revenue_range[0] = minOverallRoi.toFixed(0).toString();
          llmInputObjects.lead_serp.estimated_revenue_range[1] = maxOverallRoi.toFixed(0).toString();

          // agr_top_4_roi (overall top 4 arbitrage opportunities)
          const sortedByRoi = [...arbitrageDocument.scored_keywords].sort((a, b) => (b.potential_roi || 0) - (a.potential_roi || 0));
          const top4RoiValues = sortedByRoi.slice(0, 4).map(k => k.potential_roi || 0);
          if (top4RoiValues.length > 0) {
            llmInputObjects.lead_serp.agr_top_4_roi[0] = Math.min(...top4RoiValues).toFixed(0).toString();
            llmInputObjects.lead_serp.agr_top_4_roi[1] = Math.max(...top4RoiValues).toFixed(0).toString();
          }
        }
      }

      await logToDisk("getPageMetadata", "info", "LLM Input Objects:", llmInputObjects);

      const PROMPT = `
        You are a data resolver and content cleaner. Your primary task is to replace variables in the provided strings with values from the given data objects, apply fallbacks, and ensure the resulting sentences are grammatically correct and human-readable.

        Specifically, for the variable '{{contact.raw_contact.name}}', if 'contact.raw_contact.name_confidence' is less than or equal to 0.7, replace 'Hi {{contact.raw_contact.name}},' with 'Hello,'. Otherwise, use the provided name.

        CRITICAL: Your response MUST be a single, valid JSON array. All string values within the JSON MUST be properly escaped. Do NOT include any additional text or formatting outside of the JSON array.

        **Input Data:**
        ${JSON.stringify(llmInputObjects, null, 2)}

        **Strings to Resolve:**
        ${JSON.stringify(contentArray, null, 2)}

        Your JSON Array Response:
      `;

      const result = await generativeModel.generateContent({
        contents: [{ role: "user", parts: [{ text: PROMPT }] }],
      });

      const responseText = result.response;
      const text = responseText?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      await logToDisk("getPageMetadata", "info", "LLM Raw Response Text:", text); // Log raw LLM response
      const cleaned = text.replace(/```json\s*|```\s*$/g, "").trim();

      let resolvedContent: Array<{ id: string; resolvedString: string }> = [];
      try {
        const parsedContent: Array<{ id: string; string: string }> = JSON.parse(cleaned);
        resolvedContent = parsedContent.map(item => ({
          id: item.id,
          resolvedString: item.string
        }));
      } catch (e: any) {
        await logToDisk("getPageMetadata", "error", `JSON parse error from LLM: ${e.message}`, { error: e.message, cleanedText: cleaned, rawLLMResponse: text });
        resolvedContent = contentArray.map(item => ({
          id: item.id,
          resolvedString: `Error resolving string for ID ${item.id}. Original: "${item.string}"`
        }));
      }

      const generatedData: any[] = [];
      if (dataRequest && Array.isArray(dataRequest)) {
        for (const dataReq of dataRequest) {
          try {
            const chartData = await generateChartData(llmInputObjects, dataReq);
            generatedData.push(chartData);
          } catch (chartError: any) {
            await logToDisk("getPageMetadata", "error", `Error generating chart ${dataReq.requestId}:`, { error: chartError.message, request: dataReq });
            generatedData.push({ requestId: dataReq.requestId, error: chartError.message });
          }
        }
      }

      return {
        pageId: pageId,
        content: resolvedContent,
        data: generatedData,
      };

    } catch (error: any) {
      await logToDisk("getPageMetadata", "error", "Error in getPageMetadata:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Unable to process request.",
        error.message
      );
    }
  }
);
