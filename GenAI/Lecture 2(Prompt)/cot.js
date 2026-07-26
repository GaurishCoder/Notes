import { OpenAI } from 'openai';
import { SYSTEM_PROMPT } from './system-prompt.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MESSAGES_DB = [{ role: 'system', content: SYSTEM_PROMPT }];


async function main(prompt = '') {
  MESSAGES_DB.push({ role: 'user', content: prompt });

  while (true) {
    const result = await client.chat.completions.create({
      model: 'nvidia/nemotron-3-super-120b-a12b:free',
      messages: MESSAGES_DB,
    });

    const rawResult = result.choices[0].message.content;
    const parsedResult = JSON.parse(rawResult);

    MESSAGES_DB.push({ role: 'assistant', content: rawResult });

    console.log(`🤖 (${parsedResult.step}): ${parsedResult.text}`);

    if (parsedResult.step.toLowerCase() === 'output') break;
  }
}

main('What is 3*3+(4/3)?');