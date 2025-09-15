// RETRIEVAL/GENERATION
// query embedding
// similarity search
// LLM generation
// return response
import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";

const client = new OpenAI();

async function retrival() {
  const userQuery = "what do bhavesh Chandrakar do?";
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      collectionName: "chai-class",
      url: process.env.QDRANT_URL || "http://localhost:6333",
    }
  );

  const vectoSearcher = vectorStore.asRetriever({ k: 2 });
  const relevantChunk = await vectoSearcher.invoke(userQuery);

  const SYSTEM_PROMPT = `You are an AI Assistant that helps resolving user query based on the context available to you from a PDF file with the content and page number.

Only ans basedon the available context. If you don't know the answer, just say that you don't know. DO NOT try to make up an answer.
Context:
${JSON.stringify(relevantChunk)}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
  });
  console.log("response", response.choices[0].message.content);
  console.log("Retrival complete");
}
retrival();
