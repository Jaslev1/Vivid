/* ── VIVID INC. MarqueAI — app.js ── */

const ASSETS = [
  {n:'Feed post — square',   d:'1080×1080', t:'social',  bg:'#F4A26B', tc:'#120D1C', sub:'IG Feed'},
  {n:'Story / Reel cover',   d:'1080×1920', t:'social',  bg:'#722172', tc:'#fff',    sub:'IG Story'},
  {n:'LinkedIn banner',      d:'1128×191',  t:'social',  bg:'#3D5A99', tc:'#fff',    sub:'LI Banner'},
  {n:'LinkedIn post card',   d:'1200×627',  t:'social',  bg:'#3D3D8F', tc:'#fff',    sub:'LI Card'},
  {n:'X / Twitter card',     d:'1200×675',  t:'social',  bg:'#1F1632', tc:'#F4A26B', sub:'X Card'},
  {n:'Facebook cover',       d:'820×312',   t:'social',  bg:'#9B6B8A', tc:'#fff',    sub:'FB Cover'},
  {n:'Pinterest pin',        d:'1000×1500', t:'social',  bg:'#F4A26B', tc:'#120D1C', sub:'Pin'},
  {n:'Email header',         d:'600×200',   t:'email',   bg:'#1A1228', tc:'#F4A26B', sub:'Email Header'},
  {n:'Email footer',         d:'600×100',   t:'email',   bg:'#EAE4F5', tc:'#1A0F2E', sub:'Email Footer'},
  {n:'Email hero banner',    d:'600×300',   t:'email',   bg:'#722172', tc:'#fff',    sub:'Hero'},
  {n:'Leaderboard ad',       d:'728×90',    t:'display', bg:'#F4A26B', tc:'#120D1C', sub:'Leaderboard'},
  {n:'Medium rectangle',     d:'300×250',   t:'display', bg:'#3D5A99', tc:'#fff',    sub:'MPU'},
  {n:'Half page ad',         d:'300×600',   t:'display', bg:'#722172', tc:'#fff',    sub:'Half Page'},
  {n:'Skyscraper',           d:'160×600',   t:'display', bg:'#1A1228', tc:'#F4A26B', sub:'Sky'},
];

const CAL_EVENTS = {
  1:[{t:'ig',tx:'Brand story reel'}],    2:[{t:'li',tx:'Thought leadership'}],
  3:[{t:'em',tx:'Welcome sequence'}],    5:[{t:'bl',tx:'Blog: industry insight'}],
  7:[{t:'ig',tx:'Behind the scenes'}],   8:[{t:'li',tx:'Founder perspective'}],
  9:[{t:'ig',tx:'Product spotlight'}],   10:[{t:'em',tx:'Nurture email 1'}],
  12:[{t:'ig',tx:'Educational carousel'}],13:[{t:'bl',tx:'Blog: how-to guide'}],
  14:[{t:'li',tx:'Case study post'}],    15:[{t:'em',tx:'Mid-month offer'}],
  17:[{t:'ig',tx:'Customer testimonial'}],19:[{t:'ig',tx:'UGC feature'}],
  20:[{t:'li',tx:'Industry data post'}], 21:[{t:'em',tx:'Retargeting email'}],
  22:[{t:'bl',tx:'Blog: roundup'}],      23:[{t:'ig',tx:'Q+A story series'}],
  26:[{t:'ig',tx:'Week recap reel'}],    28:[{t:'em',tx:'Monthly newsletter'}],
  29:[{t:'ig',tx:'Month wrap-up'}],      30:[{t:'li',tx:'Results + reflection'}],
};

const T_MAP   = {ig:'Instagram',li:'LinkedIn',em:'Email',bl:'Blog'};
const CLS_MAP = {ig:'ev-ig',li:'ev-li',em:'ev-em',bl:'ev-bl'};
const ALLOC_COLORS = ['#3D5A99','#722172','#F4A26B','#9B6B8A','#3D3D8F'];

let aTypeFilter = 'all';
let lastBrand   = 'Your Brand';
let uploadedFiles = {};

/* ── NAV ── */
function nav(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  document.querySelectorAll('.alink').forEach(a => a.classList.remove('on'));
  document.getElementById('p-' + id).classList.add('on');
  const m = {setup:0,strat:1,cal:2,assets:3};
  if (m[id] !== undefined) {
    document.querySelectorAll('.tab')[m[id]].classList.add('on');
    document.querySelectorAll('.alink')[m[id]].classList.add('on');
  }
}

/* ── INPUTS ── */
function getInputs() {
  const prompt = document.getElementById('i-prompt').value.trim();
  return {
    brand:  document.getElementById('i-brand').value  || 'Your Brand',
    ind:    document.getElementById('i-ind').value    || 'consumer brand',
    desc:   document.getElementById('i-desc').value   || '',
    obj:    document.getElementById('i-obj').value    || 'Build brand awareness',
    aud:    document.getElementById('i-aud').value    || 'general consumers',
    bud:    document.getElementById('i-budv').textContent,
    tone:   document.getElementById('i-tone').value   || 'professional and approachable',
    ch:     Array.from(document.querySelectorAll('.cpill.on')).map(e => e.textContent),
    bb:     document.getElementById('i-bb').value     || '',
    prompt: prompt,
  };
}

/* ── FILE UPLOADS ── */
function initDropZone(zoneId, inputId, listId, key) {
  const zone  = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  if (!zone || !input) return;

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files, listId, key);
  });
  input.addEventListener('change', () => handleFiles(input.files, listId, key));
}

function handleFiles(files, listId, key) {
  if (!files.length) return;
  uploadedFiles[key] = uploadedFiles[key] || [];
  Array.from(files).forEach(f => uploadedFiles[key].push(f.name));
  const list = document.getElementById(listId);
  if (list) {
    list.innerHTML = uploadedFiles[key].map(n => `<span class="drop-tag">${n}</span>`).join('');
  }
}

function initSidebarUpload(btnId, inputId, key, labelEl) {
  const btn   = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  input.addEventListener('change', () => {
    if (input.files.length) {
      const name = input.files[0].name;
      uploadedFiles[key] = name;
      btn.classList.add('uploaded');
      const span = btn.querySelector('.upload-slot-name');
      if (span) span.textContent = name.length > 22 ? name.slice(0,19)+'...' : name;
    }
  });
}

/* ── GENERATE ── */
async function generate() {
  const inp = getInputs();
  if (!inp.brand || inp.brand === 'Your Brand') { alert('Please enter a brand name.'); return; }
  lastBrand = inp.brand;
  document.getElementById('bar-brand').innerHTML = `<strong>${inp.brand}</strong>`;
  document.getElementById('gen-btn').disabled = true;
  nav('strat');
  await buildStrategy(inp);
  buildCal();
  buildAssets();
}

/* ── STRATEGY ── */
async function buildStrategy(inp) {
  const si = document.getElementById('strat-inner');
  si.innerHTML = `<div class="loading"><div class="spin"></div><div class="load-txt">Building your strategy...</div><div class="load-step" id="load-step">Analysing brand inputs</div></div>`;
  const steps = ['Analysing brand inputs','Setting campaign objectives','Mapping channel mix','Allocating budget','Drafting campaign phases','Writing key messages'];
  let s = 0;
  const iv = setInterval(() => { s++; const el = document.getElementById('load-step'); if (el && s < steps.length) el.textContent = steps[s]; }, 900);

  const extra = inp.prompt ? `\n\nAdditional direction from the client: ${inp.prompt}` : '';
  const prompt = `You are an expert marketing strategist. Generate a full communications strategy.
Brand: ${inp.brand}
Industry: ${inp.ind}
Description: ${inp.desc}
Objective: ${inp.obj}
Target audience: ${inp.aud}
Monthly budget: ${inp.bud}
Brand voice: ${inp.tone}
Active channels: ${inp.ch.join(', ')}
Brand guidelines notes: ${inp.bb}${extra}

Return ONLY valid JSON with no markdown fences or extra text:
{"headline":"one strategic positioning statement max 12 words","summary":"2-3 sentence strategy overview","phases":[{"week":"Weeks 1-2","name":"phase name","desc":"what happens and why"},{"week":"Weeks 3-5","name":"phase name","desc":"what happens and why"},{"week":"Weeks 6-8","name":"phase name","desc":"what happens and why"}],"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer","pct":15},{"lbl":"Contingency","pct":10}],"kpis":[{"lbl":"Monthly reach","val":"50K"},{"lbl":"Engagement rate","val":"4.5%"},{"lbl":"Email open rate","val":"28%"}],"messages":["message 1","message 2","message 3"]}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1200, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await r.json();
    clearInterval(iv);
    if (data.error) throw new Error(data.error.message);
    const txt  = data.content.map(c => c.text || '').join('');
    const json = txt.replace(/```json|```/g, '').trim();
    renderStrategy(JSON.parse(json), inp);
  } catch(e) {
    clearInterval(iv);
    console.error('Strategy error:', e);
    renderStrategy(demoStrat(inp.brand), inp);
  }
}

function demoStrat(brand) {
  return {
    headline: `${brand || 'Your brand'} — built to be noticed, built to convert`,
    summary: 'An 8-week campaign that builds authority through education, earns trust through proof, and converts through precision targeting across LinkedIn, email and Instagram.',
    phases: [
      {week:'Weeks 1-2', name:'Authority foundation',     desc:'Launch hero content and founder-voice posts. Establish consistent presence on all active channels. Build organic reach through high-value educational posts.'},
      {week:'Weeks 3-5', name:'Proof and amplification',  desc:'Activate paid social on top-performing organic content. Introduce customer testimonials and UGC. Launch email nurture sequence to warm leads.'},
      {week:'Weeks 6-8', name:'Conversion and retention', desc:'Retarget warm audiences with a conversion offer. Deploy abandoned-browse sequences. Convert engaged followers into first-time customers and measure retention metrics.'},
    ],
    alloc:    [{lbl:'Paid social',pct:35},{lbl:'Content creation',pct:25},{lbl:'Email / CRM',pct:15},{lbl:'Influencer',pct:15},{lbl:'Contingency',pct:10}],
    kpis:     [{lbl:'Monthly reach',val:'55K'},{lbl:'Engagement rate',val:'4.8%'},{lbl:'Email open rate',val:'31%'}],
    messages: ['Every channel earns its place or it does not run','Proof over promises — every claim backed','Built for people who expect more than the ordinary'],
  };
}

function renderStrategy(s, inp) {
  const ALLOC_COLORS = ['#3D5A99','#722172','#F4A26B','#9B6B8A','#3D3D8F'];
  document.getElementById('strat-inner').innerHTML = `
    <div class="strat-block">
      <div class="accent-bar" style="margin:-30px -34px 28px"></div>
      <div class="ph">
        <div class="ph-eye">Communications strategy — ${inp.bud}/month</div>
        <div class="strat-headline">${s.headline}</div>
        <div class="strat-summary">${s.summary}</div>
      </div>
      <div class="kpi-row">${s.kpis.map(k=>`<div class="kpi"><div class="kpi-accent"></div><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div></div>`).join('')}</div>
      <div class="sect-hd"><div class="sect-title">Campaign phases</div><div class="sect-rule"></div><div class="sect-tag">8 weeks</div></div>
      <div class="phases">${s.phases.map((p,i)=>`<div class="phase"><div class="phase-week">${p.week}</div><div class="phase-line"><div class="phase-node"></div>${i<2?'<div class="phase-track"></div>':''}</div><div class="phase-body"><div class="phase-name">${p.name}</div><div class="phase-desc">${p.desc}</div></div></div>`).join('')}</div>
      <div class="sect-hd"><div class="sect-title">Budget allocation</div><div class="sect-rule"></div></div>
      <div class="alloc"><div class="alloc-title">Monthly spend — ${inp.bud}</div>${s.alloc.map((a,i)=>`<div class="alloc-item"><div class="alloc-lbl">${a.lbl}</div><div class="alloc-track"><div class="alloc-fill" style="width:${a.pct}%;background:${ALLOC_COLORS[i%5]}"></div></div><div class="alloc-pct">${a.pct}%</div></div>`).join('')}</div>
      <div class="sect-hd"><div class="sect-title">Key messages</div><div class="sect-rule"></div></div>
      <div class="msgs">${s.messages.map(m=>`<div class="msg"><div class="msg-text">${m}</div></div>`).join('')}</div>
      <div class="action-row">
        <button class="btn-g" onclick="nav('cal')">View content calendar</button>
        <button class="btn-g" onclick="nav('assets')">View asset inventory</button>
      </div>
    </div>`;
}

/* ── CALENDAR ── */
function buildCal() {
  const on = Array.from(document.querySelectorAll('#p-cal .fchip.on')).map(c => c.textContent.toLowerCase().trim());
  const g  = document.getElementById('cal-grid');
  const dh = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let h = dh.map(d => `<div class="cal-dh">${d}</div>`).join('');
  for (let w = 0; w < 5; w++) {
    h += `<div class="cal-wlbl">W${w+1}</div>`;
    for (let d = 0; d < 7; d++) {
      const dt  = w*7 + d + 1;
      if (dt > 30) { h += `<div class="cal-cell" style="background:var(--light2)"></div>`; continue; }
      const evs = (CAL_EVENTS[dt]||[]).filter(e => on.includes(T_MAP[e.t].toLowerCase()));
      h += `<div class="cal-cell"><div class="cal-dn">${dt}</div>${evs.map(e=>`<div class="cal-ev ${CLS_MAP[e.t]}" onclick="openPost('${e.tx}','${e.t}')">${e.tx}</div>`).join('')}</div>`;
    }
  }
  g.innerHTML = h;
}

function openPost(title, type) {
  document.getElementById('post-area').innerHTML = `
    <div class="post-card">
      <div class="post-card-hd">
        <div class="post-card-title">${title}</div>
        <button class="btn-g" onclick="genPost('${title}','${type}')">Generate copy</button>
      </div>
      <div class="post-body-txt" id="pbt" style="color:var(--on-light-hint);font-style:italic">Click generate copy to draft this post.</div>
      <div class="post-foot">
        <button class="btn-g" onclick="navigator.clipboard.writeText(document.getElementById('pbt').textContent)">Copy</button>
        <button class="btn-g" onclick="document.getElementById('post-area').innerHTML=''">Close</button>
      </div>
    </div>`;
}

async function genPost(title, type) {
  const inp = getInputs();
  const pbt = document.getElementById('pbt');
  if (pbt) { pbt.style.fontStyle='normal'; pbt.textContent = 'Writing...'; }
  const tl = {ig:'Instagram',li:'LinkedIn',em:'Email newsletter',bl:'Blog post'}[type]||'social post';
  const p  = `Write a ${tl} post for ${inp.brand||lastBrand} (${inp.ind}). Concept: "${title}". Voice: ${inp.tone||'professional and engaging'}. Audience: ${inp.aud||'general'}. On-brand, concise. Instagram: include hashtags. Email: include subject line. Return ONLY the post copy, no preamble.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:500,messages:[{role:'user',content:p}]})
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message);
    if (pbt) pbt.textContent = d.content.map(c=>c.text||'').join('');
  } catch(e) {
    if (pbt) pbt.textContent = 'Could not generate — please try again.';
  }
}

/* ── ASSETS ── */
function buildAssets() {
  const g = document.getElementById('agrid');
  g.innerHTML = ASSETS
    .filter(a => aTypeFilter === 'all' || a.t === aTypeFilter)
    .map(a => `
      <div class="acard" data-type="${a.t}" data-name="${a.n.toLowerCase()}">
        <div class="athumb" style="background:${a.bg}">
          <div class="athumb-brand" style="color:${a.tc}">${lastBrand}</div>
          <div class="athumb-sub"   style="color:${a.tc}">${a.sub}</div>
        </div>
        <div class="ainfo">
          <div class="aname">${a.n}</div>
          <div class="adim">${a.d} px</div>
          <div class="abtn-row">
            <button class="abtn" onclick="showSpec('resize','${a.n}','${a.d}')">Resize</button>
            <button class="abtn" onclick="showSpec('spec','${a.n}','${a.d}')">Spec</button>
          </div>
        </div>
      </div>`).join('');
}

function showSpec(mode, name, dim) {
  if (mode === 'resize') {
    alert(`Resize variants for ${name} (${dim}px)\n\nCommon variants:\n• Instagram feed: 1080×1080, 1080×1350\n• Stories/Reels: 1080×1920\n• LinkedIn: 1200×627\n• Twitter/X: 1200×675\n• Facebook: 1200×630\n\nExport at 2× for retina. Keep text within 80% safe zone.`);
  } else {
    alert(`Production spec — ${name}\n\nFormat: PNG (digital) / PDF (print)\nColour mode: sRGB (screen) / CMYK (print)\nResolution: 72 dpi screen / 300 dpi print\nSafe zone: 5% inset on all sides\nMax file size: 2MB for social uploads\nFont embed: always flatten text to curves for print`);
  }
}

function filterA(q) {
  document.querySelectorAll('.acard').forEach(c => {
    const m  = c.dataset.name.includes(q.toLowerCase());
    const tm = aTypeFilter === 'all' || c.dataset.type === aTypeFilter;
    c.style.display = (m && tm) ? '' : 'none';
  });
}

function setAT(el, type) {
  document.querySelectorAll('.asset-bar .fchip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  aTypeFilter = type;
  buildAssets();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  buildCal();
  buildAssets();
  initDropZone('drop-brand','drop-brand-input','drop-brand-files','brandbook');
  initSidebarUpload('su-brief','su-brief-input','brief');
  initSidebarUpload('su-report','su-report-input','report');
  initSidebarUpload('su-guide','su-guide-input','guide');
});
