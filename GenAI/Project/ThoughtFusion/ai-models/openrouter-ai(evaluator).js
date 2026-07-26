import { OpenAI } from "openai";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { SYSTEM_PROMPT } from "../lib/system-prompt.js";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const ResponseSchema = z.object({
  models: z.array(
    z.object({
      model_name: z.string(),
      score: z.number().describe('score out of 5'),
      reason: z.string(),
    }),
  ),

  best_model: z.string(),

  response: z.string(),
});

async function openrouterAIResponse(query) {
  try {
    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",

      instructions: SYSTEM_PROMPT,

      input: JSON.stringify(query, null, 2),

      text: {
        format: zodTextFormat(ResponseSchema, "Response"),
      },
    });

    return JSON.parse(response.output_text);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default openrouterAIResponse;
