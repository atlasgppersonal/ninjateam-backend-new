import { RawContact, ContactPipeline, SmsQueueDocument, LlmSmsResponse } from '../types/contact';
import { db } from '../utils/firebase';
import { VertexAI } from '@google-cloud/vertexai';
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { HttpsError } from 'firebase-functions/v2/https';
import Parser from "rss-parser";
import { SerperClient } from '../utils/serperClient'; // Import SerperClient

interface LlmEmailResponse {
  templateId?: string; // Optional, as per spec example
  resolvedSections: Array<{
    id: string;
    resolvedString: string;
  }>;
}

interface GetEmailContentData {
  contact: RawContact;
  emailTemplate: string;
  llmPrompt: string;
}

// --- Utils ---------------------------------------------------------------------

// Helper function to introduce a delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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

type SafeRecord = Record<string, any>;

// Utility function to recursively clean an object for Firestore
function cleanObjectForFirestore(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj.map(item => cleanObjectForFirestore(item)).filter(item => item !== undefined && item !== null);
    return cleanedArray; // Return empty array if no valid items, not undefined
  }

  const cleaned: SafeRecord = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const cleanedValue = cleanObjectForFirestore(value);
      if (cleanedValue !== undefined && cleanedValue !== null) { // Only include if not undefined or null
        cleaned[key] = cleanedValue;
      }
    }
  }
  return cleaned; // Return empty object if no valid properties, not undefined
}

// Caches for news and weather data
const newsCache: Map<string, SafeRecord> = new Map();
const weatherCache: Map<string, SafeRecord> = new Map();

const CITIES_TO_ENRICH = [
  { city: 'Orlando', state: 'FL' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Austin', state: 'TX' },
  { city: 'Tampa', state: 'FL' },
  { city: 'Denver', state: 'CO' },
];

// Helper function to normalize city and state into a "city-state" format
export function normalizeCityState(city: string, state: string): string {
  return `${city.toLowerCase().replace(/ /g, '-')}-${state.toLowerCase()}`;
}

// Function to get Lat/Lon for a given city and state (simplified for example)
async function getLatLonForCityState(city: string, state: string): Promise<{ lat: number | null, lon: number | null }> {
  // This is a placeholder. In a real application, you would use a geocoding API.
  // For the purpose of this exercise, we'll use hardcoded values for the specified cities.
  const cityCoordinates: { [key: string]: { lat: number, lon: number } } = {
    'orlando-fl': { lat: 28.5383, lon: -81.3792 },
    'nashville-tn': { lat: 36.1627, lon: -86.7816 },
    'austin-tx': { lat: 30.2672, lon: -97.7431 },
    'tampa-fl': { lat: 27.9506, lon: -82.4572 },
  'denver-co': { lat: 39.7392, lon: -104.9903 },
};
  const key = normalizeCityState(city, state);
  if (cityCoordinates[key]) {
    return cityCoordinates[key];
  }
  functions.logger.warn(`getLatLonForCityState: No coordinates found for ${city}, ${state}`);
  return { lat: null, lon: null };
}

// Helper function to fetch news data from Firestore with caching
async function fetchRealtimeNews(city: string, state: string): Promise<SafeRecord> {
  const normalizedCityState = normalizeCityState(city, state);
  if (newsCache.has(normalizedCityState)) {
    functions.logger.info(`fetchRealtimeNews: Using cached news data for ${normalizedCityState}`);
    return newsCache.get(normalizedCityState)!;
  }

  const newsRef = db.collection("dataUsaKeyPoints").doc(normalizedCityState).collection("news").doc("latest");
  functions.logger.info(`fetchRealtimeNews: Attempting to retrieve news data for ${normalizedCityState}`);
  try {
    const newsSnapshot = await newsRef.get();
    if (newsSnapshot.exists) {
      const newsData = newsSnapshot.data();
      functions.logger.info(`fetchRealtimeNews: Successfully retrieved news data for ${normalizedCityState} from Firestore.`);
      const data = (newsData?.data as SafeRecord) ?? {};
      functions.logger.debug(`fetchRealtimeNews: Raw news data from Firestore for ${normalizedCityState}: ${JSON.stringify(data).substring(0, 500)}...`); // Added logging
      newsCache.set(normalizedCityState, data);
      return data;
    } else {
      functions.logger.warn(`fetchRealtimeNews: News data for ${normalizedCityState} not found in Firestore.`);
      newsCache.set(normalizedCityState, {}); // Cache empty result
      return {};
    }
  } catch (error: any) {
    functions.logger.error(`fetchRealtimeNews: Error retrieving news data for ${normalizedCityState} from Firestore: ${error.message}`, error);
    newsCache.set(normalizedCityState, {}); // Cache empty result on error
    return {};
  }
}

// Helper function to fetch weather data from Firestore with caching
// Helper function to fetch weather data from Firestore with caching
async function fetchWeatherData(city: string, state: string): Promise<SafeRecord> {
  const normalizedCityState = normalizeCityState(city, state);
  if (weatherCache.has(normalizedCityState)) {
    functions.logger.info(`fetchWeatherData: Using cached weather data for ${normalizedCityState}`);
    return weatherCache.get(normalizedCityState)!;
  }

  const weatherRef = db.collection("dataUsaKeyPoints").doc(normalizedCityState).collection("weather").doc("latest");
  functions.logger.info(`fetchWeatherData: Attempting to retrieve weather data for ${normalizedCityState}`);
  try {
    const weatherSnapshot = await weatherRef.get();
    if (weatherSnapshot.exists) {
      const weatherData = weatherSnapshot.data();
      functions.logger.info(`fetchWeatherData: Successfully retrieved weather data for ${normalizedCityState} from Firestore.`);
      const data = (weatherData?.data as SafeRecord) ?? {};
      functions.logger.debug(`fetchWeatherData: Raw weather data from Firestore for ${normalizedCityState}: ${JSON.stringify(data).substring(0, 500)}...`);
      weatherCache.set(normalizedCityState, data);
      return data;
    } else {
      functions.logger.warn(`fetchWeatherData: Weather data for ${normalizedCityState} not found in Firestore.`);
      weatherCache.set(normalizedCityState, {});
      return {};
    }
  } catch (error: any) {
    functions.logger.error(`fetchWeatherData: Error retrieving weather data for ${normalizedCityState} from Firestore: ${error.message}`, error);
    weatherCache.set(normalizedCityState, {});
    return {};
  }
}

// Placeholder for actual weather API call
async function fetchWeatherDataFromApi(lat: number, lon: number): Promise<SafeRecord> {
  functions.logger.info(`fetchWeatherDataFromApi: Fetching weather data for lat: ${lat}, lon: ${lon}`);
  // In a real scenario, you would call a weather API here (e.g., OpenWeatherMap)
  // For now, returning dummy data to allow compilation and testing
  return {
    temperature: 25,
    condition: 'Sunny',
    humidity: 60,
    windSpeed: 10,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Prepares personalized SMS campaigns for a given number of leads.
 * This function is not directly callable via HTTP or PubSub, but is intended for internal use.
 * It pulls pending SMS queue documents, fetches contact, news, and weather data,
 * uses an LLM to generate personalized SMS text, and updates the smsQueue documents.
 *
 * @param numberOfLeads The maximum number of leads to process.
 * @param llmPrompt Additional instructions for the LLM to personalize the message.
 */
export async function prepareSmsCampaign(numberOfLeads: number, llmPrompt: string): Promise<void> {
  functions.logger.info(`prepareSmsCampaign: Starting for ${numberOfLeads} leads with prompt: "${llmPrompt}"`);

  await initializeVertexAI();

  try {
    // 1. Retrieve Pending SMS Queue Documents
    const smsQueueSnapshot = await db.collection("smsQueue")
      .where("status", "in", ["pending", "failed"])
      .limit(numberOfLeads)
      .get();

    functions.logger.debug(`prepareSmsCampaign: Query result - empty: ${smsQueueSnapshot.empty}, docs found: ${smsQueueSnapshot.docs.length}`);
    if (!smsQueueSnapshot.empty) {
      smsQueueSnapshot.docs.forEach(doc => {
        functions.logger.debug(`prepareSmsCampaign: Found document ID: ${doc.id}, data: ${JSON.stringify(doc.data())}`);
      });
    }

    if (smsQueueSnapshot.empty) {
      functions.logger.info("prepareSmsCampaign: No pending SMS queue documents found.");
      return;
    }

    functions.logger.info(`prepareSmsCampaign: Found ${smsQueueSnapshot.docs.length} pending SMS queue documents.`);

    // Fetch News and Weather Data once for Denver, CO as all leads are from there
    const denverNewsData = await fetchRealtimeNews('Denver', 'CO');
    const denverWeatherData = await fetchWeatherData('Denver', 'CO');

    for (const smsDoc of smsQueueSnapshot.docs) {
      const smsQueueData = smsDoc.data() as SmsQueueDocument;
      const smsDocRef = smsDoc.ref;

      try {
        // 2. Fetch Contact Data
        const leadId = smsQueueData.leadId;
        if (!leadId) {
          functions.logger.warn(`prepareSmsCampaign: SMS queue document ${smsDoc.id} is missing leadId. Skipping.`);
          await smsDocRef.update({ status: 'failed', errorMessage: 'Missing leadId' });
          continue;
        }

        const contactSnapshot = await db.collection("contacts").doc(leadId).get();
        if (!contactSnapshot.exists) {
          functions.logger.warn(`prepareSmsCampaign: Contact with ID ${leadId} not found for SMS queue document ${smsDoc.id}. Skipping.`);
          await smsDocRef.update({ status: 'failed', errorMessage: `Contact ${leadId} not found` });
          continue;
        }
        const contactData = contactSnapshot.data() as RawContact;
        functions.logger.info(`prepareSmsCampaign: Processing contact ${leadId} for SMS queue document ${smsDoc.id}.`);

        // 3. Prepare LLM Input using pre-fetched news and weather data
        const campaignLink = `https://ninjateam.ai/lp/craigslist?h=${contactData.hash || ''}`;
        const llmInputObjects = {
          contact: contactData,
          weather: denverWeatherData, // Use pre-fetched data
          news: denverNewsData,      // Use pre-fetched data
          campaignLink: campaignLink,
        };

        const PROMPT = `
          Please return the following json object as your response: {"name":"firstnameofperson", "phone":"3334445555", "smsText": "the_sms_message_we_will_send"}. Your job is to create as personalized a message as possible with the information you have available. If the name_confidence confidence field is 75 or greater, include that first name in your personalized message and in the returned json. Please include the phone number from the contact record in the json object. The most important item is that you will return a personalized sms message we are going to send our customer in this variable - the_sms_message_we_will_send. In addition, please consider the following when creating your message: ${llmPrompt}

          **Input Data:**
          ${JSON.stringify(llmInputObjects, null, 2)}

          Your JSON Object Response:
        `;

        // 5. Call the LLM
        const result = await generativeModel.generateContent({
          contents: [{ role: "user", parts: [{ text: PROMPT }] }],
        });

        // Add a 5-second delay between LLM prompts to avoid exceeding free tier limits
        await new Promise(resolve => setTimeout(resolve, 5000));

        const response = result.response;
        const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleaned = text.replace(/```json\s*|```/g, "").trim();

        let llmResponse: LlmSmsResponse;
        try {
          llmResponse = JSON.parse(cleaned);
          // Basic validation of LLM response structure
          if ((typeof llmResponse.name !== 'string' && llmResponse.name !== null) || typeof llmResponse.phone !== 'string' || typeof llmResponse.smsText !== 'string') {
            throw new Error("LLM response has invalid structure.");
          }
        } catch (e: any) {
          functions.logger.error(`prepareSmsCampaign: JSON parse error from LLM for SMS queue document ${smsDoc.id}: ${e.message}. Raw LLM response: ${text}`);
          await smsDocRef.update({ status: 'failed', errorMessage: `LLM response parse error: ${e.message}` });
          continue;
        }

        // 6. Update SMS Queue Document
        await smsDocRef.update({
          firstname: llmResponse.name,
          smstext: llmResponse.smsText,
          status: 'processed',
          processedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        functions.logger.info(`prepareSmsCampaign: Successfully processed and updated SMS queue document ${smsDoc.id}.`);

      } catch (innerError: any) {
        functions.logger.error(`prepareSmsCampaign: Error processing SMS queue document ${smsDoc.id}: ${innerError.message}`, innerError);
        await smsDocRef.update({ status: 'failed', errorMessage: innerError.message });
      }
    }
  } catch (outerError: any) {
    functions.logger.error(`prepareSmsCampaign: Top-level error during SMS campaign preparation: ${outerError.message}`, outerError);
  }
}

/**
 * Internal helper function to generate personalized email content using LLM.
 *
 * @param contact The RawContact object for personalization.
 * @param emailTemplate The email template string with placeholders.
 * @param llmPrompt Additional instructions for the LLM to personalize the message.
 * @returns The fully resolved and personalized email content as a string.
 */
export async function _getEmailContentLogic(contact: RawContact, emailTemplate: string, llmPrompt: string): Promise<string> {
  functions.logger.info(`_getEmailContentLogic: Starting for contact ${contact.hash}`);

  await initializeVertexAI();

  try {
    // 1. Fetch News and Weather Data with Caching
    let newsData: SafeRecord = {};
    let weatherData: SafeRecord = {};

    if (contact.raw_contact?.city && contact.raw_contact?.state) {
      newsData = await fetchRealtimeNews(contact.raw_contact.city, contact.raw_contact.state);
    } else {
      functions.logger.warn(`_getEmailContentLogic: Contact ${contact.hash} missing city/state for news. Skipping news fetch.`);
    }

    if (contact.raw_contact?.city && contact.raw_contact?.state) {
      weatherData = await fetchWeatherData(contact.raw_contact.city, contact.raw_contact.state);
    } else {
      functions.logger.warn(`_getEmailContentLogic: Contact ${contact.hash} missing city/state for weather. Skipping weather fetch.`);
    }

    // 2. Prepare LLM Input
    const PROMPT = `
      Your task is to personalize an email using the provided contact, news, and weather data, and fill in the given email template.
      Return your response as a JSON object with a "resolvedSections" array, where each object in the array has an "id" (matching the placeholder in the template, e.g., "GREETING") and a "resolvedString" (the personalized content for that section).
      Ensure the content is human-like, warm, and avoids gimmicks.

      Email Template (placeholders to fill: {GREETING}, {INTRO}, {CONCERNS}, {SOLUTIONS}, {CONCLUSION}, {PS}):
      ${emailTemplate}

      Contact Data:
      ${JSON.stringify(contact, null, 2)}

      News Data:
      ${JSON.stringify(newsData, null, 2)}

      Weather Data:
      ${JSON.stringify(weatherData, null, 2)}

      Additional Personalization Instructions:
      ${llmPrompt}

      Your JSON Object Response:
    `;

    // 3. Call the LLM
    const result = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: PROMPT }] }],
    });

    // Add a 1.2-second delay between LLM prompts to avoid exceeding free tier limits
    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = result.response;
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = text.replace(/```json\s*|```\s*$/g, "").trim();

    let llmResponse: LlmEmailResponse;
    try {
      llmResponse = JSON.parse(cleaned);
      // Basic validation of LLM response structure
      if (!llmResponse.resolvedSections || !Array.isArray(llmResponse.resolvedSections)) {
        throw new Error("LLM response has invalid 'resolvedSections' structure.");
      }
    } catch (e: any) {
      functions.logger.error(`_getEmailContentLogic: JSON parse error from LLM for contact ${contact.hash}: ${e.message}. Raw LLM response: ${text}`);
      throw new HttpsError('internal', `LLM response parse error: ${e.message}`);
    }

    // 4. Assemble Final Email
    let finalEmail = emailTemplate;
    for (const section of llmResponse.resolvedSections) {
      const placeholder = `{${section.id.toUpperCase()}}`;
      finalEmail = finalEmail.replace(placeholder, section.resolvedString);
    }

    functions.logger.info(`_getEmailContentLogic: Successfully generated email for contact ${contact.hash}.`);
    return finalEmail;

  } catch (error: any) {
    functions.logger.error(`_getEmailContentLogic: Error generating email for contact ${contact.hash}: ${error.message}`, error);
    throw new HttpsError('internal', `Failed to generate email content: ${error.message}`);
  }
}

/**
 * Callable Firebase function to generate personalized email content.
 *
 * @param data - An object containing:
 *   - contact: RawContact - The contact object for personalization.
 *   - emailTemplate: string - The email template string with placeholders.
 *   - llmPrompt: string - Additional instructions for the LLM.
 * @returns A Promise that resolves to the personalized email content string.
 */
export const getEmailContent = functions.https.onCall(async (request, context) => {
  functions.logger.info('getEmailContent: Callable function triggered.');

  // 1. Validate input
  if (!request.data || typeof request.data !== 'object' || !('contact' in request.data) || !('emailTemplate' in request.data) || !('llmPrompt' in request.data)) {
    throw new HttpsError('invalid-argument', 'The function must be called with "contact", "emailTemplate", and "llmPrompt" arguments.');
  }

  const data = request.data as GetEmailContentData;

  const contact: RawContact = data.contact;
  const emailTemplate: string = data.emailTemplate;
  const llmPrompt: string = data.llmPrompt;

  try {
    const resolvedEmail = await _getEmailContentLogic(contact, emailTemplate, llmPrompt);
    return resolvedEmail;
  } catch (error: any) {
    functions.logger.error(`getEmailContent: Error in callable function: ${error.message}`, error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError('internal', 'An unexpected error occurred while generating email content.');
  }
});

export const populateWeatherDataAndNews = onSchedule('0 0,12 * * *', async (event) => { // Runs at 12 AM and 12 PM daily
    functions.logger.info('populateWeatherDataAndNews function triggered.'); // Added log
    functions.logger.info('Running scheduled data population for weather and news.');
    for (const { city, state } of CITIES_TO_ENRICH) {
      functions.logger.info(`Processing data for ${city}, ${state}`);

      // Populate Weather Data
      try {
        const { lat, lon } = await getLatLonForCityState(city, state);
        if (lat !== null && lon !== null) {
          functions.logger.info(`Attempting to fetch weather data from API for lat: ${lat}, lon: ${lon}`);
          const weatherData = await fetchWeatherDataFromApi(lat, lon);
          functions.logger.info(`Successfully fetched weather data from API for lat: ${lat}, lon: ${lon}. Data size: ${JSON.stringify(weatherData).length} bytes`);
          functions.logger.debug(`Weather data fetched: ${JSON.stringify(weatherData)}`);
          await delay(750); // Add delay to prevent rate limiting

          const normalizedCityState = normalizeCityState(city, state);
          functions.logger.info(`Attempting to save weather data to Firestore for ${normalizedCityState}`);
          await db.collection("dataUsaKeyPoints").doc(normalizedCityState).collection("weather").doc("latest").set({ data: weatherData, timestamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
          functions.logger.info(`Successfully populated weather data for ${city}, ${state} with docId: ${normalizedCityState}`);
        } else {
          functions.logger.warn(`Could not get lat/lon for ${city}, ${state}. Skipping weather data population.`);
        }
      } catch (error) {
        functions.logger.error(`Error populating weather data for ${city}, ${state}:`, error);
      }

      // Populate News Data
      try {
        const normalizedCityState = normalizeCityState(city, state);
        functions.logger.info(`populateWeatherDataAndNews: Attempting to fetch news from Serper.dev for ${city}, ${state}`);

        const serperClient = new SerperClient(); // Instantiate SerperClient
        const serperQuery = `${city}, ${state} news`;
        const serperResult = await serperClient.news(serperQuery); // Call news method on the instance
        functions.logger.info(`populateWeatherDataAndNews: Serper.dev news API call successful for ${city}, ${state}.`);
        functions.logger.debug(`populateWeatherDataAndNews: Full Serper.dev response for ${normalizedCityState}: ${JSON.stringify(serperResult)}`); // Log full response

        // Process and save news data
        const newsArticles = serperResult?.news ?? []; // Changed from organic to news
        functions.logger.debug(`populateWeatherDataAndNews: Extracted ${newsArticles.length} news articles for ${normalizedCityState}.`);

        // Robust handling for news data
        const dataToSave = newsArticles.map((article: any) => ({
          title: article.title || 'No Title',
          link: article.link || '#',
          snippet: article.snippet || 'No Snippet',
          date: article.date || 'No Date',
          source: article.source || 'No Source',
        }));

        functions.logger.debug(`populateWeatherDataAndNews: Original news data for ${normalizedCityState} before cleaning (size: ${JSON.stringify(dataToSave).length} bytes): ${JSON.stringify(dataToSave).substring(0, 500)}...`);
        const cleanedNewsData = cleanObjectForFirestore(dataToSave);
        functions.logger.debug(`populateWeatherDataAndNews: Cleaned news data for ${normalizedCityState} before save (size: ${JSON.stringify(cleanedNewsData).length} bytes): ${JSON.stringify(cleanedNewsData).substring(0, 500)}...`);

        if (cleanedNewsData && cleanedNewsData.length > 0) {
          await db.collection("dataUsaKeyPoints").doc(normalizedCityState).collection("news").doc("latest").set({ data: cleanedNewsData, timestamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
          functions.logger.info(`populateWeatherDataAndNews: Successfully saved fresh news data to Firestore for ${city}, ${state}.`);
        } else {
          functions.logger.warn(`populateWeatherDataAndNews: No valid news data to save for ${city}, ${state} after processing Serper.dev response.`);
        }

        // Call fetchRealtimeNews to retrieve the newly cached data (optional but good practice)
        const fetchedNewsData = await fetchRealtimeNews(city, state);
        functions.logger.debug(`populateWeatherDataAndNews: Fetched news data from Firestore after refresh for ${city}, ${state}: ${JSON.stringify(fetchedNewsData).substring(0, 500)}...`);

        await delay(750); // Add delay to prevent rate limiting

      } catch (error: any) {
        functions.logger.error(`populateWeatherDataAndNews: Error populating news data for ${city}, ${state}: ${error.message}`, error);
      }
    }
    functions.logger.info('Scheduled data population completed.');
  });
