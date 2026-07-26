import OpenAI from "openai";
import configEnv from "./dotenv.js";
configEnv();

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});


function main(prompt=''){
  client.chat.completions
  .create({
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: "Output should be not longer it should be short and cripy!",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  })
  .then((response) => console.log(response.choices[0].message))
  .catch((err) => console.log(err));
}

main('what is 2+2');