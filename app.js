let currentCell = null;

const $ = (id)=>document.getElementById(id);

function getInput(){
  return {
    brand: $('brand').value || 'Brand',
    industry: $('industry').value || '',
    objective: $('objective').value || '',
    audience: $('audience').value || '',
    tone: $('tone').value || ''
  };
}

/* =========================
   STRATEGY
========================= */

async function genStrategy(){
  const el = $('strategy');
  el.innerHTML = 'Building…';

  const res = await fetch('/api/generate', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ type:'strategy', input:getInput() })
  });

  const data = await res.json();

  el.innerHTML = `
    <div class="block"><div class="label">Headline</div>${data.headline}</div>
    <div class="block"><div class="label">Market truth</div>${data.market}</div>
    <div class="block"><div class="label">Positioning</div>${data.positioning}</div>
    <div class="block"><div class="label">Strategy</div>${data.strategy.map(x=>`• ${x}`).join('<br>')}</div>
    <div class="block"><div class="label">Messaging</div>${data.messaging.map(x=>`• ${x}`).join('<br>')}</div>
    <div class="block"><div class="label">Channel plan</div>${data.channels}</div>
  `;
}

/* =========================
   CALENDAR (generated + editable)
========================= */

function genCalendar(){
  const cal = $('calendar');
  cal.innerHTML = '';

  const seed = [
    'Hook: bold claim\nCTA: save',
    'Founder POV post\nCTA: comment',
    'Product demo clip\nCTA: click',
    'Social proof (testimonial)\nCTA: learn more',
    'Educational carousel\nCTA: share',
    'Offer / incentive\nCTA: buy'
  ];

  for(let i=1;i<=30;i++){
    const div = document.createElement('div');
    div.className='cal-cell';
    const txt = seed[(i-1)%seed.length];

    div.dataset.text = txt;
    div.innerHTML = `
      <div class="day-num">${i}</div>
      <div class="day-prev">${txt}</div>
    `;

    div.onclick = ()=>openModal(div);

    cal.appendChild(div);
  }
}

function openModal(cell){
  currentCell = cell;
  $('modalText').value = cell.dataset.text || '';
  $('modal').style.display = 'flex';
}

function closeModal(){
  $('modal').style.display = 'none';
}

function saveDay(){
  const txt = $('modalText').value || '';
  currentCell.dataset.text = txt;
  currentCell.querySelector('.day-prev').innerText = txt;
  closeModal();
}

/* =========================
   ASSETS (real images)
========================= */

async function genAssets(){
  const wrap = $('assets');
  wrap.innerHTML = 'Generating…';

  const res = await fetch('/api/generate', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ type:'assets', input:getInput() })
  });

  const data = await res.json();

  wrap.innerHTML = data.assets.map(a => `
    <div class="asset">
      <img src="${a.url}" />
      <div class="cap">${a.caption}</div>
    </div>
  `).join('');
}
