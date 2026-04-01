const ASSETS=[
  {n:'Feed post — square',  d:'1080×1080',t:'social', bg:'#F4A26B',tc:'#1A0F2E',sub:'IG Feed'},
  {n:'Story / Reel cover',  d:'1080×1920',t:'social', bg:'#722172',tc:'#fff',   sub:'IG Story'},
  {n:'LinkedIn banner',     d:'1128×191', t:'social', bg:'#3D5A99',tc:'#fff',   sub:'LI Banner'},
  {n:'LinkedIn post card',  d:'1200×627', t:'social', bg:'#3D3D8F',tc:'#fff',   sub:'LI Card'},
  {n:'X / Twitter card',    d:'1200×675', t:'social', bg:'#271D3D',tc:'#F4A26B',sub:'X Card'},
  {n:'Facebook cover',      d:'820×312',  t:'social', bg:'#9B6B8A',tc:'#fff',   sub:'FB Cover'},
  {n:'Pinterest pin',       d:'1000×1500',t:'social', bg:'#F4A26B',tc:'#1A0F2E',sub:'Pin'},
  {n:'Email header',        d:'600×200',  t:'email',  bg:'#1A1228',tc:'#F4A26B',sub:'Email Header'},
  {n:'Email footer',        d:'600×100',  t:'email',  bg:'#F0EAF8',tc:'#1A0F2E',sub:'Email Footer'},
  {n:'Email hero banner',   d:'600×300',  t:'email',  bg:'#722172',tc:'#fff',   sub:'Hero'},
  {n:'Leaderboard ad',      d:'728×90',   t:'display',bg:'#F4A26B',tc:'#1A0F2E',sub:'Leaderboard'},
  {n:'Medium rectangle',    d:'300×250',  t:'display',bg:'#3D5A99',tc:'#fff',   sub:'MPU'},
  {n:'Half page ad',        d:'300×600',  t:'display',bg:'#722172',tc:'#fff',   sub:'Half Page'},
  {n:'Skyscraper',          d:'160×600',  t:'display',bg:'#1A1228',tc:'#F4A26B',sub:'Sky'},
];

const CAL_EVENTS={
  1:[{t:'ig',tx:'Brand story reel'}],2:[{t:'li',tx:'Thought leadership'}],
  3:[{t:'em',tx:'Welcome sequence'}],5:[{t:'bl',tx:'Blog: industry insight'}],
  7:[{t:'ig',tx:'Behind the scenes'}],8:[{t:'li',tx:'Founder perspective'}],
  9:[{t:'ig',tx:'Product spotlight'}],10:[{t:'em',tx:'Nurture email 1'}],
  12:[{t:'ig',tx:'Educational carousel'}],13:[{t:'bl',tx:'Blog: how-to guide'}],
  14:[{t:'li',tx:'Case study post'}],15:[{t:'em',tx:'Mid-month offer'}],
  17:[{t:'ig',tx:'Customer testimonial'}],19:[{t:'ig',tx:'UGC feature'}],
  20:[{t:'li',tx:'Industry data post'}],21:[{t:'em',tx:'Retargeting email'}],
  22:[{t:'bl',tx:'Blog: roundup'}],23:[{t:'ig',tx:'Q+A story series'}],
  26:[{t:'ig',tx:'Week recap reel'}],28:[{t:'em',tx:'Monthly newsletter'}],
  29:[{t:'ig',tx:'Month wrap-up'}],30:[{t:'li',tx:'Results + reflection'}],
};

const T_MAP={ig:'Instagram',li:'LinkedIn',em:'Email',bl:'Blog'};
const CLS_MAP={ig:'ev-ig',li:'ev-li',em:'ev-em',bl:'ev-bl'};
const ALLOC_COLORS=['#3D5A99','#722172','#F4A26B','#9B6B8A','#3D3D8F'];
let aTypeFilter='all';
let lastBrand='Your Brand';
let dropFiles={};

function nav(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.alink').forEach(a=>a.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  const m={setup:0,strat:1,cal:2,assets:3};
  if(m[id]!==undefined){
    document.querySelectorAll('.tab')[m[id]].classList.add('on');
    document.querySelectorAll('.alink')[m[id]].classList.add('on');
  }
}

function getInputs(){
  return{
    brand: document.getElementById('i-brand').value.trim()||'Your Brand',
    ind:   document.getElementById('i-ind').value.trim()||'consumer brand',
    desc:  document.getElementById('i-desc').value.trim()||'',
    obj:   document.getElementById('i-obj').value||'Build brand awareness',
    aud:   document.getElementById('i-aud').value.trim()||'general consumers',
    bud:   document.getElementById('i-budv').textContent,
    tone:  document.getElementById('i-tone').value.trim()||'professional and engaging',
    ch:    Array.from(document.querySelectorAll('.cpill.on')).map(e=>e.textContent),
    bb:    document.getElementById('i-bb').value.trim()||'',
    prompt:document.getElementById('i-prompt').value.trim()||'',
    tagline:document.getElementById('i-tagline').value.trim()||'',
  };
}

/* ── FILE DROP ── */
function initDrop(zoneId,inputId,listId,key){
  const zone=document.getElementById(zoneId);
  const inp=document.getElementById(inputId);
  if(!zone||!inp)return;
  dropFiles[key]=[];
  zone.addEventListener('dragover',e=>{e.preventDefault();zone.classList.add('drag-over');});
  zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
  zone.addEventListener('drop',e=>{
    e.preventDefault();zone.classList.remove('drag-over');
    addFiles(e.dataTransfer.files,listId,key);
  });
  inp.addEventListener('change',()=>addFiles(inp.files,listId,key));
}

function addFiles(files,listId,key){
  Array.from(files).forEach(f=>{
    if(!dropFiles[key].includes(f.name)) dropFiles[key].push(f.name);
  });
  renderFileList(listId,key);
}

function removeFile(listId,key,name){
  dropFiles[key]=dropFiles[key].filter(n=>n!==name);
  renderFileList(listId,key);
}

function renderFileList(listId,key){
  const el=document.getElementById(listId);
  if(!el)return;
  el.innerHTML=dropFiles[key].map(n=>`<span class="drop-tag">${n}<span class="drop-tag-x" onclick="removeFile('${listId}','${key}','${n.replace(/'/g,"\\'")}')">&#x2715;</span></span>`).join('');
}

function initSidebarUpload(btnId,inputId,key){
  const btn=document.getElementById(btnId);
  const inp=document.getElementById(inputId);
  if(!btn||!inp)return;
  inp.addEventListener('change',()=>{
    if(inp.files.length){
      const name=inp.files[0].name;
      btn.classList.add('uploaded');
      const span=btn.querySelector('.u-name');
      if(span) span.textContent=name.length>22?name.slice(0,19)+'...':name;
    }
  });
}

/* ── GENERATE ── */
async function generate(){
  const inp=getInputs();
  if(!inp.brand||inp.brand==='Your Brand'){alert('Please enter a brand name to continue.');return;}
  lastBrand=inp.brand;
  document.getElementById('bar-brand').innerHTML=`<strong>${inp.brand}</strong>`;
  document.getElementById('gen-btn').disabled=true;
  nav('strat');
  buildAssets();
  await buildStrategy(inp);
  buildCal();
}

/* ── STRATEGY ── */
async function buildStrategy(inp){
  const si=document.getElementById('strat-inner');
  si.innerHTML=`<div class="loading"><div class="spin"></div><div class="load-txt">Building your strategy...</div><div class="load-step" id="load-step">Analysing brand inputs</div></div>`;
  const steps=['Analysing brand inputs','Setting campaign objectives','Mapping channel mix','Allocating budget','Drafting campaign phases','Writing key messages'];
  let s=0;
  const iv=setInterval(()=>{s++;const el=document.getElementById('load-step');if(el&&s<steps.length)el.textContent=steps[s];},900);

  const taglineClause=inp.tagline?`\nThe brand's own positioning line is: "${inp.tagline}" — use this verbatim as the headline, do not replace it.`:'';
  const promptClause=inp.prompt?`\nAdditional client direction: ${inp.prompt}`:'';

  const prompt=`You are a senior marketing strategist. Generate a rigorous, specific communications strategy for:

Brand: ${inp.brand}
Industry: ${inp.ind}
Description: ${inp.desc}
Objective: ${inp.obj}
Target audience: ${inp.aud}
Monthly budget: ${inp.bud}
Brand voice: ${inp.tone}
Channels: ${inp.ch.join(', ')}
Brand guidelines: ${inp.bb}${taglineClause}${promptClause}

IMPORTANT rules:
- The headline must be the brand's own positioning line if provided, otherwise write a sharp, specific, memorable strategic positioning statement. Never write something generic like "built to perform". Make it specific to this brand, audience and objective.
- Key messages must be specific, differentiated claims — not generic marketing speak. Each must be something only this brand can authentically say.
- KPI projections must be realistic for the budget (${inp.bud}/month) and channels. Label them as projections.
- Phase descriptions must name concrete tactics, not vague directions.

Return ONLY valid JSON, no markdown fences, no extra text:
{"headline":"the positioning line","summary":"2-3 sentences of specific strategic rationale","phases":[{"week":"Weeks 1–2","name":"phase name","desc":"specific tactics and rationale"},{"week":"Weeks 3–5","name":"phase name","desc":"specific tactics and rationale"},{"week":"Weeks 6–8","name":"phase name","desc":"specific tactics and rationale"}],"alloc":[{"lbl":"Paid social","pct":35},{"lbl":"Content creation","pct":25},{"lbl":"Email / CRM","pct":15},{"lbl":"Influencer","pct":15},{"lbl":"Contingency","pct":10}],"kpis":[{"lbl":"Projected monthly reach","val":"50K"},{"lbl":"Projected engagement","val":"4.5%"},{"lbl":"Projected email open","val":"28%"}],"messages":["specific claim 1 only this brand can make","specific claim 2","specific claim 3"]}`;

  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1400,messages:[{role:'user',content:prompt}]})
    });
    const data=await r.json();
    clearInterval(iv);
    if(data.error)throw new Error(data.error.message);
    const txt=data.content.map(c=>c.text||'').join('');
    const clean=txt.replace(/```json|```/g,'').trim();
    const strat=JSON.parse(clean);
    renderStrategy(strat,inp);
  }catch(e){
    clearInterval(iv);
    console.error('Strategy API error:',e);
    renderStrategy(fallbackStrat(inp),inp);
  }
}

function fallbackStrat(inp){
  const brand=inp.brand;
  const bud=inp.bud;
  return{
    headline:inp.tagline||`${brand}: where ${inp.ind} meets genuine impact`,
    summary:`This 8-week strategy positions ${brand} to capture attention and build lasting customer relationships through a disciplined mix of organic authority-building, paid amplification and email conversion. Every channel chosen aligns to where ${inp.aud||'your audience'} already spends time, and every budget allocation is tied to a measurable outcome.`,
    phases:[
      {week:'Weeks 1–2',name:'Foundation and authority',desc:`Launch ${brand}'s core content pillars: one long-form educational piece per week establishing category expertise, daily social posts on ${inp.ch[0]||'primary channel'} building organic reach, and founder/team content humanising the brand. Set up tracking pixels and email capture flows.`},
      {week:'Weeks 3–5',name:'Amplification and proof',desc:`Activate paid social on the top two organic posts from Week 2. Introduce third-party validation — press mentions, customer testimonials, usage data. Launch a 4-email nurture sequence to warm leads captured in Phase 1. A/B test two creative directions.`},
      {week:'Weeks 6–8',name:'Conversion and retention',desc:`Retarget all warm audiences (site visitors, email openers, social engagers) with a conversion-focused offer. Deploy cart-abandonment and browse-abandonment sequences. Introduce a referral mechanic for new customers. Measure CAC and begin optimising toward ${inp.obj||'primary objective'}.`},
    ],
    alloc:[{lbl:'Paid social',pct:35},{lbl:'Content creation',pct:25},{lbl:'Email / CRM',pct:15},{lbl:'Influencer / seeding',pct:15},{lbl:'Contingency',pct:10}],
    kpis:[{lbl:'Projected monthly reach',val:'45–60K'},{lbl:'Projected engagement',val:'4–6%'},{lbl:'Projected email open',val:'26–32%'}],
    messages:[
      `${brand} is the only ${inp.ind} brand that ${inp.desc?inp.desc.split('.')[0].toLowerCase():'puts its customers first'}`,
      `Built specifically for ${inp.aud?inp.aud.split(',')[0]:'people who know the difference'}`,
      `Every claim we make is backed by evidence — no empty promises`,
    ],
  };
}

function renderStrategy(s,inp){
  document.getElementById('strat-inner').innerHTML=`
  <div class="strat-block">
    <div class="accent-bar" style="margin:-32px -38px 30px"></div>
    <div class="ph">
      <div class="ph-eye">Communications strategy — ${inp.bud}/month</div>
      <div class="strat-headline">${s.headline}</div>
      <div class="strat-summary">${s.summary}</div>
    </div>
    <div class="kpi-notice">All metrics are projected estimates based on typical performance for this budget and channel mix. Actual results will vary.</div>
    <div class="kpi-row">${s.kpis.map(k=>`<div class="kpi"><div class="kpi-acc"></div><div class="kpi-lbl">${k.lbl}</div><div class="kpi-val">${k.val}</div></div>`).join('')}</div>
    <div class="sect-hd"><div class="sect-t">Campaign phases</div><div class="sect-r"></div><div class="sect-tag">8 weeks</div></div>
    <div class="phases">${s.phases.map((p,i)=>`<div class="phase"><div class="ph-week">${p.week}</div><div class="ph-line"><div class="ph-node"></div>${i<2?'<div class="ph-track"></div>':''}</div><div class="ph-body"><div class="ph-name">${p.name}</div><div class="ph-desc">${p.desc}</div></div></div>`).join('')}</div>
    <div class="sect-hd"><div class="sect-t">Budget allocation</div><div class="sect-r"></div></div>
    <div class="alloc"><div class="alloc-t">Monthly — ${inp.bud}</div>${s.alloc.map((a,i)=>`<div class="alloc-item"><div class="alloc-lbl">${a.lbl}</div><div class="alloc-track"><div class="alloc-fill" style="width:${a.pct}%;background:${ALLOC_COLORS[i%5]}"></div></div><div class="alloc-pct">${a.pct}%</div></div>`).join('')}</div>
    <div class="sect-hd"><div class="sect-t">Key messages</div><div class="sect-r"></div></div>
    <div class="msgs">${s.messages.map(m=>`<div class="msg"><div class="msg-text">${m}</div></div>`).join('')}</div>
    <div class="action-row">
      <button class="btn-g" onclick="nav('cal')">View content plan</button>
      <button class="btn-g" onclick="nav('assets')">View asset inventory</button>
    </div>
  </div>`;
}

/* ── CALENDAR ── */
function buildCal(){
  const on=Array.from(document.querySelectorAll('#p-cal .fchip.on')).map(c=>c.textContent.toLowerCase().trim());
  const g=document.getElementById('cal-grid');
  const dh=['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let h=dh.map(d=>`<div class="cal-dh">${d}</div>`).join('');
  for(let w=0;w<5;w++){
    h+=`<div class="cal-wlbl">W${w+1}</div>`;
    for(let d=0;d<7;d++){
      const dt=w*7+d+1;
      if(dt>30){h+=`<div class="cal-cell" style="background:var(--off)"></div>`;continue;}
      const evs=(CAL_EVENTS[dt]||[]).filter(e=>on.includes(T_MAP[e.t].toLowerCase()));
      h+=`<div class="cal-cell"><div class="cal-dn">${dt}</div>${evs.map(e=>`<div class="cal-ev ${CLS_MAP[e.t]}" onclick="openPost('${e.tx}','${e.t}')">${e.tx}</div>`).join('')}</div>`;
    }
  }
  g.innerHTML=h;
}

function openPost(title,type){
  document.getElementById('post-area').innerHTML=`
  <div class="post-card">
    <div class="post-card-hd">
      <div class="post-card-title">${title}</div>
      <button class="btn-g" onclick="genPost('${title}','${type}')">Generate copy</button>
    </div>
    <div class="post-body-txt" id="pbt" style="color:var(--ml2);font-style:italic">Click generate copy to draft this post.</div>
    <div class="post-foot">
      <button class="btn-g" onclick="navigator.clipboard.writeText(document.getElementById('pbt').textContent)">Copy text</button>
      <button class="btn-g" onclick="document.getElementById('post-area').innerHTML=''">Close</button>
    </div>
  </div>`;
}

async function genPost(title,type){
  const inp=getInputs();
  const pbt=document.getElementById('pbt');
  if(pbt){pbt.style.fontStyle='normal';pbt.textContent='Writing...';}
  const tl={ig:'Instagram',li:'LinkedIn',em:'Email newsletter',bl:'Blog post'}[type]||'social post';
  const p=`Write a ${tl} post for ${inp.brand||lastBrand} (${inp.ind}). Concept: "${title}". Brand voice: ${inp.tone||'engaging and direct'}. Audience: ${inp.aud||'target consumers'}. Be specific and on-brand. Instagram: include 3-5 relevant hashtags. Email newsletter: include a compelling subject line. Return ONLY the post copy, no preamble or explanation.`;
  try{
    const r=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:500,messages:[{role:'user',content:p}]})
    });
    const d=await r.json();
    if(d.error)throw new Error(d.error.message);
    if(pbt)pbt.textContent=d.content.map(c=>c.text||'').join('');
  }catch(e){
    if(pbt)pbt.textContent='Could not generate — please try again.';
  }
}

/* ── ASSETS ── */
function buildAssets(){
  const brand=lastBrand!=='Your Brand'?lastBrand:(document.getElementById('i-brand').value.trim()||'Your Brand');
  const g=document.getElementById('agrid');
  g.innerHTML=ASSETS
    .filter(a=>aTypeFilter==='all'||a.t===aTypeFilter)
    .map(a=>`
      <div class="acard" data-type="${a.t}" data-name="${a.n.toLowerCase()}">
        <div class="athumb" style="background:${a.bg}">
          <div class="athumb-brand" style="color:${a.tc}">${brand}</div>
          <div class="athumb-sub" style="color:${a.tc}">${a.sub}</div>
        </div>
        <div class="ainfo">
          <div class="aname">${a.n}</div>
          <div class="adim">${a.d} px</div>
          <div class="abtn-row">
            <button class="abtn" onclick="showInfo('resize','${a.n}','${a.d}')">Resize guide</button>
            <button class="abtn" onclick="showInfo('spec','${a.n}','${a.d}')">Spec sheet</button>
          </div>
        </div>
      </div>`).join('');
}

function showInfo(mode,name,dim){
  if(mode==='resize'){
    alert(`Resize variants — ${name} (${dim})\n\nStandard platform sizes:\n• Instagram feed: 1080×1080, 1080×1350 (4:5)\n• Instagram Story/Reel: 1080×1920\n• LinkedIn post: 1200×627\n• LinkedIn Story: 1080×1920\n• Twitter/X: 1200×675\n• Facebook feed: 1200×630\n• Facebook cover: 820×312\n• Pinterest: 1000×1500 or 1000×2100\n\nAlways export at 2× for retina screens. Keep all critical content within 80% safe zone.`);
  }else{
    alert(`Production spec — ${name}\n\nFile format: PNG-24 (digital) / PDF (print-ready)\nColour mode: sRGB (screen) / CMYK (print)\nResolution: 72 dpi for web / 300 dpi for print\nSafe zone: 5% inset on all four sides\nMax upload size: 8MB (most platforms accept up to 30MB)\nFonts: embed or convert to outlines before export\nBleed (print only): 3mm on all sides outside safe zone`);
  }
}

function filterA(q){
  document.querySelectorAll('.acard').forEach(c=>{
    const m=c.dataset.name.includes(q.toLowerCase());
    const tm=aTypeFilter==='all'||c.dataset.type===aTypeFilter;
    c.style.display=(m&&tm)?'':'none';
  });
}

function setAT(el,type){
  document.querySelectorAll('.asset-bar .fchip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  aTypeFilter=type;
  buildAssets();
}

document.addEventListener('DOMContentLoaded',()=>{
  buildAssets();
  buildCal();
  initDrop('drop-brand','drop-brand-inp','drop-brand-files','brandbook');
  initSidebarUpload('su-brief','su-brief-inp','brief');
  initSidebarUpload('su-guide','su-guide-inp','guide');
  initSidebarUpload('su-report','su-report-inp','report');
});
