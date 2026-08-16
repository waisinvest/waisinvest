// WAIS Route Selector v1.2 — presentation/research layer only.
// Stock / Leveraged / Income routes are displayed together but independently approved.
(() => {
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.routeSelectorVersion='1.2';
  d.routeSelectorPolicy={
    rule:'Choose the investment route, not the cheapest share price. Stock, leveraged and income products require independent approval.',
    leverage:'Leveraged ETFs are tactical tools. Compare effective exposure, daily reset/compounding, volatility, drawdown and position-equivalent risk before use.',
    income:'Income ETFs are income tools, not cheap stock replicas. Compare distribution frequency, Current 30D Income Rate, sustainable income, ROC/NAV health, total return, liquidity and upside participation.',
    inheritance:'No ETF inherits Candidate+, TECH READY or READY 1 from its underlying.'
  };
  d.relatedRoutes={
    NVDA:{stock:'NVDA',stockStatus:'CANDIDATE+ · EVENT WATCH',leveraged:['NVDL','NVDU'],leveragedStatus:'REVIEW',income:['NVDW','NVYY','NVDY','NVII'],incomeStatus:'REVIEW',preferred:'REVIEW',note:'Compare direct NVDA ownership with tactical leveraged exposure and weekly/recurring income alternatives; Aug 26 earnings gate applies to the underlying thesis.'},
    GOOGL:{stock:'GOOGL',stockStatus:'CANDIDATE+ · ENTRY WATCH',leveraged:['GGLL','GOU','GOOL'],leveragedStatus:'REVIEW',income:['GOOW','GOOY','GOOP','GOIB'],incomeStatus:'REVIEW',preferred:'REVIEW',note:'Income and leveraged wrappers can change upside participation and risk; do not select by lower unit price alone.'},
    MU:{stock:'MU',stockStatus:'CANDIDATE+ · HBM STRENGTH',leveraged:['MUU','MULL','MIC'],leveragedStatus:'REVIEW',income:['MUYY','MUIB'],incomeStatus:'REVIEW',preferred:'REVIEW',note:'MU/HBM thesis may be expressed through different wrappers, but leveraged daily-reset risk and income NAV/ROC quality must be independently scored.'},
    AVGO:{stock:'AVGO',stockStatus:'CANDIDATE · PULLBACK REVIEW',leveraged:['AVL'],leveragedStatus:'REVIEW',income:['AVGW'],incomeStatus:'REVIEW',preferred:'REVIEW',note:'Broadcom has both a verified 2x daily bull route and a WeeklyPay income/growth route. Neither is a cheap-stock substitute; both need independent timing and risk approval.'},
    TSM:{stock:'TSM',stockStatus:'WATCH / REVIEW',leveraged:['TSMX'],leveragedStatus:'REVIEW',income:[],incomeStatus:'NO VERIFIED ROUTE',preferred:'REVIEW',note:'Verified TSM 2x daily bull route exists. No income route is shown until independently verified.'},
    MRVL:{stock:'MRVL',stockStatus:'WATCH / REVIEW',leveraged:['MRVU'],leveragedStatus:'REVIEW',income:[],incomeStatus:'NO VERIFIED ROUTE',preferred:'REVIEW',note:'Verified MRVL 2x daily bull route exists. Route stays tactical until the underlying thesis and entry timing pass again.'}
  };

  let prices={};
  const money=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—'};
  const pct=v=>{const n=Number(v);return Number.isFinite(n)?`${n>=0?'+':''}${n.toFixed(2)}%`:'—'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const quote=t=>prices[String(t||'').toUpperCase()]||{};
  const incomeMeta=t=>(d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===String(t).toUpperCase())||{};

  function routeProduct(t,type){
    const q=quote(t), im=incomeMeta(t);
    const freq=q.observedFrequency||im.frequency||im.distributionFrequency||'';
    const rate=q.current30dIncomeRate ?? im.current30DIncomeRate ?? im.current30dIncomeRate;
    const sustainable=q.sustainableIncomeYield ?? im.sustainableIncomeYield;
    const move=q.changePercent;
    return `<span class="wais-route-product ${type}"><b>${esc(t)}</b><small>${money(q.price)}${Number.isFinite(Number(move))?' · '+pct(move):''}</small>${type==='income'?`<small>${freq?esc(freq)+' · ':''}30D ${Number.isFinite(Number(rate))?Number(rate).toFixed(2)+'%':'—'}${Number.isFinite(Number(sustainable))?' · Sust. '+Number(sustainable).toFixed(1)+'%':''}</small>`:''}</span>`;
  }
  function statusBadge(label,value){return `<div class="wais-route-status"><span>${esc(label)}</span><b>${esc(value||'REVIEW')}</b></div>`;}
  function panel(ticker){
    const r=d.relatedRoutes[ticker]; if(!r)return '';
    return `<details class="wais-route-selector">
      <summary><span>RELATED ROUTES</span><b>Stock · Leveraged · Income</b><em>Tap to compare</em></summary>
      <div class="wais-route-status-row">${statusBadge('STOCK',r.stockStatus)}${statusBadge('LEVERAGED',r.leveragedStatus)}${statusBadge('INCOME',r.incomeStatus)}${statusBadge('WAIS PREFERRED',r.preferred)}</div>
      <div class="wais-route-policy">The status row is the decision layer. A product is actionable only when its own route reaches READY 1 / READY INCOME 1; lower unit price alone is never a reason to substitute it for the stock.</div>
      <div class="wais-route-grid">
        <div class="wais-route-box"><strong>STOCK ROUTE</strong>${routeProduct(r.stock,'stock')}<small>Direct underlying · long-term / core exposure</small></div>
        <div class="wais-route-box"><strong>LEVERAGED ROUTE</strong><div class="wais-route-products">${r.leveraged.length?r.leveraged.map(x=>routeProduct(x,'leveraged')).join(''):'<span class="wais-route-none">No verified route</span>'}</div><small>Tactical only · daily reset / volatility / position-equivalent risk review</small></div>
        <div class="wais-route-box"><strong>INCOME ROUTE</strong><div class="wais-route-products">${r.income.length?r.income.map(x=>routeProduct(x,'income')).join(''):'<span class="wais-route-none">No verified route</span>'}</div><small>Income alternative · distribution / ROC / NAV / total-return review</small></div>
      </div>
      <div class="wais-route-verdict"><b>WAIS Preferred Route: ${esc(r.preferred)}</b><span>${esc(r.note)}</span></div>
    </details>`;
  }
  function tickerFromCard(card){
    const h=card.querySelector('h3,h4');
    return String(h?.textContent||'').trim().toUpperCase();
  }
  function inject(){
    document.querySelectorAll('.stock-card,.watch-card').forEach(card=>{
      const ticker=tickerFromCard(card); if(!d.relatedRoutes[ticker])return;
      const existing=card.querySelector('.wais-route-selector');
      if(existing) existing.remove();
      card.insertAdjacentHTML('beforeend',panel(ticker));
    });
  }
  async function loadPrices(){
    try{
      const r=await fetch(`stock-prices.json?routes=${Date.now()}`,{cache:'no-store'});
      if(r.ok){const j=await r.json();prices=j.prices||{};inject();}
    }catch(e){console.error('[WAIS] route prices unavailable',e);inject();}
  }
  const style=document.createElement('style');
  style.textContent=`.wais-route-selector{margin-top:14px;border:1px solid rgba(87,213,255,.35);border-radius:14px;background:rgba(4,18,35,.42);overflow:hidden}.wais-route-selector summary{cursor:pointer;list-style:none;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:12px 14px}.wais-route-selector summary::-webkit-details-marker{display:none}.wais-route-selector summary span{font-size:10px;letter-spacing:.12em;color:#7ee7ff}.wais-route-selector summary b{font-size:12px}.wais-route-selector summary em{font-size:10px;font-style:normal;opacity:.7}.wais-route-status-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 12px 10px}.wais-route-status{border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:8px}.wais-route-status span{display:block;font-size:8px;opacity:.7;margin-bottom:4px}.wais-route-status b{font-size:10px;line-height:1.25}.wais-route-policy{padding:0 14px 12px;font-size:11px;opacity:.78}.wais-route-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:0 12px 12px}.wais-route-box{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px;min-width:0}.wais-route-box>strong{display:block;font-size:10px;letter-spacing:.08em;margin-bottom:8px}.wais-route-box>small{display:block;font-size:9px;opacity:.68;margin-top:7px;line-height:1.35}.wais-route-products{display:flex;gap:5px;flex-wrap:wrap}.wais-route-product{display:inline-flex;flex-direction:column;border-radius:8px;padding:6px 8px;background:rgba(255,255,255,.07);min-width:78px}.wais-route-product b{font-size:11px}.wais-route-product small{font-size:8px;opacity:.76;line-height:1.35}.wais-route-none{font-size:9px;opacity:.55}.wais-route-verdict{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;border-top:1px solid rgba(255,255,255,.1);font-size:10px}.wais-route-verdict b{white-space:nowrap;color:#ffe06d}.wais-route-verdict span{opacity:.78;line-height:1.4}@media(max-width:760px){.wais-route-status-row{grid-template-columns:repeat(2,minmax(0,1fr))}.wais-route-grid{grid-template-columns:1fr}.wais-route-selector summary{grid-template-columns:1fr}.wais-route-selector summary em{display:none}.wais-route-verdict{flex-direction:column}.wais-route-verdict b{white-space:normal}.wais-route-product{min-width:0;flex:1 1 44%}}`;
  document.head.appendChild(style);
  const obs=new MutationObserver(()=>inject());
  const start=()=>{inject();loadPrices();obs.observe(document.body,{childList:true,subtree:true});setTimeout(inject,600);setTimeout(loadPrices,1400)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
  window.addEventListener('wais:quotes-updated',loadPrices);
})();