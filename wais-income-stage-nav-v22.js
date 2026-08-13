// WAIS INCOME v2.3 — single-meaning stage colours + persistent clickable stage navigation.
// Presentation/navigation only. No proprietary ranking weights or buy logic are exposed here.
(function(){
  const d = window.WAIS_MARKET_DATA || (window.WAIS_MARKET_DATA = {});
  let currentStage='all';

  // One colour = one decision stage. Metric percentages are deliberately neutral.
  const STAGES = [
    {key:'ready', label:'GREEN · READY INCOME 1', cls:'income-stage-ready', help:'Approved first-tranche / active trade-management stage'},
    {key:'watch', label:'CYAN · WATCH INCOME', cls:'income-stage-watch', help:'Nearest promotion queue to READY INCOME 1'},
    {key:'candidate', label:'ORANGE · INCOME CANDIDATE', cls:'income-stage-candidate', help:'Active candidate; more validation required before Watch / Ready'},
    {key:'research', label:'VIOLET · RESEARCH', cls:'income-stage-research', help:'Discovery / research stage'},
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
    if(/DEFENSE|AVOID|PHASE OUT|BELOW 3|REMOVE/.test(s)) return 'defense';
    if(/READY/.test(s)) return 'ready';
    if(/CANDIDATE\+|WATCH INCOME/.test(s)) return 'watch';
    if(/INCOME CANDIDATE|WAIT INCOME|WAIT|CAUTIOUS/.test(s)) return 'candidate';
    return 'research';
  }
  function stageLabel(stage){
    return ({ready:'READY INCOME 1',watch:'WATCH INCOME',candidate:'INCOME CANDIDATE',research:'RESEARCH',defense:'DEFENSE / AVOID'})[stage] || 'RESEARCH';
  }
  function allCards(){ return [...document.querySelectorAll('#income .income-card')]; }

  function normalizeCard(card){
    const item=itemOf(tickerOf(card));
    const stage=classify(item);
    card.dataset.waisStage=stage;

    // Add one explicit stage badge. This is the ONLY colour-coded decision signal on the card.
    let badge=card.querySelector('.wais-stage-badge');
    if(!badge){
      badge=document.createElement('span');
      badge.className='wais-stage-badge';
      const row=card.querySelector('.income-title-row');
      if(row) row.appendChild(badge); else card.prepend(badge);
    }
    badge.textContent=stageLabel(stage);

    // Numeric income metrics must not imply Ready / Candidate / Defense by colour.
    card.querySelectorAll('.yield-hero strong,.stock-meta b,.safe-entry-grid strong').forEach(el=>el.classList.add('wais-metric-neutral'));
    return stage;
  }

  function applyStageFilter(scroll=false){
    const cards=allCards();
    let first=null,count=0;
    cards.forEach(card=>{
      const stage=normalizeCard(card);
      const match=currentStage==='all' || stage===currentStage;
      card.hidden=!match;
      card.style.display=match?'':'none';
      if(match){ count++; if(!first) first=card; }
    });
    document.querySelectorAll('.income-stage-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.incomeStage===currentStage));
    const result=document.getElementById('incomeStageResult');
    if(result) result.textContent=currentStage==='all'?`ALL · ${count} ETFs`:`${stageLabel(currentStage)} · ${count} ETFs`;
    if(scroll && first) setTimeout(()=>first.scrollIntoView({behavior:'smooth',block:'center'}),60);
  }

  function showStage(stage){
    currentStage=stage||'all';
    // The legacy 30D selector can remain active, but stage navigation owns visibility immediately.
    applyStageFilter(true);
    // Re-apply after any legacy renderer finishes its own synchronous / delayed display update.
    setTimeout(()=>applyStageFilter(false),180);
    setTimeout(()=>applyStageFilter(false),520);
  }

  function install(){
    const income=document.getElementById('income');
    const legend=income?.querySelector('.signal-legend');
    if(!legend) return;
    if(legend.dataset.stageNavReady!=='1'){
      legend.dataset.stageNavReady='1';
      legend.innerHTML=`
        <div class="income-stage-nav-head"><span>INCOME STAGE</span><small id="incomeStageResult">Tap a stage to view ETFs</small></div>
        <div class="income-stage-nav-buttons">
          ${STAGES.map(s=>`<button type="button" class="signal-chip income-stage-btn ${s.cls}" data-income-stage="${s.key}" title="${s.help}">${s.label}</button>`).join('')}
          <button type="button" class="signal-chip income-stage-btn income-stage-all" data-income-stage="all">ALL</button>
        </div>
        <div class="income-colour-rule">Colour = decision stage only. Income % / yield numbers are neutral metrics, not buy signals.</div>`;
      legend.addEventListener('click',e=>{
        const btn=e.target.closest('.income-stage-btn');
        if(!btn) return;
        showStage(btn.dataset.incomeStage||'all');
      });
    }

    ['weeklyIncomeReadyCount','monthlyIncomeReadyCount'].forEach(id=>{
      const metric=document.getElementById(id)?.closest('.metric-card');
      if(metric && metric.dataset.readyShortcut!=='1'){
        metric.dataset.readyShortcut='1';
        metric.classList.add('income-ready-shortcut');
        metric.setAttribute('role','button'); metric.setAttribute('tabindex','0');
        metric.title='Show READY INCOME 1 ETFs';
        const go=()=>showStage('ready');
        metric.addEventListener('click',go);
        metric.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go();}});
      }
    });
    applyStageFilter(false);
  }

  const css=document.createElement('style');
  css.textContent=`
    .signal-legend{display:block!important}.income-stage-nav-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}.income-stage-nav-head>span{font-size:10px;font-weight:800;letter-spacing:1.3px;color:#8fa7ca}.income-stage-nav-head small{font-size:10px;color:#8597b2}
    .income-stage-nav-buttons{display:flex;gap:8px;flex-wrap:wrap}.income-stage-btn{border:1px solid transparent;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease,filter .12s ease}.income-stage-btn:hover,.income-stage-btn:focus-visible{transform:translateY(-1px);filter:brightness(1.08);outline:none}.income-stage-btn.active{box-shadow:0 0 0 2px rgba(255,255,255,.18) inset,0 0 18px rgba(100,190,255,.16)}
    .income-stage-ready{background:rgba(54,196,132,.16)!important;border-color:rgba(54,196,132,.55)!important;color:#8ff0c2!important}.income-stage-watch{background:rgba(52,200,220,.14)!important;border-color:rgba(52,200,220,.52)!important;color:#91e9f3!important}.income-stage-candidate{background:rgba(244,164,63,.14)!important;border-color:rgba(244,164,63,.55)!important;color:#ffc77d!important}.income-stage-research{background:rgba(155,112,235,.14)!important;border-color:rgba(155,112,235,.55)!important;color:#cbb1ff!important}.income-stage-defense{background:rgba(236,83,90,.14)!important;border-color:rgba(236,83,90,.55)!important;color:#ff9ba1!important}.income-stage-all{background:rgba(120,140,170,.12)!important;border-color:rgba(120,140,170,.42)!important;color:#c5d1e4!important}
    .income-colour-rule{margin-top:9px;font-size:10px;line-height:1.35;color:#788aa5}
    .income-card{position:relative!important;border-width:1px!important}.income-card[data-wais-stage="ready"]{border-color:rgba(54,196,132,.58)!important}.income-card[data-wais-stage="watch"]{border-color:rgba(52,200,220,.48)!important}.income-card[data-wais-stage="candidate"]{border-color:rgba(244,164,63,.50)!important}.income-card[data-wais-stage="research"]{border-color:rgba(155,112,235,.45)!important}.income-card[data-wais-stage="defense"]{border-color:rgba(236,83,90,.52)!important}
    .wais-stage-badge{display:inline-flex;align-items:center;border:1px solid;border-radius:999px;padding:4px 7px;font-size:8px;font-weight:800;letter-spacing:.6px;white-space:nowrap;margin-left:auto}.income-card[data-wais-stage="ready"] .wais-stage-badge{color:#8ff0c2;border-color:rgba(54,196,132,.55);background:rgba(54,196,132,.12)}.income-card[data-wais-stage="watch"] .wais-stage-badge{color:#91e9f3;border-color:rgba(52,200,220,.52);background:rgba(52,200,220,.10)}.income-card[data-wais-stage="candidate"] .wais-stage-badge{color:#ffc77d;border-color:rgba(244,164,63,.55);background:rgba(244,164,63,.10)}.income-card[data-wais-stage="research"] .wais-stage-badge{color:#cbb1ff;border-color:rgba(155,112,235,.52);background:rgba(155,112,235,.10)}.income-card[data-wais-stage="defense"] .wais-stage-badge{color:#ff9ba1;border-color:rgba(236,83,90,.55);background:rgba(236,83,90,.10)}
    .income-card .wais-metric-neutral,.income-card .yield-hero strong{color:#edf4ff!important;text-shadow:none!important}.income-card .yield-hero{border-color:rgba(125,153,190,.24)!important;background:rgba(22,38,59,.34)!important}
    .income-ready-shortcut{cursor:pointer}.income-ready-shortcut:hover{box-shadow:0 0 0 1px rgba(80,220,165,.28) inset}
    @media(max-width:720px){.income-stage-nav-head{align-items:flex-start;flex-direction:column}.income-stage-nav-buttons{gap:6px}.income-stage-btn{font-size:9px!important}.wais-stage-badge{margin-left:0;margin-top:5px}}
  `;
  document.head.appendChild(css);

  document.addEventListener('DOMContentLoaded',()=>setTimeout(install,650));
  window.addEventListener('wais:quotes-updated',()=>setTimeout(()=>{install();applyStageFilter(false);},120));
  window.addEventListener('focus',()=>setTimeout(()=>{install();applyStageFilter(false);},120));
  document.addEventListener('change',e=>{
    if(e.target?.id==='income30dFilter' || e.target?.id==='incomeYieldFilter') setTimeout(()=>applyStageFilter(false),220);
  });
  window.WAIS_SHOW_INCOME_STAGE=showStage;
})();