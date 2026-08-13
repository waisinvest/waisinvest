// WAIS UNIVERSAL COLOR STANDARD v1.0
// Single source of truth for public decision-stage colours across stocks, Hidden Gems, Income ETFs and dashboard actions.
// This file is presentation-only. It contains no proprietary scoring weights or private portfolio logic.
(function(){
  const STANDARD={
    GREEN:{meaning:'ACTION CONFIRMED / READY / ACTIVE MANAGEMENT'},
    YELLOW:{meaning:'WAIT / CANDIDATE+ / NEAR ENTRY / TECH READY PENDING CONFIRMATION'},
    BLUE:{meaning:'WATCH / CANDIDATE / RESEARCH / VALIDATING / DISCOVERY'},
    PURPLE:{meaning:'DEFENSE / PROTECT / TRIM'},
    RED:{meaning:'EXIT / REJECT / STOP / PHASE OUT / AVOID'},
    GREY:{meaning:'NO SIGNAL / DATA INSUFFICIENT'}
  };
  window.WAIS_COLOR_STANDARD=Object.freeze(STANDARD);

  const COLOR_CLASSES=['wais-color-green','wais-color-yellow','wais-color-blue','wais-color-purple','wais-color-red','wais-color-grey'];
  function cleanText(v=''){return String(v||'').trim().toUpperCase();}
  function colorForStatus(status=''){
    const s=cleanText(status);
    if(!s || /NO SIGNAL|NONE|DATA PENDING|INSUFFICIENT|UNKNOWN/.test(s)) return 'grey';
    // Terminal / risk actions take priority over words such as READY contained elsewhere.
    if(/EXIT|REJECT|STOP|PHASE OUT|REMOVE|AVOID/.test(s)) return 'red';
    if(/DEFENSE|DEFENSIVE|PROTECT|TRIM/.test(s)) return 'purple';
    // Near-ready states must never become green merely because their label contains the word READY.
    if(/CANDIDATE\+|READY WATCH|NEAR ENTRY|TECH READY|ENTRY WATCH|EVENT WATCH|WAIT|CAUTIOUS|PENDING CONFIRMATION/.test(s)) return 'yellow';
    // Green is reserved for confirmed actionable / already-managed states.
    if(/(^|\b)READY 1(\b|$)|READY INCOME 1|\bBUY\b|\bADD\b|FIRST TRANCHE|\bHOLD\b|\bMANAGE\b/.test(s)) return 'green';
    if(/CANDIDATE|WATCH|RESEARCH|DISCOVERY|VALIDAT|SCOUT|EARLY/.test(s)) return 'blue';
    return 'grey';
  }
  function canonicalClass(status){return `wais-color-${colorForStatus(status)}`;}
  function applyColour(el,status){
    if(!el) return;
    COLOR_CLASSES.forEach(c=>el.classList.remove(c));
    el.classList.add(canonicalClass(status));
    el.dataset.waisCanonicalColour=colorForStatus(status);
  }

  // Replace the legacy status mapper whenever app.js has already defined it.
  function installGlobalMappers(){
    window.getSignalMeta=function(status=''){
      const color=colorForStatus(status);
      const legacy={green:'signal-green',yellow:'signal-yellow',blue:'signal-blue',purple:'signal-purple',red:'signal-red',grey:'signal-grey'}[color]||'signal-grey';
      return {className:legacy,label:status||'NO SIGNAL',waisColor:color};
    };
    window.getResearchStageMeta=function(stage='RESEARCH'){
      const s=cleanText(stage||'RESEARCH');
      if(s.includes('WATCHLIST')) return {label:'WATCHLIST CANDIDATE',className:'stage-watchlist'};
      if(s.includes('VALIDAT')) return {label:'VALIDATING',className:'stage-validating'};
      return {label:s.includes('RESEARCH')?'RESEARCH':(s||'RESEARCH'),className:'stage-research'};
    };
  }

  function normalizeGeneralSignals(){
    // Stock / dashboard chips: classify from the visible decision label.
    document.querySelectorAll('.signal-chip,.status-text,.pill').forEach(el=>{
      const txt=cleanText(el.textContent);
      if(txt) applyColour(el,txt);
    });
    // Hidden Gems: VALIDATING and RESEARCH are both BLUE under the universal standard.
    document.querySelectorAll('.research-stage-chip,.research-stage-cell').forEach(el=>applyColour(el,el.textContent));
  }

  function incomeItemForCard(card){
    const ticker=card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase()||card.querySelector('h3')?.textContent?.trim()?.toUpperCase();
    const d=window.WAIS_MARKET_DATA||{};
    return (d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===ticker)||null;
  }
  function normalizeIncome(){
    document.querySelectorAll('#income .income-card').forEach(card=>{
      const item=incomeItemForCard(card);
      const status=item?.status||card.querySelector('.signal-chip')?.textContent||'NO SIGNAL';
      applyColour(card,status);
      applyColour(card.querySelector('.signal-card-head .signal-chip'),status);
      applyColour(card.querySelector('.today-action'),status);
    });

    // Preserve the existing functional stage keys, but restore the original WAIS colour language.
    const navMap={
      ready:{label:'GREEN · READY INCOME 1',status:'READY INCOME 1'},
      watch:{label:'YELLOW · WATCH INCOME',status:'CANDIDATE+ / NEAR ENTRY'},
      candidate:{label:'BLUE · INCOME CANDIDATE',status:'INCOME CANDIDATE'},
      research:{label:'BLUE · RESEARCH',status:'RESEARCH'},
      defense:{label:'RED · PHASE OUT / AVOID',status:'PHASE OUT / AVOID'},
      all:{label:'ALL',status:'NO SIGNAL'}
    };
    document.querySelectorAll('.income-stage-btn').forEach(btn=>{
      const key=btn.dataset.incomeStage||'all';
      const cfg=navMap[key]; if(!cfg) return;
      btn.textContent=cfg.label;
      applyColour(btn,cfg.status);
    });
    const rule=document.querySelector('.income-colour-rule');
    if(rule) rule.textContent='WAIS colour standard: Green = Ready/Active · Yellow = Near Ready/Wait · Blue = Watch/Research · Purple = Defense/Protect · Red = Exit/Phase Out · Grey = No data.';
  }

  function normalizeAll(){
    installGlobalMappers();
    normalizeGeneralSignals();
    normalizeIncome();
  }
  function schedule(){setTimeout(normalizeAll,60);setTimeout(normalizeAll,260);setTimeout(normalizeAll,700);}

  const css=document.createElement('style');
  css.id='wais-universal-colour-standard';
  css.textContent=`
    .wais-color-green{color:#98f2c8!important;border-color:rgba(67,205,143,.64)!important;background:rgba(46,169,113,.15)!important}
    .wais-color-yellow{color:#ffe18b!important;border-color:rgba(231,190,72,.66)!important;background:rgba(198,151,42,.15)!important}
    .wais-color-blue{color:#a9d8ff!important;border-color:rgba(86,161,220,.62)!important;background:rgba(57,126,185,.14)!important}
    .wais-color-purple{color:#d6b9ff!important;border-color:rgba(157,105,221,.64)!important;background:rgba(123,76,182,.14)!important}
    .wais-color-red{color:#ffaaa9!important;border-color:rgba(228,84,84,.66)!important;background:rgba(185,55,55,.14)!important}
    .wais-color-grey{color:#c1c9d4!important;border-color:rgba(135,145,160,.48)!important;background:rgba(104,114,130,.12)!important}

    #income .income-card.wais-color-green{border-color:rgba(67,205,143,.64)!important}
    #income .income-card.wais-color-yellow{border-color:rgba(231,190,72,.64)!important}
    #income .income-card.wais-color-blue{border-color:rgba(86,161,220,.60)!important}
    #income .income-card.wais-color-purple{border-color:rgba(157,105,221,.62)!important}
    #income .income-card.wais-color-red{border-color:rgba(228,84,84,.66)!important}
    #income .income-card.wais-color-grey{border-color:rgba(135,145,160,.46)!important}

    /* Retire the temporary Cyan / Orange / Violet visual meanings without breaking their functional stage keys. */
    .income-stage-watch{color:#ffe18b!important;border-color:rgba(231,190,72,.66)!important;background:rgba(198,151,42,.15)!important}
    .income-stage-candidate,.income-stage-research{color:#a9d8ff!important;border-color:rgba(86,161,220,.62)!important;background:rgba(57,126,185,.14)!important}
    .income-stage-defense{color:#ffaaa9!important;border-color:rgba(228,84,84,.66)!important;background:rgba(185,55,55,.14)!important}
    .stage-validating,.stage-research,.stage-watchlist{color:#a9d8ff!important;border-color:rgba(86,161,220,.62)!important;background:rgba(57,126,185,.14)!important}
    .signal-orange{color:#ffe18b!important;border-color:rgba(231,190,72,.66)!important;background:rgba(198,151,42,.15)!important}
    .signal-purple{color:#d6b9ff!important;border-color:rgba(157,105,221,.64)!important;background:rgba(123,76,182,.14)!important}
  `;
  document.head.appendChild(css);

  document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeAll,900));
  window.addEventListener('wais:quotes-updated',schedule);
  window.addEventListener('focus',schedule);
  document.addEventListener('click',e=>{if(e.target.closest?.('.income-stage-btn,[data-jump],.nav-item')) schedule();});
  document.addEventListener('change',schedule);
  window.WAIS_APPLY_COLOR_STANDARD=normalizeAll;
  window.WAIS_COLOR_FOR_STATUS=colorForStatus;
})();
