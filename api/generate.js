export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, prompt, audio, duration } = req.body;

    // Log the received data to your Vercel console
    console.log("Generating content with:", {
      hasImage: !!image,
      prompt,
      audio,
      duration
    });

    // Simulate an AI generation delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a mock success response
    return res.status(200).json({
      success: true,
      message: "Content generated successfully!",
      mockResultUrl: "https://example.com/generated-video.mp4"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
