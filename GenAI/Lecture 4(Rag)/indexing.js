import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";
dotenv.config();

async function generateVectorEmbeddingForFile(filepath) {
  // pdf is convert into document
  const loader = new PDFLoader(filepath); // initialize the pdfLoader
  const document = await loader.load(); // Already chunks data page by page

  // Initialize embedding model
  const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENROUTER_API_KEY,
    model: "nvidia/llama-nemotron-embed-vl-1b-v2:free",
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  // Vector Store
  const vectorStore = await QdrantVectorStore.fromDocuments(
    document,
    embeddings,
    //your vector working url
    {
      url: "http://localhost:6333",
      collectionName: "chaicode-docs",
    },
  );
  console.log(`All the documents are indexed....`);
}

generateVectorEmbeddingForFile('./software-testing-que-bank.pdf');