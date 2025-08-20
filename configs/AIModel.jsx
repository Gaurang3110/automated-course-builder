// npm install @google/generative-ai
// export GEMINI_API_KEY="your_api_key"

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize client
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // or "gemini-2.5-pro"
});

// Generation config
const generationConfig = {
  temperature: 0.2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 4000,
};

// Start a chat session with history
export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a 10-chapter course on Machine Learning using Python" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "Sure! Here’s a JSON outline for a 10-chapter course with videos included..." },
      ],
    },
  ],
});

// async function main() {
//   try {
//     // Continue the chat
//     const response = await GenerateCourseLayout_AI.sendMessage(
//       "Now add recommended readings for each chapter."
//     );

//     console.log("=== Chat Response ===\n");
//     console.log(response.response.text());
//   } catch (err) {
//     console.error("Error in chat session:", err);
//   }
// }

// main();
