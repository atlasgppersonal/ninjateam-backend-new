import * as functions from "firebase-functions/v2";
import { db } from './utils/firebase';
import { RawContact, ContactPipeline } from './types/contact';
import { FirestoreContact, DataUsaKeyPoints, MarketingStrategy, GmbData, ScoredKeyword, BandedCluster, ArbitrageData, ArbitrageDataDocument, LlmInputObjects, GmbPlace } from './types/firestore';
import { VertexAI } from '@google-cloud/vertexai';
import * as admin from "firebase-admin";
import { processArbitrageDataForChart } from './arbitrageChartProcessor'; // Import the new function

// Utility type to avoid repeating Record<string, any>
type SafeRecord = Record<string, any>;

// Helper function to log to Firestore (if needed, re-implement as per your project's needs)
async function logToFirestore(functionName: string, type: "info" | "error" | "warn", message: string, data: any = {}) {
  try {
    await db.collection("functionLogs").add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      function: functionName,
      type: type,
      message: message,
      data: data,
    });
  } catch (logError) {
    console.error("Failed to write log to Firestore:", logError);
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
      functions.logger.warn(`generateChartData: Arbitrage data or scored_keywords not available for arbitrage_opportunity_scatter_chart.`);
      return { requestId: request.requestId, error: `Arbitrage data or scored_keywords not available.` };
    }

    const arbitrageData = dataObjects.arbitrageData;
    const scoredKeywords: ScoredKeyword[] = arbitrageData.scored_keywords;

    // Calculate xAxisMax (max estimated_time + 1 week buffer)
    const maxEstimatedTime = Math.max(...scoredKeywords.map((k: ScoredKeyword) => k.estimated_time || 0));
    const xAxisMax = maxEstimatedTime > 0 ? Math.ceil(maxEstimatedTime) + 1 : 100; // Default to 100 if no data

    // Calculate yAxisMax (max potential_roi + buffer)
    const maxPotentialRoi = Math.max(...scoredKeywords.map((k: ScoredKeyword) => k.potential_roi || 0));
    const yAxisMax = maxPotentialRoi > 0 ? Math.ceil(maxPotentialRoi * 1.1) : 100; // 10% buffer, default to 100

    // Determine short-term quick win keywords (first 4 clusters in bands)
    const shortTermKeywords = new Set<string>();
    if (arbitrageData.all_banded_clusters) {
      const bands = Object.keys(arbitrageData.all_banded_clusters).sort();
      for (let i = 0; i < Math.min(4, bands.length); i++) {
        arbitrageData.all_banded_clusters[bands[i]].forEach((cluster: BandedCluster) => {
          cluster.cluster_keywords_details.forEach((keywordDetail: ScoredKeyword) => {
            shortTermKeywords.add(keywordDetail.keyword);
          });
        });
      }
    }

    // Determine top 4 overall highest arbitrage opportunities
    const topArbitrageKeywords = scoredKeywords
      .sort((a: ScoredKeyword, b: ScoredKeyword) => (b.arbitrage_score || 0) - (a.arbitrage_score || 0))
      .slice(0, 4)
      .map((k: ScoredKeyword) => k.keyword);

    const chartDataPoints = scoredKeywords.map((keywordDetail: ScoredKeyword) => {
      const isShortTerm = shortTermKeywords.has(keywordDetail.keyword);
      const isTopArbitrage = topArbitrageKeywords.includes(keywordDetail.keyword);

      return {
        x: keywordDetail.estimated_time,
        y: keywordDetail.potential_roi,
        id: keywordDetail.keyword,
        keyword: keywordDetail.keyword,
        volume: keywordDetail.search_volume,
        roi_mid: keywordDetail.arbitrage_score, // Assuming arbitrage_score is the mid ROI
        expected_time_to_rank: keywordDetail.estimated_time,
        size: isShortTerm || isTopArbitrage ? 8 : 5, // Bigger size for highlighted points
        color: isShortTerm ? 'red' : (isTopArbitrage ? 'blue' : 'gray'), // Different colors
      };
    });

    // Calculate secondXAxisGridLine (slightly below lowest revenue in short-term quick win set)
    let secondYAxisGridLine = 0;
    if (shortTermKeywords.size > 0) {
      const shortTermRoiValues = scoredKeywords
        .filter((k: ScoredKeyword) => shortTermKeywords.has(k.keyword))
        .map((k: ScoredKeyword) => k.potential_roi || 0);
      if (shortTermRoiValues.length > 0) {
        secondYAxisGridLine = Math.min(...shortTermRoiValues) * 0.9; // 10% below lowest
      }
    }

    // Calculate secondXAxisGridLine (based on time for quick wins, e.g., 8 weeks)
    const secondXAxisGridLine = 8; // Example: Quick wins are typically within 8 weeks

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
  functions.logger.warn(`generateChartData: Chart type ${request.type} requested. Re-implementation needed.`);
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
  async (request, context) => {
    functions.logger.info("getPageMetadata called with request data:", JSON.stringify(request.data, null, 2));

    const { pageId, contactHash, contentArray, dataRequest, targetedBlob } = request.data as GetPageMetadataData;

    if (!pageId || !contactHash || !contentArray || !Array.isArray(contentArray)) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with pageId, contactHash, and contentArray."
      );
    }

    await initializeVertexAI();

    let contactData: FirestoreContact | null = null;
    let contactDocId: string | null = null;
    let arbitrageDocument: ArbitrageDataDocument | null = null;
    let avgJobAmount: number = 0;

    try {
      // 1. Retrieve contact object using contactHash
      const contactSnapshot = await db.collection("contacts").where("hash", "==", contactHash).limit(1).get();
      if (contactSnapshot.empty) {
        functions.logger.warn(`getPageMetadata: Contact with hash ${contactHash} not found. Proceeding without contact-specific data.`);
        contactData = null;
      } else {
        contactData = contactSnapshot.docs[0].data() as FirestoreContact;
        contactDocId = contactSnapshot.docs[0].id;
        functions.logger.info("getPageMetadata: Contact data retrieved:", JSON.stringify(contactData));
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
        functions.logger.info("getPageMetadata: Constructed Firestore doc path:", path);

        const docRef = db.doc(path);
        const arbitrageSnapshot = await docRef.get();
        if (arbitrageSnapshot.exists) {
          arbitrageDocument = arbitrageSnapshot.data() as ArbitrageDataDocument;
          avgJobAmount = arbitrageDocument.avgJobAmount ?? 0;
          functions.logger.info(`getPageMetadata: Successfully retrieved arbitrage data from ${docRef.path} from Firestore.`);
          functions.logger.info(`getPageMetadata: Full Arbitrage Document Content: ${JSON.stringify(arbitrageDocument, null, 2)}`);
          functions.logger.info(`getPageMetadata: Extracted avgJobAmount: ${avgJobAmount}`);
        } else {
          functions.logger.warn(`getPageMetadata: Arbitrage data for ${docRef.path} not found in Firestore.`);
          arbitrageDocument = null;
          avgJobAmount = 0;
        }
      } else {
        functions.logger.warn("getPageMetadata: City, state, or category is not available for arbitrage data enrichment.");
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
        lead_serp: { // Simplified lead_serp
          estimated_revenue_range: ["0", "0"],
          total_search_volume: 0,
          total_keywords_in_pool: 0,
          visit_projection_range: ["0", "0"],
          top_4_clusters: [],
          agr_top_4_roi: ["0", "0"],
          scored_keywords: [],
          customer_domain_authority: {},
          estimated_conversions_aggressive: 0,
          cluster_long_distance_search_volume: 0,
          cluster_residential_search_volume: 0,
          cluster_office_commercial_search_volume: 0,
          cluster_other_search_volume: 0,
          high_value_keywords_summary_html: "No data available.",
          potential_roi_summary_html: "No data available.",
          hidden_gems_summary_html: "No data available.",
          strategic_opportunity_prioritization_html: "No data available.",
        }
      };

      const PROMPT = `
        You are a data resolver and content cleaner. Your primary task is to replace variables in the provided strings with values from the given data objects, apply fallbacks, and ensure the resulting sentences are grammatically correct and human-readable.

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

      const response = result.response;
      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = text.replace(/```json\s*|```\s*$/g, "").trim();

      let resolvedContent: Array<{ id: string; resolvedString: string }> = [];
      try {
        resolvedContent = JSON.parse(cleaned);
        resolvedContent = resolvedContent.map(item => ({
          id: item.id,
          resolvedString: item.resolvedString
        }));
      } catch (e: any) {
        functions.logger.error(`getPageMetadata: JSON parse error from LLM: ${e.message}`);
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
            functions.logger.error(`Error generating chart ${dataReq.requestId}:`, chartError);
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
      functions.logger.error("Error in getPageMetadata:", error);
      throw new functions.https.HttpsError("internal", "Unable to process request.", error.message);
    }
  }
);
