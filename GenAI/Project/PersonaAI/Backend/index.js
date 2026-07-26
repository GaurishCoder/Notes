import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { SYSTEM_PROMPT } from "./src/system-prompt.js";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function chatAIResponse(prompt) {
  const response = await client.responses.create({
    model: "openrouter/free",
    instructions: SYSTEM_PROMPT,
    input: prompt,
  });

  return response.output_text;
}

const greetings = [
  "Hanji Batao... kaam ki baat karni hai ya time paas?",
  "Hanji Batao... order dijiye, kya khidmat ki jaye?",
  "Hanji Batao... news update dedun ya chup chap baithun?",
  "Hanji Batao... dimag chalana hai ya bas gappe maarni hain?",
  "Hanji Batao... aaj kya mission lekar aaye ho?",
  "Hanji Batao... bataiye, duniya badalni hai ya bug fix karna hai?",
  "Hanji Batao... coding karni hai ya coding se bhaagna hai?",
  "Hanji Batao... chai ke saath sawaal bhi laaye ho kya?",
  "Hanji Batao... keyboard garam karein ya sirf baatein?",
  "Hanji Batao... aaj kis cheez ka solution chahiye?",
  "Hanji Batao... AI ko test karoge ya dost banaoge?",
  "Hanji Batao... sawaal pucho, overthinking ka bill free hai.",
  "Hanji Batao... bataiye, Google ko aaj chhutti deni hai kya?",
  "Hanji Batao... code likhein, joke sunayein, ya dono?",
  "Hanji Batao... kya scene hai boss?",
  "Hanji Batao... problem lao, solution le jao.",
  "Hanji Batao... aaj kis topic ki vaat lagani hai?",
  "Hanji Batao... assignment bachana hai ya interview jeetna hai?",
  "Hanji Batao... coding ka dard hai ya life ka?",
  "Hanji Batao... bataiye, aaj kis cheez ka jugaad karein?",
  "Hanji Batao... CPU ready hai, bas command ka intezaar hai.",
  "Hanji Batao... sawaal itna mushkil mat puchna ki server hi sharma jaye.",
  "Hanji Batao... aaj AI ki class loge ya AI se class loge?",
  "Hanji Batao... kya haal hai? Seedha mudde pe aao.",
  "Hanji Batao... bataiye ustad, aaj kya naya seekhna hai?",
  "Hanji Batao... code compile karein ya confidence?",
  "Hanji Batao... aaj kis bug ki shaamat aayi hai?",
  "Hanji Batao... dimag full charge hai, pucho jo puchna hai.",
  "Hanji Batao... command dijiye, keyboard taiyaar khada hai.",
  "Hanji Batao... bas ek sawaal pucho, baaki meri zimmedari.",
];

function greeting() {
  const greet = greetings[Math.floor(Math.random() * greetings.length) + 1];
  console.log(greet);
}

async function main() {
  greeting();


  while (true) {
    const input = await rl.question("YOU: ");

    if (input.toLowerCase() === "bye") {
      rl.close();
      return;
    }

    const response = await chatAIResponse(input);
    console.log(`AI: ${response}`);
  }
}

main();