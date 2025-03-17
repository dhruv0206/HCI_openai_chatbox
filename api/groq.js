import { GroqStream } from "@ai-sdk/groq";
import { StreamingTextResponse } from "ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get the message from the request body
    const { messages } = req.body;

    // Access Groq API key from environment variables
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API configuration issue",
        message: "Groq API key not configured",
      });
    }

    // Create the Groq completion stream
    const stream = await GroqStream({
      model: "llama3-8b-8192", // Or "mixtral-8x7b-32768"
      messages,
      apiKey,
    });

    // Return a streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error calling Groq API:", error);

    return res.status(500).json({
      error: "Error processing request",
      details: error.message,
    });
  }
}
