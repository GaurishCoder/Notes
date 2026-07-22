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
        content: `
        ${prompt}

        Example:
            que.what is 2+2?
            ans:2+2=4(Four)
            que.what is bodmas?
            ans:bodmas is mathematics rule to evaluate expression and generate output
        `,
      },
    ],
    stream: true,
  });

  for await (const event of stream) {
    const token = event.choices?.[0]?.delta?.content;
    if (token) {
      process.stdout.write(token);
    }
  }
}

init("what is bodmas");
