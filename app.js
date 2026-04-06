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
let atf='all', lb='Your Brand', dff=[], isGen=false, canvasFont='Arial,sans-serif';

/* Inter is loaded by style.css — wait for it to be ready for Canvas use */
document.fonts.ready.then(()=>{
  if(document.fonts.check('bold 16px Inter'))canvasFont='Inter,Arial,sans-serif';
});

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
  await bCalDynamic(inp);
  enGen();
}

/* ── STRATEGY ── */
async function bStrat(inp){
  const si=gi('strat-inner');
  si.innerHTML=`<div class="accent-rule"></div><div class="inner-content"><div class="loading"><div class="spin"></div><div class="load-txt">Building your strategy...</div><div class="load-step" id="ls">Analysing brand inputs</div></div></div>`;
  const steps=['Analysing brand inputs','Setting campaign objectives','Mapping channel mix','Allocating budget','Drafting 8-week phases','Writing key messages'];
  let s=0;const iv=setInterval(()=>{s++;const el=gi('ls');if(el&&s<steps.length)el.textContent=steps[s]},900);
  const tN=inp.tagline?`\nCRITICAL — the "headline" field must be EXACTLY this verbatim, character for character: "${inp.tagline}"`:'' ;
  const pN=inp.prompt?`\nClient brief — treat this as the highest-priority input: ${inp.prompt}`:'';
  const bbN=inp.bb?`\nBrand guidelines / extra context: ${inp.bb}`:'';

  const prompt=`You are a senior brand strategist — 20+ years across Ogilvy, Wieden+Kennedy, and growth-stage independents. You have been hired because the client is tired of generic strategy decks. Producing template output is a professional failure that will cost you the account.

━━ BRAND BRIEF ━━
Brand: ${inp.brand}
Category: ${inp.ind}
What they actually do: ${inp.desc||'Not provided — infer specifically from industry and audience; do not leave gaps'}
Campaign objective: ${inp.obj}
Target audience: ${inp.aud||'Not specified — define the most credible primary segment given the category'}
Monthly budget: ${inp.bud}
Channels: ${inp.ch.join(', ')}
Voice: ${inp.tone}${bbN}${tN}${pN}

━━ STRATEGIC REASONING (do this thinking before writing a word of JSON) ━━
1. What do the 2–3 dominant brands in ${inp.ind} all do identically? That shared behaviour is the gap.
2. What does ${inp.brand} do (from the description above) that none of them do — or do badly?
3. What is the one psychological truth about ${inp.aud} that most ${inp.ind} brands are ignoring or are too scared to say out loud?
4. What is the single strategic bet for this 8-week campaign — one primary message, one lead channel, one audience segment to own first?
Use that reasoning to drive every field below.

━━ FIELD RULES (a violation in any field means the output fails) ━━

headline: ${inp.tagline?`VERBATIM — copy character for character: "${inp.tagline}"`:`The strategic wedge in 6–9 words. Must encode what ${inp.brand} owns that competitors cannot credibly claim. Forbidden words: innovative, smart, better, leading, trusted, quality, results, solutions — and any phrase a competitor could put on their own homepage.`}

summary: Two sentences, no more.
Sentence 1 — the market indictment: name the specific failure mode of incumbent ${inp.ind} brands that creates ${inp.brand}'s opening. Do not say "most brands overpromise" — say what they specifically do wrong and why ${inp.aud} are fed up with it.
Sentence 2 — the mechanism: describe how ${inp.brand} wins at ${inp.bud}/month using ${inp.ch.join(' + ')} — name the psychological transition the campaign creates (scepticism → curiosity → trust → purchase), not just the channels.

phases: 4 phases × 3 tactics each. Every single tactic must:
(a) name a concrete, schedulable action — not a content type
(b) reference the specific angle, audience pain point, or brand proof being used
(c) name the one metric that tells you it worked
Example of good: "3-post carousel: the top 3 ${inp.ind} mistakes ${inp.aud} make, each with a ${inp.brand} fix — target metric: save rate >8%"
Example of failure: "Create engaging content" / "Post on Instagram" / "Build brand awareness"

messages: Three messages. Each must pull a different psychological lever:
Message 1 — Loss/risk: what ${inp.aud} are concretely losing or risking by not using ${inp.brand} — make it specific and uncomfortable
Message 2 — Identity/aspiration: who ${inp.aud} become or how they see themselves when they use ${inp.brand} — not a feature, a self-image
Message 3 — Proof/authority: one specific, verifiable claim about what ${inp.brand} delivers — rooted in the description provided, not a category-level boast
No message may share a sentence structure with another. None may appear in a competitor's deck.

kpis: Realistic projected ranges for ${inp.bud}/month on ${inp.ch.join(', ')} — not aspirational, not sandbagged.
alloc: Reflect actual channel mix: ${inp.ch.join(', ')}. Must sum to 100.

━━ OUTPUT ━━
Return ONLY valid JSON. No markdown fences, no commentary, no explanation:
{"headline":"...","summary":"...","phases":[{"week":"Weeks 1–2","name":"...","desc":"..."},{"week":"Weeks 3–4","name":"...","desc":"..."},{"week":"Weeks 5–6","name":"...","desc":"..."},{"week":"Weeks 7–8","name":"...","desc":"..."}],"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer / seeding","pct":15},{"lbl":"Contingency","pct":10}],"kpis":[{"lbl":"Projected monthly reach","val":"..."},{"lbl":"Projected engagement rate","val":"..."},{"lbl":"Projected email open rate","val":"..."}],"messages":["...","...","..."]}`;

  let data=null;
  try{
    const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:prompt}],max_tokens:1800})});
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    const res=await r.json();clearInterval(iv);
    if(res.error)throw new Error(res.error);
    const txt=res.choices[0].message.content;
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

/* ── DYNAMIC CALENDAR ── */
async function bCalDynamic(inp){
  /* Map selected channels to our 4 calendar types */
  const chMap={instagram:'ig',linkedin:'li',email:'em',facebook:'ig',tiktok:'ig','x / twitter':'li','x/twitter':'li',twitter:'li',youtube:'bl',pinterest:'ig',blog:'bl',content:'bl'};
  const activeTypes=[...new Set(inp.ch.map(c=>chMap[c.toLowerCase().trim()]||'ig'))];

  const p=`You are a senior content strategist. Generate exactly 24 post concepts for an 8-week campaign for ${inp.brand}.

Brand: ${inp.brand}
Category: ${inp.ind}
What they do: ${inp.desc||'not specified'}
Audience: ${inp.aud||'general consumers'}
Voice: ${inp.tone||'professional'}
Channels in use: ${inp.ch.join(', ')}
Campaign objective: ${inp.obj}

RULES — every concept must follow all of these:
1. The title must be a specific, concrete hook — a number, a tension, a bold claim, or a named outcome. It must make ${inp.aud} want to stop and read.
2. Reference something real about ${inp.brand}, ${inp.ind}, or ${inp.aud} — not generic social media wisdom.
3. The sequence must build logically over 8 weeks: weeks 1–2 = awareness/problem, weeks 3–4 = proof/credibility, weeks 5–6 = conversion/offer, weeks 7–8 = retention/community.
4. NO generic labels: "Founder story", "Educational post", "Product spotlight", "Testimonial", "Behind the scenes" are formats not concepts — forbidden.

Good example title: "The one document ${inp.aud} always forget — and what it costs them"
Bad example title: "Educational carousel" or "Brand story post"

Use only these channel codes: ${activeTypes.join(', ')}
(ig = Instagram/short-form visual, li = LinkedIn/Twitter, em = Email, bl = Blog/long-form)
Distribute evenly across the active channel types.

Return ONLY a valid JSON array of exactly 24 objects. No markdown, no commentary:
[{"t":"ig","x":"Specific hook-driven title here"},...]`;

  try{
    const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:p}],max_tokens:1000})});
    const d=await r.json();
    if(d.error)throw new Error(d.error);
    const txt=d.choices[0].message.content;
    const match=txt.match(/\[[\s\S]*\]/);
    if(!match)throw new Error('No JSON array');
    const concepts=JSON.parse(match[0]).slice(0,24);
    /* Spread across Mon / Wed / Fri of each of 8 weeks */
    const slots=[1,3,5,8,10,12,15,17,19,22,24,26,29,31,33,36,38,40,43,45,47,50,52,54];
    Object.keys(CE).forEach(k=>delete CE[k]);
    concepts.forEach((c,i)=>{
      if(i<slots.length){const day=slots[i];if(!CE[day])CE[day]=[];CE[day].push({t:c.t||'ig',x:String(c.x).slice(0,60)});}
    });
  }catch(e){console.warn('Calendar AI failed — keeping defaults:',e.message);}
  bCal();
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
  const p=`Write a ${tl} for the brand "${inp.brand||lb}".

Brand details:
- Industry: ${inp.ind||'not specified'}
- What they do: ${inp.desc||'not specified'}
- Target audience: ${inp.aud||'general consumers'}
- Brand voice: ${inp.tone||'engaging and direct'}
- Post concept: "${title}"
${ctx?`- Writer direction: ${ctx}`:''}

Rules:
- The copy must sound like it comes from ${inp.brand||lb} specifically — reference their industry, audience, or what they do
- Voice: ${inp.tone||'engaging and direct'}
- No filler phrases ("excited to share", "in today's world", "game-changer")
${type==='ig'?'- End with 3–5 relevant hashtags on a new line. Use real hashtag format (#word).':''}
${type==='em'?'- First line must be "Subject: [subject line]". Then a blank line. Then the email body.':''}
${type==='li'?'- LinkedIn format: short punchy opener, numbered points or short paragraphs, close with a question or call to action.':''}
${type==='bl'?'- Blog format: H1 title, intro paragraph, 2–3 subheadings (##), body text under each, closing paragraph.':''}
Return ONLY the finished copy. No preamble, no explanation, no "Here is your post:".`;
  try{
    const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:p}],max_tokens:700})});
    const d=await r.json();
    if(d.error)throw new Error(d.error);
    const txt=d.choices[0].message.content;
    if(pbt){pbt.value=txt;pbt.style.color='var(--dark)'}
  }catch(e){
    if(pbt){pbt.value=origVal||gDraft(title,type,inp);pbt.style.color='var(--dark)'}
  }
}

/* ── ASSETS ── */
/* Shrink font until text fits within maxW px, respecting a minimum size */
function fitText(ctx,text,maxW,startSize,minSize,weight){
  const w=weight||'bold';
  let sz=startSize;
  ctx.font=`${w} ${sz}px ${canvasFont}`;
  while(ctx.measureText(text).width>maxW&&sz>minSize){
    sz=Math.max(minSize,sz-1);
    ctx.font=`${w} ${sz}px ${canvasFont}`;
  }
  return sz;
}

function genAssetCanvas(a,brand,tagline){
  const parts=a.d.split('\u00d7');
  const origW=parseInt(parts[0]),origH=parseInt(parts[1]);
  const maxDim=1080;
  const scale=Math.min(1,maxDim/Math.max(origW,origH));
  const cw=Math.round(origW*scale),ch=Math.round(origH*scale);
  const canvas=document.createElement('canvas');
  canvas.width=cw;canvas.height=ch;
  const ctx=canvas.getContext('2d');

  const isLand=cw>ch*1.4;   // wide banners (LI, leaderboard, email header, FB cover)
  const isTall=ch>cw*1.2;   // portrait (story, skyscraper, half-page, pin)
  const minD=Math.min(cw,ch);

  /* ── 1. SOLID BACKGROUND ── */
  ctx.fillStyle=a.bg;ctx.fillRect(0,0,cw,ch);

  /* ── 2. GEOMETRIC LAYER ── */
  ctx.save();
  if(isLand){
    // Right-side large circle bleed
    ctx.beginPath();ctx.arc(cw*.88,ch*.5,ch*.9,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fill();
    // Second smaller circle
    ctx.beginPath();ctx.arc(cw*.82,ch*.5,ch*.45,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.05)';ctx.fill();
    // Left vertical accent stripe
    ctx.fillStyle='rgba(255,255,255,0.07)';
    ctx.fillRect(0,0,Math.max(3,Math.round(cw*.004)),ch);
  }else if(isTall){
    // Top large arc bleeding off top edge
    ctx.beginPath();ctx.arc(cw*.5,ch*.08,cw*.78,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill();
    // Bottom-left small circle
    ctx.beginPath();ctx.arc(cw*.1,ch*.88,cw*.32,0,Math.PI*2);
    ctx.fillStyle='rgba(0,0,0,0.10)';ctx.fill();
    // Horizontal band in lower third
    ctx.fillStyle='rgba(0,0,0,0.12)';
    ctx.fillRect(0,ch*.72,cw,ch*.28);
  }else{
    // Square: large circle top-right bleeding off
    ctx.beginPath();ctx.arc(cw*.85,ch*.18,cw*.55,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill();
    // Small circle bottom-left
    ctx.beginPath();ctx.arc(cw*.15,ch*.82,cw*.22,0,Math.PI*2);
    ctx.fillStyle='rgba(0,0,0,0.09)';ctx.fill();
  }
  ctx.restore();

  /* ── 3. RADIAL HIGHLIGHT (top-left warmth) ── */
  const rad=ctx.createRadialGradient(cw*.18,ch*.15,0,cw*.18,ch*.15,Math.max(cw,ch)*.7);
  rad.addColorStop(0,'rgba(255,255,255,0.11)');rad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=rad;ctx.fillRect(0,0,cw,ch);

  /* ── 4. TOP ACCENT BAR (brand gradient) ── */
  const barH=Math.max(5,Math.round(ch*(isLand?.025:.012)));
  const barG=ctx.createLinearGradient(0,0,cw,0);
  barG.addColorStop(0,'#3D4B6B');barG.addColorStop(.45,'#6B3FA0');barG.addColorStop(1,'#F4A26B');
  ctx.fillStyle=barG;ctx.fillRect(0,0,cw,barH);

  /* ── 5. TYPOGRAPHY ── */
  ctx.fillStyle=a.tc;

  if(isLand){
    /* LANDSCAPE: left-aligned, vertically centred */
    const pad=cw*.055;
    const maxBW=cw*(tagline?.52:.62);
    const startB=Math.max(14,Math.round(ch*(tagline?.38:.46)));
    const bSize=fitText(ctx,brand,maxBW,startB,10,'bold');
    ctx.textAlign='left';ctx.textBaseline='middle';
    ctx.fillStyle=a.tc;
    const textBlockY=ch*.5+(tagline?-bSize*.42:0);
    ctx.fillText(brand,pad,textBlockY);
    if(tagline){
      const tSize=Math.max(9,Math.round(bSize*.36));
      fitText(ctx,tagline,cw*(1-pad/cw*.2-.15),tSize,8,'');
      ctx.globalAlpha=.70;
      const tLine=tagline.length>60?tagline.slice(0,60)+'\u2026':tagline;
      ctx.fillText(tLine,pad,textBlockY+bSize*.82);
      ctx.globalAlpha=1;
    }
    ctx.fillStyle=a.tc;ctx.globalAlpha=.22;
    ctx.fillRect(pad-Math.round(pad*.18),ch*.22,Math.max(2,Math.round(cw*.002)),ch*.56);
    ctx.globalAlpha=1;ctx.fillStyle=a.tc;
    const lSize=Math.max(8,Math.round(ch*.13));
    fitText(ctx,a.s,cw*.25,lSize,7,'700');
    ctx.textAlign='right';ctx.globalAlpha=.30;
    ctx.fillText(a.s,cw-pad,ch*.5);ctx.globalAlpha=1;
  }else{
    /* PORTRAIT / SQUARE: centred layout */
    const cx=cw/2;
    const maxBW=cw*.82;
    const startB=Math.max(20,Math.round(minD*(isTall?.09:.105)));
    const bSize=fitText(ctx,brand,maxBW,startB,14,'bold');
    const nameY=isTall?ch*.44:ch*(tagline?.44:.5);
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle=a.tc;
    ctx.fillText(brand,cx,nameY);
    const ruleW=minD*.28;
    const ruleY=nameY+bSize*.68;
    ctx.strokeStyle=a.tc;ctx.globalAlpha=.22;ctx.lineWidth=Math.max(1,Math.round(minD*.002));
    ctx.beginPath();ctx.moveTo(cx-ruleW/2,ruleY);ctx.lineTo(cx+ruleW/2,ruleY);ctx.stroke();
    ctx.globalAlpha=1;
    if(tagline){
      const tSize=fitText(ctx,tagline,cw*.78,Math.max(10,Math.round(bSize*.36)),8,'');
      ctx.globalAlpha=.70;
      const tLine=tagline.length>42?tagline.slice(0,42)+'\u2026':tagline;
      ctx.fillText(tLine,cx,ruleY+tSize*1.3);ctx.globalAlpha=1;
    }
    if(isTall){
      const lSize=fitText(ctx,a.s,cw*.6,Math.max(9,Math.round(minD*.04)),7,'700');
      ctx.textAlign='center';ctx.globalAlpha=.38;
      ctx.fillText(a.s,cx,ch*.88);ctx.globalAlpha=1;
    }
  }

  /* ── 6. FORMAT LABEL top-right (non-tall) ── */
  if(!isTall){
    const lSz=fitText(ctx,a.s,cw*.22,Math.max(8,Math.round(minD*.028)),7,'600');
    ctx.textAlign='right';ctx.textBaseline='top';
    ctx.fillStyle=a.tc;ctx.globalAlpha=.38;
    ctx.fillText(a.s,cw-Math.round(cw*.025),barH+Math.round(ch*.018));
    ctx.globalAlpha=1;
  }

  /* ── 7. DIMENSIONS WATERMARK bottom-right ── */
  const dSz=Math.max(7,Math.round(minD*.022));
  ctx.font=`${dSz}px ${canvasFont}`;
  ctx.textAlign='right';ctx.textBaseline='bottom';
  ctx.fillStyle=a.tc;ctx.globalAlpha=.22;
  ctx.fillText(a.d+' px',cw-Math.round(cw*.025),ch-Math.round(ch*.018));
  ctx.globalAlpha=1;

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
