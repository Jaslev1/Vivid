module.exports = async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { type, input } = req.body || {};

    if (!type || !input) {
      return res.status(400).json({ error: "Missing type or input" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    const prompt = buildPrompt(type, input);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: prompt
      })
    });

    const data = await response.json();

    const text =
      data?.output?.[0]?.content?.[0]?.text ||
      data?.output_text ||
      null;

    if (!text) {
      return res.status(500).json({
        error: "No text returned",
        raw: data
      });
    }

    return res.status(200).json(parseOutput(text));

  } catch (err) {
    return res.status(500).json({
      error: "Function crash",
      message: err.message
    });
  }
};

function buildPrompt(type, i) {
  if (type === "strategy") {
    return `
You are a senior brand strategist.

Brand: ${i.brand}
Industry: ${i.ind}
Objective: ${i.obj}
Audience: ${i.aud}
Tone: ${i.tone}

Return JSON:
{
  "positioning": "...",
  "audience": "...",
  "pillars": ["...", "...", "..."],
  "messages": ["...", "...", "..."]
}

No clichés.
`;
  }

  if (type === "calendar") {
    return `
Create a 30-day content calendar.

Brand: ${i.brand}
Objective: ${i.obj}
Channels: ${i.ch.join(", ")}

Return JSON array:
[{ "day":1, "text":"..." }]
`;
  }

  if (type === "copy") {
    return `
Write ad copy.

Brand: ${i.brand}
Objective: ${i.obj}
Tone: ${i.tone}

Return JSON:
{
  "headline":"...",
  "body":"...",
  "cta":"..."
}
`;
  }
}

function parseOutput(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}
