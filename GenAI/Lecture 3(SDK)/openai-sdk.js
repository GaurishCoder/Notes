import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function init() {
  const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    instructions:"",
    input: "Write a one-sentence bedtime story about a unicorn.",
  });

  console.log(response.output_text);
}

init()
