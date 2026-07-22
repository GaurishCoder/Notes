import "./config.js"; 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";
import { chatAIResponse } from "./chat.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "1mb" }));

const messageSchema = z.object({
  role: z.enum(["user", "ai"]),
  content: z.string(),
});

const chatRequestSchema = z.object({
  message: z.string().min(1, "message is required"),
  history: z.array(messageSchema).optional().default([]),
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", async (req, res) => {
  const parsed = chatRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const { message, history } = parsed.data;

  try {
    const reply = await chatAIResponse(message, history);
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(502).json({
      error: "Failed to get a response from the model. Please try again.",
    });
  }
});

// Catch-all for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
