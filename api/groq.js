import { GroqStream } from "@ai-sdk/groq";
import { StreamingTextResponse } from "ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get the messages from the request body
    const { messages } = req.body;

    // Access Groq API key from environment variables
    const apiKey = process.env.GROQ_API_KEY;

    // If no API key is found, return a helpful error message
    if (!apiKey) {
      console.error("Missing GROQ_API_KEY environment variable");
      return res.status(500).json({
        error: "API configuration issue",
        message:
          "Groq API key not configured. Please add GROQ_API_KEY to your environment variables.",
      });
    }

    // Log for debugging (remove in production)
    console.log("Using messages format:", JSON.stringify(messages));

    // Create the Groq completion stream
    const stream = await GroqStream({
      model: "llama3-8b-8192",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
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
