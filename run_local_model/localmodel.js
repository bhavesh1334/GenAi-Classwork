import { OpenAI } from "openai";

const client = new OpenAI({
    apiKey:"1",
    baseURL: "http://localhost:12434/engines/llama.cpp/v1",
});

async function main() {
    const response = await client.chat.completions.create({
        model: "ai/gemma3-qat:270M-F16",
        messages: [
            {
                role: "user",
                content: "who are You?",
            },
        ],
    });
    console.log(response.choices[0].message.content);
}

main();