/* ── STATE ── */
const CE = {};
const gi = id => document.getElementById(id);

/* ── INPUT ── */
function getI() {
  return {
    brand: gi("i-brand")?.value || "Your Brand",
    ind: gi("i-ind")?.value || "General",
    obj: gi("i-obj")?.value || "Grow awareness",
    aud: gi("i-aud")?.value || "Broad audience",
    tone: gi("i-tone")?.value || "Sharp"
  };
}

/* ── MOCK GENERATOR (NO API REQUIRED) ── */
async function generate(type, input) {
  console.log("GENERATE:", type, input);

  if (type === "strategy") {
    return {
      positioning: `${input.brand} is positioned to ${input.obj.toLowerCase()}.`,
      audience: input.aud,
      pillars: ["Authority", "Proof", "Conversion"],
      messages: [
        `${input.brand} solves a real problem`,
        "Clear differentiation",
        "Immediate value"
      ]
    };
  }

  if (type === "calendar") {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      text: `${input.brand} content ${i + 1}`
    }));
  }

  if (type === "copy") {
    return {
      headline: `${input.brand}: ${input.obj}`,
      body: "Strong supporting message",
      cta: "Learn more"
    };
  }
}

/* ── STRATEGY ── */
async function renderStrategy() {
  console.log("CLICK: Strategy");

  const i = getI();
  const s = await generate("strategy", i);

  gi("out-strategy").innerHTML = `
    <p><b>Positioning:</b> ${s.positioning}</p>
    <p><b>Audience:</b> ${s.audience}</p>
    <p><b>Pillars:</b> ${s.pillars.join(", ")}</p>
    <p><b>Messages:</b> ${s.messages.join(" | ")}</p>
  `;
}

/* ── CALENDAR ── */
async function generateCalendar() {
  console.log("CLICK: Calendar");

  const i = getI();
  const data = await generate("calendar", i);

  data.forEach(d => {
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
      <div><b>${d}</b></div>
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
function renderAsset(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#6B3FA0";
  ctx.fillRect(0, 0, 400, 200);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";

  ctx.fillText(text, 200, 100);

  return canvas.toDataURL();
}

async function buildAssets() {
  console.log("CLICK: Assets");

  const i = getI();
  const copy = await generate("copy", i);

  const wrap = gi("assets-wrap");
  wrap.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    const img = document.createElement("img");
    img.src = renderAsset(copy.headline);
    wrap.appendChild(img);
  }
}

/* ── INIT ── */
window.onload = () => {
  buildCalendar();
};

/* ── EXPOSE FUNCTIONS (CRITICAL) ── */
window.renderStrategy = renderStrategy;
window.generateCalendar = generateCalendar;
window.buildAssets = buildAssets;
