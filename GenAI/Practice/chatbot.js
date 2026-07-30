import "../config.js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `
You are AI Expert in technology and news
You have to answer user query in short 
`;

async function main() {
  let history = [{ role: "system", content: SYSTEM_PROMPT }];

  while (true) {
    const input = await rl.question("🧑YOU:");

    if (input.toLowerCase() === "bye") {
      rl.close();
      return;
    }

    history.push({ role: "user", content: input });

    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: history,
    });

    const data = response.choices[0].message.content;
    history.push({ role: "assistant", content: data });

    console.log('🤖AI:',data);
  }
}

main();