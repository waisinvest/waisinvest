// WAIS INCOME v2.2 — clickable stage navigation for the public Income ETF board.
// Presentation/navigation only. No proprietary ranking weights or buy logic are exposed here.
(function(){
  const d = window.WAIS_MARKET_DATA || (window.WAIS_MARKET_DATA = {});

  const STAGES = [
    {key:'ready', label:'GREEN · READY INCOME 1', cls:'income-stage-ready', help:'Approved first-tranche / active trade stage'},
    {key:'watch', label:'CYAN · WATCH INCOME', cls:'income-stage-watch', help:'Nearest promotion queue to READY INCOME 1'},
    {key:'candidate', label:'ORANGE · INCOME CANDIDATE', cls:'income-stage-candidate', help:'Candidate under active validation'},
    {key:'research', label:'VIOLET · RESEARCH', cls:'income-stage-research', help:'Research / discovery stage'},
    {key:'defense', label:'RED · DEFENSE / AVOID', cls:'income-stage-defense', help:'Defense, phase-out or avoid stage'}
  ];

  function tickerOf(card){
    return card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase() || '';
  }
  function itemOf(ticker){
    return (d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===ticker) || null;
  }
  function classify(item){
    const s=String(item?.status||'RESEARCH').toUpperCase();
    if(/DEFENSE|AVOID|PHASE OUT|BELOW 3/.test(s)) return 'defense';
    if(/READY/.test(s)) return 'ready';
    if(/CANDIDATE\+|WATCH INCOME/.test(s)) return 'watch';
    if(/INCOME CANDIDATE|WAIT INCOME|WAIT|CAUTIOUS/.test(s)) return 'candidate';
    return 'research';
  }

  function allCards(){ return [...document.querySelectorAll('#income .income-card')]; }

  function showStage(stage){
    const cards=allCards();
    let first=null, count=0;
    cards.forEach(card=>{
      const item=itemOf(tickerOf(card));
      const match=stage==='all' || classify(item)===stage;
      card.style.display=match?'':'none';
      if(match){ count++; if(!first) first=card; }
    });
    document.querySelectorAll('.income-stage-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.incomeStage===stage));
    const result=document.getElementById('incomeStageResult');
    if(result) result.textContent=stage==='all'?`ALL · ${count} ETFs`:`${count} ETFs`;
    // Keep the user inside Income ETFs and move directly to the first matching fund.
    if(first) setTimeout(()=>first.scrollIntoView({behavior:'smooth',block:'center'}),60);
  }

  function install(){
    const income=document.getElementById('income');
    const legend=income?.querySelector('.signal-legend');
    if(!legend || legend.dataset.stageNavReady==='1') return;
    legend.dataset.stageNavReady='1';
    legend.innerHTML=`
      <div class="income-stage-nav-head"><span>INCOME STAGE</span><small id="incomeStageResult">Tap a stage to view ETFs</small></div>
      <div class="income-stage-nav-buttons">
        ${STAGES.map(s=>`<button type="button" class="signal-chip income-stage-btn ${s.cls}" data-income-stage="${s.key}" title="${s.help}">${s.label}</button>`).join('')}
        <button type="button" class="signal-chip income-stage-btn income-stage-all" data-income-stage="all">ALL</button>
      </div>`;
    legend.addEventListener('click',e=>{
      const btn=e.target.closest('.income-stage-btn');
      if(!btn) return;
      showStage(btn.dataset.incomeStage||'all');
    });

    // Ready summary cards become direct navigation controls as well.
    ['weeklyIncomeReadyCount','monthlyIncomeReadyCount'].forEach(id=>{
      const metric=document.getElementById(id)?.closest('.metric-card');
      if(metric){
        metric.classList.add('income-ready-shortcut');
        metric.setAttribute('role','button'); metric.setAttribute('tabindex','0');
        metric.title='Show READY INCOME 1 ETFs';
        const go=()=>showStage('ready');
        metric.addEventListener('click',go);
        metric.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go();}});
      }
    });
  }

  const css=document.createElement('style');
  css.textContent=`
    .signal-legend{display:block!important}.income-stage-nav-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}.income-stage-nav-head>span{font-size:10px;font-weight:800;letter-spacing:1.3px;color:#8fa7ca}.income-stage-nav-head small{font-size:10px;color:#8597b2}
    .income-stage-nav-buttons{display:flex;gap:8px;flex-wrap:wrap}.income-stage-btn{border:1px solid transparent;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease,filter .12s ease}.income-stage-btn:hover,.income-stage-btn:focus-visible{transform:translateY(-1px);filter:brightness(1.08);outline:none}.income-stage-btn.active{box-shadow:0 0 0 2px rgba(255,255,255,.16) inset,0 0 18px rgba(100,190,255,.16)}
    .income-stage-ready{background:rgba(54,196,132,.16)!important;border-color:rgba(54,196,132,.55)!important;color:#8ff0c2!important}.income-stage-watch{background:rgba(52,200,220,.14)!important;border-color:rgba(52,200,220,.52)!important;color:#91e9f3!important}.income-stage-candidate{background:rgba(244,164,63,.14)!important;border-color:rgba(244,164,63,.55)!important;color:#ffc77d!important}.income-stage-research{background:rgba(155,112,235,.14)!important;border-color:rgba(155,112,235,.55)!important;color:#cbb1ff!important}.income-stage-defense{background:rgba(236,83,90,.14)!important;border-color:rgba(236,83,90,.55)!important;color:#ff9ba1!important}.income-stage-all{background:rgba(120,140,170,.12)!important;border-color:rgba(120,140,170,.42)!important;color:#c5d1e4!important}
    .income-ready-shortcut{cursor:pointer}.income-ready-shortcut:hover{box-shadow:0 0 0 1px rgba(80,220,165,.28) inset}
    @media(max-width:720px){.income-stage-nav-head{align-items:flex-start;flex-direction:column}.income-stage-nav-buttons{gap:6px}.income-stage-btn{font-size:9px!important}}
  `;
  document.head.appendChild(css);

  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,650));
  window.addEventListener('wais:quotes-updated',()=>setTimeout(install,60));
})();
