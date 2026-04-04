
module.exports = async function handler(req, res)
  try {
    const { type, input } = req.body;

    const prompt = buildPrompt(type, input);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: prompt
      })
    });

    const data = await response.json();

    const text = data.output?.[0]?.content?.[0]?.text || "";

    res.status(200).json(parseOutput(text));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

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

No clichés. Be sharp and commercial.
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
Write high-performing ad copy.

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
