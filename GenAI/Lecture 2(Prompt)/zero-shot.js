import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function init(prompt) {
  const stream = await client.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  for await (const event of stream) {
    const data = event.choices[0].delta.content;
    if (data) {
      process.stdout.write(data);
    } 
  }
}
init("what is 10*10?");
