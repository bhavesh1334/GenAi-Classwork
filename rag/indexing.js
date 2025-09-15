// RAG - Retrieval Augmented Generation
// INDEXING
// load document
// extract texts
// chunking
// embedding
// vector store

// RETRIEVAL/GENERATION
// query embedding
// similarity search
// LLM generation
// return response
import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

async function init() {
  const docPath = "./bhavesh_resume.pdf";
  const loader = new PDFLoader(docPath);

  const docs = await loader.load();
  console.log("docs", docs[0].pageContent);
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    collectionName: "chai-class",
    url: process.env.QDRANT_URL || "http://localhost:6333",
  });

  console.log("Indexing complete");
}
init();
