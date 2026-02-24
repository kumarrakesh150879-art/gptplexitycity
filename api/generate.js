import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, audio, duration } = req.body;

    // Optional: OpenAI test call (safe)
    let aiReply = "AI not connected";

    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt || "Hello" }],
      });

      aiReply = response.choices[0].message.content;
    }

    return res.status(200).json({
      success: true,
      data: {
        prompt,
        audioEnabled: audio,
        duration,
        aiResponse: aiReply
      }
    });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
