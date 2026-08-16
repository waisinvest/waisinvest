// WAIS Route ↔ Income ETF bidirectional navigation v1.0
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const clean=s=>String(s||'').trim().toUpperCase();
  function reverseLinks(){
    const out={};
    Object.entries(d.relatedRoutes||{}).forEach(([underlying,r])=>{
      (r.income||[]).forEach(t=>{
        const k=clean(t); if(!out[k])out[k]=[]; out[k].push(clean(underlying));
      });
    });
    return out;
  }
  function stockState(t){return (d.focusStocks||[]).find(x=>clean(x.ticker)===clean(t))||null;}
  function incomeTicker(card){return clean(card.querySelector('.income-title-row h3,h3')?.textContent);}
  function annotate(){
    const links=reverseLinks();
    document.querySelectorAll('#income .income-card').forEach(card=>{
      const ticker=incomeTicker(card); const underlyings=links[ticker]||[];
      if(!ticker||!underlyings.length)return;
      let box=card.querySelector('.wais-income-route-links');
      if(!box){box=document.createElement('div');box.className='wais-income-route-links';card.appendChild(box);}
      const marketWide=(d.incomeEtfs||[]).some(x=>clean(x.ticker)===ticker);
      box.innerHTML=`<div class="wais-income-source-badges">${marketWide?'<span>MARKET-WIDE</span>':''}${underlyings.map(u=>`<span>LINKED · ${u}</span>`).join('')}</div><div class="wais-income-route-actions">${underlyings.map(u=>`<button type="button" data-route-underlying-link="${u}">View ${u} Route →</button>`).join('')}</div>`;
    });
  }
  function openIncome(ticker){
    document.querySelector('[data-section="income"]')?.click();
    setTimeout(()=>{
      const card=[...document.querySelectorAll('#income .income-card')].find(c=>incomeTicker(c)===clean(ticker));
      card?.scrollIntoView({behavior:'smooth',block:'center'}); card?.classList.add('wais-route-highlight'); setTimeout(()=>card?.classList.remove('wais-route-highlight'),1800);
    },150);
  }
  window.WAIS_OPEN_INCOME_TICKER=openIncome;
  document.addEventListener('click',e=>{
    const route=e.target.closest('[data-route-underlying-link]'); if(route){window.WAIS_OPEN_ROUTE?.(route.dataset.routeUnderlyingLink);return;}
    const income=e.target.closest('[data-income-ticker]'); if(income)setTimeout(()=>openIncome(income.dataset.incomeTicker),20);
  });
  const css=document.createElement('style');css.textContent=`.wais-income-route-links{margin-top:10px;padding-top:9px;border-top:1px solid rgba(255,255,255,.09)}.wais-income-source-badges,.wais-income-route-actions{display:flex;gap:6px;flex-wrap:wrap}.wais-income-source-badges span{font-size:8px;padding:4px 6px;border-radius:999px;border:1px solid rgba(40,199,190,.34);color:#8be5df;background:rgba(40,199,190,.07)}.wais-income-route-actions{margin-top:7px}.wais-income-route-actions button{border:1px solid rgba(101,170,255,.30);background:rgba(70,125,190,.09);color:#b8dcff;border-radius:8px;padding:6px 8px;font-size:8px;cursor:pointer}.wais-route-highlight{outline:2px solid rgba(40,199,190,.55)!important;box-shadow:0 0 24px rgba(40,199,190,.16)!important}`;document.head.appendChild(css);
  const start=()=>{annotate();['weeklyIncomeGrid','monthlyIncomeGrid','tacticalIncomeGrid'].forEach(id=>{const n=document.getElementById(id);if(n)new MutationObserver(()=>setTimeout(annotate,40)).observe(n,{childList:true});});setTimeout(annotate,1200);};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
  window.addEventListener('wais:quotes-updated',()=>setTimeout(annotate,120));
})();
