import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

const interaction = await ai.interactions.create({
  model: "gemini-2.5-pro",
  input: "what is 2+2?",
});
console.log(interaction.output_text);