import "dotenv/config";
import { OpenAI } from "openai/index.js";

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function main(textInput) {
  const response = await client.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      {
        role: "user",
        content: textInput,
      },
    ],
  });

  console.log(response.choices[0].message.content);
}


main("Hey how is AI making the world better?")