import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { db } from "./utils/firebase";

// Helper function to log to Firestore (copied from index.ts for local use)
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
 * Callable function to save arbitrage data to Firestore.
 *
 * Expected input (must be wrapped in a 'data' field for callable functions):
 * {
 *   data: {
 *     id: string,             // The category ID (e.g., "movers")
 *     location: string,       // The city-state (e.g., "portland-or")
 *     arbitrageData: object,  // Contains scored_keywords, customer_domain_data
 *     serviceRadiusCities: string[],
 *     cityClusters: object,
 *     // ... other top-level fields from your payload
 *   }
 * }
 */
export const saveArbitrageData = functions.https.onCall(
  async (request) => {
    functions.logger.info("saveArbitrageData: Function started.");
    await logToFirestore("saveArbitrageData", "info", "Function started.");

    // Validate that request.data exists and is an object
    if (!request.data || typeof request.data !== 'object') {
      functions.logger.error("saveArbitrageData: Request body must contain a 'data' field for callable functions.");
      await logToFirestore("saveArbitrageData", "error", "Invalid request data format.", { requestData: request.data });
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request body must contain a 'data' field with the arbitrage data payload."
      );
    }

    try {
      // Extract fields directly from the incoming request.data
      const { id, location, arbitrageData, serviceRadiusCities, cityClusters, ...otherFields } = request.data as {
        id: string;
        location: string;
        arbitrageData: {
          scored_keywords: any[];
          customer_domain_data: object;
        };
        serviceRadiusCities: string[];
        cityClusters: object;
        [key: string]: any; // Allow other fields like displayName, confidence, etc.
      };

      // Validate required fields
      if (!id || typeof id !== 'string') {
        functions.logger.error("saveArbitrageData: Missing or invalid 'id' parameter.");
        await logToFirestore("saveArbitrageData", "error", "Missing or invalid 'id' parameter.", { id });
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The 'id' parameter (string) is required and will be used as the category."
        );
      }

      if (!location || typeof location !== 'string') {
        functions.logger.error("saveArbitrageData: Missing or invalid 'location' parameter.");
        await logToFirestore("saveArbitrageData", "error", "Missing or invalid 'location' parameter.", { location });
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The 'location' parameter (string) is required."
        );
      }

      if (!arbitrageData || typeof arbitrageData !== 'object' || !arbitrageData.scored_keywords || !arbitrageData.customer_domain_data) {
        functions.logger.error("saveArbitrageData: Missing or invalid 'arbitrageData' object or its required sub-fields.");
        await logToFirestore("saveArbitrageData", "error", "Missing or invalid 'arbitrageData' parameter.", { arbitrageData });
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The 'arbitrageData' object with 'scored_keywords' and 'customer_domain_data' is required."
        );
      }

      // Reconstruct the data to be saved to Firestore to match the user's provided structure
      const dataToSave = {
        id,
        displayName: otherFields.displayName, // Assuming displayName is always present
        aliases: otherFields.aliases,
        description: otherFields.description,
        examplePhrases: otherFields.examplePhrases,
        parent: otherFields.parent,
        confidence: otherFields.confidence,
        avgJobAmount: otherFields.avgJobAmount,
        suggestedAt: otherFields.suggestedAt,
        createdBy: otherFields.createdBy,
        lastUpdated: otherFields.lastUpdated,
        location, // This is now a top-level field in the saved document
        arbitrageData: { // This is the nested arbitrageData
          scored_keywords: arbitrageData.scored_keywords,
          customer_domain_data: arbitrageData.customer_domain_data,
        },
        serviceRadiusCities,
        cityClusters,
      };

      functions.logger.info(`saveArbitrageData: Received data for location: ${location}, category: ${id}`);
      await logToFirestore("saveArbitrageData", "info", "Received valid data.", { location, category: id });

      // Construct the Firestore path: dataUsaKeyPoints/{location}/serp/arbitrage-lite/{id}
      const docPath = `dataUsaKeyPoints/${location}/serp/arbitrage-lite/${id}/data`;
      functions.logger.info(`saveArbitrageData: Saving data to Firestore path: ${docPath}`);
      await logToFirestore("saveArbitrageData", "info", "Saving data to Firestore.", { docPath });

      await db.doc(docPath).set(dataToSave, { merge: true });

      functions.logger.info(`saveArbitrageData: Arbitrage data saved successfully for location: ${location}, category: ${id}`);
      await logToFirestore("saveArbitrageData", "info", "Data saved successfully.", { location, category: id });

      return {
        success: true,
        message: `Arbitrage data saved for ${location} at ${docPath}`,
        docPath: docPath,
      };
    } catch (error: any) {
      console.error("Error saving arbitrage data:", error);
      functions.logger.error(`saveArbitrageData: Error for location ${request.data?.location}: ${error.message}`);
      await logToFirestore("saveArbitrageData", "error", "Error saving data.", { location: request.data?.location, error: error.message });
      throw new functions.https.HttpsError(
        "internal",
        error.message || "Unknown error"
      );
    }
  }
);
