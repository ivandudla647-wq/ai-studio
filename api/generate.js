export default async function handler(req, res) {
  const start = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "a9758cb16a7c3e79f4f8c6d16c61c6c9e0e06d6f4b4a9e6c6f8c1d0f5e6a3b8",
        input: {
          prompt: "ultra realistic AI generated fictional woman, 25+, not real"
        }
      })
    }
  );

  let prediction = await start.json();

  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    await new Promise(r => setTimeout(r, 1500));

    const check = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      {
        headers: {
          "Authorization": `Token ${process.env.REPLICATE_API_KEY}`
        }
      }
    );

    prediction = await check.json();
  }

  if (prediction.status === "succeeded") {
    res.status(200).json({ image: prediction.output[0] });
  } else {
    res.status(500).json({ error: "Generation failed" });
  }
}