import { logger } from "firebase-functions/v2";
import {
  onRequest,
} from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";

// Initialize Vertex AI
const vertex_ai = new VertexAI({
  project: process.env.GCLOUD_PROJECT,
  location: "us-central1", // As used in other functions
});

// Get the generative model
const generativeModel = vertex_ai.getGenerativeModel({
  model: "gemini-1.5-flash-001",
});

export const vertexAiProxy = onRequest(
  { cors: true },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { contents } = request.body;

      if (!contents) {
        logger.error("Invalid request payload received.", { body: request.body });
        response.status(400).send("Bad Request: Missing 'contents' in request body.");
        return;
      }

      logger.info("Forwarding request to Vertex AI...");
      const result = await generativeModel.generateContent({ contents });
      logger.info("Received response from Vertex AI. Sending back to client.");
      response.status(200).json(result.response);
    } catch (error: any) {
      logger.error("Error calling Vertex AI API:", {
        errorMessage: error.message,
      });
      response.status(500).send(`Internal Server Error: ${error.message}`);
    }
  }
);