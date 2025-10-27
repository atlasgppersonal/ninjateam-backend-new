import * as admin from "firebase-admin";
import {onDocumentCreated, onDocumentUpdated} from "firebase-functions/v2/firestore";
import {onRequest} from "firebase-functions/v2/https";
import {processEmailQueue} from "./emailDispatcherAgent"; // all the heavy logic lives here
import { normalizePhoneNumber } from "./normalizePhoneNumbers"; // Import the helper function
import { db } from './utils/firebase'; // Import the centralized db instance
import { generateUniqueHash } from './utils/hashGenerator'; // Import the hash generator
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import * as functions from "firebase-functions/v2"; // Import v2 functions for callable
import { getPageMetadata } from "./getPageMetadata"; // Import the new getPageMetadata function
import fetch from "node-fetch";
export { gemini25ProProxy, gemini25FlashProxy, gemini25FlashLiteProxy, secretDiag } from './geminiProxies';

// Initialize Firebase Admin (safe guard against multiple init)
if (!admin.apps.length) {
  admin.initializeApp();
}

export const whoAmI = functions.https.onRequest(async (req, res) => {
  try {
    const metaUrl = "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email";
    const r = await fetch(metaUrl, { headers: { "Metadata-Flavor": "Google" } });
    if (!r.ok) throw new Error(`Metadata server returned ${r.status}`);
    const serviceAccountEmail = await r.text();

    res.json({
      serviceAccountEmail,
      projectId: process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || null,
      functionTarget: process.env.K_SERVICE || process.env.FUNCTION_TARGET || null,
      gen: process.env.K_SERVICE ? "gen2 (Cloud Run)" : "gen1"
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Helper function to log to Firestore
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

/**
 * Callable function to add a lead to the SMS queue.
 *
 * Expected input (must be wrapped in a 'data' field for callable functions):
 * {
 *   data: {
 *     contactId: string,     // The Firestore contact ID
 *     phone: string,         // Normalized phone number (+1XXXXXXXXXX)
 *     campaignId: number     // ID of the campaign (99 = SMS campaign)
 *   }
 * }
 */
/**
 * Core logic for adding a lead to the SMS queue.
 * This function is separated from the callable wrapper for easier testing and internal use.
 */
export async function _addLeadToSMSQueueLogic(contactId: string, phone: string, campaignId: number) {
  functions.logger.info(`_addLeadToSMSQueueLogic: Received data - contactId: ${contactId}, phone: ${phone}, campaignId: ${campaignId}`);

  if (!contactId || !phone || !campaignId) {
    functions.logger.error("_addLeadToSMSQueueLogic: Missing required parameters (contactId, phone, or campaignId).");
    throw new functions.https.HttpsError(
      "invalid-argument",
      "contactId, phone, and campaignId are required."
    );
  }

  // Normalize phone format
  const normalizedPhone = phone.replace(/\D/g, "");
  functions.logger.info(`_addLeadToSMSQueueLogic: Phone number normalized to ${normalizedPhone}`);
  if (normalizedPhone.length !== 11 && normalizedPhone.length !== 10) {
    functions.logger.error(`_addLeadToSMSQueueLogic: Invalid phone number format for ${phone}.`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Phone number must be 10 or 11 digits"
    );
  }

  const queueEntry = {
    contactId,
    phone: normalizedPhone.startsWith("1")
      ? `+${normalizedPhone}`
      : `+1${normalizedPhone}`,
    campaignId,
    status: "pending", // will be updated by downstream processors
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  functions.logger.info(`_addLeadToSMSQueueLogic: Creating queue entry for contactId ${contactId}.`);

  const docRef = await db.collection("smsQueue").add(queueEntry);
  functions.logger.info(`_addLeadToSMSQueueLogic: Queue entry added to smsQueue with ID: ${docRef.id} for contactId ${contactId}.`);

  return {
    success: true,
    id: docRef.id,
    ...queueEntry,
  };
}

export const addLeadToSMSQueue = functions.https.onCall(
  async (request) => {
    functions.logger.info("addLeadToSMSQueue: Function started.");
    // Validate that request.data exists and is an object
    if (!request.data || typeof request.data !== 'object') {
      functions.logger.error("addLeadToSMSQueue: Request body must contain a 'data' field for callable functions.");
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request body must contain a 'data' field with contactId, phone, and campaignId."
      );
    }

    try {
      const { contactId, phone, campaignId } = request.data as { contactId: string; phone: string; campaignId: number };
      return await _addLeadToSMSQueueLogic(contactId, phone, campaignId);
    } catch (error: any) {
      console.error("Error adding lead to SMS queue:", error);
      functions.logger.error(`addLeadToSMSQueue: Error for contactId ${request.data?.contactId}: ${error.message}`);
      throw new functions.https.HttpsError(
        "internal",
        error.message || "Unknown error"
      );
    }
  }
);

// Only the trigger is exported here
export const emailDispatcherProc = onDocumentCreated(
  {
    document: "emailQueue/{docId}",
    timeoutSeconds: 300
  },
  processEmailQueue
);

// Export the personalization agent

// Trigger for personalization agent on new contact creation

export const receiveLeadData = onRequest(async (request, response) => {
  functions.logger.info("receiveLeadData: Function started.");
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    functions.logger.info("receiveLeadData: OPTIONS request received.");
    await logToFirestore("receiveLeadData", "info", "OPTIONS request received");
    response.status(204).send('');
    return;
  }

  if (request.method !== "POST") {
    functions.logger.warn(`receiveLeadData: Method Not Allowed - ${request.method}`);
    await logToFirestore("receiveLeadData", "warn", "Method Not Allowed", { method: request.method });
    response.status(405).json({ success: false, message: "Method Not Allowed. Only POST requests are accepted." });
    return;
  }

  // Log function start and request body after initial checks
  await logToFirestore("receiveLeadData", "info", "Function started and request received", { body: request.body });

  const {
    phone,
    raw_contact, // Add raw_contact here
    name = null,
    email = null,
    last_sent = "PENDING",
    source_url = null,
    image_hash = null,
    business_name = null,
    category = null,
    services_rendered = null,
  } = request.body;

  functions.logger.info(`receiveLeadData: Received request body - phone: ${phone}, name: ${name}, email: ${email}`);
  await logToFirestore("receiveLeadData", "info", "Received request body", { phone, name, email });

  if (!phone || !raw_contact) { // Make raw_contact required
    functions.logger.error("receiveLeadData: Missing required parameter: phone or raw_contact.");
    await logToFirestore("receiveLeadData", "error", "Missing required parameter", { phone, raw_contact });
    response.status(400).json({ success: false, message: "Missing required parameter: phone or raw_contact" });
    return;
  }

  // Normalize the incoming phone number
  const normalizedPhone = normalizePhoneNumber(phone);
  functions.logger.info(`receiveLeadData: Phone number normalized to ${normalizedPhone}`);
  await logToFirestore("receiveLeadData", "info", "Phone number normalized", { originalPhone: phone, normalizedPhone });

  if (!normalizedPhone) {
    functions.logger.error("receiveLeadData: Invalid phone number format provided.");
    await logToFirestore("receiveLeadData", "error", "Invalid phone number format", { originalPhone: phone });
    response.status(400).json({ success: false, message: "Invalid phone number format provided." });
    return;
  }

  try {
    const contactId = uuidv4(); // Generate a unique contact ID
    const hash = await generateUniqueHash(); // Generate a unique 4-alphanumeric hash
    functions.logger.info(`receiveLeadData: Generated contactId: ${contactId}, hash: ${hash}`);
    await logToFirestore("receiveLeadData", "info", "Generated IDs", { contactId, hash });

    const leadData = {
      contactId, // Unique indexed ID
      hash,      // Unique 4-alphanumeric hash
      status: "pending", // Initial status
      name,
      email, // email is now top-level
      phone: normalizedPhone, // phone is now top-level
      last_sent,
      source_url,
      image_hash,
      business_name,
      category,
      services_rendered,
      raw_contact, // Add raw_contact to the leadData object
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Use server timestamp for consistency
    };

    // Use contactId as the document ID for contacts collection
    await db.collection("contacts").doc(contactId).set(leadData, { merge: true });
    functions.logger.info(`receiveLeadData: Lead data for contactId ${contactId} saved to Firestore.`);
    await logToFirestore("receiveLeadData", "info", "Lead data saved to Firestore", { contactId, leadData });

    console.log(`Lead data for ${normalizedPhone} (ID: ${contactId}, Hash: ${hash}) saved successfully.`);
    response.status(200).json({ success: true, message: "Lead data saved successfully!", contactId, hash, phone: normalizedPhone });
    functions.logger.info(`receiveLeadData: Function completed successfully for contactId ${contactId}.`);
    await logToFirestore("receiveLeadData", "info", "Function completed successfully", { contactId });

  } catch (error: unknown) {
    console.error("Error saving lead data:", error);
    functions.logger.error(`receiveLeadData: Error saving lead data for phone ${phone}: ${error}`);
    await logToFirestore("receiveLeadData", "error", "Error saving lead data", { phone, error: error instanceof Error ? error.message : String(error) });
    if (error instanceof Error) {
      response.status(500).json({ success: false, message: `Error saving lead data: ${error.message}` });
    } else {
      response.status(500).json({ success: false, message: "An unknown error occurred while saving lead data." });
    }
  }
});

// Export the sendLeadNotification function
export const sendLeadNotification = onRequest(async (request, response) => {
  functions.logger.info("sendLeadNotification: Function started.");
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    functions.logger.info("sendLeadNotification: OPTIONS request received.");
    response.status(204).send('');
    return;
  }

  if (request.method !== "POST") {
    functions.logger.warn(`sendLeadNotification: Method Not Allowed - ${request.method}`);
    response.status(405).send("Method Not Allowed");
    return;
  }

  const { recipientEmail, leadName, leadPhone } = request.body;
  functions.logger.info(`sendLeadNotification: Received request body - recipientEmail: ${recipientEmail}, leadName: ${leadName}, leadPhone: ${leadPhone}`);


  if (!recipientEmail || !leadName || !leadPhone) {
    functions.logger.error("sendLeadNotification: Missing required parameters: recipientEmail, leadName, leadPhone.");
    response.status(400).json({ success: false, message: "Missing required parameters: recipientEmail, leadName, leadPhone" });
    return;
  }

  // Azure AD App Registration details from Firebase environment config
  // For Cloud Functions v2, environment variables are accessed via process.env
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const senderEmail = process.env.AZURE_SENDER_EMAIL; // The email address from which to send

  if (!tenantId || !clientId || !clientSecret || !senderEmail) {
    console.error("Azure AD credentials or sender email are not configured as environment variables.");
    functions.logger.error("sendLeadNotification: Azure AD credentials or sender email are not configured as environment variables.");
    response.status(500).json({ success: false, message: "Server configuration error: Azure AD credentials missing." });
    return;
  }
  functions.logger.info("sendLeadNotification: Azure AD credentials found.");

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const graphApiUrl = `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`;
  functions.logger.info(`sendLeadNotification: Token URL: ${tokenUrl}, Graph API URL: ${graphApiUrl}`);


  try {
    // 1. Get Access Token from Azure AD
    functions.logger.info("sendLeadNotification: Attempting to get Access Token from Azure AD.");
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        scope: "https://graph.microsoft.com/.default",
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      functions.logger.error(`sendLeadNotification: Failed to get access token: ${tokenResponse.status} - ${errorText}`);
      throw new Error(`Failed to get access token: ${tokenResponse.status} - ${errorText}`);
    }

    const tokenData: any = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    functions.logger.info("sendLeadNotification: Successfully obtained Access Token.");

    // 2. Send Email using Microsoft Graph API
    functions.logger.info("sendLeadNotification: Attempting to send email using Microsoft Graph API.");
    const emailPayload = {
      message: {
        subject: "A new lead has come in",
        body: {
          contentType: "Html",
          content: `
            <p>A new lead has come in.</p>
            <p><strong>Name:</strong> ${leadName}</p>
            <p><strong>Phone:</strong> ${leadPhone}</p>
          `,
        },
        toRecipients: [
          {
            emailAddress: {
              address: recipientEmail,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    const sendMailResponse = await fetch(graphApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!sendMailResponse.ok) {
      const errorText = await sendMailResponse.text();
      functions.logger.error(`sendLeadNotification: Failed to send email via Graph API: ${sendMailResponse.status} - ${errorText}`);
      throw new Error(`Failed to send email via Graph API: ${sendMailResponse.status} - ${errorText}`);
    }

    console.log("Lead notification email sent successfully via Microsoft Graph API!");
    response.status(200).json({ success: true, message: "Email sent successfully!" });
    functions.logger.info("sendLeadNotification: Email sent successfully via Microsoft Graph API.");

  } catch (error: unknown) { // Explicitly type error as unknown
    console.error("Error sending lead notification email:", error);
    functions.logger.error(`sendLeadNotification: Error sending lead notification email: ${error}`);
    if (error instanceof Error) {
      response.status(500).json({ success: false, message: `Error sending email: ${error.message}` });
    } else {
      response.status(500).json({ success: false, message: "An unknown error occurred while sending email." });
    }
  }
});

export const getServiceClientData = onRequest(async (request, response) => {
  functions.logger.info("getServiceClientData: Function started.");
  response.set("Access-Control-Allow-Origin", "*"); // Allow all origins for now, refine later

  const clientIdentifier = request.query.client_identifier; // Can be hash or contactId
  functions.logger.info(`getServiceClientData: Received request for client_identifier: ${clientIdentifier}`);

  if (!clientIdentifier) {
    functions.logger.error("getServiceClientData: Missing required query parameter: client_identifier.");
    response.status(400).json({ success: false, message: "Missing required query parameter: client_identifier (hash or contactId)" });
    return;
  }

  try {
    let querySnapshot;
    // Determine if clientIdentifier is a hash (4 alphanumeric) or contactId (UUID)
    if (typeof clientIdentifier === 'string' && clientIdentifier.length === 4 && /^[A-Z0-9]{4}$/.test(clientIdentifier)) {
      functions.logger.info(`getServiceClientData: Client identifier recognized as hash: ${clientIdentifier}`);
      // It's likely a hash
      querySnapshot = await db.collection("contacts").where("hash", "==", clientIdentifier).limit(1).get();
    } else if (typeof clientIdentifier === 'string' && clientIdentifier.length === 36 && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(clientIdentifier)) {
      functions.logger.info(`getServiceClientData: Client identifier recognized as contactId (UUID): ${clientIdentifier}`);
      // It's likely a UUID (contactId)
      querySnapshot = await db.collection("contacts").where("contactId", "==", clientIdentifier).limit(1).get();
    } else {
      functions.logger.error(`getServiceClientData: Invalid client_identifier format: ${clientIdentifier}.`);
      response.status(400).json({ success: false, message: "Invalid client_identifier format. Must be a 4-alphanumeric hash or a UUID contactId." });
    }

    let data;
    if(querySnapshot){if (querySnapshot.empty) {
        functions.logger.warn(`getServiceClientData: Client data not found for identifier: ${clientIdentifier}.`);
        response.status(404).json({ success: false, message: "Client data not found for the provided identifier." });
        return;
        }

        data = querySnapshot.docs[0].data(); // Get the first document found
   }
    functions.logger.info(`getServiceClientData: Client data found for identifier ${clientIdentifier}.`);

    response.json({
      "name": data?.name || null,
      "business_name": data?.business_name || null,
      "email": data?.email || null,
      "phone": data?.phone || null,
      "category_of_service": data?.category || null, // Changed key name
      "services_rendered": data?.services_rendered || [],
      "status": data?.status || null, // Include status
      "hash": data?.hash || null,     // Include hash
      "contactId": data?.contactId || null, // Include contactId
    });
    functions.logger.info(`getServiceClientData: Function completed successfully for identifier ${clientIdentifier}.`);

  } catch (error: unknown) {
    console.error("Error fetching client data:", error);
    functions.logger.error(`getServiceClientData: Error fetching client data for identifier ${clientIdentifier}: ${error}`);
    if (error instanceof Error) {
      response.status(500).json({ success: false, message: `Error fetching client data: ${error.message}` });
    } else {
      response.status(500).json({ success: false, message: "An unknown error occurred while fetching client data." });
    }
  }
});

// Export the daily weather update scheduled function
// export { dailyWeatherUpdate, getPageMetadata };
export { getPageMetadata };
export { saveArbitrageData } from './saveArbitrageData';

// Export the personalization agent's scheduled data population function
export { populateWeatherDataAndNews } from './agents/personalizationAgent';
