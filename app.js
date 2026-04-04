
/* ── Vivid Inc. MarqueAI — refactored app.js ── */

/* ── CORE STATE ── */
const CE = {};
const gi = id => document.getElementById(id);

/* ── INPUT MODEL ── */
function getI() {
  return {
    brand: gi("i-brand")?.value || "Your Brand",
    ind: gi("i-ind")?.value || "consumer brand",
    obj: gi("i-obj")?.value || "Drive awareness",
    aud: gi("i-aud")?.value || "",
    tone: gi("i-tone")?.value || "premium, sharp",
    ch: Array.from(document.querySelectorAll(".cpill.on")).map(e => e.textContent)
  };
}

/* ── API CALL ── */
async function generate(type, input) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ type, input })
  });

  return await res.json();
}

/* ── STRATEGY ── */
async function renderStrategy() {
  const i = getI();
  const s = await generate("strategy", i);

  gi("out-strategy").innerHTML = `
    <h3>Positioning</h3><p>${s.positioning || ""}</p>
    <h3>Audience</h3><p>${s.audience || ""}</p>
    <h3>Pillars</h3><ul>${(s.pillars||[]).map(p=>`<li>${p}</li>`).join("")}</ul>
    <h3>Messages</h3><ul>${(s.messages||[]).map(m=>`<li>${m}</li>`).join("")}</ul>
  `;
}

/* ── CALENDAR ── */
async function generateCalendar() {
  const i = getI();
  const data = await generate("calendar", i);

  (data || []).forEach(d => {
    CE[d.day] = { text: d.text };
  });

  buildCalendar();
}

function buildCalendar() {
  const wrap = gi("calendar");
  wrap.innerHTML = "";

  for (let d = 1; d <= 30; d++) {
    const cell = document.createElement("div");
    cell.className = "cal-cell";

    cell.innerHTML = `
      <div>${d}</div>
      <div>${CE[d]?.text || ""}</div>
    `;

    cell.onclick = () => editDay(d);
    wrap.appendChild(cell);
  }
}

function editDay(day) {
  const val = prompt("Edit:", CE[day]?.text || "");
  if (val !== null) {
    CE[day] = { text: val };
    buildCalendar();
  }
}

/* ── ASSETS ── */
function renderAsset(w, h, bg, color, text) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = color;
  ctx.font = `${Math.floor(w / 10)}px Inter`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, w / 2, h / 2);

  return canvas.toDataURL();
}

async function buildAssets() {
  const i = getI();
  const copy = await generate("copy", i);

  const wrap = gi("assets-wrap");
  wrap.innerHTML = "";

  const configs = [
    [1080,1080],
    [1200,627],
    [600,300]
  ];

  configs.forEach(([w,h])=>{
    const img = document.createElement("img");
    img.src = renderAsset(w,h,"#6B3FA0","#fff", copy.headline || i.brand);

    wrap.appendChild(img);
  });
}

/* ── INIT ── */
window.onload = () => {
  buildCalendar();
};
