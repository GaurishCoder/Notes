import { OpenAI } from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import path from "path";
import { SYSTEM_PROMPT } from "../lib/system-prompt.js";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const ResponseSchema = z.object({
  model_name: z.string().describe("name of ai model"),
  response: z.string().describe("output of the query"),
});

async function nvidiaAIResponse(prompt='') {
    console.log('request for model 3 is received...');

  const response = await client.responses.create({
    model: "nvidia/nemotron-3-nano-30b-a3b",
    instructions: SYSTEM_PROMPT,
    input: prompt,
    text: {
      format: zodTextFormat(ResponseSchema, "Response"),
    },
  });
  const data = JSON.parse(response.output_text);
  return data;
}

export default nvidiaAIResponse;
