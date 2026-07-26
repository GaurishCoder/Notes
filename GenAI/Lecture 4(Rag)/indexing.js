import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function generateVectorEmbeddingsForFile(filepath) {
  // Load the PDF content as document
  const loader = new PDFLoader(filepath);
  const document = await loader.load(); // Already chunks data page by page

  // Initalize the embedding model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENROUTER_API_KEY,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });
}
