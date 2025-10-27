import { HttpsFunction } from "firebase-functions/v2/https";
/**
 * A factory function that creates a Firebase HTTPS onRequest function to proxy requests
 * to a specific Vertex AI generative model.
 *
 * @param {string} modelName The name of the Vertex AI model to use (e.g., "gemini-1.5-flash-001").
 * @returns {HttpsFunction} An HTTP-triggered Firebase Function.
 */
export declare function createVertexProxy(modelName: string): HttpsFunction;
