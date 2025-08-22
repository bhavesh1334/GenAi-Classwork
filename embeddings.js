import OpenAI from "openai/index.js";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const response = await client.embeddings.create({
  model: "gemini-embedding-001",
  input: "Hello world",
});

console.log(response.data[0].embedding.length);