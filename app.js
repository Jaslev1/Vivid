/* ── Vivid Inc. — app.js ── */

const ASSETS = [
  {n:'Feed post — square',   d:'1080×1080', t:'social',  bg:'#F4A26B', tc:'#1A1A2E', s:'IG Feed'},
  {n:'Story / Reel cover',   d:'1080×1920', t:'social',  bg:'#6B3FA0', tc:'#fff',    s:'IG Story'},
  {n:'LinkedIn banner',      d:'1128×191',  t:'social',  bg:'#3D4B6B', tc:'#fff',    s:'LI Banner'},
  {n:'LinkedIn post card',   d:'1200×627',  t:'social',  bg:'#3D3D8F', tc:'#fff',    s:'LI Card'},
  {n:'X / Twitter card',     d:'1200×675',  t:'social',  bg:'#1E1B3A', tc:'#F4A26B', s:'X Card'},
  {n:'Facebook cover',       d:'820×312',   t:'social',  bg:'#9B6B8A', tc:'#fff',    s:'FB Cover'},
  {n:'Pinterest pin',        d:'1000×1500', t:'social',  bg:'#F7C4A0', tc:'#1A1A2E', s:'Pin'},
  {n:'Email header',         d:'600×200',   t:'email',   bg:'#1E1B3A', tc:'#F4A26B', s:'Email Header'},
  {n:'Email footer',         d:'600×100',   t:'email',   bg:'#F0EDE8', tc:'#1E1B3A', s:'Email Footer'},
  {n:'Email hero banner',    d:'600×300',   t:'email',   bg:'#6B3FA0', tc:'#fff',    s:'Hero'},
  {n:'Leaderboard ad',       d:'728×90',    t:'display', bg:'#F4A26B', tc:'#1A1A2E', s:'Leaderboard'},
  {n:'Medium rectangle',     d:'300×250',   t:'display', bg:'#3D4B6B', tc:'#fff',    s:'MPU'},
  {n:'Half page ad',         d:'300×600',   t:'display', bg:'#6B3FA0', tc:'#fff',    s:'Half Page'},
  {n:'Skyscraper',           d:'160×600',   t:'display', bg:'#1E1B3A', tc:'#F4A26B', s:'Sky'},
];

const WL = ['W1','W2','W3','W4','W5','W6','W7','W8'];
const CE = {
  1:[{t:'ig',x:'Launch reel'}], 2:[{t:'li',x:'Founder perspective'}], 3:[{t:'em',x:'Welcome email 1'}], 4:[{t:'ig',x:'Brand values post'}], 5:[{t:'bl',x:'Blog: industry insight'}],
  7:[{t:'ig',x:'Behind the scenes'}], 8:[{t:'li',x:'Thought leadership'}], 9:[{t:'ig',x:'Product spotlight'}], 10:[{t:'em',x:'Nurture email 2'}], 11:[{t:'ig',x:'Customer story'}], 12:[{t:'bl',x:'Blog: how-to guide'}],
  14:[{t:'ig',x:'Educational carousel'}], 15:[{t:'li',x:'Case study post'}], 16:[{t:'em',x:'Mid-campaign offer'}], 17:[{t:'ig',x:'UGC feature'}], 18:[{t:'bl',x:'Blog: data take'}], 19:[{t:'ig',x:'Q+A story series'}],
  21:[{t:'li',x:'Industry data post'}], 22:[{t:'ig',x:'Testimonial post'}], 23:[{t:'em',x:'Retargeting email'}], 24:[{t:'ig',x:'Product comparison'}], 25:[{t:'bl',x:'Blog: roundup'}], 26:[{t:'ig',x:'W4 recap reel'}],
  28:[{t:'li',x:'Partner spotlight'}], 29:[{t:'ig',x:'Social proof post'}], 30:[{t:'em',x:'Conversion email'}], 31:[{t:'ig',x:'New series launch'}], 32:[{t:'bl',x:'Blog: interview'}], 33:[{t:'ig',x:'Poll story'}],
  35:[{t:'li',x:'Results reflection'}], 36:[{t:'ig',x:'Community spotlight'}], 37:[{t:'em',x:'Newsletter'}], 38:[{t:'ig',x:'Behind production'}], 39:[{t:'bl',x:'Blog: use cases'}], 40:[{t:'ig',x:'W6 recap reel'}],
  42:[{t:'li',x:'Strategic forecast'}], 43:[{t:'ig',x:'Urgency post'}], 44:[{t:'em',x:'Last chance email'}], 45:[{t:'ig',x:'Closing story'}], 46:[{t:'bl',x:'Blog: learnings'}], 47:[{t:'ig',x:'Results post'}],
  49:[{t:'li',x:'Campaign wrap'}], 50:[{t:'ig',x:'Thank you reel'}], 51:[{t:'em',x:'Retention email'}], 52:[{t:'ig',x:"What's next teaser"}], 53:[{t:'bl',x:'Blog: retrospective'}], 54:[{t:'ig',x:'Community thanks'}], 56:[{t:'li',x:'Final results post'}],
};
const TM = {ig:'Instagram', li:'LinkedIn', em:'Email', bl:'Blog'};
const CM = {ig:'ev-ig', li:'ev-li', em:'ev-em', bl:'ev-bl'};
const AC = ['#3D4B6B','#6B3FA0','#F4A26B','#9B6B8A','#3D3D8F'];

let atf = 'all', lb = 'Your Brand', dff = [], isGen = false;

function gi(id) { return document.getElementById(id); }

/* ── ROUTING ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  gi('page-' + id).classList.add('active');
  const nl = document.querySelector(`[data-page="${id}"]`);
  if (nl) nl.classList.add('active');
  window.scrollTo(0, 0);
}
function goHome()     { showPage('home'); }
function goSetup()    { showPage('setup');    setSB('setup'); }
function goStrategy() { showPage('strategy'); setSB('strategy'); }
function goContent()  { showPage('content');  setSB('content'); }
function goAssets()   { showPage('assets');   setSB('assets'); }
function goPrivacy()  { showPage('privacy');  }
function goTerms()    { showPage('terms');    }

function setSB(id) {
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.sidebar-link[data-sid="${id}"]`).forEach(l => l.classList.add('active'));
}
function sideNav(id) {
  setSB(id);
  if (id === 'setup')    goSetup();
  else if (id === 'strategy') goStrategy();
  else if (id === 'content')  goContent();
  else if (id === 'assets')   goAssets();
}

/* ── INPUTS ── */
function getI() {
  return {
    brand:   gi('i-brand').value.trim()   || 'Your Brand',
    ind:     gi('i-ind').value.trim()     || 'consumer brand',
    desc:    gi('i-desc').value.trim()    || '',
    obj:     gi('i-obj').value            || 'Build brand awareness',
    aud:     gi('i-aud').value.trim()     || '',
    bud:     gi('i-budv').textContent,
    tone:    gi('i-tone').value.trim()    || 'professional and engaging',
    ch:      Array.from(document.querySelectorAll('.cpill.on')).map(e => e.textContent),
    bb:      gi('i-bb').value.trim()      || '',
    prompt:  gi('i-prompt').value.trim()  || '',
    tagline: gi('i-tagline').value.trim() || '',
  };
}

/* ── RE-ENABLE GENERATE ── */
function enGen() {
  const b = gi('gen-btn');
  if (!b) return;
  b.disabled = false;
  b.innerHTML = isGen
    ? 'Regenerate &#9889;'
    : 'Start engine &#9889;';
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  ['i-brand','i-ind','i-desc','i-obj','i-aud','i-tone','i-bb','i-tagline','i-prompt']
    .forEach(id => { const el = gi(id); if (el) el.addEventListener('input', enGen); });

  const bsl = gi('i-bud');
  if (bsl) bsl.addEventListener('input', () => {
    const v = parseInt(bsl.value);
    gi('i-budv').textContent = '$' + v.toLocaleString();
    enGen();
  });

  document.querySelectorAll('.cpill').forEach(c => c.addEventListener('click', () => setTimeout(enGen, 10)));

  /* ── Assets: render immediately on load ── */
  bAssets();
  bCal();

  /* Drop zone */
  const dz = gi('dz'), di = gi('di');
  if (dz && di) {
    dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('dg'); });
    dz.addEventListener('dragleave', ()  => dz.classList.remove('dg'));
    dz.addEventListener('drop',      e  => { e.preventDefault(); dz.classList.remove('dg'); aF(e.dataTransfer.files); });
    di.addEventListener('change',    ()  => aF(di.files));
  }
});

function sUp(inp, sid) {
  if (!inp.files.length) return;
  const sl = gi(sid);
  if (sl) { sl.classList.add('done'); const s = sl.querySelector('.u-name'); if (s) s.textContent = inp.files[0].name.slice(0, 22); }
  enGen();
}
function aF(files) { Array.from(files).forEach(f => { if (!dff.includes(f.name)) dff.push(f.name); }); rF(); enGen(); }
function rmF(n)    { dff = dff.filter(x => x !== n); rF(); }
function rF()      {
  const el = gi('df');
  if (el) el.innerHTML = dff.map(n => `<span class="drop-tag">${n}<span class="drop-x" onclick="rmF('${n.replace(/'/g, "\\'")}')">&#xD7;</span></span>`).join('');
}

/* ── GENERATE ── */
async function generate() {
  const inp = getI();
  if (!inp.brand || inp.brand === 'Your Brand') { alert('Please enter a brand name.'); return; }
  lb = inp.brand;
  const bb = gi('bar-brand');
  if (bb) bb.innerHTML = `<strong>${inp.brand}</strong>`;
  const b = gi('gen-btn');
  b.disabled  = true;
  b.innerHTML = 'Generating...';
  isGen = true;
  bAssets(); /* stamp brand name on assets immediately */
  goStrategy();
  await bStrat(inp);
  bCal();
  enGen();
}

/* ── STRATEGY ── */
async function bStrat(inp) {
  const si = gi('strat-inner');
  si.innerHTML = `<div class="inner-content"><div class="loading"><div class="spin"></div><div class="load-txt">Building your strategy...</div><div class="load-step" id="ls">Analysing brand inputs</div></div></div>`;
  const steps = ['Analysing brand inputs','Setting campaign objectives','Mapping channel mix','Allocating budget','Drafting 8-week phases','Writing key messages'];
  let s = 0;
  const iv = setInterval(() => { s++; const el = gi('ls'); if (el && s < steps.length) el.textContent = steps[s]; }, 900);

  const tN = inp.tagline ? `\nCRITICAL: Use this tagline VERBATIM as the "headline" — copy it character-for-character: "${inp.tagline}"` : '';
  const pN = inp.prompt  ? `\nAdditional client direction: ${inp.prompt}` : '';

  const prompt = `You are a senior marketing strategist producing a rigorous, commercially specific strategy. Generic language is not acceptable — every sentence must be rooted in what makes THIS brand different.

Brand: ${inp.brand}
Industry: ${inp.ind}
Description: ${inp.desc}
Objective: ${inp.obj}
Target audience: ${inp.aud}
Monthly budget: ${inp.bud}
Brand voice: ${inp.tone}
Active channels: ${inp.ch.join(', ')}
Brand guidelines / notes: ${inp.bb}${tN}${pN}

RULES — violating any makes the output useless:
1. headline: if tagline given copy it EXACTLY. Otherwise: a sharp, ownable positioning line (max 12 words) that could ONLY apply to ${inp.brand} — never to a competitor.
2. summary: 2-3 sentences. Name the specific audience tension, why these channels, what the conversion mechanism is.
3. phases: each desc must name at least 2 concrete, specific tactics with details (content type, platform, format, trigger). NOT "create engaging content" or "build awareness".
4. messages: 3 claims that are FACTUALLY SPECIFIC to ${inp.brand} — what it does, for whom, what it proves. If the description is thin, extrapolate from the industry and audience. Never write "we put customers first" or "quality you can trust".
5. kpis: projected ranges realistic for ${inp.bud}/month across ${inp.ch.join(', ')}.

Return ONLY valid JSON, no markdown, no explanation:
{"headline":"...","summary":"...","phases":[{"week":"Weeks 1–2","name":"...","desc":"..."},{"week":"Weeks 3–4","name":"...","desc":"..."},{"week":"Weeks 5–6","name":"...","desc":"..."},{"week":"Weeks 7–8","name":"...","desc":"..."}],"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer / seeding","pct":15},{"lbl":"Contingency","pct":10}],"kpis":[{"lbl":"Projected monthly reach","val":"40–60K"},{"lbl":"Projected engagement","val":"3.5–5.5%"},{"lbl":"Projected email open","val":"24–32%"}],"messages":["...","...","..."]}`;

  let data = null;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1800, messages: [{ role: 'user', content: prompt }] })
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const res = await r.json();
    clearInterval(iv);
    if (res.error) throw new Error(res.error.message);
    const txt   = res.content.map(c => c.text || '').join('');
    const match = txt.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No JSON found');
    data = JSON.parse(match[0]);
  } catch (e) {
    clearInterval(iv);
    console.warn('API fallback:', e.message);
    data = fb(inp);
  }
  rStrat(data, inp);
}

function fb(inp) {
  const br = inp.brand;
  const a  = inp.aud ? inp.aud.split(',')[0].trim() : 'your audience';
  const d  = inp.desc ? inp.desc.split('.')[0] : `a ${inp.ind} brand`;
  return {
    headline: inp.tagline || `${br} — the ${inp.ind} brand ${a} actually asked for`,
    summary:  `${br} sits in a ${inp.ind} market where most players default to discounting and generic messaging. This strategy takes the opposite route: building category authority through specific, evidence-backed content, then converting a warm, trust-ready audience. Every ${inp.bud} is accountable to a measurable output.`,
    phases: [
      { week:'Weeks 1–2', name:'Authority and credibility', desc:`Publish a 1,200-word founder essay on LinkedIn establishing ${br}'s specific category POV. Launch a 3-part Instagram carousel breaking down the key insight that makes ${br} different. Set up pixel tracking, email capture with 10%-off trigger, and a 3-email automated welcome sequence ending with a soft conversion ask.` },
      { week:'Weeks 3–4', name:'Social proof and reach',    desc:`Activate paid social (35% of ${inp.bud}) boosting the top-performing organic post to lookalike audiences matching ${a}. Publish 2 detailed customer testimonials on Instagram Stories and 1 full case study on LinkedIn. A/B test two email subject lines. Seed 3–5 micro-influencers in the ${inp.ind} space with a gifting-plus-brief arrangement.` },
      { week:'Weeks 5–6', name:'Conversion and retargeting',desc:`Scale paid social on the winning creative. Deploy retargeting to all site visitors and email openers from Weeks 1–4. Run a 3-email limited-time offer sequence (announce, urgency, last-chance). Publish a long-form SEO blog post targeting the primary ${inp.ind} search query with a lead magnet CTA.` },
      { week:'Weeks 7–8', name:'Retention and next cycle',  desc:`Launch a referral mechanic for converted customers via a post-purchase email trigger. Publish campaign performance data on LinkedIn to reinforce category credibility. Test 2 new ad formats (video vs. static) to brief the next creative cycle. Document CPL, ROAS and email revenue to set the next campaign budget.` },
    ],
    alloc: [{ lbl:'Paid social',pct:35 },{ lbl:'Content creation',pct:25 },{ lbl:'Email / CRM',pct:15 },{ lbl:'Influencer / seeding',pct:15 },{ lbl:'Contingency',pct:10 }],
    kpis:  [{ lbl:'Projected monthly reach',val:'40–60K' },{ lbl:'Projected engagement',val:'3.5–5.5%' },{ lbl:'Projected email open',val:'24–32%' }],
    messages: [
      `${br} is the only ${inp.ind} brand that ${d.toLowerCase().replace(/^we /,'').replace(/^it /,'')} — and we publish the proof, not just the claim`,
      `Built specifically for ${a}: every product decision, every message, every channel reflects what they actually need — not what's easiest to sell`,
      `Where most ${inp.ind} brands compete on price, ${br} competes on evidence — category expertise you can verify, outcomes you can measure`,
    ],
  };
}

function rStrat(s, inp) {
  gi('strat-inner').innerHTML = `
  <div class="inner-content">
    <div class="accent-rule"></div>
    <div class="page-eye">Communications strategy — ${inp.bud}/month</div>
    <div class="strat-hl">${s.headline}</div>
    <div class="strat-sum">${s.summary}</div>
    <p class="kpi-note">All figures are projected estimates based on typical channel performance at this budget. Actual results vary.</p>
    <div class="kpi-row">${s.kpis.map((k,i) => `<div class="kpi kpi-${i}"><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div></div>`).join('')}</div>
    <div class="s-hd"><div class="s-title">Campaign phases</div><div class="s-rule"></div><div class="s-tag">8 weeks / 56 days</div></div>
    <div class="phases">${s.phases.map((p,i) => `<div class="phase"><div class="ph-week">${p.week}</div><div class="ph-line"><div class="ph-node"></div>${i < s.phases.length-1 ? '<div class="ph-track"></div>' : ''}</div><div class="ph-body"><div class="ph-name">${p.name}</div><div class="ph-desc">${p.desc}</div></div></div>`).join('')}</div>
    <div class="s-hd" style="margin-top:32px"><div class="s-title">Budget allocation</div><div class="s-rule"></div><div class="s-tag">${inp.bud}/mo</div></div>
    <div class="alloc-block"><div class="alloc-title">How the budget is split</div>${s.alloc.map((a,i) => `<div class="alloc-item"><div class="alloc-lbl">${a.lbl}</div><div class="alloc-track"><div class="alloc-fill" style="width:${a.pct}%;background:${AC[i%5]}"></div></div><div class="alloc-pct">${a.pct}%</div></div>`).join('')}</div>
    <div class="s-hd" style="margin-top:24px"><div class="s-title">Key messages</div><div class="s-rule"></div></div>
    <div class="msgs">${s.messages.map(m => `<div class="msg"><div class="msg-text">${m}</div></div>`).join('')}</div>
    <div class="action-row">
      <button class="btn-action-cal"  onclick="goContent()">View content plan &#8594;</button>
      <button class="btn-action-assets" onclick="goAssets()">View asset inventory &#8594;</button>
    </div>
  </div>`;
}

/* ── CALENDAR ── */
function bCal() {
  const ch = {
    ig: gi('ch-ig') && gi('ch-ig').classList.contains('on-ig'),
    li: gi('ch-li') && gi('ch-li').classList.contains('on-li'),
    em: gi('ch-em') && gi('ch-em').classList.contains('on-em'),
    bl: gi('ch-bl') && gi('ch-bl').classList.contains('on-bl'),
  };
  const g = gi('cal-grid');
  if (!g) return;
  let h = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => `<div class="cal-dh">${d}</div>`).join('');
  for (let w = 0; w < 8; w++) {
    h += `<div class="cal-wl">${WL[w]}</div>`;
    for (let d = 0; d < 7; d++) {
      const day = w * 7 + d + 1;
      const evs = (CE[day] || []).filter(e => ch[e.t]);
      h += `<div class="cal-cell"><div class="cal-dn">${day}</div>${evs.map(e => `<div class="cal-ev ${CM[e.t]}" onclick="oPost('${e.x.replace(/'/g,"\\'")}','${e.t}')">${e.x}</div>`).join('')}</div>`;
    }
  }
  g.innerHTML = h;
}

function oPost(title, type) {
  const pa = gi('post-area');
  if (!pa) return;
  pa.innerHTML = `<div class="post-card"><div class="post-card-hd"><div class="post-card-title">${title}</div><button class="btn-secondary" onclick="gPost('${title.replace(/'/g,"\\'")}','${type}')">Generate copy &#8594;</button></div><div class="post-body-txt" id="pbt" style="color:var(--hint);font-style:italic">Click generate copy to draft this post.</div><div class="post-foot"><button class="btn-secondary" onclick="navigator.clipboard.writeText(gi('pbt').textContent)">Copy text</button><button class="btn-secondary" onclick="gi('post-area').innerHTML=''">Close</button></div></div>`;
}

async function gPost(title, type) {
  const inp = getI();
  const pbt = gi('pbt');
  if (pbt) { pbt.style.fontStyle = 'normal'; pbt.textContent = 'Writing...'; }
  const tl = {ig:'Instagram post',li:'LinkedIn post',em:'Email newsletter',bl:'Blog post'}[type] || 'post';
  const p  = `Write a ${tl} for ${inp.brand || lb} (${inp.ind}). Concept: "${title}". Voice: ${inp.tone}. Audience: ${inp.aud}. Instagram: include 3–5 relevant hashtags. Email: include a subject line on the first line prefixed "Subject:". Return ONLY the post copy, no preamble.`;
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:500, messages:[{role:'user',content:p}] }) });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message);
    if (pbt) pbt.textContent = d.content.map(c => c.text || '').join('');
  } catch(e) { if (pbt) pbt.textContent = 'Could not generate — please try again.'; }
}

/* ── ASSETS — rendered on load and after generate ── */
function bAssets() {
  const brand = (lb !== 'Your Brand') ? lb : ((gi('i-brand') && gi('i-brand').value.trim()) || 'Your Brand');
  const g = gi('agrid');
  if (!g) return;
  g.innerHTML = ASSETS
    .filter(a => atf === 'all' || a.t === atf)
    .map(a => `
      <div class="acard" data-type="${a.t}" data-name="${a.n.toLowerCase()}">
        <div class="athumb" style="background:${a.bg}">
          <div class="athumb-brand" style="color:${a.tc}">${brand}</div>
          <div class="athumb-sub"   style="color:${a.tc}">${a.s}</div>
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
    alert(`Resize variants — ${name} (${dim})\n\nIG feed: 1080×1080, 1080×1350\nIG Story/Reel: 1080×1920\nLinkedIn: 1200×627\nX/Twitter: 1200×675\nFacebook feed: 1200×630\nFacebook cover: 820×312\nPinterest: 1000×1500\n\nExport at 2× for retina. Keep content within the 80% safe zone.`);
  } else {
    alert(`Production spec — ${name}\n\nFormat: PNG-24 (digital) / PDF (print)\nColour space: sRGB (screen) / CMYK (print)\nResolution: 72 dpi web / 300 dpi print\nSafe zone: 5% inset all sides\nBleed (print): 3mm all sides\nFonts: outline or embed before export`);
  }
}

function fA(q) {
  document.querySelectorAll('.acard').forEach(c => {
    c.style.display = (c.dataset.name.includes(q.toLowerCase()) && (atf === 'all' || c.dataset.type === atf)) ? '' : 'none';
  });
}
function sAT(el, type) {
  document.querySelectorAll('.asset-type-chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  atf = type;
  bAssets();
}
