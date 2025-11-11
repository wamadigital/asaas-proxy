export default async function handler(req, res) {
  const ASAAS_BASE = "https://api.asaas.com/v3";
  const TOKEN = process.env.access_token;

  if (!TOKEN) {
    return res.status(500).json({ error: "Token access_token não encontrado no ambiente da Vercel." });
  }

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { path = "/customers" } = req.query;
    const url = `${ASAAS_BASE}${path.startsWith("/") ? path : `/${path}`}`;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
