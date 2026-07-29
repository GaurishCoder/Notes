import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function init(prompt) {
  const result = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
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
  });

  console.log(result.choices[0].message.content);
}

init("what is bodmas");
