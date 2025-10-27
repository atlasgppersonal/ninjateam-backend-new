import { logger } from "firebase-functions/v2"; // Import logger explicitly
import {
  onRequest,
  HttpsFunction,
} from "firebase-functions/v2/https"; // Import types and onRequest explicitly
import {
  VertexAI,
  GenerativeModel,
  Content,
  Part,
} from "@google-cloud/vertexai";

// --- OpenAI Compatibility Interfaces ---

interface OpenAIContentPart {
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string };
}

/**
 * Represents a message in the OpenAI chat completions request.
 */
interface OpenAIChatMessage {
  role: "system" | "user" | "assistant";
  content: string | OpenAIContentPart[]; // Updated to allow array of content parts
}

/**
 * Represents the expected request body from an OpenAI-compatible client.
 */
interface OpenAIRequest {
  messages: OpenAIChatMessage[];
  model: string; // The model name is passed in the request body
  // Other potential fields like stream, temperature, etc., can be added here.
}

/**
 * Represents the response format for an OpenAI-compatible chat completion.
 */
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: { role: "assistant"; content: string };
    finish_reason: string;
    index: number;
  }[];
}

// --- Vertex AI Client Initialization ---

// Initialize the main Vertex AI client as a singleton for efficiency.
// It will be reused across all function invocations.
let vertex_ai: VertexAI | undefined;

const initializeVertexAIClient = () => {
  if (!vertex_ai) {
    const projectId = process.env.GCLOUD_PROJECT;
    if (!projectId) {
      logger.error("GCLOUD_PROJECT environment variable not set.");
      return; // Let it fail downstream to avoid cold-start crashes.
    }
    const location = "us-central1"; // As used in other functions

    logger.info(
      `Initializing Vertex AI client for project: ${projectId} in location: ${location}`
    );
    vertex_ai = new VertexAI({ project: projectId, location: location });
  }
};

/**
 * Maps OpenAI-compatible messages to Gemini-compatible Content objects.
 * Handles text and base64 image data.
 */
function mapMessagesToGemini(messages: OpenAIChatMessage[]): Content[] {
  const geminiContents: Content[] = [];

  for (const msg of messages) {
    // System messages are handled by systemInstruction, so skip them here.
    if (msg.role === "system") {
      continue;
    }

    const parts: Part[] = [];
    if (typeof msg.content === "string") {
      parts.push({ text: msg.content });
    } else if (Array.isArray(msg.content)) {
      for (const c of msg.content) {
        if (c.type === "text" && c.text) {
          parts.push({ text: c.text });
        } else if (c.type === "image_url" && c.image_url?.url.startsWith("data:")) {
          const [meta, base64] = c.image_url.url.split(",");
          const mimeMatch = meta.match(/data:(.*?);base64/);
          const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream"; // Default mime type
          parts.push({ inlineData: { mimeType: mime, data: base64 } });
        }
      }
    }
    geminiContents.push({ role: msg.role === "user" ? "user" : "model", parts });
  }
  return geminiContents;
}

/**
 * A single Firebase HTTPS onRequest function to proxy requests
 * to different Vertex AI generative models based on the incoming OpenAI model string.
 *
 * @returns {HttpsFunction} An HTTP-triggered Firebase Function.
 */
export const geminiProxy = onRequest(
  { cors: true },
  async (request, response) => {
    if (!vertex_ai) {
      logger.error(
        "Vertex AI client not initialized. Check project config and permissions."
      );
      response
        .status(500)
        .send("Internal Server Error: AI client not initialized.");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    let openAIRequest: OpenAIRequest | undefined; // Declare openAIRequest outside try block

    try {
      openAIRequest = request.body;
      logger.info(`[Incoming Request] Received OpenAI Request: ${JSON.stringify(openAIRequest)}`);

      if (!openAIRequest!.messages || !Array.isArray(openAIRequest!.messages)) {
        logger.error("Bad Request: Missing 'messages' array in request body.");
        response
          .status(400)
          .send("Bad Request: Missing 'messages' array in request body.");
        return;
      }

      // --- Model Mapping Logic ---
      let vertexModelName: string;
      const requestedModel = openAIRequest!.model.toLowerCase();

      if (requestedModel.startsWith("gpt-5")) {
        vertexModelName = "gemini-2.5-pro";
      } else if (requestedModel.startsWith("gpt-4.1")) {
        vertexModelName = "gemini-2.5-flash";
      } else if (requestedModel.startsWith("gpt-4o")) {
        vertexModelName = "gemini-2.5-flash-lite";
      } else {
        logger.warn(`Unknown model requested: ${openAIRequest!.model}. Defaulting to gemini-2.5-flash-lite.`);
        vertexModelName = "gemini-2.5-flash-lite"; // Default or error out
      }

      // Find the system instruction message and convert it to a Vertex AI Content object
      const systemInstructionContent: Content | undefined = openAIRequest!.messages.find(msg => msg.role === "system")
        ? { role: "system", parts: [{ text: openAIRequest!.messages.find(msg => msg.role === "system")!.content as string }] } // Ensure content is string for system message
        : undefined;

      // Convert user/assistant messages to Vertex AI Content objects using the new mapping function
      const contents: Content[] = mapMessagesToGemini(openAIRequest!.messages);
      logger.info(`[Transformation to Gemini] Transformed Gemini Contents: ${JSON.stringify(contents)}`);

      // Get a model instance with the system instruction.
      const generativeModel: GenerativeModel = vertex_ai.getGenerativeModel({
        model: vertexModelName,
        systemInstruction: systemInstructionContent, // Pass the formatted system instruction
      });

      logger.info(
        `Forwarding translated request to Vertex AI model: ${vertexModelName} (from Copilot model: ${openAIRequest!.model})`
      );
      const result = await generativeModel.generateContent({ contents });
      logger.info(`[Return from Gemini] Raw Gemini Response: ${JSON.stringify(result.response)}`);

      // --- Translate Vertex AI Response to OpenAI Response ---
      const vertexResponseText =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const openAIResponse: OpenAIResponse = {
        id: `cmpl-${Date.now()}`, // Create a mock completion ID
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: openAIRequest!.model, // Reflect the original requested model
        choices: [
          {
            message: {
              role: "assistant",
              content: vertexResponseText,
            },
            finish_reason: "stop",
            index: 0,
          },
        ],
      };
      logger.info(`[Translation to OpenAI] Outgoing OpenAI Response: ${JSON.stringify(openAIResponse)}`);

      response.status(200).json(openAIResponse);
    } catch (error: any) {
      const modelIdentifier = openAIRequest?.model || 'unknown';
      const fullErrorMessage = `Error in proxy for model ${modelIdentifier}: ${error.message || 'An unknown error occurred.'} ${error.stack ? 'Stack: ' + error.stack : ''}`;
      logger.error(fullErrorMessage, { errorMessage: error.message, errorStack: error.stack, requestBody: openAIRequest });
      response.status(500).send(`Internal Server Error: ${fullErrorMessage}`);
    }
  }
);