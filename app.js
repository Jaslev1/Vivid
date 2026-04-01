/* ── VIVID INC. — MarqueAI JS ── */

const ASSETS = [
  {n:'Feed post — square',    d:'1080×1080', t:'social',  bg:'#EE964B', tc:'#fff',     sub:'IG Feed'},
  {n:'Story / Reel cover',   d:'1080×1920', t:'social',  bg:'#F4D35E', tc:'#1F271B',  sub:'IG Story'},
  {n:'LinkedIn banner',      d:'1128×191',  t:'social',  bg:'#19647E', tc:'#FEFEFE',  sub:'LI Banner'},
  {n:'LinkedIn post card',   d:'1200×627',  t:'social',  bg:'#28AFB0', tc:'#fff',     sub:'LI Card'},
  {n:'X / Twitter card',     d:'1200×675',  t:'social',  bg:'#1F271B', tc:'#F4D35E',  sub:'X Card'},
  {n:'Facebook cover',       d:'820×312',   t:'social',  bg:'#EE964B', tc:'#1F271B',  sub:'FB Cover'},
  {n:'Pinterest pin',        d:'1000×1500', t:'social',  bg:'#F4D35E', tc:'#1F271B',  sub:'Pin'},
  {n:'Email header',         d:'600×200',   t:'email',   bg:'#1F271B', tc:'#F4D35E',  sub:'Email Header'},
  {n:'Email footer',         d:'600×100',   t:'email',   bg:'#F5F0E8', tc:'#1F271B',  sub:'Email Footer'},
  {n:'Email hero banner',    d:'600×300',   t:'email',   bg:'#19647E', tc:'#FEFEFE',  sub:'Hero'},
  {n:'Leaderboard ad',       d:'728×90',    t:'display', bg:'#F4D35E', tc:'#1F271B',  sub:'Leaderboard'},
  {n:'Medium rectangle',     d:'300×250',   t:'display', bg:'#EE964B', tc:'#fff',     sub:'MPU'},
  {n:'Half page ad',         d:'300×600',   t:'display', bg:'#28AFB0', tc:'#fff',     sub:'Half Page'},
  {n:'Skyscraper',           d:'160×600',   t:'display', bg:'#1F271B', tc:'#F4D35E',  sub:'Sky'},
];

const CAL_EVENTS = {
  1:[{t:'ig',tx:'Brand story reel'}], 2:[{t:'li',tx:'Thought leadership'}],
  3:[{t:'em',tx:'Welcome sequence'}], 5:[{t:'bl',tx:'Blog: industry insight'}],
  7:[{t:'ig',tx:'Behind the scenes'}], 8:[{t:'li',tx:'Founder perspective'}],
  9:[{t:'ig',tx:'Product spotlight'}], 10:[{t:'em',tx:'Nurture email 1'}],
  12:[{t:'ig',tx:'Educational carousel'}], 13:[{t:'bl',tx:'Blog: how-to guide'}],
  14:[{t:'li',tx:'Case study post'}], 15:[{t:'em',tx:'Mid-month offer'}],
  17:[{t:'ig',tx:'Customer testimonial'}], 19:[{t:'ig',tx:'UGC feature'}],
  20:[{t:'li',tx:'Industry data post'}], 21:[{t:'em',tx:'Retargeting email'}],
  22:[{t:'bl',tx:'Blog: roundup'}], 23:[{t:'ig',tx:'Q+A story series'}],
  26:[{t:'ig',tx:'Week recap reel'}], 28:[{t:'em',tx:'Monthly newsletter'}],
  29:[{t:'ig',tx:'Month wrap-up'}], 30:[{t:'li',tx:'Results + reflection'}],
};

const T_MAP   = {ig:'Instagram', li:'LinkedIn', em:'Email', bl:'Blog'};
const CLS_MAP = {ig:'ev-ig', li:'ev-li', em:'ev-em', bl:'ev-bl'};
const ALLOC_COLORS = ['#19647E','#28AFB0','#F4D35E','#EE964B','#1F271B'];

let aTypeFilter = 'all';
let lastBrand   = 'Your Brand';

/* ── NAVIGATION ── */
function nav(id, tabEl) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  document.querySelectorAll('.alink').forEach(a => a.classList.remove('on'));
  document.getElementById('p-' + id).classList.add('on');
  const m = {setup:0, strat:1, cal:2, assets:3};
  if (m[id] !== undefined) {
    document.querySelectorAll('.tab')[m[id]].classList.add('on');
    document.querySelectorAll('.alink')[m[id]].classList.add('on');
  }
}

/* ── DEMO FILL ── */
function fillDemo() {
  document.getElementById('i-brand').value = 'Verdana Wellness';
  document.getElementById('i-ind').value   = 'Health and wellness supplements';
  document.getElementById('i-desc').value  = 'Premium adaptogen supplements for high-performing professionals who want sustainable energy without stimulants. Clean-label, science-backed, minimal design.';
  document.getElementById('i-obj').value   = 'Drive trial and first purchase';
  document.getElementById('i-aud').value   = 'Professionals aged 28–45, high income, health-conscious, sceptical of wellness hype.';
  document.getElementById('i-tone').value  = 'Calm authority. Science-led but human. Never preachy.';
}

/* ── INPUTS ── */
function getInputs() {
  return {
    brand: document.getElementById('i-brand').value || 'Your Brand',
    ind:   document.getElementById('i-ind').value   || 'consumer brand',
    desc:  document.getElementById('i-desc').value  || '',
    obj:   document.getElementById('i-obj').value   || 'Build brand awareness',
    aud:   document.getElementById('i-aud').value   || 'general consumers',
    bud:   document.getElementById('i-budv').textContent,
    tone:  document.getElementById('i-tone').value  || 'professional and approachable',
    ch:    Array.from(document.querySelectorAll('.cpill.on')).map(e => e.textContent),
    bb:    document.getElementById('i-bb').value    || '',
  };
}

/* ── GENERATE ── */
async function generate() {
  const inp = getInputs();
  if (!inp.brand || inp.brand === 'Your Brand') { alert('Please enter a brand name.'); return; }
  lastBrand = inp.brand;
  document.getElementById('bar-brand').innerHTML = `<strong>${inp.brand}</strong>`;
  document.getElementById('gen-btn').disabled = true;
  nav('strat', document.querySelectorAll('.tab')[1]);
  await buildStrategy(inp);
  buildCal();
  buildAssets();
}

/* ── STRATEGY ── */
async function buildStrategy(inp) {
  const si = document.getElementById('strat-inner');
  si.innerHTML = `<div class="loading"><div class="spin"></div><div class="load-txt">Building strategy...</div><div class="load-step" id="load-step">Analysing inputs</div></div>`;

  const steps = ['Analysing inputs','Setting objectives','Mapping channels','Allocating budget','Drafting phases','Finalising messages'];
  let s = 0;
  const iv = setInterval(() => {
    s++;
    const el = document.getElementById('load-step');
    if (el && s < steps.length) el.textContent = steps[s];
  }, 900);

  const prompt = `You are an expert marketing strategist. Generate a communications strategy for:
Brand: ${inp.brand}, Industry: ${inp.ind}, Description: ${inp.desc}, Objective: ${inp.obj},
Audience: ${inp.aud}, Budget: ${inp.bud}/month, Voice: ${inp.tone}, Channels: ${inp.ch.join(', ')}
Return ONLY valid JSON, no markdown:
{"headline":"positioning statement max 12 words","summary":"2-3 sentence overview",
"phases":[{"week":"Weeks 1–2","name":"name","desc":"detail"},{"week":"Weeks 3–5","name":"name","desc":"detail"},{"week":"Weeks 6–8","name":"name","desc":"detail"}],
"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer","pct":15},{"lbl":"Contingency","pct":10}],
"kpis":[{"lbl":"Monthly reach","val":"50K"},{"lbl":"Engagement rate","val":"4.5%"},{"lbl":"Email open rate","val":"28%"}],
"messages":["msg1","msg2","msg3"]}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await r.json();
    clearInterval(iv);
    const txt = data.content.map(c => c.text || '').join('');
    renderStrategy(JSON.parse(txt.replace(/```json|```/g, '').trim()), inp);
  } catch(e) {
    clearInterval(iv);
    renderStrategy(demoStrat(), inp);
  }
}

function demoStrat() {
  return {
    headline: 'Bold brands deserve bold content — built to perform',
    summary: 'An 8-week campaign that builds authority through education, validates through proof, and converts through precision targeting across LinkedIn, email and Instagram.',
    phases: [
      {week:'Weeks 1–2', name:'Authority foundation',      desc:'Publish hero content and founder-voice posts establishing credibility. Build organic reach through high-value educational content.'},
      {week:'Weeks 3–5', name:'Proof and amplification',   desc:'Activate paid social on top-performing organic content. Introduce customer testimonials and UGC. Launch email nurture sequence.'},
      {week:'Weeks 6–8', name:'Conversion and retention',  desc:'Retarget warm audiences with a trial offer. Deploy browse-abandonment sequences. Convert engaged followers into first-time customers.'},
    ],
    alloc:    [{lbl:'Paid social',pct:35},{lbl:'Content creation',pct:25},{lbl:'Email / CRM',pct:15},{lbl:'Influencer',pct:15},{lbl:'Contingency',pct:10}],
    kpis:     [{lbl:'Monthly reach',val:'55K'},{lbl:'Engagement rate',val:'4.8%'},{lbl:'Email open rate',val:'31%'}],
    messages: ['Vivid by name, vivid by nature — colour every channel', 'Built for brands that refuse to blend in', 'Every post earns its place or it does not run'],
  };
}

function renderStrategy(s, inp) {
  document.getElementById('strat-inner').innerHTML = `
    <div class="panel on" style="padding:32px 36px">
      <div class="ph">
        <div class="ph-eye">Communications strategy — ${inp.bud}/month</div>
        <div class="strat-headline">${s.headline}</div>
        <div class="strat-summary">${s.summary}</div>
      </div>
      <div class="kpi-row">${s.kpis.map(k => `<div class="kpi"><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div></div>`).join('')}</div>
      <div class="sect-hd"><div class="sect-title">Campaign phases</div><div class="sect-rule"></div><div class="sect-tag">8 weeks</div></div>
      <div class="phases">${s.phases.map((p,i) => `<div class="phase"><div class="phase-week">${p.week}</div><div class="phase-line"><div class="phase-node"></div>${i<2?'<div class="phase-track"></div>':''}</div><div class="phase-body"><div class="phase-name">${p.name}</div><div class="phase-desc">${p.desc}</div></div></div>`).join('')}</div>
      <div class="sect-hd"><div class="sect-title">Budget allocation</div><div class="sect-rule"></div></div>
      <div class="alloc">
        <div class="alloc-title">Monthly spend — ${inp.bud}</div>
        ${s.alloc.map((a,i) => `<div class="alloc-item"><div class="alloc-lbl">${a.lbl}</div><div class="alloc-track"><div class="alloc-fill" style="width:${a.pct}%;background:${ALLOC_COLORS[i%5]}"></div></div><div class="alloc-pct">${a.pct}%</div></div>`).join('')}
      </div>
      <div class="sect-hd"><div class="sect-title">Key messages</div><div class="sect-rule"></div></div>
      <div class="msgs">${s.messages.map(m => `<div class="msg"><div class="msg-text">${m}</div></div>`).join('')}</div>
      <div class="action-row">
        <button class="btn-g" onclick="nav('cal',document.querySelectorAll('.tab')[2])">View content calendar</button>
        <button class="btn-g" onclick="nav('assets',document.querySelectorAll('.tab')[3])">View asset inventory</button>
      </div>
    </div>`;
}

/* ── CALENDAR ── */
function buildCal() {
  const on  = Array.from(document.querySelectorAll('.fchip.on')).map(c => c.textContent.toLowerCase().trim());
  const g   = document.getElementById('cal-grid');
  const dh  = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let h = dh.map(d => `<div class="cal-dh">${d}</div>`).join('');
  for (let w = 0; w < 5; w++) {
    h += `<div class="cal-wlbl">W${w+1}</div>`;
    for (let d = 0; d < 7; d++) {
      const dt  = w*7 + d + 1;
      if (dt > 30) { h += `<div class="cal-cell" style="background:var(--sand)"></div>`; continue; }
      const evs = (CAL_EVENTS[dt] || []).filter(e => on.includes(T_MAP[e.t].toLowerCase()));
      h += `<div class="cal-cell"><div class="cal-dn">${dt}</div>${evs.map(e => `<div class="cal-ev ${CLS_MAP[e.t]}" onclick="openPost('${e.tx}','${e.t}')">${e.tx}</div>`).join('')}</div>`;
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
      <div class="post-body-txt" id="pbt" style="color:var(--hint);font-style:italic">Click generate copy to draft this post.</div>
      <div class="post-foot">
        <button class="btn-g" onclick="navigator.clipboard.writeText(document.getElementById('pbt').textContent)">Copy</button>
        <button class="btn-g" onclick="document.getElementById('post-area').innerHTML=''">Close</button>
      </div>
    </div>`;
}

async function genPost(title, type) {
  const inp = getInputs();
  const pbt = document.getElementById('pbt');
  if (pbt) pbt.textContent = 'Writing...';
  const tl = {ig:'Instagram', li:'LinkedIn', em:'Email newsletter', bl:'Blog post'}[type] || 'social post';
  const p  = `Write a ${tl} post for ${inp.brand || lastBrand} (${inp.ind}). Concept: ${title}. Voice: ${inp.tone}. Audience: ${inp.aud}. Be concise and on-brand. Instagram: include hashtags. Email: include subject line. Return only the post copy.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 400, messages: [{ role: 'user', content: p }] })
    });
    const d = await r.json();
    if (pbt) pbt.textContent = d.content.map(c => c.text || '').join('');
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
            <button class="abtn" onclick="askResize('${a.n}','${a.d}')">Resize</button>
            <button class="abtn" onclick="askSpec('${a.n}')">Spec</button>
          </div>
        </div>
      </div>`).join('');
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

function askResize(name, dim) {
  alert(`Resize guide for ${name} (${dim}px):\n\nAsk Claude in chat for full platform variant specs — it will return sizes for all common placements based on this format.`);
}
function askSpec(name) {
  alert(`Production spec — ${name}:\nFormat: PNG (screen) / SVG (print)\nColour mode: sRGB\nSafe zone: 5% inset\nResolution: 72 dpi screen / 300 dpi print\nUpload: use platform's native importer`);
}

/* ── INIT ── */
buildCal();
buildAssets();
