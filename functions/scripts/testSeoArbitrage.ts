import { VertexAI } from '@google-cloud/vertexai';
import * as fs from 'fs';
import { SerperClient } from '../src/utils/serperClient';
import { SeoReviewToolsClient } from '../src/utils/seoReviewToolsClient';
import { SerpstatClient } from '../src/utils/serpstatClient'; // Re-introduce SerpstatClient
import fetch from 'node-fetch'; // Ensure node-fetch is imported for Serper API calls

const TARGET_CLUSTERS = 5; // Desired number of content clusters
const BATCH_SIZE = 20; // Number of high-potential keywords to process in each deep analysis batch

// --- CONFIGURATION ---
const CATEGORY = "plumbing";
const LOCATION = "orlando fl";
const SEARCH_ENGINE_PARAMS = { gl: "us", hl: "en" }; // For Serper
const KEYWORD_STATS_LOCATION = "United States"; // For SEO Review Tools
const KEYWORD_STATS_LANGUAGE = "English"; // For SEO Review Tools

// Initialize Vertex AI outside the function for efficiency
let generativeModel: any;

const initializeVertexAI = async () => {
  if (!generativeModel) {
    const PROJECT_ID = 'fourth-outpost-470409-u3'; // Replace with your actual project ID
    const LOCATION_AI = 'us-central1'; // Replace with your actual location for Vertex AI

    const vertex_ai = new VertexAI({ project: PROJECT_ID, location: LOCATION_AI });
    generativeModel = vertex_ai.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }
};

// Initialize API clients with provided API keys.
const serperClient = new SerperClient();
const seoReviewToolsClient = new SeoReviewToolsClient("23479023m-v29801m9vcmy-thqolkdf");
const serpstatClient = new SerpstatClient("046cdc3988098acc451f56aa131144fd"); // Initialize SerpstatClient

// --- Helper Functions ---

/**
 * Performs deep analysis and validation (Phase 3 & 4) for a given batch of keywords.
 * @param keywordsBatch An array of keyword objects to analyze.
 * @returns An array of validated keyword objects.
 */
async function performDeepAnalysisAndValidation(keywordsBatch: any[]): Promise<any[]> {
  const megaSites = ["yelp.com", "homeadvisor.com", "forbes.com", "wikipedia.org", "reddit.com"];
  const validated_keywords_batch: any[] = [];

  for (const [index, keywordObj] of keywordsBatch.entries()) {
    const keyword = keywordObj.keyword;
    console.log(`\nProcessing keyword ${index + 1}/${keywordsBatch.length} in batch: "${keyword}"`);

    try {
      // Step 3.2: Get SERP data from Serper
      console.log(`  Calling Serper for SERP snapshot for "${keyword}"...`);
      const serperResponse = await serperClient.search(keyword);
      console.log(`  Serper response for "${keyword}":`, serperResponse.error ? `Error: ${serperResponse.error.message}` : "Success");
      console.log(`  Serper API Response for "${keyword}":`, JSON.stringify(serperResponse, null, 2)); // Log full Serper response

      const competitorUrls = serperResponse.organic?.slice(0, 10).map((r: any) => r.link) || [];
      const peopleAlsoAsk = serperResponse.peopleAlsoAsk?.map((p: any) => p.question) || [];

      keywordObj.serper_analysis = {
        competitor_urls: competitorUrls,
        questions_to_answer: peopleAlsoAsk
      };
      keywordObj.serperResponse = serperResponse; // Store raw response

      // Add a delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

      // Step 3.3: Get Authority data from SEO Review Tools
      let avg_da_top_10 = 0;
      let avg_pa_top_10 = 0;
      let mega_site_count = 0;

      if (competitorUrls.length > 0) {
        console.log(`  Calling SEO Review Tools for authority scores for "${keyword}"...`);
        const authorityResponse = await seoReviewToolsClient.getAuthorityScores(competitorUrls);
        console.log(`  SEO Review Tools Authority Scores API Response for "${keyword}":`, JSON.stringify(authorityResponse, null, 2)); // Log full Authority Scores response
        console.log(`  Authority scores response for "${keyword}":`, authorityResponse.error ? `Error: ${authorityResponse.error}` : "Success");

        if (authorityResponse.data && authorityResponse.data.data) {
          const authorityData = Object.values(authorityResponse.data.data);
          if (authorityData.length > 0) {
            avg_da_top_10 = authorityData.reduce((acc: number, curr: any) => acc + (curr["Domain Authority"] || 0), 0) / authorityData.length;
            avg_pa_top_10 = authorityData.reduce((acc: number, curr: any) => acc + (curr["Page Authority"] || 0), 0) / authorityData.length;
          }
        }

        mega_site_count = serperResponse.organic?.slice(0, 5)
          .filter((r: any) => megaSites.includes(new URL(r.link).hostname.replace('www.', '')))
          .length || 0;

        keywordObj.seo_review_tools_analysis = {
          average_da_top_10: avg_da_top_10,
          average_pa_top_10: avg_pa_top_10,
          mega_sites_in_top_5: mega_site_count
        };
        keywordObj.authorityResponse = authorityResponse; // Store raw response
      }

      // Add a delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

      // Step 3.4: Calculate Artificial Difficulty
      const artificial_difficulty = (0.5 * avg_da_top_10) + (0.3 * avg_pa_top_10) + (0.2 * (mega_site_count * 20)); // Multiply mega_site_count by 20 as per strategy

      // Step 3.5: Apply Rejection Filter
      if (artificial_difficulty <= 40) { // Our final check
        validated_keywords_batch.push({
          ...keywordObj,
          artificial_difficulty: artificial_difficulty,
          serp_analysis: {
            average_da_top_10: avg_da_top_10,
            average_pa_top_10: avg_pa_top_10,
            mega_site_count: mega_site_count,
            competitor_urls: competitorUrls,
            questions_to_answer: peopleAlsoAsk
          }
        });
        console.log(`  "${keyword}" PASSED final filter.`);
      } else {
        console.log(`  "${keyword}" FAILED final filter. Artificial Difficulty: ${artificial_difficulty}`);
      }

    } catch (error: any) {
      console.error(`  Failed deep analysis for "${keyword}":`, error.message);
    }
  }
  return validated_keywords_batch;
}

/**
 * Calculates the final arbitrage score for a given keyword object (Phase 5.1).
 * @param keywordObj The keyword object to score.
 * @returns The keyword object with the arbitrage_score added.
 */
function calculateArbitrageScore(keywordObj: any): any {
  const volume = keywordObj.search_volume || 0;
  const cpc = keywordObj.cpc || 0.01;
  const artificial_difficulty = keywordObj.artificial_difficulty || 1;

  // Formula: Score = (Volume * CPC) / Artificial_Difficulty
  // Using Math.log10 for volume to prevent extremely high volumes from skewing the score too much
  const volumeScore = Math.log10(volume > 0 ? volume : 1);
  keywordObj.arbitrage_score = (volumeScore * cpc) / artificial_difficulty;
  return keywordObj;
}

/**
 * Groups keywords into content clusters (Phase 6.1).
 * A simple algorithm: take the top-scoring keyword as primary, then group others that share 2 or more words.
 * @param validatedKeywords An array of validated keyword objects.
 * @returns An array of content clusters.
 */
function groupKeywordsIntoClusters(validatedKeywords: any[]): any[] {
  const content_plan: any[] = [];
  const processedKeywordIndexes = new Set<number>();

  // Sort by arbitrage_score in descending order
  const sortedKeywords = [...validatedKeywords].sort((a, b) => b.arbitrage_score - a.arbitrage_score);

  for (let i = 0; i < sortedKeywords.length; i++) {
    if (processedKeywordIndexes.has(i)) {
      continue;
    }

    const primaryKeywordObj = sortedKeywords[i];
    const primaryKeywordWords = primaryKeywordObj.keyword.toLowerCase().split(/\s+/);
    const cluster = {
      primaryKeyword: primaryKeywordObj,
      relatedKeywords: [] as any[],
      contentBlueprint: {
        questions_to_answer: primaryKeywordObj.serp_analysis?.questions_to_answer || [],
        competitor_urls_to_analyze: primaryKeywordObj.serp_analysis?.competitor_urls || []
      }
    };

    processedKeywordIndexes.add(i);

    for (let j = i + 1; j < sortedKeywords.length; j++) {
      if (processedKeywordIndexes.has(j)) {
        continue;
      }

      const candidateKeywordObj = sortedKeywords[j];
      const candidateKeywordWords = candidateKeywordObj.keyword.toLowerCase().split(/\s+/);

      let commonWordsCount = 0;
      for (const word of primaryKeywordWords) {
        if (candidateKeywordWords.includes(word)) {
          commonWordsCount++;
        }
      }

      if (commonWordsCount >= 2) { // Group if 2 or more words are common
        cluster.relatedKeywords.push(candidateKeywordObj);
        processedKeywordIndexes.add(j);
      }
    }
    content_plan.push(cluster);
  }
  return content_plan;
}

// --- Main Process ---

async function runSeoArbitrageProcess() {
  // Phase 0: Initialization
  const seed_keywords: string[] = []; // LLM will generate the initial set

  let keywordUniverse: Set<string> = new Set();
  let promisingKeywords: any[] = [];
  let highPotentialKeywords: any[] = [];
  let validatedKeywords: any[] = [];
  let contentPlan: any[] = [];

  const fullProcessOutput: any = {}; // Consolidated output object

  await initializeVertexAI(); // Initialize Vertex AI

  console.log("--- Phase 1: Keyword Universe Expansion ---");
  console.log("Action: Use LLM to generate a comprehensive list of high-intent search phrases.");

  const LLM_PROMPT = `
    Act as an expert local SEO strategist for a home services company.

    Your task is to generate a comprehensive list of exactly 200 high-intent search phrases that a potential customer in **${LOCATION}**, **${CATEGORY}** would use when trying to find and hire a **${CATEGORY}**.

    **CRITICAL INSTRUCTIONS:**

    1.  **Simulate Customer Scenarios:** Before you generate the list, mentally simulate different situations a customer might be in. Consider scenarios involving:
        *   **Urgency:** A burst pipe at 2 AM.
        *   **Specific Problems:** A clogged toilet, a leaking water heater, low water pressure.
        *   **New Installations:** Needing a new faucet or a full repiping.
        *   **Price Consciousness:** Someone looking for affordable options or free estimates.
        *   **Location Specificity:** Searching from a specific neighborhood like Lake Nona or Winter Park.

    2.  **Focus on Hiring Intent:** Every single search phrase must strongly imply the user wants to **find, contact, or hire** a professional. Do not include informational or DIY-style queries.

    3.  **Ensure Variety:** The final list must be diverse and not just simple variations of the same phrase. It should naturally include a mix of problem-based, location-based, and service-based keywords based on the scenarios you simulated.

    4.  **Output Format:**
        *   The final output must be a single, valid JSON array of strings.
        *   The array must contain exactly 200 unique keyword strings.
        *   Do not include any commentary, explanations, or introductory text outside of the JSON array.

    **EXAMPLE OF A GOOD KEYWORD:** "24 hour plumber winter park fl" (Generated from an urgency + location scenario)
    **EXAMPLE OF A BAD KEYWORD:** "how to snake a drain" (Generated from a DIY scenario, which you must avoid)

    **Begin generation now.**
  `;

  try {
    const result = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: LLM_PROMPT }] }],
    });

    const response = result.response;
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // console.log(`Raw LLM response text (before cleaning/parsing): \n${text}`); // Removed debugging log
    const cleaned = text.replace(/```json\s*|```\s*$/g, "").trim();
    // console.log(`Cleaned LLM response text (after removing markdown): \n${cleaned}`); // Removed debugging log

    let generatedKeywords: string[] = [];
    try {
      generatedKeywords = JSON.parse(cleaned);
      if (!Array.isArray(generatedKeywords) || generatedKeywords.length !== 200) {
        console.warn(`LLM did not return exactly 200 keywords or invalid format. Found: ${generatedKeywords.length}`);
        // Fallback to a smaller set if not 200 or invalid
        generatedKeywords = generatedKeywords.slice(0, 200); // Take first 200 if more, or fewer if less
      }
      generatedKeywords.forEach(kw => keywordUniverse.add(kw));
    } catch (e: any) {
      console.error(`JSON parse error from LLM: ${e.message}. Raw LLM response that caused error: ${cleaned}`);
      // Fallback if LLM returns invalid JSON
      keywordUniverse.add(`${CATEGORY} ${LOCATION}`); // Add at least the seed keyword
    }
    console.log(`Expanded universe with LLM results. Current keywordUniverse size: ${keywordUniverse.size}`);

  } catch (error: any) {
    console.error(`Failed to expand keyword universe with LLM:`, error.message);
    keywordUniverse.add(`${CATEGORY} ${LOCATION}`); // Ensure at least the seed keyword is present on error
  }

  fullProcessOutput.initialKeywordUniverse = Array.from(keywordUniverse);

  console.log("\n--- End of Phase 1 ---");
  console.log("Current Keyword Universe Size:", keywordUniverse.size);
  console.log("Keywords in Universe (first 10):", Array.from(keywordUniverse).slice(0, 10));

  // Re-enabling subsequent phases
  console.log("\n--- Phase 2: Enrichment & Initial Filtering ---");
  console.log("Action: Use SEO Review Tools `keyword-statistics` endpoint.");

  // Convert Set to Array for batch API call
  const keywordsArray = Array.from(keywordUniverse) as string[];

  try {
    const keywordStatisticsResponse = await seoReviewToolsClient.getKeywordStatistics(keywordsArray, KEYWORD_STATS_LOCATION, KEYWORD_STATS_LANGUAGE);
    console.log(`SEO Review Tools Keyword Statistics API Response:`, JSON.stringify(keywordStatisticsResponse, null, 2));
    fullProcessOutput.keywordStatisticsResponse = keywordStatisticsResponse; // Store in consolidated output

    if (keywordStatisticsResponse.data && keywordStatisticsResponse.data.data) {
      promisingKeywords = keywordStatisticsResponse.data.data.filter((kw: any) => {
        // Corrected: Handle null search_volume gracefully
        const hasEnoughVolume = (kw.search_volume !== null && kw.search_volume !== undefined && kw.search_volume >= 20);
        // Assuming 'competition' from SRT is a proxy for difficulty (0-1 scale)
        // We'll consider competition < 0.7 as acceptable for initial filtering
        const hasAcceptableCompetition = (kw.competition !== null && kw.competition !== undefined && kw.competition < 0.7);
        // SRT keyword-statistics doesn't directly provide 'intents', so we'll skip this filter for now
        // or infer from keyword if possible, but for now, we'll rely on volume and competition.

        return hasEnoughVolume && hasAcceptableCompetition;
      });
    }
    console.log("\n--- End of Phase 2 ---");
    console.log("Promising Keywords Count (after initial filter):", promisingKeywords.length);
    console.log("Promising Keywords (first 5):", JSON.stringify(promisingKeywords.slice(0, 5), null, 2));

    console.log("\n--- Phase 2.5: Pre-Qualification Ranking ---");
    console.log("Action: Calculate a `preQualScore` for each keyword.");

    highPotentialKeywords = promisingKeywords.map((item: any) => {
      const safeCompetition = (item.competition > 0) ? item.competition : 0.01;
      const volumeScore = Math.log10(item.search_volume > 0 ? item.search_volume : 1);
      const safeCost = item.cpc > 0 ? item.cpc : 0.1;

      // Score now balances volume, commercial value, and paid competition.
      const preQualScore = (volumeScore * safeCost) / safeCompetition;
      return { ...item, preQualScore };
    }).sort((a, b) => b.preQualScore - a.preQualScore).slice(0, BATCH_SIZE); // Select top BATCH_SIZE candidates

    fullProcessOutput.highPotentialKeywords = highPotentialKeywords;

    console.log("\n--- End of Phase 2.5 ---");
    console.log("Total High Potential Keywords:", highPotentialKeywords.length);
    console.log("Top 5 High Potential Keywords:", JSON.stringify(highPotentialKeywords.slice(0, 5), null, 2));

    // --- Phase 3: Deep Analysis and Validation ---
    console.log("\n--- Phase 3: Deep Analysis and Validation ---");
    console.log("Action: Analyze the SERP for the top keywords, calculate artificial difficulty, and validate them.");

    validatedKeywords = await performDeepAnalysisAndValidation(highPotentialKeywords);
    fullProcessOutput.validatedKeywords = validatedKeywords;

    console.log("\n--- End of Phase 3 ---");
    console.log("Total Validated Keywords after deep analysis:", validatedKeywords.length);
    console.log("Validated Keywords (first 5):", JSON.stringify(validatedKeywords.slice(0, 5), null, 2));

    // --- Phase 4 & 5: Blueprint Creation & Iteration ---
    console.log("\n--- Phase 4 & 5: Blueprint Creation & Iteration ---");
    console.log("Action: Group validated keywords into actionable content clusters and calculate final arbitrage score.");

    // Calculate final arbitrage score for all validated keywords
    validatedKeywords.forEach(calculateArbitrageScore);

    // Group keywords into content clusters
    contentPlan = groupKeywordsIntoClusters(validatedKeywords);
    fullProcessOutput.contentPlan = contentPlan;

    console.log("\n--- Final Results ---");
    console.log("Total Validated Keywords:", validatedKeywords.length);
    console.log("Final Content Plan (Clusters):", contentPlan.length);
    console.log("Content Plan Details (first 2 clusters):", JSON.stringify(contentPlan.slice(0, 2), null, 2));

    // Final consolidated output write
    fs.writeFileSync('functions/scripts/seoArbitrageFullOutput.json', JSON.stringify(fullProcessOutput, null, 2));
    console.log("Full consolidated output saved to functions/scripts/seoArbitrageFullOutput.json");

  } catch (error: any) {
    console.error(`An error occurred during the SEO arbitrage process:`, error.message);
  }
}

(async () => {
  await runSeoArbitrageProcess();
})();
