export default async function handler(req, res){

  if(req.method !== 'POST'){
    return res.status(405).json({error:'Method not allowed'});
  }

  const { type, input } = req.body;

  /* =========================
     STRATEGY
  ========================= */

  if(type === 'strategy'){

    const text = `
<b>${input.brand}</b><br><br>

<b>Positioning</b><br>
${input.brand} wins by focusing on a clear, ownable edge in ${input.industry}.<br><br>

<b>Strategy</b><br>
1. Capture attention with high-frequency short-form content<br>
2. Convert via authority-driven messaging and proof<br>
3. Retarget through email and repeat exposure<br><br>

<b>Messaging</b><br>
- Problem: current market lacks clarity<br>
- Value: simplified, premium solution<br>
- Proof: consistent visible output<br>
- CTA: immediate engagement<br>
`;

    return res.json({ text });
  }

  /* =========================
     ASSETS (REAL IMAGES)
  ========================= */

  if(type === 'assets'){

    const assets = [
      {
        url:`https://picsum.photos/seed/${input.brand}1/600/400`,
        caption:`${input.brand} social creative`
      },
      {
        url:`https://picsum.photos/seed/${input.brand}2/600/400`,
        caption:`Campaign visual`
      },
      {
        url:`https://picsum.photos/seed/${input.brand}3/600/400`,
        caption:`Ad variation`
      }
    ];

    return res.json({ assets });
  }

  return res.status(400).json({error:'Invalid type'});
}
