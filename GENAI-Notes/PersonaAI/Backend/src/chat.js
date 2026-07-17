import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./system-prompt.js";

// A missing key shouldn't crash the whole server on boot — fall back to a
// placeholder so the client can construct, and fail with a clear error only
// when a request actually tries to use it.
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "missing-openrouter-api-key",
  baseURL: "https://openrouter.ai/api/v1",
});

const MODEL =  "openrouter/free";

/**
 * Maps our app's message shape ({ role: "user" | "ai", content })
 * to the OpenAI Responses API shape ({ role: "user" | "assistant", content }).
 */
function toResponsesInput(history = []) {
  return history.map((m) => ({
    role: m.role === "ai" ? "assistant" : "user",
    content: m.content,
  }));
}

/**
 * Sends a prompt (plus optional prior turns) to the model and returns the reply text.
 *
 * @param {string} prompt - the latest user message
 * @param {Array<{role: string, content: string}>} history - prior turns in this chat (optional)
 * @returns {Promise<string>}
 */
export async function chatAIResponse(prompt, history = []) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it to your .env file (see .env.example)."
    );
  }

  const input = [...toResponsesInput(history), { role: "user", content: prompt }];
  

  const response = await client.responses.create({
    model: MODEL,
    instructions: SYSTEM_PROMPT,
    input,
  });

  return response.output_text;
}

