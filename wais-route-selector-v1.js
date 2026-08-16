// WAIS Route Selector v1 — presentation/research layer only.
// Links an approved underlying thesis to possible Stock / Leveraged / Income routes.
// A related ETF is NEVER an automatic substitute and NEVER inherits READY 1 from the stock.
(() => {
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.routeSelectorVersion='1.0';
  d.routeSelectorPolicy={
    rule:'Choose the investment route, not the cheapest share price. Stock, leveraged and income products require independent approval.',
    leverage:'Leveraged ETFs are tactical tools. Compare effective exposure, daily reset/compounding, volatility, drawdown and position-equivalent risk before use.',
    income:'Income ETFs are income tools, not cheap stock replicas. Compare distribution frequency, Current 30D Income Rate, sustainable income, ROC/NAV health, total return, liquidity and upside participation.',
    inheritance:'No ETF inherits Candidate+, TECH READY or READY 1 from its underlying.'
  };
  d.relatedRoutes={
    NVDA:{stock:'NVDA',leveraged:['NVDL','NVDU'],income:['NVDW','NVYY','NVDY','NVII'],preferred:'REVIEW',note:'Compare direct NVDA ownership with tactical leveraged exposure and weekly/recurring income alternatives; Aug 26 earnings gate applies to the underlying thesis.'},
    GOOGL:{stock:'GOOGL',leveraged:['GGLL','GOU','GOOL'],income:['GOOW','GOOY','GOOP','GOIB'],preferred:'REVIEW',note:'Income and leveraged wrappers can change upside participation and risk; do not select by lower unit price alone.'},
    MU:{stock:'MU',leveraged:['MUU','MULL','MIC'],income:['MUYY','MUIB'],preferred:'REVIEW',note:'MU/HBM thesis may be expressed through different wrappers, but leveraged daily-reset risk and income NAV/ROC quality must be independently scored.'}
  };

  const money=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const quote=t=>window.livePrices?.[t]||{};
  function routeProduct(t,type){
    const q=quote(t), income=(d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===t);
    const freq=income?.frequency||income?.distributionFrequency||'';
    const rate=income?.current30DIncomeRate ?? income?.current30dIncomeRate;
    return `<span class="wais-route-product"><b>${esc(t)}</b><small>${money(q.price)}${freq?' · '+esc(freq):''}${Number.isFinite(Number(rate))?' · 30D '+Number(rate).toFixed(2)+'%':''}</small></span>`;
  }
  function panel(ticker){
    const r=d.relatedRoutes[ticker]; if(!r)return '';
    return `<details class="wais-route-selector">
      <summary><span>RELATED ROUTES</span><b>Stock · Leveraged · Income</b><em>Tap to compare</em></summary>
      <div class="wais-route-policy">WAIS compares the route — not the cheapest share price. Related ETFs require independent approval.</div>
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
  style.textContent=`.wais-route-selector{margin-top:14px;border:1px solid rgba(87,213,255,.35);border-radius:14px;background:rgba(4,18,35,.42);overflow:hidden}.wais-route-selector summary{cursor:pointer;list-style:none;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:12px 14px}.wais-route-selector summary::-webkit-details-marker{display:none}.wais-route-selector summary span{font-size:10px;letter-spacing:.12em;color:#7ee7ff}.wais-route-selector summary b{font-size:12px}.wais-route-selector summary em{font-size:10px;font-style:normal;opacity:.7}.wais-route-policy{padding:0 14px 12px;font-size:11px;opacity:.78}.wais-route-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:0 12px 12px}.wais-route-box{border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px;min-width:0}.wais-route-box>strong{display:block;font-size:10px;letter-spacing:.08em;margin-bottom:8px}.wais-route-box>small{display:block;font-size:9px;opacity:.68;margin-top:7px;line-height:1.35}.wais-route-products{display:flex;gap:5px;flex-wrap:wrap}.wais-route-product{display:inline-flex;flex-direction:column;border-radius:8px;padding:5px 7px;background:rgba(255,255,255,.07)}.wais-route-product b{font-size:11px}.wais-route-product small{font-size:8px;opacity:.7}.wais-route-verdict{display:flex;gap:10px;align-items:flex-start;padding:10px 14px;border-top:1px solid rgba(255,255,255,.1);font-size:10px}.wais-route-verdict b{white-space:nowrap;color:#ffe06d}.wais-route-verdict span{opacity:.78;line-height:1.4}@media(max-width:760px){.wais-route-grid{grid-template-columns:1fr}.wais-route-selector summary{grid-template-columns:1fr}.wais-route-selector summary em{display:none}.wais-route-verdict{flex-direction:column}.wais-route-verdict b{white-space:normal}}`;
  document.head.appendChild(style);
  const obs=new MutationObserver(()=>inject());
  const start=()=>{inject();obs.observe(document.body,{childList:true,subtree:true});setTimeout(inject,500);setTimeout(inject,1500)};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();