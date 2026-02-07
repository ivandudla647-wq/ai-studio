export default async function handler(req, res) {
  const { id } = req.query;

  const r = await fetch(
    `https://api.replicate.com/v1/predictions/${id}`,
    {
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`
      }
    }
  );

  const data = await r.json();

  if (data.status === "succeeded") {
    res.status(200).json({ image: data.output[0] });
  } else {
    res.status(200).json({ status: data.status });
  }
}