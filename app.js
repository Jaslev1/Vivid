function gi(id){ return document.getElementById(id); }

function getInput(){
  return {
    brand: gi('i-brand').value,
    industry: gi('i-ind').value,
    objective: gi('i-obj').value,
    audience: gi('i-aud').value,
    tone: gi('i-tone').value
  };
}

/* =========================
   STRATEGY
========================= */

async function generateStrategy(){
  const out = gi('out-strategy');
  out.innerHTML = 'Generating...';

  const res = await fetch('/api/generate', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      type:'strategy',
      input:getInput()
    })
  });

  const data = await res.json();
  out.innerHTML = data.text || 'Error generating strategy';
}

/* =========================
   CALENDAR
========================= */

function generateCalendar(){
  const cal = gi('calendar');
  cal.innerHTML = '';

  for(let i=1;i<=30;i++){
    const div = document.createElement('div');
    div.className = 'cal-cell';
    div.dataset.day = i;
    div.innerHTML = `<div class="day-num">${i}</div><div>Click to add</div>`;

    div.onclick = () => {
      const existing = div.dataset.text || '';
      const txt = prompt(`Day ${i} content`, existing);
      if(txt !== null){
        div.dataset.text = txt;
        div.innerHTML = `<div class="day-num">${i}</div><div>${txt.substring(0,60)}</div>`;
      }
    };

    cal.appendChild(div);
  }
}

/* =========================
   ASSETS
========================= */

async function generateAssets(){
  const wrap = gi('assets-wrap');
  wrap.innerHTML = 'Generating assets...';

  const res = await fetch('/api/generate', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      type:'assets',
      input:getInput()
    })
  });

  const data = await res.json();

  if(!data.assets){
    wrap.innerHTML = 'No assets returned';
    return;
  }

  wrap.innerHTML = data.assets.map(a => `
    <div>
      <img src="${a.url}">
      <div>${a.caption}</div>
    </div>
  `).join('');
}
