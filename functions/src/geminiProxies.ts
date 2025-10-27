import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { VertexAI, GenerativeModel, Content, Part, Tool, FunctionDeclaration, FunctionCallingMode } from "@google-cloud/vertexai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

// Reusable Vertex AI client singleton
let vertex_ai: VertexAI | undefined;
// Define the secret name that will contain the service account JSON (base64 encoded)
const serviceAccountB64 = defineSecret("SERVICE_ACCOUNT_JSON_B64");
const initializeVertexAIClient = () => {
  if (!vertex_ai) {
    // If running locally under the emulator, the Emulator Suite will inject the
    // value from .secret.local into process.env.SERVICE_ACCOUNT_JSON_B64.
    // When present, decode it and write to a temp file and set
    // GOOGLE_APPLICATION_CREDENTIALS so Google client libraries can pick it up.
    try {
      const b64 = process.env.SERVICE_ACCOUNT_JSON_B64;

      if (b64 && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        try {
          const tmpDir = os.tmpdir();
          const filename = `gcp_sa_${process.pid}_${Date.now()}.json`;
          const filePath = path.join(tmpDir, filename);
          const buf = Buffer.from(b64, "base64");
          fs.writeFileSync(filePath, buf);
          process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath;

        } catch (err: any) {
          logger.error('Failed to decode/write SERVICE_ACCOUNT_JSON_B64', { err: err?.message || err });
        }
      }
      // DEV-FALLBACK: If secret injection is not available, look for a local service
      // account JSON in the repository root so you can test quickly. This is
      // strictly for local testing and should NEVER be committed or used in prod.
      if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !b64) {
        const candidateFiles = [
          path.join(process.cwd(), 'fourth-outpost-470409-u3-a70945cd7a5b.json'),
          path.join(process.cwd(), 'service-account.json'),
          path.join(process.cwd(), 'sa_test.json'),
          // Also check the repo root absolute path (workspace root) where you placed the JSON
          path.join('C:', 'Users', 'GIO PLUGLIESE', 'Documents', 'Work', 'ags site', 'new-site', 'ai-platform-website-functions', 'fourth-outpost-470409-u3-a70945cd7a5b.json')
        ];
        for (const p of candidateFiles) {
          try {
            if (fs.existsSync(p)) {
              process.env.GOOGLE_APPLICATION_CREDENTIALS = p;
              logger.warn('Using local service account JSON for local testing ONLY. Do not commit this file to source control.', { path: p });
              break;
            }
          } catch (e) {
            // ignore and continue
          }
        }
      }

    } catch (err: any) {
      // Non-fatal: continue to try to initialize Vertex; errors will surface if credentials are missing
      logger.debug('Error while handling SERVICE_ACCOUNT_JSON_B64', { err: err?.message || err });
    }
    // Prefer common env names; also try to parse FIREBASE_CONFIG if present
    let projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
    let projectSource = projectId ? (process.env.GOOGLE_CLOUD_PROJECT ? 'GOOGLE_CLOUD_PROJECT' : 'GCLOUD_PROJECT') : undefined;
    if (!projectId && process.env.FIREBASE_CONFIG) {
      try {
        const cfg = JSON.parse(process.env.FIREBASE_CONFIG);
        if (cfg && cfg.projectId) {
          projectId = cfg.projectId;
          projectSource = 'FIREBASE_CONFIG.projectId';
        }
      } catch (e) {
        logger.warn('Could not parse FIREBASE_CONFIG to obtain projectId', { error: String(e) });
      }
    }

    if (!projectId) {
      logger.error('No projectId found in environment.');
      return;
    }

  const location = 'us-central1';

    try {
      vertex_ai = new VertexAI({ project: projectId, location });

    } catch (e: any) {
      logger.error('Failed to construct Vertex AI client', { error: e?.message || e });
      vertex_ai = undefined;
    }
  }
};

interface OpenAIContentPart {
  type: "text" | "image_url" | "tool_result" | "data"; // Added "data"
  text?: string;
  image_url?: { url: string };
  // New fields for tool_result
  tool_call_id?: string;
  tool_name?: string;
  content?: string;
  // New fields for data
  mime_type?: string; // MIME type for generic data
  data_base64?: string; // Base64 encoded data
}

interface OpenAIChatMessage {
  role: "system" | "user" | "assistant";
  content: string | OpenAIContentPart[];
}

interface OpenAIRequest {
  messages: OpenAIChatMessage[];
  model: string;
  tools?: Array<{
    type: "function";
    function: {
      name: string;
      description?: string;
      parameters?: any; // Using any for now, can be more specific with JSON Schema
    };
  }>;
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } };
}

function mapMessagesToGemini(messages: OpenAIChatMessage[]): Content[] {
  const geminiContents: Content[] = [];

  for (const msg of messages) {
    if (msg.role === "system") continue;

    const parts: Part[] = [];
    if (typeof msg.content === "string") {
      parts.push({ text: msg.content });
    } else if (Array.isArray(msg.content)) {
      for (const c of msg.content) {
        if (c.type === "text" && c.text) {
          parts.push({ text: c.text });
        } else if (c.type === "image_url" && c.image_url?.url?.startsWith("data:")) {
          const [meta, base64] = c.image_url.url.split(",");
          const mimeMatch = meta.match(/data:(.*?);base64/);
          const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
          parts.push({ inlineData: { mimeType: mime, data: base64 } });
        }
        // NEW: Handle tool_result parts
        else if (c.type === "tool_result" && msg.role === "user") {
          logger.info('[Proxy] Sending Function Response to Gemini:', { tool_name: c.tool_name, content: c.content });
          parts.push({
            functionResponse: {
              name: c.tool_name!,
              response: {
                content: c.content,
              },
            },
          });
        }
        // NEW: Handle generic data parts
        else if (c.type === "data" && c.mime_type && c.data_base64) {
          parts.push({
            inlineData: {
              mimeType: c.mime_type,
              data: c.data_base64,
            },
          });
        }
      }
    }
    geminiContents.push({ role: msg.role === "user" ? "user" : "model", parts });
  }
  return geminiContents;
}

function createProxyForModel(vertexModelName: string) {
  initializeVertexAIClient();

  // Ensure the emulator/runtime injects the secret into the function process by
  // declaring the secret in the onRequest options. This helps the emulator map
  // .secret.local into process.env for this function.
  return onRequest({ cors: true, secrets: [serviceAccountB64] }, async (request, response) => {
    if (!vertex_ai) {
      logger.error('Vertex AI client not initialized.');
      response.status(500).send("Internal Server Error: AI client not initialized.");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    let openAIRequest: OpenAIRequest | undefined;
    try {
      openAIRequest = request.body;


      if (!openAIRequest?.messages || !Array.isArray(openAIRequest.messages)) {
        logger.error("Bad Request: Missing 'messages' array.");
        response.status(400).send("Bad Request: Missing 'messages' array in request body.");
        return;
      }

      const systemMsg = openAIRequest.messages.find(m => m.role === "system");
      const systemInstruction = systemMsg && typeof systemMsg.content === 'string'
        ? { role: 'system', parts: [{ text: systemMsg.content }] }
        : undefined;

      const contents = mapMessagesToGemini(openAIRequest.messages);


          // NEW: Extract and map tools from OpenAI request to Gemini format
          const functionDeclarations: FunctionDeclaration[] = []; // Collect all function declarations here

          if (openAIRequest.tools && Array.isArray(openAIRequest.tools)) {
            for (const tool of openAIRequest.tools) {
              if (tool.type === "function" && tool.function) {
                const functionDeclaration: FunctionDeclaration = {
                  name: tool.function.name,
                  description: tool.function.description,
                  parameters: tool.function.parameters, // Remove 'as any' and trust the incoming schema
                };
                functionDeclarations.push(functionDeclaration); // Add to the consolidated list
              }
            }

          }

          logger.info(`[Proxy] Sending Function Declarations to Gemini: ${JSON.stringify(functionDeclarations, null, 2)}`);

          // If there are function declarations, wrap them in a single Tool object
          const toolsForGemini = functionDeclarations.length > 0 ? [{ functionDeclarations: functionDeclarations }] : undefined;

          const generativeModel: GenerativeModel = vertex_ai.getGenerativeModel({
            model: vertexModelName,
            systemInstruction,
            tools: toolsForGemini,
            // NEW: Add toolConfig based on openAIRequest.tool_choice
            toolConfig: openAIRequest.tool_choice ? {
              functionCallingConfig: (() => {
                if (openAIRequest.tool_choice === "none") {
                  return { mode: FunctionCallingMode.NONE };
                } else if (openAIRequest.tool_choice === "auto") {
                  return { mode: FunctionCallingMode.AUTO };
                } else if (typeof openAIRequest.tool_choice === "object" && openAIRequest.tool_choice.type === "function") {
                  return {
                    mode: FunctionCallingMode.ANY,
                    allowedFunctionNames: [openAIRequest.tool_choice.function.name],
                  };
                }
                return undefined; // Fallback if unexpected tool_choice
              })(),
            } : undefined, // Pass the single consolidated Tool object (or undefined)
          });

      
      // Set up SSE headers for streaming
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      });

      const timestamp = Math.floor(Date.now() / 1000);
      const completionId = `chatcmpl-${Date.now()}`;
      
      // Send initial empty choices with prompt filter results (Azure OpenAI format)
      const initialChunk = {
        choices: [],
        created: 0,
        id: "",
        prompt_filter_results: [{
          prompt_index: 0,
          content_filter_results: {
            hate: { filtered: false, severity: "safe" },
            self_harm: { filtered: false, severity: "safe" },
            sexual: { filtered: false, severity: "safe" },
            violence: { filtered: false, severity: "safe" }
          }
        }]
      };
      response.write(`data: ${JSON.stringify(initialChunk)}\n\n`);

      try {
        // Use streaming API

        const streamResult = await generativeModel.generateContentStream({ contents });
        
        let isFirstChunk = true;
        let fullText = '';
        let totalInputTokens = 0;
        let totalOutputTokens = 0;
        let toolCallsMade = false;

        // Stream chunks as they arrive
        for await (const chunk of streamResult.stream) {
          const candidates = chunk.candidates;
          if (!candidates || candidates.length === 0) {
            continue;
          }

          const candidate = candidates[0];
          const parts = candidate?.content?.parts || [];
          
          for (const part of parts) {
            if (part.text) {
              const textContent = String(part.text);
              fullText += textContent;

              const streamChunk: any = {
                choices: [{
                  index: 0,
                  delta: isFirstChunk
                    ? { content: textContent, role: "assistant" }
                    : { content: textContent },
                  finish_reason: null
                }],
                created: timestamp,
                id: completionId,
                model: openAIRequest.model,
                object: "chat.completion.chunk"
              };

              response.write(`data: ${JSON.stringify(streamChunk)}\n\n`);
              isFirstChunk = false;
            } else if (part.functionCall) {
              const functionCall = part.functionCall;
              const functionName = functionCall.name;
              const functionArgs = functionCall.args || {};

              logger.info('Converting Gemini function call to OpenAI format', {
                functionName,
                args: functionArgs,
                geminiFormat: JSON.stringify(functionCall)
              });

              const toolCallChunk: any = {
                choices: [{
                  index: 0,
                  delta: {
                    role: "assistant",
                    tool_calls: [{
                      index: 0,
                      id: `call_${Date.now()}`,
                      type: "function",
                      function: {
                        name: functionName,
                        arguments: JSON.stringify(functionArgs)
                      }
                    }]
                  },
                  finish_reason: null
                }],
                created: timestamp,
                id: completionId,
                model: openAIRequest.model,
                object: "chat.completion.chunk"
              };

              response.write(`data: ${JSON.stringify(toolCallChunk)}\n\n`);
              isFirstChunk = false;
              toolCallsMade = true;
            }
          }
        }

        // Get the aggregated response for usage metadata
        const aggregatedResponse = await streamResult.response;
        if (aggregatedResponse?.usageMetadata) {
          totalInputTokens = aggregatedResponse.usageMetadata.promptTokenCount || 0;
          totalOutputTokens = aggregatedResponse.usageMetadata.candidatesTokenCount || 0;
        }

        // Send final chunk with finish_reason
        const finalChunk = {
          choices: [{
            index: 0,
            delta: { content: null },
            finish_reason: toolCallsMade ? "tool_calls" : "stop"
          }],
          created: timestamp,
          id: completionId,
          model: openAIRequest.model,
          object: "chat.completion.chunk"
        };
        response.write(`data: ${JSON.stringify(finalChunk)}\n\n`);

        // Send usage chunk (empty choices array with usage stats)
        const usageChunk = {
          choices: [],
          created: timestamp,
          id: completionId,
          model: openAIRequest.model,
          object: "chat.completion.chunk",
          usage: {
            prompt_tokens: totalInputTokens,
            completion_tokens: totalOutputTokens,
            total_tokens: totalInputTokens + totalOutputTokens
          }
        };
        response.write(`data: ${JSON.stringify(usageChunk)}\n\n`);

        // Send [DONE] marker
        response.write(`data: [DONE]\n\n`);
        response.end();


        return;

      } catch (vertexErr: any) {
        logger.error('Vertex.generateContentStream failed', { errorMessage: vertexErr?.message || vertexErr, requestContents: contents });
        // Send error as SSE and close
        const errorChunk = {
          error: {
            message: vertexErr?.message || 'Stream failed',
            type: 'server_error'
          }
        };
        response.write(`data: ${JSON.stringify(errorChunk)}\n\n`);
        response.end();
        return;
      }

      // Old non-streaming code removed - everything below here is now unreachable
      // but kept commented for reference if needed
      /*
      let result;
      try {
        logger.info('Calling generateContent on Vertex generativeModel', { model: vertexModelName, contentsPreview: JSON.stringify(contents).slice(0, 1000) });
        result = await generativeModel.generateContent({ contents });
        logger.info('[Return from Gemini] Raw Response received');
        logger.debug('Full Gemini response', { response: result.response });
      } catch (vertexErr: any) {
        logger.error('Vertex.generateContent failed', {
          model: vertexModelName,
          errorMessage: vertexErr?.message || vertexErr,
          errorStack: vertexErr?.stack,
          requestContents: contents,
        });
        throw vertexErr;
      }

      // NOTE: This entire block below is now unreachable due to streaming implementation above
      // Keeping for reference only
      /*
      const candidates = result?.response?.candidates;
      if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
        logger.error('Vertex returned no candidates', { vertexResponse: result?.response });
        response.status(502).json({ error: 'No candidates returned by Vertex', vertexResponse: result?.response });
        return;
      }

      // Parse candidate content parts into Responses-style output content pieces.
      // This supports text, inline images (base64), remote image URLs, simple
      // file parts (base64), and a best-effort mapping for tool/function-call
      // parts when Vertex includes them in candidate content.
      const estimateTokens = (s: string | undefined) => {
        if (!s) return 0;
        return Math.max(1, Math.round(s.length / 4));
      };

      const promptText = (openAIRequest?.messages || [])
        .filter(m => m.role !== 'system')
        .map(m => (typeof m.content === 'string' ? m.content : JSON.stringify(m.content)))
        .join('\n');

      // Initialize token counts with heuristic, then override with Vertex metadata
      let currentInputTokens = estimateTokens(promptText);
      let currentOutputTokens = 0; // Will be calculated from assistantTextAccum
      let currentTotalTokens = 0; // Will be calculated from currentInputTokens + currentOutputTokens

      const vMeta = result?.response ?? {};
      if (vMeta?.usageMetadata) {
        try {
          const u = vMeta.usageMetadata;
          if (u.promptTokenCount !== undefined) currentInputTokens = Number(u.promptTokenCount);
          if (u.candidatesTokenCount !== undefined) currentOutputTokens = Number(u.candidatesTokenCount);
          if (u.totalTokenCount !== undefined) currentTotalTokens = Number(u.totalTokenCount);
        } catch (e) {
          logger.warn('Failed to parse Vertex usageMetadata', { err: (e as any)?.message || e });
        }
      }

      // We'll build outputs by examining the first candidate's parts (primary)
      const primary = candidates[0];
      const parts: any[] = primary?.content?.parts || [];
      const contentPieces: any[] = [];
      const toolCalls: any[] = [];
      const toolDefinitions: any[] = []; // To populate responsePayload.tools
      let assistantTextAccum = '';

      for (const p of parts) {
        // Text parts
        if (p?.text) {
          const t = String(p.text);
          assistantTextAccum += (assistantTextAccum ? '\n' : '') + t;
          contentPieces.push({ type: 'output_text', text: t, annotations: [] });
          continue;
        }

        // Inline binary data (images/files) returned by Vertex
        if (p?.inlineData) {
          const inline = p.inlineData;
          if (inline?.mimeType && inline?.data) {
            if (String(inline.mimeType).startsWith('image/')) {
              contentPieces.push({ type: 'output_image', image_inline: { mime: inline.mimeType, data: inline.data } });
            } else {
              contentPieces.push({ type: 'output_file', file_inline: { mime: inline.mimeType, data: inline.data } });
            }
            continue;
          }
        }

        // Remote image references (imageUri) — map to image output
        if (p?.imageUri || p?.uri) {
          const url = p.imageUri || p.uri;
          contentPieces.push({ type: 'output_image', image_url: String(url) });
          continue;
        }

        // Generic file-like parts (best-effort): some providers put file metadata
        if (p?.fileName || p?.name || p?.filename) {
          const name = p.fileName || p.name || p.filename;
          const mime = p.mimeType || p.mime || 'application/octet-stream';
          if (p?.inlineData?.data) {
            contentPieces.push({ type: 'output_file', file_inline: { name, mime, data: p.inlineData.data } });
          } else if (p.data) {
            contentPieces.push({ type: 'output_file', file_inline: { name, mime, data: p.data } });
          } else if (p.url) {
            contentPieces.push({ type: 'output_file', file_url: { name, mime, url: p.url } });
          } else {
            contentPieces.push({ type: 'output_file', file_meta: { name, mime } });
          }
          continue;
        }

        // Tool / function call parts: best-effort mapping.
        if (p?.tool || p?.toolCall || p?.function_call || p?.call) {
          const toolPart = p.tool || p.toolCall || p.function_call || p.call;
          const toolId = toolPart?.id || toolPart?.toolId || `tool-${Date.now()}`;
          const toolName = toolPart?.name || toolPart?.toolName || toolPart?.function || null;
          const toolArgs = toolPart?.arguments || toolPart?.args || toolPart?.input || null;
          const toolResult = toolPart?.result || toolPart?.output || null;

          toolCalls.push({ id: toolId, name: toolName, args: toolArgs, result: toolResult, raw: toolPart });
          // Also include a lightweight placeholder in the message content so the assistant message reflects the call
          contentPieces.push({ type: 'output_text', text: `[[tool_code:${toolName || toolId}]]` });
          assistantTextAccum += (assistantTextAccum ? '\n' : '') + `[[tool_code:${toolName || toolId}]]`;

          // Add tool definition to the top-level tools array if not already present
          if (toolName && !toolDefinitions.some(t => t.name === toolName)) {
            toolDefinitions.push({
              name: toolName,
              description: toolPart?.description || `Tool for ${toolName}`,
              inputSchema: toolPart?.inputSchema || { type: 'object', properties: {} },
            });
          }
          continue;
        }

        // Unknown part: stringify for debugging so nothing is silently dropped
        try {
          contentPieces.push({ type: 'output_text', text: JSON.stringify(p) });
        } catch (e) {
          contentPieces.push({ type: 'output_text', text: String(p) });
        }
      }

      // If output_tokens was not overridden by Vertex metadata, calculate it now
      if (currentOutputTokens === 0) {
        currentOutputTokens = estimateTokens(assistantTextAccum);
        currentTotalTokens = currentInputTokens + currentOutputTokens;
      }

      const outputs: any[] = [];
      outputs.push({
        type: 'message',
        id: `msg-${Date.now()}`,
        status: 'completed',
        role: 'assistant',
        content: contentPieces,
      });

      // Append explicit tool_call/function_call outputs after the assistant message
      for (const tc of toolCalls) {
        const toolOut: any = {
          type: 'tool_code',
          id: tc.id,
          status: tc.result ? 'completed' : 'called',
          tool: tc.name || null,
          args: tc.args || null,
        };
        outputs.push(toolOut);
        if (tc.result) {
          outputs.push({ type: 'tool_output', id: tc.id, tool: tc.name || null, output: tc.result });
        }
      }

      const responsePayload: any = {
        id: `resp-${Date.now()}`,
        object: 'response',
        created_at: Math.floor(Date.now() / 1000),
        status: 'completed',
        error: null,
        model: openAIRequest.model,
        output: outputs,
        parallel_tool_calls: true,
        tools: toolDefinitions, // Use the collected tool definitions
        usage: { input_tokens: Number(currentInputTokens), output_tokens: Number(currentOutputTokens), total_tokens: Number(currentTotalTokens) },
      };

      // Build a legacy OpenAI chat.completion-style `choices` array and
      // `usage` object (exact key names Copilot's `isApiUsage` expects)
      // by mirroring the same assistant text and token counts.
      try {
        const legacyChoices = [
          {
            index: 0,
            finish_reason: 'stop',
            message: { role: 'assistant', content: assistantTextAccum },
          },
        ];

        const legacyUsage = {
          prompt_tokens: Number(currentInputTokens || 0),
          completion_tokens: Number(currentOutputTokens || 0),
          total_tokens: Number(currentTotalTokens || 0),
        };

        // Attach legacy fields to the same returned object so both
        // the modern Responses consumer and legacy OpenAI consumers
        // can parse the response.
        responsePayload.choices = legacyChoices;
        responsePayload.usage = legacyUsage;
      } catch (e) {
        // never fail the entire response for mirror construction; log and continue
        logger.warn('Failed to construct legacy choices/usage mirror', { err: (e as any)?.message || e });
      }


      logger.info(`[Translation to Responses API] Outgoing response for model=${openAIRequest.model}`);
      logger.debug('Outgoing Responses-style payload', { responsePayload });

      try {
        const projectLogDir = path.join(process.cwd(), 'logs', 'proxy_responses');
        fs.mkdirSync(projectLogDir, { recursive: true });
        const filename = `response_${vertexModelName.replace(/[^a-z0-9_-]/gi, '')}_${Date.now()}.json`;
        const fp = path.join(projectLogDir, filename);
        fs.writeFileSync(fp, JSON.stringify(responsePayload, null, 2), { encoding: 'utf8' });
        logger.info('Wrote proxied Responses payload to project log file', { path: fp });
      } catch (fileErr: any) {
        logger.warn('Failed to write proxied Responses payload to project logs', { err: fileErr?.message || fileErr });
      }

      // Validate the responsePayload briefly
      const validateResponsesPayload = (obj: any) => {
        if (!obj || typeof obj !== 'object') return 'response-not-object';
        if (!Array.isArray(obj.output)) return 'missing-output-array';
        if (obj.output.length === 0) return 'empty-output-array';
        const first = obj.output[0];
        if (!first.type || first.type !== 'message') return 'first-output-not-message';
        if (!Array.isArray(first.content)) return 'message-content-not-array';
        const contentPiece = first.content[0];
        if (!contentPiece || typeof contentPiece.text !== 'string') return 'content-text-missing-or-not-string';
        if (!obj.usage || typeof obj.usage !== 'object') return 'missing-usage-object';
        if (typeof obj.usage.prompt_tokens !== 'number' || isNaN(obj.usage.prompt_tokens) ||
            typeof obj.usage.completion_tokens !== 'number' || isNaN(obj.usage.completion_tokens) ||
            typeof obj.usage.total_tokens !== 'number' || isNaN(obj.usage.total_tokens)) return 'usage-fields-not-numeric';
        return null;
      };

      const validationError = validateResponsesPayload(responsePayload);
      logger.debug('Validating usage fields', { usage: responsePayload.usage });
      if (validationError) {
        logger.error('Validation failed for outgoing Responses payload', { validationError, responsePayload });
        response.status(502).json({ error: 'Bad Gateway: proxied response failed validation', validationError });
        return;
      }

      // Unreachable - using streaming now
      */
    } catch (error: any) {
      const modelIdentifier = openAIRequest?.model || vertexModelName;
      const fullErrorMessage = `Error in proxy for model ${modelIdentifier}: ${error?.message || 'unknown'} ${error?.stack ? 'Stack: ' + error.stack : ''}`;
      logger.error(`Error in proxy for model ${modelIdentifier}: ${error?.message || 'unknown'}`, { errorMessage: error?.message, requestBody: openAIRequest });
      response.status(500).send(`Internal Server Error: ${fullErrorMessage}`);
    }
  });
}

// Export three distinct proxies so you can register three URLs in Copilot's model URL feature
export const gemini25ProProxy = createProxyForModel("gemini-2.5-pro");
export const gemini25FlashProxy = createProxyForModel("gemini-2.5-flash");
export const gemini25FlashLiteProxy = createProxyForModel("gemini-2.5-flash-lite");

// Temporary diagnostic endpoint to verify secrets injection in emulator
export const secretDiag = onRequest({ cors: true, secrets: [serviceAccountB64] }, async (req, res) => {
  try {
    const hasB64 = !!process.env.SERVICE_ACCOUNT_JSON_B64;
    const gacPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || null;
    let projectIdFromSecret: string | null = null;
    try {
      if (hasB64) {
        const buf = Buffer.from(process.env.SERVICE_ACCOUNT_JSON_B64 as string, 'base64');
        const json = JSON.parse(buf.toString('utf8'));
        projectIdFromSecret = json?.project_id || null;
      }
    } catch (err) {
      // ignore parse errors
    }

    const gacExists = gacPath ? fs.existsSync(gacPath) : false;

    res.json({
      hasB64,
      projectIdFromSecret,
      GOOGLE_APPLICATION_CREDENTIALS: gacPath,
      GOOGLE_APPLICATION_CREDENTIALS_exists: gacExists,
      env: {
        GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT || null,
        GCLOUD_PROJECT: process.env.GCLOUD_PROJECT || null,
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: String(err) });
  }
});
