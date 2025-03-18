// api/groq.js - Corrected implementation using Groq SDK
import { groq } from "@ai-sdk/groq";
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

    // Format messages correctly
    const formattedMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Create a stream using the correct Groq SDK syntax
    const stream = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: formattedMessages,
      stream: true,
      api_key: apiKey,
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
