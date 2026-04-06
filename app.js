/* ── Vivid Inc. MarqueAI — app.js ── */

const ASSETS=[
  {n:'Feed post — square',  d:'1080×1080',t:'social', bg:'#F4A26B',tc:'#1A1A2E',s:'IG Feed'},
  {n:'Story / Reel cover',  d:'1080×1920',t:'social', bg:'#6B3FA0',tc:'#fff',   s:'IG Story'},
  {n:'LinkedIn banner',     d:'1128×191', t:'social', bg:'#3D4B6B',tc:'#fff',   s:'LI Banner'},
  {n:'LinkedIn post card',  d:'1200×627', t:'social', bg:'#3D3D8F',tc:'#fff',   s:'LI Card'},
  {n:'X / Twitter card',    d:'1200×675', t:'social', bg:'#1E1B3A',tc:'#F4A26B',s:'X Card'},
  {n:'Facebook cover',      d:'820×312',  t:'social', bg:'#9B6B8A',tc:'#fff',   s:'FB Cover'},
  {n:'Pinterest pin',       d:'1000×1500',t:'social', bg:'#F7C4A0',tc:'#1A1A2E',s:'Pin'},
  {n:'Email header',        d:'600×200',  t:'email',  bg:'#1E1B3A',tc:'#F4A26B',s:'Email Header'},
  {n:'Email footer',        d:'600×100',  t:'email',  bg:'#F0EDE8',tc:'#1E1B3A',s:'Email Footer'},
  {n:'Email hero banner',   d:'600×300',  t:'email',  bg:'#6B3FA0',tc:'#fff',   s:'Hero'},
  {n:'Leaderboard ad',      d:'728×90',   t:'display',bg:'#C96800',tc:'#fff',   s:'Leaderboard'},
  {n:'Medium rectangle',    d:'300×250',  t:'display',bg:'#3D4B6B',tc:'#fff',   s:'MPU'},
  {n:'Half page ad',        d:'300×600',  t:'display',bg:'#6B3FA0',tc:'#fff',   s:'Half Page'},
  {n:'Skyscraper',          d:'160×600',  t:'display',bg:'#1E1B3A',tc:'#F4A26B',s:'Sky'},
];
const WL=['W1','W2','W3','W4','W5','W6','W7','W8'];
const CE={
  1:[{t:'ig',x:'Launch reel'}],2:[{t:'li',x:'Founder essay'}],3:[{t:'em',x:'Welcome email 1'}],4:[{t:'ig',x:'Brand story post'}],5:[{t:'bl',x:'Blog: industry insight'}],
  7:[{t:'ig',x:'Behind the scenes'}],8:[{t:'li',x:'Thought leadership'}],9:[{t:'ig',x:'Product spotlight'}],10:[{t:'em',x:'Nurture email 2'}],11:[{t:'ig',x:'Customer story'}],12:[{t:'bl',x:'Blog: how-to'}],
  14:[{t:'ig',x:'Educational carousel'}],15:[{t:'li',x:'Case study'}],16:[{t:'em',x:'Mid-campaign offer'}],17:[{t:'ig',x:'UGC feature'}],18:[{t:'bl',x:'Blog: data take'}],19:[{t:'ig',x:'Q+A story'}],
  21:[{t:'li',x:'Industry data'}],22:[{t:'ig',x:'Testimonial'}],23:[{t:'em',x:'Retargeting email'}],24:[{t:'ig',x:'Product comparison'}],25:[{t:'bl',x:'Blog: roundup'}],26:[{t:'ig',x:'W4 recap reel'}],
  28:[{t:'li',x:'Partner spotlight'}],29:[{t:'ig',x:'Social proof'}],30:[{t:'em',x:'Conversion email'}],31:[{t:'ig',x:'New series launch'}],32:[{t:'bl',x:'Blog: expert interview'}],33:[{t:'ig',x:'Poll story'}],
  35:[{t:'li',x:'Results reflection'}],36:[{t:'ig',x:'Community spotlight'}],37:[{t:'em',x:'Newsletter'}],38:[{t:'ig',x:'Behind production'}],39:[{t:'bl',x:'Blog: use cases'}],40:[{t:'ig',x:'W6 recap reel'}],
  42:[{t:'li',x:'Strategic forecast'}],43:[{t:'ig',x:'Urgency post'}],44:[{t:'em',x:'Last chance email'}],45:[{t:'ig',x:'Closing story'}],46:[{t:'bl',x:'Blog: learnings'}],47:[{t:'ig',x:'Results post'}],
  49:[{t:'li',x:'Campaign wrap'}],50:[{t:'ig',x:'Thank you reel'}],51:[{t:'em',x:'Retention email'}],52:[{t:'ig',x:"What's next teaser"}],53:[{t:'bl',x:'Blog: retrospective'}],54:[{t:'ig',x:'Community thanks'}],56:[{t:'li',x:'Final results'}],
};
const TM={ig:'Instagram',li:'LinkedIn',em:'Email',bl:'Blog'};
const CM={ig:'ev-ig',li:'ev-li',em:'ev-em',bl:'ev-bl'};
const AC=['#C96800','#6B3FA0','#F4A26B','#9B6B8A','#3D3D8F'];
let atf='all', lb='Your Brand', dff=[], isGen=false;

function gi(id){return document.getElementById(id)}

/* ── ROUTING ── */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  const pg=gi('page-'+id);
  if(pg)pg.classList.add('active');
  const nl=document.querySelector(`[data-page="${id}"]`);
  if(nl)nl.classList.add('active');
  window.scrollTo(0,0);
}
function goHome()    {showPage('home')}
function goSetup()   {showPage('setup');    setSB('setup')}
function goStrategy(){showPage('strategy'); setSB('strategy')}
function goContent() {showPage('content');  setSB('content')}
function goAssets()  {showPage('assets');   setSB('assets'); bAssets()}
function goPrivacy() {showPage('privacy')}
function goTerms()   {showPage('terms')}

function setSB(id){
  document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.remove('active'));
  document.querySelectorAll(`.sidebar-link[data-sid="${id}"]`).forEach(l=>l.classList.add('active'));
}
function sideNav(id){
  setSB(id);
  if(id==='setup')    goSetup();
  else if(id==='strategy') goStrategy();
  else if(id==='content')  goContent();
  else if(id==='assets')   goAssets();
}

/* ── PERSIST form data in sessionStorage ── */
const FIELDS=['i-brand','i-ind','i-desc','i-obj','i-aud','i-tone','i-bb','i-tagline','i-prompt','i-web'];
function saveForm(){
  const data={};
  FIELDS.forEach(id=>{const el=gi(id);if(el)data[id]=el.value});
  data['i-bud']=gi('i-bud')?gi('i-bud').value:'5000';
  data['channels']=Array.from(document.querySelectorAll('.cpill.on')).map(e=>e.textContent);
  try{sessionStorage.setItem('vivid-form',JSON.stringify(data))}catch(e){}
}
function loadForm(){
  try{
    const raw=sessionStorage.getItem('vivid-form');
    if(!raw)return;
    const data=JSON.parse(raw);
    FIELDS.forEach(id=>{const el=gi(id);if(el&&data[id]!==undefined)el.value=data[id]});
    if(data['i-bud']){
      const s=gi('i-bud');if(s)s.value=data['i-bud'];
      const v=parseInt(data['i-bud'])||5000;
      const d=gi('i-budv');if(d)d.textContent='$'+v.toLocaleString();
    }
    if(data['channels']){
      document.querySelectorAll('.cpill').forEach(c=>{
        c.classList.toggle('on',data['channels'].includes(c.textContent));
      });
    }
  }catch(e){}
}

/* ── INPUTS ── */
function getI(){
  return{
    brand:   gi('i-brand') ? gi('i-brand').value.trim()||'Your Brand' : lb,
    ind:     gi('i-ind')   ? gi('i-ind').value.trim()||'consumer brand' : '',
    desc:    gi('i-desc')  ? gi('i-desc').value.trim() : '',
    obj:     gi('i-obj')   ? gi('i-obj').value||'Build brand awareness' : '',
    aud:     gi('i-aud')   ? gi('i-aud').value.trim() : '',
    bud:     gi('i-budv')  ? gi('i-budv').textContent : '$5,000',
    tone:    gi('i-tone')  ? gi('i-tone').value.trim()||'professional and engaging' : '',
    ch:      Array.from(document.querySelectorAll('.cpill.on')).map(e=>e.textContent),
    bb:      gi('i-bb')    ? gi('i-bb').value.trim() : '',
    prompt:  gi('i-prompt')? gi('i-prompt').value.trim() : '',
    tagline: gi('i-tagline')? gi('i-tagline').value.trim() : '',
  };
}

function enGen(){
  const b=gi('gen-btn');
  if(!b)return;
  b.disabled=false;
  b.innerHTML=isGen?'Regenerate &#9889;':'Start engine &#9889;';
  saveForm();
}

document.addEventListener('DOMContentLoaded',()=>{
  loadForm();
  FIELDS.forEach(id=>{const el=gi(id);if(el)el.addEventListener('input',enGen)});
  const bsl=gi('i-bud');
  if(bsl)bsl.addEventListener('input',()=>{
    const v=parseInt(bsl.value);
    gi('i-budv').textContent='$'+v.toLocaleString();
    enGen();
  });
  document.querySelectorAll('.cpill').forEach(c=>c.addEventListener('click',()=>setTimeout(enGen,10)));
  bAssets();
  bCal();
  const dz=gi('dz'),di=gi('di');
  if(dz&&di){
    dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dg')});
    dz.addEventListener('dragleave',()=>dz.classList.remove('dg'));
    dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('dg');aF(e.dataTransfer.files)});
    di.addEventListener('change',()=>aF(di.files));
  }
});

function sUp(inp,sid){
  if(!inp.files.length)return;
  const sl=gi(sid);
  if(sl){sl.classList.add('done');const s=sl.querySelector('.u-name');if(s)s.textContent=inp.files[0].name.slice(0,22);}
  enGen();
}
function aF(files){Array.from(files).forEach(f=>{if(!dff.includes(f.name))dff.push(f.name)});rF();enGen()}
function rmF(n){dff=dff.filter(x=>x!==n);rF()}
function rF(){const el=gi('df');if(el)el.innerHTML=dff.map(n=>`<span class="drop-tag">${n}<span class="drop-x" onclick="rmF('${n.replace(/'/g,"\\'")}')">&#xD7;</span></span>`).join('')}

/* ── GENERATE ── */
async function generate(){
  const inp=getI();
  if(!inp.brand||inp.brand==='Your Brand'){alert('Please enter a brand name.');return}
  lb=inp.brand;
  const bb=gi('bar-brand');if(bb)bb.innerHTML=`<strong>${inp.brand}</strong>`;
  const b=gi('gen-btn');b.disabled=true;b.innerHTML='Generating...';
  isGen=true;
  bAssets();
  goStrategy();
  await bStrat(inp);
  bCal();
  enGen();
}

/* ── STRATEGY ── */
async function bStrat(inp){
  const si=gi('strat-inner');
  si.innerHTML=`<div class="accent-rule"></div><div class="inner-content"><div class="loading"><div class="spin"></div><div class="load-txt">Building your strategy...</div><div class="load-step" id="ls">Analysing brand inputs</div></div></div>`;
  const steps=['Analysing brand inputs','Setting campaign objectives','Mapping channel mix','Allocating budget','Drafting 8-week phases','Writing key messages'];
  let s=0;const iv=setInterval(()=>{s++;const el=gi('ls');if(el&&s<steps.length)el.textContent=steps[s]},900);
  const tN=inp.tagline?`\nCRITICAL — use this exact tagline verbatim as "headline": "${inp.tagline}"`:'' ;
  const pN=inp.prompt?`\nClient brief (prioritise this): ${inp.prompt}`:'';

  const prompt=`You are a senior marketing strategist. Produce a real, specific, commercially usable strategy — not template language.

BRAND:
Name: ${inp.brand}
Industry: ${inp.ind}
Description: ${inp.desc||'Not specified'}
Objective: ${inp.obj}
Audience: ${inp.aud||'Not specified'}
Budget: ${inp.bud}/month
Voice: ${inp.tone}
Channels: ${inp.ch.join(', ')}
Notes: ${inp.bb||'None'}${tN}${pN}

STRICT OUTPUT RULES:

headline: ${inp.tagline?`Copy EXACTLY: "${inp.tagline}"`:`Sharp, ownable, max 10 words. Must reflect what ${inp.brand} actually does. No templates, no "the [industry] brand for [audience]".`}

summary: 2 sentences max. Sentence 1: what market gap ${inp.brand} is entering and why this moment. Sentence 2: what the conversion strategy is. Be concrete — name the mechanism, not the intention.

phases: 4 phases, each with 2–3 SHORT, SPECIFIC tactics. A tactic is a concrete action: "3-post Instagram carousel on [specific topic]", "A/B test two subject lines against the same offer", "retarget cart abandoners with a 24-hour discount code". NOT "create engaging content" or "build awareness through channels".

messages: 3 key messages. Each must be a specific claim ONLY ${inp.brand} can make — rooted in what the brand does (desc), who it serves (audience), and what it proves. NEVER write "we put customers first", "quality you can trust", or any generic phrase. If description is thin, use industry context to write something specific and bold.

kpis: realistic projected ranges for ${inp.bud}/month.

Return ONLY valid JSON:
{"headline":"...","summary":"...","phases":[{"week":"Weeks 1–2","name":"...","desc":"..."},{"week":"Weeks 3–4","name":"...","desc":"..."},{"week":"Weeks 5–6","name":"...","desc":"..."},{"week":"Weeks 7–8","name":"...","desc":"..."}],"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer / seeding","pct":15},{"lbl":"Contingency","pct":10}],"kpis":[{"lbl":"Projected monthly reach","val":"40–60K"},{"lbl":"Projected engagement","val":"3.5–5.5%"},{"lbl":"Projected email open","val":"24–32%"}],"messages":["...","...","..."]}`;

  let data=null;
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1800,messages:[{role:'user',content:prompt}]})});
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const res=await r.json();clearInterval(iv);
    if(res.error)throw new Error(res.error.message);
    const txt=res.content.map(c=>c.text||'').join('');
    const match=txt.match(/\{[\s\S]*\}/);
    if(!match)throw new Error('No JSON');
    data=JSON.parse(match[0]);
  }catch(e){clearInterval(iv);console.warn('API fallback:',e.message);data=fb(inp)}
  rStrat(data,inp);
}

function fb(inp){
  const br=inp.brand,ind=inp.ind||'consumer brand';
  const aud=inp.aud||'your target customers';
  const audShort=aud.split(',')[0].trim();
  const desc=inp.desc||'';
  const obj=inp.obj||'Build brand awareness';
  const ch=inp.ch&&inp.ch.length?inp.ch.join(' + '):'social and email';
  const bud=inp.bud||'$5,000';

  // Derive a specific differentiator from description
  const descSentence=desc.split('.')[0].trim();
  const d=descSentence
    .toLowerCase()
    .replace(/^we /,'').replace(/^it /,'').replace(/^they /,'')
    .replace(/^our brand /,'').replace(new RegExp('^'+br.toLowerCase()+' '),'')
    ||`${ind} solutions built for ${audShort}`;

  const headline=inp.tagline||(
    descSentence
      ? `${br} — ${descSentence.split(' ').slice(0,8).join(' ')}`
      : `${br}: the ${ind} brand that ${audShort} have actually been waiting for`
  );

  // Summary: why this moment + conversion mechanism (uses real inputs)
  const summary=`${br} enters the ${ind} space with a clear mandate — ${obj.toLowerCase()} — at a moment when ${audShort} are tuned out of generic category messaging and receptive to brands that lead with evidence. The 8-week strategy sequences ${ch} to earn attention before asking for it: authority content and proof of value in weeks 1–4, then paid amplification and conversion mechanics in weeks 5–8, closing with retention loops that reduce the cost of the next acquisition cycle.`;

  // Three distinctly angled key messages — not variations of the same theme
  const messages=[
    desc
      ? `${br} is the only ${ind} brand that ${d} — and we make this specific and visible in every piece of content, so ${audShort} can verify the claim rather than just accept it`
      : `${br} doesn't compete on promises — we compete on specifics: concrete outcomes, named mechanisms, and the evidence to back them up in a ${ind} category that runs on vague brand language`,
    `${br} was built for ${audShort}, which means every product call, every campaign brief, and every message starts with a question their current ${ind} options cannot honestly answer`,
    `${audShort} have seen enough ${ind} brands that look compelling in an ad and disappoint in delivery — ${br}'s entire go-to-market is designed around closing that gap: proof before pitch, results before retention ask`,
  ];

  return{
    headline,
    summary,
    phases:[
      {week:'Weeks 1–2',name:'Authority and discovery',desc:`Launch a 3-post Instagram carousel on the core problem ${br} solves — told from ${audShort}'s perspective, not the brand's. Publish a 600-word LinkedIn post on the specific insight that differentiates ${br} from day one. Set up pixel tracking, email capture with a value incentive, and a 2-email welcome sequence (value delivery first, soft CTA second).`},
      {week:'Weeks 3–4',name:'Proof and paid reach',desc:`Activate paid social (35% of budget) on the best-performing organic post. Publish two ${audShort} testimonials on Instagram Stories — specific, measurable outcomes, not vague endorsements. Run a 2-variant email A/B test: benefit-led subject vs. curiosity-led subject, identical offer. Brief 2–3 niche ${ind} creators on a product-first gifting arrangement.`},
      {week:'Weeks 5–6',name:'Conversion and retargeting',desc:`Scale paid social to a lookalike audience built on the Week 3–4 winner. Deploy a 3-email limited-time offer sequence to the full list (announce, reminder, last call — 48-hour window). Launch a retargeting campaign to site visitors who did not convert. Publish a blog post targeting the primary ${ind} search intent with a gated resource CTA.`},
      {week:'Weeks 7–8',name:'Retention and next cycle prep',desc:`Trigger a referral incentive for recent buyers via post-purchase email at day 3. Share campaign performance data on LinkedIn — concrete numbers build ${ind} category credibility and attract the next cohort. Brief two new creative concepts for cycle 2 based on what performed. Document CPL, ROAS, and email revenue to anchor the next campaign's targets.`},
    ],
    alloc:[{lbl:'Paid social',pct:35},{lbl:'Content creation',pct:25},{lbl:'Email / CRM',pct:15},{lbl:'Influencer / seeding',pct:15},{lbl:'Contingency',pct:10}],
    kpis:[{lbl:'Projected monthly reach',val:'40–60K'},{lbl:'Projected engagement',val:'3.5–5.5%'},{lbl:'Projected email open',val:'24–32%'}],
    messages,
  };
}

function rStrat(s,inp){
  gi('strat-inner').innerHTML=`
  <div class="accent-rule"></div>
  <div class="inner-content">
    <div class="page-eye">Communications strategy — ${inp.bud}/month</div>
    <div class="strat-hl">${s.headline}</div>
    <div class="strat-sum">${s.summary}</div>
    <p class="kpi-note">All figures are projected estimates based on typical channel performance at this budget. Actual results vary.</p>
    <div class="kpi-row">${s.kpis.map((k,i)=>`<div class="kpi kpi-${i}"><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div></div>`).join('')}</div>
    <div class="s-hd"><div class="s-title">Campaign phases</div><div class="s-rule"></div><div class="s-tag">8 weeks / 56 days</div></div>
    <div class="phases">${s.phases.map((p,i)=>`<div class="phase"><div class="ph-week">${p.week}</div><div class="ph-line"><div class="ph-node"></div>${i<s.phases.length-1?'<div class="ph-track"></div>':''}</div><div class="ph-body"><div class="ph-name">${p.name}</div><div class="ph-desc">${p.desc}</div></div></div>`).join('')}</div>
    <div class="s-hd" style="margin-top:28px"><div class="s-title">Budget allocation</div><div class="s-rule"></div><div class="s-tag">${inp.bud}/mo</div></div>
    <div class="alloc-block"><div class="alloc-title">How the budget is split</div>${s.alloc.map((a,i)=>`<div class="alloc-item"><div class="alloc-lbl">${a.lbl}</div><div class="alloc-track"><div class="alloc-fill" style="width:${a.pct}%;background:${AC[i%5]}"></div></div><div class="alloc-pct">${a.pct}%</div></div>`).join('')}</div>
    <div class="s-hd" style="margin-top:22px"><div class="s-title">Key messages</div><div class="s-rule"></div></div>
    <div class="msgs">${s.messages.map(m=>`<div class="msg"><div class="msg-text">${m}</div></div>`).join('')}</div>
    <div class="action-row">
      <button class="btn-action-cal" onclick="goContent()">View content plan &#8594;</button>
      <button class="btn-action-assets" onclick="goAssets()">View asset inventory &#8594;</button>
    </div>
  </div>`;
}

/* ── CALENDAR ── */
function bCal(){
  const ch={
    ig:!!(gi('ch-ig')&&gi('ch-ig').classList.contains('on-ig')),
    li:!!(gi('ch-li')&&gi('ch-li').classList.contains('on-li')),
    em:!!(gi('ch-em')&&gi('ch-em').classList.contains('on-em')),
    bl:!!(gi('ch-bl')&&gi('ch-bl').classList.contains('on-bl')),
  };
  const g=gi('cal-grid');if(!g)return;
  let h=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="cal-dh">${d}</div>`).join('');
  for(let w=0;w<8;w++){
    h+=`<div class="cal-wl">${WL[w]}</div>`;
    for(let d=0;d<7;d++){
      const day=w*7+d+1;
      const evs=(CE[day]||[]).filter(e=>ch[e.t]);
      h+=`<div class="cal-cell"><div class="cal-dn">${day}</div>${evs.map(e=>`<div class="cal-ev ${CM[e.t]}" onclick="oPost('${e.x.replace(/'/g,"\\'")}','${e.t}')">${e.x}</div>`).join('')}</div>`;
    }
  }
  g.innerHTML=h;
}

function oPost(title,type){
  /* Post draft card renders ABOVE the calendar (post-area is before cal-header in HTML) */
  const pa=gi('post-area');if(!pa)return;
  const inp=getI();
  pa.innerHTML=`<div class="post-card">
    <div class="post-card-hd">
      <div class="post-card-title">Draft: ${title}</div>
      <button class="btn-secondary" onclick="gi('post-area').innerHTML=''">&#xD7; Close</button>
    </div>
    <p style="font-size:12px;color:var(--hint);margin-bottom:6px">Edit the draft directly — or add direction below and click <strong>Regenerate</strong> for an AI rewrite.</p>
    <textarea class="post-inp" id="pbt" style="min-height:200px"></textarea>
    <textarea class="post-inp" id="post-ctx" placeholder="Direction for rewrite: tone, offer details, specific CTA, character limit..." style="min-height:52px;margin-top:8px"></textarea>
    <div class="post-foot">
      <button class="btn-primary" onclick="gPost('${title.replace(/'/g,"\\'")}','${type}')">Regenerate &#9889;</button>
      <button class="btn-secondary" id="copy-btn" onclick="copyPost()">Copy text</button>
    </div>
  </div>`;
  const pbt=gi('pbt');
  if(pbt)pbt.value=gDraft(title,type,inp);
  pa.scrollIntoView({behavior:'smooth',block:'start'});
}

function copyPost(){
  const pbt=gi('pbt');
  if(!pbt)return;
  navigator.clipboard.writeText(pbt.value).then(()=>{
    const cb=gi('copy-btn');if(cb){cb.textContent='Copied!';setTimeout(()=>{cb.textContent='Copy text'},1500)}
  });
}

function gDraft(title,type,inp){
  const brand=inp.brand&&inp.brand!=='Your Brand'?inp.brand:lb;
  const aud=inp.aud||'your audience';
  const ind=inp.ind||'our sector';
  const tone=inp.tone||'engaging and direct';
  if(type==='ig')return `${title}\n\n[Opening hook — speak directly to ${aud}]\n\nAt ${brand}, we [specific belief or action that sets you apart].\n\nHere's what that looks like:\n→ [Specific point 1]\n→ [Specific point 2]\n→ [Specific point 3]\n\nTag someone who needs to see this. ↓\n\n#${brand.replace(/\s+/g,'')} #${ind.replace(/\s+/g,'')}`;
  if(type==='li')return `${title}\n\nA take on what this means for ${ind} right now.\n\n[Opening claim — something only ${brand} can say credibly]\n\nMost brands in this space default to [generic approach].\n\nWe did the opposite. Here's the logic:\n\n1/ [Specific insight or decision]\n2/ [What changed as a result]\n3/ [What this means for ${aud}]\n\nMore ${ind} brands need to hear this.\n\nWhat's your take? ↓\n\n— ${brand}`;
  if(type==='em')return `Subject: ${title} — ${brand}\n\nHi [First Name],\n\n[Opening — state the specific value for ${aud} in one sentence]\n\nHere's what this means for you:\n\n• [Specific benefit 1]\n• [Specific benefit 2]\n• [Specific benefit 3]\n\n[CTA — one clear next step]\n\nBest,\nThe ${brand} Team\n\nP.S. [One additional reason to act]`;
  if(type==='bl')return `# ${title}: What ${aud} Need to Know\n\nBy the ${brand} team\n\n[Opening — start with a surprising stat or bold claim]\n\n## The Problem Most ${ind} Brands Are Missing\n\n[Identify the gap or pain point clearly]\n\n## What the Evidence Shows\n\n[Specific, credible insight with context]\n\n## The ${brand} Approach\n\n[Your specific, concrete differentiation — not generic]\n\n## Key Takeaways\n\n1. [Actionable insight 1]\n2. [Actionable insight 2]\n3. [Actionable insight 3]\n\n[Closing with a clear next step for ${aud}]\n\n---\n*Published by ${brand}*`;
  return `[${title}]\n\nDraft for ${brand} — ${ind}\nAudience: ${aud}\nVoice: ${tone}\n\n[Write your copy here]`;
}

async function gPost(title,type){
  const inp=getI();
  const pbt=gi('pbt');
  const ctx=gi('post-ctx')?gi('post-ctx').value.trim():'';
  const origVal=pbt?pbt.value:'';
  if(pbt){pbt.value='Rewriting\u2026';pbt.style.color='var(--hint)'}
  const tl={ig:'Instagram post',li:'LinkedIn post',em:'Email newsletter',bl:'Blog post'}[type]||'social post';
  const p=`Write a ${tl} for ${inp.brand||lb} — a ${inp.ind||'brand'}.
Concept: "${title}".
Brand voice: ${inp.tone||'engaging and direct'}.
Target audience: ${inp.aud||'general consumers'}.
${ctx?`Additional direction: ${ctx}`:''}
${type==='ig'?'End with 3\u20135 relevant hashtags on a new line.':''}
${type==='em'?'First line: "Subject: [subject line]". Then blank line. Then email body.':''}
Return ONLY the copy. No preamble. No "Here is your post:".`;
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,messages:[{role:'user',content:p}]})});
    const d=await r.json();
    if(d.error)throw new Error(d.error.message);
    const txt=d.content.map(c=>c.text||'').join('');
    if(pbt){pbt.value=txt;pbt.style.color='var(--dark)'}
  }catch(e){
    if(pbt){pbt.value=origVal||gDraft(title,type,inp);pbt.style.color='var(--dark)'}
  }
}

/* ── ASSETS ── */
function genAssetCanvas(a,brand,tagline){
  const parts=a.d.split('\u00d7');
  const origW=parseInt(parts[0]),origH=parseInt(parts[1]);
  // Scale to max 1080 on longest side for a usable download
  const maxDim=1080;
  const scale=Math.min(1,maxDim/Math.max(origW,origH));
  const cw=Math.round(origW*scale),ch=Math.round(origH*scale);
  const canvas=document.createElement('canvas');
  canvas.width=cw;canvas.height=ch;
  const ctx=canvas.getContext('2d');
  // Background
  ctx.fillStyle=a.bg;ctx.fillRect(0,0,cw,ch);
  // Radial highlight (subtle)
  const rad=ctx.createRadialGradient(cw*.22,ch*.2,0,cw*.22,ch*.2,Math.max(cw,ch)*.75);
  rad.addColorStop(0,'rgba(255,255,255,0.14)');rad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=rad;ctx.fillRect(0,0,cw,ch);
  // Top accent bar (brand gradient)
  const barH=Math.max(5,Math.round(ch*.013));
  const barG=ctx.createLinearGradient(0,0,cw,0);
  barG.addColorStop(0,'#3D4B6B');barG.addColorStop(.45,'#6B3FA0');barG.addColorStop(1,'#F4A26B');
  ctx.fillStyle=barG;ctx.fillRect(0,0,cw,barH);
  // Brand name
  const minDim=Math.min(cw,ch);
  const bSize=Math.max(20,Math.round(minDim*.1));
  ctx.fillStyle=a.tc;ctx.textAlign='center';ctx.textBaseline='alphabetic';
  ctx.font=`bold ${bSize}px Arial,sans-serif`;
  const midY=tagline?ch*.48:ch*.52;
  ctx.fillText(brand,cw/2,midY);
  // Tagline
  if(tagline){
    const tSize=Math.max(10,Math.round(bSize*.38));
    ctx.font=`${tSize}px Arial,sans-serif`;ctx.globalAlpha=.72;
    const tLine=tagline.length>48?tagline.slice(0,48)+'\u2026':tagline;
    ctx.fillText(tLine,cw/2,midY+bSize*.85);ctx.globalAlpha=1;
  }
  // Format label — top right
  const lSize=Math.max(9,Math.round(minDim*.034));
  ctx.font=`600 ${lSize}px Arial,sans-serif`;ctx.textAlign='right';ctx.textBaseline='top';
  ctx.fillStyle=a.tc;ctx.globalAlpha=.45;
  ctx.fillText(a.s,cw-Math.round(cw*.03),barH+Math.round(ch*.016));ctx.globalAlpha=1;
  // Dimensions — bottom right
  const dSize=Math.max(8,Math.round(minDim*.025));
  ctx.font=`${dSize}px Arial,sans-serif`;ctx.textAlign='right';ctx.textBaseline='bottom';
  ctx.fillStyle=a.tc;ctx.globalAlpha=.32;
  ctx.fillText(a.d+' px',cw-Math.round(cw*.03),ch-Math.round(ch*.016));ctx.globalAlpha=1;
  return canvas;
}

function downloadAsset(idx){
  const a=ASSETS[idx];
  const brand=lb!=='Your Brand'?lb:((gi('i-brand')&&gi('i-brand').value.trim())||'YourBrand');
  const tagline=gi('i-tagline')?gi('i-tagline').value.trim():'';
  const canvas=genAssetCanvas(a,brand,tagline);
  const link=document.createElement('a');
  const sb=brand.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const sl=a.s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  link.download=`${sb}-${sl}.png`;
  link.href=canvas.toDataURL('image/png');
  link.click();
}

function bAssets(){
  const brand=lb!=='Your Brand'?lb:((gi('i-brand')&&gi('i-brand').value.trim())||'Your Brand');
  const g=gi('agrid');
  if(!g)return;
  const filtered=ASSETS.filter(a=>atf==='all'||a.t===atf);
  g.innerHTML=filtered.map(a=>{
    const idx=ASSETS.indexOf(a);
    return `
    <div class="acard" data-type="${a.t}" data-name="${a.n.toLowerCase()}">
      <div class="athumb" style="background:${a.bg}">
        <div class="athumb-brand" style="color:${a.tc}">${brand}</div>
        <div class="athumb-sub"   style="color:${a.tc}">${a.s}</div>
      </div>
      <div class="ainfo">
        <div class="aname">${a.n}</div>
        <div class="adim">${a.d} px</div>
        <div class="abtn-row">
          <button class="abtn" onclick="downloadAsset(${idx})">Download PNG</button>
          <button class="abtn" onclick="showSpec('spec','${a.n}','${a.d}')">Spec</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function showSpec(mode,name,dim){
  alert(`Spec \u2014 ${name}\n\nFormat: PNG-24 (web) / PDF (print)\nColour: sRGB / CMYK\nRes: 72 dpi web / 300 dpi print\nSafe zone: 5% inset\nFonts: outline or embed`);
}
function fA(q){document.querySelectorAll('.acard').forEach(c=>{c.style.display=(c.dataset.name.includes(q.toLowerCase())&&(atf==='all'||c.dataset.type===atf))?'':'none'})}
function sAT(el,type){document.querySelectorAll('.asset-type-chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');atf=type;bAssets()}
