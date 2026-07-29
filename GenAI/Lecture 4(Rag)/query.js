import "../config.js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

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

  const response = await client.chat.completions.create({
    model: "openrouter/free",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
  });

  console.log("LLM Response:\n\n", response.choices[0].message.content);
}
userQuery("which question is most frequenctly ask?");

