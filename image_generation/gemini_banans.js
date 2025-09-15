import "dotenv/config"
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  // Converts local file information to a GoogleGenerativeAI.Part object.
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }

  const prompt =
    "What is different between this image and the generated image?";

  const imageParts = [fileToGenerativePart("gemini-native-image.png", "image/png")];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: [{ role: "user", parts: [prompt, ...imageParts] }],
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("gemini-native-image.png", buffer);
      console.log("Image saved as gemini-native-image.png");
    }
  }
}

main();