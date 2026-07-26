import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import path from 'path';
import { SYSTEM_PROMPT } from "../lib/system-prompt.js";

dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const ResponseSchema = z.object({
  model_name: z.string().describe("Model name"),
  response: z.string().describe("Answer to the user's query"),
});

async function geminiAIResponse(prompt='') {
    console.log('request for model 2 is received...');
  const response = await client.chat.completions.create({
    model: "google/gemma-4-26b-a4b-it:free",

    messages: [
      {
        role: "system",
        content:SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    response_format: zodResponseFormat(ResponseSchema, "Response"),
  });

  const data = JSON.parse(response.choices[0].message.content);
  return data;
}

export default geminiAIResponse;