import "../config.js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAI } from "openai";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function acceptUserInput() {
  while (true) {
    const input = await rl.question("🧑 YOU:");
    if (input.toLowerCase() === "bye") {
      rl.close();
      return;
    }
    await userQuery(input);
  }
}

acceptUserInput();

async function userQuery(query) {
  // Convert user query to vector embeddings?
  const embedding = new OpenAIEmbeddings({
    apiKey: process.env.OPENROUTER_API_KEY,
    model: "nvidia/llama-nemotron-embed-vl-1b-v2:free",
    encodingFormat: "float",
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  // search the vectors in the qdrant
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embedding, // Use this embedding model
    {
      url: "http://localhost:6333",
      collectionName: "chaicode-docs",
    },
  );

  const vectorRetriver = vectorStore.asRetriever({ k: 5 });
  const results = await vectorRetriver.invoke(query);

  const SYSTEM_PROMPT = `
    You are an expert in answereing user query based on the provided context about document.
    Do not answere anything beyond what is not provided.

    Always also answer the user in short and tell on which page number that content is available and also name of the book

    User Documents:
    ${results.map((e) => JSON.stringify({ bookName: e.metadata.source, pageContent: e.pageContent, pageNumber: e.metadata.loc.pageNumber })).join("\n\n")}
  `;

  await aiResponse(SYSTEM_PROMPT, query);
}

async function aiResponse(SYSTEM_PROMPT, query) {
  let history = [{ role: "system", content: SYSTEM_PROMPT }];

  history.push({ role: "user", content: query });

  const response = await client.chat.completions.create({
    model: "openrouter/free",
    messages: history,
  });
  const data = response.choices[0].message.content;
  history.push({ role: "assistant", content: JSON.stringify(data) });

  console.log(`🤖 LLM Response:\n\n`, data);
}
