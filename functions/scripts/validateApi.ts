import { SerpstatClient } from "../src/utils/serpstatClient";
import { captureSerpScreenshot } from "../src/utils/serpScreenshot";
import { SerperClient } from "../src/utils/serperClient";

// Ensure environment variables are loaded (for local testing)
// In Firebase Functions, these are automatically available via process.env
// For local execution, you might need a .env file and dotenv package
import * as dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Specify path to .env file if not in root

const SERPSTAT_API_KEY = process.env.SERPSTAT_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

if (!SERPSTAT_API_KEY) {
  console.warn("SERPSTAT_API_KEY is not set. Please set it as an environment variable in a .env file.");
}
if (!SERPER_API_KEY) {
  console.warn("SERPER_API_KEY is not set. Please set it as an environment variable in a .env file.");
}

const serpstat = new SerpstatClient(SERPSTAT_API_KEY || ""); // Provide empty string fallback for type safety
const serper = new SerperClient(); // Provide empty string fallback for type safety

async function validateSerpstatApi() {
  console.log("--- Validating Serpstat API ---");
  const testKeyword = "Orlando accident rehab"; // Updated for new test case
  const testDomain = "orlando.com"; // Keeping generic domain for now, can be updated later

  if (SERPSTAT_API_KEY) {
    try {
      console.log(`Fetching keyword info for: ${testKeyword}`);
      const keywordInfo = await serpstat.keywordInfo([testKeyword], "g_us");
      console.log("Keyword Info Response:", JSON.stringify(keywordInfo, null, 2));
    } catch (error: any) {
      console.error(`Error fetching keyword info: ${error.message}`);
    }

    try {
      console.log(`Fetching domain info for: ${testDomain}`);
      const domainInfo = await serpstat.domainInfo([testDomain], "g_us");
      console.log("Domain Info Response:", JSON.stringify(domainInfo, null, 2));
    } catch (error: any) {
      console.error(`Error fetching domain info: ${error.message}`);
    }

    try {
      console.log(`Fetching suggestions for: ${testKeyword}`);
      const suggestions = await serpstat.getSuggestions(testKeyword, "g_us");
      console.log("Suggestions Response:", JSON.stringify(suggestions, null, 2));
    } catch (error: any) {
      console.error(`Error fetching suggestions: ${error.message}`);
    }

    try {
      console.log(`Fetching competitors for: ${testKeyword}`);
      const competitors = await serpstat.getCompetitors(testKeyword, "g_us");
      console.log("Competitors Response:", JSON.stringify(competitors, null, 2));
    } catch (error: any) {
      console.error(`Error fetching competitors: ${error.message}`);
    }

    try {
      console.log(`Fetching ad keywords for: ${testKeyword}`);
      const adKeywords = await serpstat.getAdKeywords(testKeyword, "g_us");
      console.log("Ad Keywords Response:", JSON.stringify(adKeywords, null, 2));
    } catch (error: any) {
      console.error(`Error fetching ad keywords: ${error.message}`);
    }

    try {
      console.log(`Fetching related keywords for: ${testKeyword}`);
      const relatedKeywords = await serpstat.getRelatedKeywords(testKeyword, "g_us");
      console.log("Related Keywords Response:", JSON.stringify(relatedKeywords, null, 2));
    } catch (error: any) {
      console.error(`Error fetching related keywords: ${error.message}`);
    }

  } else {
    console.warn("Skipping Serpstat API validation because SERPSTAT_API_KEY is not set.");
  }
  console.log("--- Serpstat API Validation Complete ---");
}

async function validateSerperApi() {
  console.log("\n--- Validating Serper.dev API ---");
  const testQuery = "Orlando accident rehab"; // Updated for new test case

  if (SERPER_API_KEY) {
    try {
      console.log(`Fetching SERP results for: "${testQuery}"`);
      const serperResults = await serper.search(testQuery);
      console.log("Serper.dev SERP Results:", JSON.stringify(serperResults, null, 2));
    } catch (error: any) {
      console.error(`Error fetching Serper.dev SERP results: ${error.message}`);
    }
  } else {
    console.warn("Skipping Serper.dev API validation because SERPER_API_KEY is not set.");
  }
  console.log("--- Serper.dev API Validation Complete ---");
}

async function validatePlaywrightSerpScreenshot() {
  console.log("\n--- Validating Playwright SERP Screenshot ---");
  const testKeyword = "Orlando accident rehab"; // Updated for new test case
  const testLocation = "Orlando FL"; // Keeping location for consistency

  try {
    console.log(`Capturing SERP screenshot for: "${testKeyword}" in "${testLocation}"`);
    const screenshotData = await captureSerpScreenshot(testKeyword, testLocation, true); // headless: true
    console.log("SERP Screenshot Data:", JSON.stringify(screenshotData, null, 2));
    console.log(`Screenshot saved to: ${screenshotData.screenshotPath}`);
  } catch (error: any) {
    console.error(`Error capturing SERP screenshot: ${error.message}`);
  }
  console.log("--- Playwright SERP Screenshot Validation Complete ---");
}

async function main() {
  await validateSerpstatApi();
  await validateSerperApi();
  await validatePlaywrightSerpScreenshot();
}

main().catch(console.error);
