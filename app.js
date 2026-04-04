/* ── HELPERS ── */
const gi = id => document.getElementById(id);

/* ── INPUT MAPPING ── */
function getInput() {
  return {
    brand: gi("i-brand")?.value || "",
    ind: gi("i-ind")?.value || "",
    obj: gi("i-obj")?.value || "",
    aud: gi("i-aud")?.value || "",
    tone: gi("i-tone")?.value || ""
  };
}

/* ── API CALL ── */
async function generate(type, input) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type,
      input: input || {}
    })
  });

  return await res.json();
}

/* ── STRATEGY ── */
async function handleStrategy() {
  const i = getInput();

  const data = await generate("strategy", i);

  if (data.error) {
    gi("out-strategy").innerHTML = `<p>${data.error}</p>`;
    return;
  }

  gi("out-strategy").innerHTML = `
    <div><b>Positioning:</b> ${data.positioning}</div>
    <div><b>Audience:</b> ${data.audience}</div>
    <div><b>Pillars:</b> ${data.pillars.join(", ")}</div>
    <div><b>Messages:</b> ${data.messages.join(" | ")}</div>
  `;
}

/* ── CALENDAR STATE ── */
let calendarData = {};

/* ── CALENDAR ── */
async function handleCalendar() {
  const i = getInput();

  const data = await generate("calendar", i);

  if (!Array.isArray(data)) return;

  data.forEach(d => {
    calendarData[d.day] = d.text;
  });

  renderCalendar();
}

function renderCalendar() {
  for (let d = 1; d <= 30; d++) {
    const cell = document.querySelector(`[data-day="${d}"]`);
    if (!cell) continue;

    const content = calendarData[d] || "";

    cell.innerHTML = `
      <div class="day-num">${d}</div>
      <textarea class="day-text">${content}</textarea>
    `;

    const textarea = cell.querySelector("textarea");

    textarea.addEventListener("input", e => {
      calendarData[d] = e.target.value;
    });
  }
}

/* ── ASSETS ── */
async function handleAssets() {
  const i = getInput();

  const data = await generate("copy", i);

  const wrap = gi("assets-wrap");
  wrap.innerHTML = "";

  if (data.error) {
    wrap.innerHTML = `<p>${data.error}</p>`;
    return;
  }

  for (let x = 0; x < 3; x++) {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#6B3FA0";
    ctx.fillRect(0, 0, 400, 200);

    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";

    ctx.fillText(data.headline, 200, 90);
    ctx.fillText(data.cta, 200, 140);

    const img = document.createElement("img");
    img.src = canvas.toDataURL();

    wrap.appendChild(img);
  }
}

/* ── EVENT BINDING (CRITICAL FIX) ── */
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button:nth-of-type(1)").addEventListener("click", handleStrategy);
  document.querySelector("button:nth-of-type(2)").addEventListener("click", handleCalendar);
  document.querySelector("button:nth-of-type(3)").addEventListener("click", handleAssets);
});
