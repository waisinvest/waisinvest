// WAIS INCOME v2.4 — one colour system for Income ETF decision stages.
// Presentation/navigation only. No proprietary ranking weights or buy logic are exposed here.
(function(){
  const d = window.WAIS_MARKET_DATA || (window.WAIS_MARKET_DATA = {});
  let currentStage='all';

  // ONE COLOUR = ONE DECISION STAGE.
  // Green Ready, Cyan Watch, Orange Candidate, Violet Research, Red Defense.
  // Income/yield percentages remain neutral and never act as buy/sell colours.
  const STAGES = [
    {key:'ready', label:'GREEN · READY INCOME 1', cls:'income-stage-ready', help:'Approved first-tranche / active trade-management stage'},
    {key:'watch', label:'CYAN · WATCH INCOME', cls:'income-stage-watch', help:'Nearest promotion queue to READY INCOME 1'},
    {key:'candidate', label:'ORANGE · INCOME CANDIDATE', cls:'income-stage-candidate', help:'Active candidate; more validation required before Watch / Ready'},
    {key:'research', label:'VIOLET · RESEARCH', cls:'income-stage-research', help:'Discovery / research stage'},
    {key:'defense', label:'RED · DEFENSE / AVOID', cls:'income-stage-defense', help:'Defense, phase-out or avoid stage'}
  ];

  function tickerOf(card){
    return card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase() || card.querySelector('h3')?.textContent?.trim()?.toUpperCase() || '';
  }
  function itemOf(ticker){
    return (d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===ticker) || null;
  }
  function classify(item){
    const s=String(item?.status||'RESEARCH').toUpperCase();
    if(/DEFENSE|AVOID|PHASE OUT|BELOW 3|REMOVE|EXIT/.test(s)) return 'defense';
    if(/READY/.test(s)) return 'ready';
    if(/CANDIDATE\+|WATCH INCOME|NEAR ENTRY/.test(s)) return 'watch';
    if(/INCOME CANDIDATE|WAIT INCOME|WAIT|CAUTIOUS/.test(s)) return 'candidate';
    return 'research';
  }
  function stageLabel(stage){
    return ({ready:'READY INCOME 1',watch:'WATCH INCOME',candidate:'INCOME CANDIDATE',research:'RESEARCH',defense:'DEFENSE / AVOID'})[stage] || 'RESEARCH';
  }
  function stageClass(stage){ return `wais-stage-${stage}`; }
  function allCards(){ return [...document.querySelectorAll('#income .income-card')]; }

  function normalizeCard(card){
    const item=itemOf(tickerOf(card));
    const stage=classify(item);
    card.dataset.waisStage=stage;

    // Remove legacy colour meanings first. Previously "INCOME CANDIDATE" fell through
    // to grey while the card/action/yield boxes could carry other colours.
    card.classList.remove('signal-green','signal-yellow','signal-orange','signal-red','signal-blue','signal-grey');
    ['ready','watch','candidate','research','defense'].forEach(s=>card.classList.remove(stageClass(s)));
    card.classList.add(stageClass(stage));

    // Re-use the original top-left signal chip as the ONE visible stage badge.
    const legacyChip=card.querySelector('.signal-card-head .signal-chip');
    if(legacyChip){
      legacyChip.textContent=stageLabel(stage);
      legacyChip.className=`signal-chip wais-stage-chip ${stageClass(stage)}`;
    }
    // Remove duplicate badge from earlier v2.3 if present.
    card.querySelectorAll('.wais-stage-badge').forEach(el=>el.remove());

    // Today Action follows the same stage colour, never a second colour system.
    const action=card.querySelector('.today-action');
    if(action){
      action.classList.remove('signal-green','signal-yellow','signal-orange','signal-red','signal-blue','signal-grey');
      ['ready','watch','candidate','research','defense'].forEach(s=>action.classList.remove(stageClass(s)));
      action.classList.add(stageClass(stage));
    }

    // Safe-entry panel and numeric boxes are neutral. Stage is shown by badge/card/action only.
    const safe=card.querySelector('.wais-safe-entry-box');
    if(safe){
      safe.classList.remove('signal-green','signal-yellow','signal-orange','signal-red','signal-blue','signal-grey');
      safe.classList.add('wais-entry-neutral');
    }
    card.querySelectorAll('.yield-hero strong,.yield-hero small,.stock-meta b,.safe-entry-grid strong,.safe-entry-grid span').forEach(el=>el.classList.add('wais-metric-neutral'));
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
    applyStageFilter(true);
    // Legacy income renderer can repaint cards after filters/quotes; assert stage ownership again.
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
        <div class="income-colour-rule">Colour = decision stage only · Yield / income % = neutral data.</div>`;
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

    .income-card{position:relative!important;border-width:1px!important}
    .income-card.wais-stage-ready{border-color:rgba(54,196,132,.62)!important}.income-card.wais-stage-watch{border-color:rgba(52,200,220,.58)!important}.income-card.wais-stage-candidate{border-color:rgba(244,164,63,.58)!important}.income-card.wais-stage-research{border-color:rgba(155,112,235,.52)!important}.income-card.wais-stage-defense{border-color:rgba(236,83,90,.62)!important}
    .wais-stage-chip{display:inline-flex!important;border:1px solid!important;border-radius:999px!important;padding:5px 8px!important;font-size:9px!important;font-weight:800!important;letter-spacing:.5px!important;white-space:nowrap!important}
    .wais-stage-chip.wais-stage-ready{color:#8ff0c2!important;border-color:rgba(54,196,132,.62)!important;background:rgba(54,196,132,.14)!important}.wais-stage-chip.wais-stage-watch{color:#91e9f3!important;border-color:rgba(52,200,220,.58)!important;background:rgba(52,200,220,.12)!important}.wais-stage-chip.wais-stage-candidate{color:#ffc77d!important;border-color:rgba(244,164,63,.62)!important;background:rgba(244,164,63,.12)!important}.wais-stage-chip.wais-stage-research{color:#cbb1ff!important;border-color:rgba(155,112,235,.58)!important;background:rgba(155,112,235,.12)!important}.wais-stage-chip.wais-stage-defense{color:#ff9ba1!important;border-color:rgba(236,83,90,.62)!important;background:rgba(236,83,90,.12)!important}

    .income-card .yield-hero,.income-card .wais-entry-neutral{border-color:rgba(125,153,190,.24)!important;background:rgba(22,38,59,.34)!important;color:#d9e4f5!important}
    .income-card .wais-metric-neutral,.income-card .yield-hero strong,.income-card .yield-hero small{color:#edf4ff!important;text-shadow:none!important}
    .income-card .today-action.wais-stage-ready{border-color:rgba(54,196,132,.46)!important;background:rgba(54,196,132,.08)!important}.income-card .today-action.wais-stage-watch{border-color:rgba(52,200,220,.42)!important;background:rgba(52,200,220,.07)!important}.income-card .today-action.wais-stage-candidate{border-color:rgba(244,164,63,.46)!important;background:rgba(244,164,63,.07)!important}.income-card .today-action.wais-stage-research{border-color:rgba(155,112,235,.42)!important;background:rgba(155,112,235,.07)!important}.income-card .today-action.wais-stage-defense{border-color:rgba(236,83,90,.48)!important;background:rgba(236,83,90,.08)!important}

    .income-ready-shortcut{cursor:pointer}.income-ready-shortcut:hover{box-shadow:0 0 0 1px rgba(80,220,165,.28) inset}
    @media(max-width:720px){.income-stage-nav-head{align-items:flex-start;flex-direction:column}.income-stage-nav-buttons{gap:6px}.income-stage-btn{font-size:9px!important}}
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