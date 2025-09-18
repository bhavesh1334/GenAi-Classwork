import "dotenv/config";

import { Memory } from "mem0ai/oss";
import { OpenAI } from "openai";

const client = new OpenAI();

const memory = new Memory({
  version: "v1",
  enableGraph: true,
  graphStore: {
    provider: "neo4j",
    config: {
      url: "neo4j://localhost:7687",
      username: "neo4j",
      password: "password",
    },
  },
  vectorStore: {
    provider: "qdrant",
    config: {
      collectionName: "memories",
      embeddingModelDims: 1536,
      host: "localhost",
      port: 6333,
    },
  },
});

async function chat(query = "") {
  const memories_data = await memory.search(query, {
    userId: "bhavesh",
  });

  const memories = memories_data?.results
    ?.map((memory) => memory.memory)
    .join("\n");

  console.log("Memories:", memories);

  const SYSTEM_PROMPT = `
    You are an memory agent , you have certain memory:
    ${memories}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: query },
    ],
  });
  console.log("\n\n\nBOT:", response.choices[0].message.content);
  console.log("Adding memory...");

  await memory.add(
    [
      { role: "user", content: query },
      { role: "assistant", content: response.choices[0].message.content },
    ],
    { userId: "bhavesh" }
  );

  console.log("Added memory...");
}

chat("recommend me something to do as I am feeling bored!");
