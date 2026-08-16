// WAIS Route Selector v1.1 — presentation/research layer only.
// Links an underlying thesis to Stock / Leveraged / Income routes.
// Related ETFs NEVER inherit READY 1 from the stock; each route has its own decision state.
(() => {
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.routeSelectorVersion='1.1';
  d.routeSelectorPolicy={
    rule:'Choose the investment route, not the cheapest share price. Stock, leveraged and income products require independent approval.',
    leverage:'Leveraged ETFs are tactical tools. Compare effective exposure, daily reset/compounding, volatility, drawdown and position-equivalent risk before use.',
    income:'Income ETFs are income tools, not cheap stock replicas. Compare distribution frequency, Current 30D Income Rate, sustainable income, ROC/NAV health, total return, liquidity and upside participation.',
    inheritance:'No ETF inherits Candidate+, TECH READY or READY 1 from its underlying.',
    decisionDisplay:'Always show independent Stock / Leveraged / Income route states plus one WAIS Preferred Route so the user can see what is actually actionable before opening the detail panel.'
  };
  d.relatedRoutes={
    NVDA:{stock:'NVDA',leveraged:['NVDL','NVDU'],income:['NVDW','NVYY','NVDY','NVII'],leveragedStatus:'REVIEW',incomeStatus:'REVIEW',preferred:'REVIEW',note:'Compare direct NVDA ownership with tactical leveraged exposure and weekly/recurring income alternatives; Aug 26 earnings gate applies to the underlying thesis.'},
    GOOGL:{stock:'GOOGL',leveraged:['GGLL','GOU','GOOL'],income:['GOOW','GOOY','GOOP','GOIB'],leveragedStatus:'REVIEW',incomeStatus:'REVIEW',preferred:'REVIEW',note:'Income and leveraged wrappers can change upside participation and risk; do not select by lower unit price alone.'},
    MU:{stock:'MU',leveraged:['MUU','MULL','MIC'],income:['MUYY','MUIB'],leveragedStatus:'REVIEW',incomeStatus:'REVIEW',preferred:'REVIEW',note:'MU/HBM thesis may be expressed through different wrappers, but leveraged daily-reset risk and income NAV/ROC quality must be independently scored.'},
    AVGO:{stock:'AVGO',leveraged:['AVL','AVGU'],income:['AVGW'],leveragedStatus:'REVIEW',incomeStatus:'REVIEW',preferred:'REVIEW',note:'Verified AVGO routes include 2x daily leveraged products and a weekly-income wrapper. They remain independent decisions, not automatic substitutes for AVGO.'}
  };

  const money=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const quote=t=>window.livePrices?.[t]||{};
  const stockFor=t=>(d.focusStocks||[]).find(x=>String(x.ticker||'').toUpperCase()===String(t).toUpperCase());
  function stockStatus(t){
    const s=stockFor(t); return String(s?.stance||s?.rating||'REVIEW').toUpperCase();
  }
  function canonicalStatus(v){
    const s=String(v||'REVIEW').toUpperCase();
    if(/READY 1|READY INCOME 1|\bBUY\b|\bADD\b/.test(s)) return {label:s,color:'green'};
    if(/CANDIDATE\+|TECH READY|WAIT|ENTRY WATCH|EVENT WATCH|NEAR ENTRY/.test(s)) return {label:s,color:'yellow'};
    if(/CANDIDATE|WATCH|RESEARCH|REVIEW|VALIDAT/.test(s)) return {label:s,color:'blue'};
    if(/PROTECT|TRIM|DEFENSE/.test(s)) return {label:s,color:'purple'};
    if(/EXIT|REJECT|AVOID|STOP/.test(s)) return {label:s,color:'red'};
    return {label:s||'REVIEW',color:'grey'};
  }
  function statusChip(label,status){const s=canonicalStatus(status);return `<span class="wais-route-status wais-route-${s.color}"><small>${esc(label)}</small><b>${esc(s.label)}</b></span>`;}
  function routeProduct(t,type){
    const q=quote(t), income=(d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===t);
    const freq=income?.frequency||income?.distributionFrequency||'';
    const rate=income?.current30DIncomeRate ?? income?.current30dIncomeRate;
    return `<span class="wais-route-product"><b>${esc(t)}</b><small>${money(q.price)}${freq?' · '+esc(freq):''}${Number.isFinite(Number(rate))?' · 30D '+Number(rate).toFixed(2)+'%':''}</small></span>`;
  }
  function decisionStrip(ticker,r){
    return `<div class="wais-route-decision-strip">
      ${statusChip('STOCK',stockStatus(r.stock))}
      ${statusChip('LEVERAGED',r.leveragedStatus||'REVIEW')}
      ${statusChip('INCOME',r.incomeStatus||'REVIEW')}
      <span class="wais-route-preferred"><small>WAIS PREFERRED</small><b>${esc(r.preferred||'REVIEW')}</b></span>
    </div>`;
  }
  function panel(ticker){
    const r=d.relatedRoutes[ticker]; if(!r)return '';
    return `<details class="wais-route-selector">
      <summary><span>RELATED ROUTES</span><b>Stock · Leveraged · Income</b><em>Tap to compare</em></summary>
      ${decisionStrip(ticker,r)}
      <div class="wais-route-policy">The status row above is the decision layer. A product is actionable only when its own route reaches READY 1 / READY INCOME 1; lower unit price alone is never a reason to substitute it for the stock.</div>
      <div class="wais-route-grid">
        <div class="wais-route-box"><strong>STOCK ROUTE</strong>${routeProduct(r.stock,'stock')}<small>Direct underlying · long-term / core exposure</small></div>
        <div class="wais-route-box"><strong>LEVERAGED ROUTE</strong><div class="wais-route-products">${r.leveraged.map(x=>routeProduct(x,'leveraged')).join('')}</div><small>Tactical only · daily reset / volatility / position-equivalent risk review</small></div>
        <div class="wais-route-box"><strong>INCOME ROUTE</strong><div class="wais-route-products">${r.income.map(x=>routeProduct(x,'income')).join('')}</div><small>Income alternative · distribution / ROC / NAV / total-return review</small></div>
      </div>
      <div class="wais-route-verdict"><b>WAIS Preferred Route: ${esc(r.preferred)}</b><span>${esc(r.note)}</span></div>
    </details>`;
  }
  function inject(){
    document.querySelectorAll('.stock-card').forEach(card=>{
      if(card.querySelector('.wais-route-selector'))return;
      const h=card.querySelector('h3'); if(!h)return;
      const ticker=String(h.textContent||'').trim().toUpperCase();
      if(!d.relatedRoutes[ticker])return;
      card.insertAdjacentHTML('beforeend',panel(ticker));
    });
  }
  const style=document.createElement('style');
  style.textContent=`.wais-route-selector{margin-top:14px;border:1px solid rgba(87,213,255,.35);border-radius:14px;background:rgba(4,18,35,.42);overflow:hidden}.wais-route-selector summary{cursor:pointer;list-style:none;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:12px 14px}.wais-route-selector summary::-webkit-details-marker{display:none}.wais-route-selector summary span{font-size:10px;letter-spacing:.12em;color:#7ee7ff}.wais-route-selector summary b{font-size:12px}.wais-route-selector summary em{font-size:10px;font-style:normal;opacity:.7}.wais-route-decision-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;padding:0 12px 10px}.wais-route-status,.wais-route-preferred{display:flex;flex-direction:column;gap:2px;padding:7px 8px;border-radius:9px;border:1px solid rgba(255,255,255,.12);min-width:0}.wais-route-status small,.wais-route-preferred small{font-size:8px;letter-spacing:.08em;opacity:.72}.wais-route-status b,.wais-route-preferred b{font-size:9px;line-height:1.2;overflow:hidden;text-overflow:ellipsis}.wais-route-green{color:#98f2c8;background:rgba(46,169,113,.14);border-color:rgba(67,205,143,.5)}.wais-route-yellow{color:#ffe18b;background:rgba(198,151,42,.14);border-color:rgba(231,190,72,.5)}.wais-route-blue{color:#a9d8ff;background:rgba(57,126,185,.14);border-color:rgba(86,161,220,.48)}.wais-route-purple{color:#d6b9ff;background:rgba(123,76,182,.14);border-color:rgba(157,105,221,.48)}.wais-route-red{color:#ffaaa9;background:rgba(185,55,55,.14);border-color:rgba(228,84,84,.48)}.wais-route-grey{color:#c1c9d4;background:rgba(104,114,130,.12)}.wais-route-preferred{color:#ffe06d;border-color:rgba(255,224,109,.34);background:rgba(255,224,109,.06)}.wais-route-policy{padding:0 14px 12px;font-size:11px;opacity:.78}.wais-route-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:0 12px 12px}.wais-route-box{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px;min-width:0}.wais-route-box>strong{display:block;font-size:10px;letter-spacing:.08em;margin-bottom:8px}.wais-route-box>small{display:block;font-size:9px;opacity:.68;margin-top:7px;line-height:1.35}.wais-route-products{display:flex;gap:5px;flex-wrap:wrap}.wais-route-product{display:inline-flex;flex-direction:column;border-radius:8px;padding:5px 7px;background:rgba(255,255,255,.07)}.wais-route-product b{font-size:11px}.wais-route-product small{font-size:8px;opacity:.7}.wais-route-verdict{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;border-top:1px solid rgba(255,255,255,.1);font-size:10px}.wais-route-verdict b{white-space:nowrap;color:#ffe06d}.wais-route-verdict span{opacity:.78;line-height:1.4}@media(max-width:760px){.wais-route-decision-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.wais-route-grid{grid-template-columns:1fr}.wais-route-selector summary{grid-template-columns:1fr}.wais-route-selector summary em{display:none}.wais-route-verdict{flex-direction:column}.wais-route-verdict b{white-space:normal}}`;
  document.head.appendChild(style);
  const obs=new MutationObserver(()=>inject());
  const start=()=>{inject();obs.observe(document.body,{childList:true,subtree:true});setTimeout(inject,500);setTimeout(inject,1500)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();