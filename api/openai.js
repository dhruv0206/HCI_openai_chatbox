import { Configuration, OpenAIApi } from "openai";

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

    const openai = new OpenAIApi(new Configuration({ apiKey }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const response = completion.choices[0].message.content;

    return res.status(200).json({ response });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return res.status(500).json({ error: "Error processing request" });
  }
}
