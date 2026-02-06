export default async function handler(req, res) {
  const response = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "stability-ai/sdxl",
        input: {
          prompt: "ultra realistic AI generated fictional woman, 25+, not real"
        }
      })
    }
  );

  const data = await response.json();

  res.status(200).json({
    image: data.output?.[0]
  });
}