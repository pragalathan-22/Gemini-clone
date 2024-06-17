/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDOZ8SXZM8RBhWoAR2VLcxq0-4KjBMsQw0"; // Ensure this API key is valid and secure

async function initializeModel() {
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    return model;
  } catch (error) {
    console.error("Error in initializing the model:", error);
    throw error;
  }
}

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const model = await initializeModel();

    const chatSession = model.startChat({
      generationConfig,
      // Adjust safety settings if necessary
      // safetySettings: [{ category: HarmCategory, threshold: HarmBlockThreshold }],
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());

    return result.response.text();
  } catch (error) {
    console.error("Error in sending message:", error);
    throw error;
  }
}

// Example usage:
run("Your prompt here");

export default run;
