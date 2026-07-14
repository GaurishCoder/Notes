import { OpenAI } from "openai";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "./system-prompt.js";

dotenv.config();

const client = new OpenAI({
  apiKey:
    "",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const MESSAGES_DB = [{ role: 'system', content: SYSTEM_PROMPT }];

async function init(prompt = '') {
  MESSAGES_DB.push({ role: 'user', content: prompt });

  while (true) {
    const result = await client.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: MESSAGES_DB,
    });

    const rawResult = result.choices[0].message.content;
    const parsedResult = JSON.parse(rawResult);

    MESSAGES_DB.push({ role: 'assistant', content: rawResult });

    if (parsedResult?.step) {
      console.log(`🤖 (${parsedResult?.step}): ${parsedResult?.text}`);
    }

    if (parsedResult?.step.toLowerCase() === 'output') break;
  }
}

// const MESSAGES_DB = [{role:"system",content:SYSTEM_PROMPT}];
// async function init(prompt) {
//   MESSAGES_DB.push[{role:"user",content:prompt}];
//   while (true) {
//      const result = await client.chat.completions.create({
//       model:"openai/gpt-oss-20b",
//       messages:MESSAGES_DB
//      })

//      const rawResult = result.choices[0].message.content;
//      const parsedResult = JSON.parse(result.choices[0].message.content);
//      MESSAGES_DB.push({role:"assistant",content:rawResult});

//      console.log(`🤖 (${parsedResult?.step}): ${parsedResult?.text}`);
//      if (parsedResult.step.toLowerCase() === 'output') break;
//   }
// }

init("what is 3*1+(10-2)?");
