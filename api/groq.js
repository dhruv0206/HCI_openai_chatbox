// Import the groq function for model selection and streamText for handling AI responses
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

/**
 * Handles POST requests to the API.
 *
 * This function processes incoming messages, streams a response from the AI model,
 * and returns the response as a data stream.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} - The streamed response from the AI model.
 */
export async function POST(req) {
  // Parse the JSON body to extract the messages
  const { messages } = await req.json();

  // Stream a response from the AI model using the specified groq model
  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
  });

  // Return the streamed response
  return result.toDataStreamResponse();
}
