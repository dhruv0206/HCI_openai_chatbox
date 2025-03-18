import OpenAI from "openai";

/**
 * API handler for processing chat messages using OpenAI's GPT model.
 *
 * This endpoint only supports POST requests. It sends the user's message to the OpenAI API
 * and returns the AI-generated response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - The response containing the AI-generated message or an error.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get the message from the request body
    const { message } = req.body;

    // Access OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    // Initialize the OpenAI client
    const openai = new OpenAI({ apiKey });

    // Use gpt-3.5-turbo which is more widely available
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from "gpt-4" to a more accessible model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const response = completion.choices[0].message.content;

    return res.status(200).json({ response });
  } catch (error) {
    // Handle errors and return a 500 status code
    console.error("Error calling OpenAI API:", error);
    return res.status(500).json({
      error: "Error processing request",
      details: error.message,
    });
  }
}
