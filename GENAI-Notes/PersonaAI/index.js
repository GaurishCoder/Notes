import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
});

const response = await client.responses.create({
  model: "openrouter/free",
  input: "Generate a software engineer profile.",
  text: {
    format: zodTextFormat(UserSchema, "user"),
  },
});

console.log(response.output_text);
