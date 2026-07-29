import {OpenAI} from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const completion = await client.chat.completions.create({
  model: "openai/gpt-oss-120b:free",
  messages: [
    {
      role:"system",
      content:"When user ask question, answers in shorts "
    },
    {
      role: "user",
      content: "what is ai?",
    },
  ],
});

console.log(completion.choices[0].message.content);