export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({error:'Method not allowed'});
  }

  const { type, input } = req.body;

  /* =========================
     STRATEGY (stronger output)
  ========================= */
  if(type === 'strategy'){
    const headline = `${input.brand}: own the sharp edge in ${input.industry || 'your category'}`;

    const market = `Category is saturated with generic messaging. Attention is won by specificity, speed of output, and visible proof.`;

    const positioning = `${input.brand} wins by compressing time-to-understand: clear promise, fast demonstration, repeated exposure.`;

    const strategy = [
      'Daily short-form content with a single idea per post across primary channels',
      'Authority layer: weekly POV + data-backed posts to build credibility',
      'Retargeting loop via email and repeated social exposure to convert'
    ];

    const messaging = [
      'Pain: audience is overwhelmed by undifferentiated options',
      'Tension: choosing wrong wastes time and money',
      'Value: faster clarity and visible results',
      'Proof: consistent output and case-style content',
      'CTA: engage now'
    ];

    const channels = `Primary: social short-form. Support: email and retargeting.`;

    return res.json({ headline, market, positioning, strategy, messaging, channels });
  }

  /* =========================
     ASSETS (image generation)
  ========================= */
  if(type === 'assets'){
    try{
      const prompts = [
        `${input.brand} bold social ad, minimal, strong typography, premium, ${input.tone}`,
        `${input.brand} campaign creative, high contrast, modern brand layout, ${input.tone}`,
        `${input.brand} product or service visual, clean composition, advertising style`
      ];

      const images = [];

      for(const p of prompts){
        const r = await fetch('https://api.openai.com/v1/images/generations', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model:'gpt-image-1',
            prompt:p,
            size:'1024x1024'
          })
        });

        const d = await r.json();
        const b64 = d.data[0].b64_json;
        const url = `data:image/png;base64,${b64}`;

        images.push({
          url,
          caption: p
        });
      }

      return res.json({ assets: images });

    } catch(e){
      return res.status(500).json({error:'Asset generation failed'});
    }
  }

  return res.status(400).json({error:'Invalid type'});
}
