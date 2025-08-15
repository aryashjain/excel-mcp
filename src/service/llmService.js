import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

export async function askLLM(dataset, question) {
    const prompt = `
You are a data analyst that answers based on structured JSON datasets.

You are given a dataset in JSON format:
${JSON.stringify(dataset, null, 2)}
Answer the following question using the dataset:
${question}
    `;

    console.log("Prompt sent to LLM:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log("LLM response:", responseText);

    return responseText;
}




