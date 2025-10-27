import { HttpsFunction } from "firebase-functions/v2/https";
/**
 * A single Firebase HTTPS onRequest function to proxy requests
 * to different Vertex AI generative models based on the incoming OpenAI model string.
 *
 * @returns {HttpsFunction} An HTTP-triggered Firebase Function.
 */
export declare const geminiProxy: HttpsFunction;
