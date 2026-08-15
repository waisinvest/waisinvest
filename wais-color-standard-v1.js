// WAIS UNIVERSAL COLOR STANDARD v1.2 — decision taxonomy audit 2026-08-15
(function(){
  const STANDARD={GREEN:{meaning:'READY 1 / BUY / ADD / ACTIVE HOLD'},YELLOW:{meaning:'WAIT / CANDIDATE+ / NEAR ENTRY / PENDING CONFIRMATION'},BLUE:{meaning:'WATCH / CANDIDATE / RESEARCH / VALIDATING / DISCOVERY'},PURPLE:{meaning:'DEFENSE / PROTECT PROFIT / TRIM / MOSTLY CASH'},RED:{meaning:'EXIT / REJECT / STOP / PHASE OUT / AVOID'},GREY:{meaning:'NO SIGNAL / DATA GAP / INSUFFICIENT'}};
  window.WAIS_COLOR_STANDARD=Object.freeze(STANDARD);
  const CLS=['wais-color-green','wais-color-yellow','wais-color-blue','wais-color-purple','wais-color-red','wais-color-grey'];
  const clean=v=>String(v||'').trim().toUpperCase();
  function colorForStatus(status=''){
    const s=clean(status);
    if(!s||/NO SIGNAL|NONE|DATA PENDING|DATA GAP|INSUFFICIENT|UNKNOWN|NOT CHECKED/.test(s)) return 'grey';
    if(/EXIT|REJECT|STOP|PHASE OUT|REMOVE|AVOID/.test(s)) return 'red';
    if(/DEFENSE|DEFENSIVE|PROTECT|TRIM|MOSTLY CASH/.test(s)) return 'purple';
    if(/CANDIDATE\+|READY WATCH|NEAR ENTRY|TECH READY|ENTRY WATCH|EVENT WATCH|WAIT|CAUTIOUS|PENDING CONFIRMATION|OVERHEAT WATCH/.test(s)) return 'yellow';
    if(/(^|\b)READY 1(\b|$)|READY INCOME 1|^READY$|\bBUY\b|\bADD\b|FIRST TRANCHE|ACTIVE HOLD|\bMANAGE\b/.test(s)) return 'green';
    if(/CANDIDATE|WATCH|RESEARCH|DISCOVERY|VALIDAT|SCOUT|EARLY|CHECKED|MANUAL CHECK|ACTIVE \/ PARTIAL/.test(s)) return 'blue';
    return 'grey';
  }
  function apply(el,status){if(!el)return;CLS.forEach(c=>el.classList.remove(c));const c=colorForStatus(status);el.classList.add(`wais-color-${c}`);el.dataset.waisCanonicalColour=c;}
  window.getSignalMeta=status=>{const c=colorForStatus(status);return{className:`signal-${c}`,label:status||'NO SIGNAL',waisColor:c};};
  window.getResearchStageMeta=stage=>{const s=clean(stage||'RESEARCH');return{label:s||'RESEARCH',className:'stage-research'};};
  function normalize(){
    document.querySelectorAll('.signal-chip,.status-text,.pill,.research-stage-chip,.research-stage-cell').forEach(el=>apply(el,el.textContent));
    document.querySelectorAll('#income .income-card').forEach(card=>{const ticker=card.querySelector('.income-title-row h3,h3')?.textContent?.trim()?.toUpperCase();const item=(window.WAIS_MARKET_DATA?.incomeEtfs||[]).find(x=>clean(x.ticker)===ticker);const s=item?.status||card.querySelector('.signal-chip')?.textContent||'NO SIGNAL';apply(card,s);apply(card.querySelector('.signal-chip'),s);apply(card.querySelector('.today-action'),s);});
    const nav={ready:['GREEN · READY INCOME 1','READY INCOME 1'],watch:['YELLOW · WATCH INCOME','CANDIDATE+'],candidate:['BLUE · INCOME CANDIDATE','CANDIDATE'],research:['BLUE · RESEARCH','RESEARCH'],defense:['RED · PHASE OUT / AVOID','PHASE OUT'],all:['ALL','NO SIGNAL']};
    document.querySelectorAll('.income-stage-btn').forEach(b=>{const x=nav[b.dataset.incomeStage||'all'];if(x){b.textContent=x[0];apply(b,x[1]);}});
    const rule=document.querySelector('.income-colour-rule');if(rule)rule.textContent='Green = Ready/Buy/Add · Yellow = Candidate+/Wait · Blue = Candidate/Watch/Research · Purple = Protect/Trim/Defense · Red = Exit/Avoid · Grey = No signal/Data gap.';
  }
  const css=document.createElement('style');css.id='wais-universal-colour-standard';css.textContent=`.wais-color-green{color:#98f2c8!important;border-color:rgba(67,205,143,.64)!important;background:rgba(46,169,113,.15)!important}.wais-color-yellow{color:#ffe18b!important;border-color:rgba(231,190,72,.66)!important;background:rgba(198,151,42,.15)!important}.wais-color-blue{color:#a9d8ff!important;border-color:rgba(86,161,220,.62)!important;background:rgba(57,126,185,.14)!important}.wais-color-purple{color:#d6b9ff!important;border-color:rgba(157,105,221,.64)!important;background:rgba(123,76,182,.14)!important}.wais-color-red{color:#ffaaa9!important;border-color:rgba(228,84,84,.66)!important;background:rgba(185,55,55,.14)!important}.wais-color-grey{color:#c1c9d4!important;border-color:rgba(135,145,160,.48)!important;background:rgba(104,114,130,.12)!important}.stage-validating,.stage-research,.stage-watchlist{color:#a9d8ff!important;border-color:rgba(86,161,220,.62)!important;background:rgba(57,126,185,.14)!important}`;document.head.appendChild(css);
  let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(normalize,80);};
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(normalize,900);const o=new MutationObserver(ms=>{if(ms.some(m=>m.type==='childList'))schedule();});['dashboard','top-picks','hidden-gems','income','watchlist','portfolio'].forEach(id=>{const n=document.getElementById(id);if(n)o.observe(n,{childList:true,subtree:true});});window.__WAIS_COLOR_OBSERVER__=o;});
  window.addEventListener('load',()=>setTimeout(normalize,180));window.addEventListener('wais:quotes-updated',schedule);document.addEventListener('click',schedule);window.WAIS_APPLY_COLOR_STANDARD=normalize;window.WAIS_COLOR_FOR_STATUS=colorForStatus;
})();