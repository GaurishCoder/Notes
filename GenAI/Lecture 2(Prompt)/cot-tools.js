import { OpenAI } from "openai";
import dotenv from "dotenv";
import axios from "axios";
import { exec } from "child_process";
import { SYSTEM_PROMPT } from "./system-prompt.js";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function getWeatherData(cityName) {
  const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`;
  const response = await axios.get(url, { responseType: "text" });
  return JSON.stringify({ cityName, weatherInfo: response.data });
}

async function executeCommadOnCli(command) {
  new Promise((res, rej) => {
    exec(command, (err, out) => {
      if (err) {
        return res(`there was the error ${err}`);
      } else return res(out);
    });
  });
}

const MESSAGES_DB = [{ role: "system", content: SYSTEM_PROMPT }];

async function main(prompt = "") {
  MESSAGES_DB.push({ role: "user", content: prompt });

  while (true) {
    // completions apis
    const result = await client.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages: MESSAGES_DB,
    });

    const rawResult = result.choices[0].message.content;
    const parsedResult = JSON.parse(rawResult);

    MESSAGES_DB.push({ role: "assistant", content: rawResult });

    console.log(`🤖 (${parsedResult.step}): ${parsedResult.text}`);

    if (parsedResult.step.toLowerCase() === "output") break;

    if (parsedResult.step.toUpperCase() === "TOOL_REQUEST") {
      const { functionName, input } = parsedResult;

      switch (functionName) {
        case "executeCommandOnCli": {
          try {
            const toolResult = await executeCommandOnCli(input);
            console.log(`🛠️(${functionName}):${input}`, toolResult);
            MESSAGES_DB.push({
              role: "developer",
              content: JSON.stringify({
                step: "TOOL_OUTPUT",
                output: toolResult,
              }),
            });
          } catch (error) {
            MESSAGES_DB.push({
              role: "developer",
              content: JSON.stringify({ status: "error", error }),
            });
          }

          continue;
        }
        case "getWeatherData":
          {
            const toolResult = await getWeatherData(input);
            console.log(`🛠️(${functionName}):${input}`, toolResult);
            MESSAGES_DB.push({
              role: "developer",
              content: JSON.stringify({
                step: "TOOL_OUTPUT",
                output: toolResult,
              }),
            });
            continue;
          }
        break;
      }
    }
  }
}

main(
  "what is weather of pune? make weather.txt file and write the output of the query",
);
