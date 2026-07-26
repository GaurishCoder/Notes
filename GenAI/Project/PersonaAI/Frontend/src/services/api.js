import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Sends a chat message to the backend and returns the assistant's reply.
 * The backend endpoint isn't wired up yet (phase 1 is frontend scaffolding),
 * so this falls back to a local mock reply if the request fails —
 * that keeps the UI usable while the API is being built.
 */
export async function sendMessage(message, history = []) {
  try {
    const { data } = await api.post("/chat", { message, history });
    return data.reply;
  } catch (error) {
    console.warn("Chat API unavailable, using mock reply:", error.message);
    return mockReply(message);
  }
}

function mockReply(message) {
  return `Hanji! Here's a placeholder answer for: "${message}"\n\nConnect the \`/chat\` endpoint in \`src/services/api.js\` to get real responses.`;
}
