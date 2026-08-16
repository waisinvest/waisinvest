// WAIS Route Selector v1.3 mobile-safe hotfix.
// This implementation avoids observing the full document subtree.
(() => {
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const routes=d.relatedRoutes||{
    NVDA:{stock:'NVDA',stockStatus:'CANDIDATE+ · EVENT WATCH',leveraged:['NVDL','NVDU'],leveragedStatus:'REVIEW',income:['NVDW','NVYY','NVDY','NVII'],incomeStatus:'REVIEW',preferred:'REVIEW'},
    GOOGL:{stock:'GOOGL',stockStatus:'CANDIDATE+ · ENTRY WATCH',leveraged:['GGLL','GOU','GOOL'],leveragedStatus:'REVIEW',income:['GOOW','GOOY','GOOP','GOIB'],incomeStatus:'REVIEW',preferred:'REVIEW'},
    MU:{stock:'MU',stockStatus:'CANDIDATE+ · HBM STRENGTH',leveraged:['MUU','MULL','MIC'],leveragedStatus:'REVIEW',income:['MUYY','MUIB'],incomeStatus:'REVIEW',preferred:'REVIEW'},
    AVGO:{stock:'AVGO',stockStatus:'CANDIDATE · PULLBACK REVIEW',leveraged:['AVL'],leveragedStatus:'REVIEW',income:['AVGW'],incomeStatus:'REVIEW',preferred:'REVIEW'},
    TSM:{stock:'TSM',stockStatus:'WATCH / REVIEW',leveraged:['TSMX'],leveragedStatus:'REVIEW',income:[],incomeStatus:'NO VERIFIED ROUTE',preferred:'REVIEW'},
    MRVL:{stock:'MRVL',stockStatus:'WATCH / REVIEW',leveraged:['MRVU'],leveragedStatus:'REVIEW',income:[],incomeStatus:'NO VERIFIED ROUTE',preferred:'REVIEW'}
  };
  d.relatedRoutes=routes;
  let prices={};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=v=>{const n=Number(v);return Number.isFinite(n)&&n>0?'$'+n.toFixed(2):'—'};
  const pct=v=>{const n=Number(v);return Number.isFinite(n)?`${n>=0?'+':''}${n.toFixed(2)}%`:'—'};
  function product(t,type){
    const q=prices[t]||{};
    const line=`${money(q.price)}${Number.isFinite(Number(q.changePercent))?' · '+pct(q.changePercent):''}`;
    const income=type==='income' ? `<small>${esc(q.observedFrequency||'')} ${Number.isFinite(Number(q.current30dIncomeRate))?'· 30D '+Number(q.current30dIncomeRate).toFixed(2)+'%':''}${Number.isFinite(Number(q.sustainableIncomeYield))?' · Sust. '+Number(q.sustainableIncomeYield).toFixed(1)+'%':''}</small>` : '';
    return `<span class="wais-route-product"><b>${esc(t)}</b><small>${line}</small>${income}</span>`;
  }
  function badge(k,v){return `<div class="wais-route-status"><span>${k}</span><b>${esc(v||'REVIEW')}</b></div>`;}
  function markup(t){
    const r=routes[t]; if(!r)return '';
    return `<details class="wais-route-selector"><summary><span>RELATED ROUTES</span><b>Stock · Leveraged · Income</b><em>Tap to compare</em></summary><div class="wais-route-status-row">${badge('STOCK',r.stockStatus)}${badge('LEVERAGED',r.leveragedStatus)}${badge('INCOME',r.incomeStatus)}${badge('WAIS PREFERRED',r.preferred)}</div><div class="wais-route-policy">Each route needs its own approval. Lower unit price does not mean lower risk.</div><div class="wais-route-grid"><div class="wais-route-box"><strong>STOCK ROUTE</strong>${product(r.stock,'stock')}</div><div class="wais-route-box"><strong>LEVERAGED ROUTE</strong><div class="wais-route-products">${r.leveraged.length?r.leveraged.map(x=>product(x,'leveraged')).join(''):'No verified route'}</div></div><div class="wais-route-box"><strong>INCOME ROUTE</strong><div class="wais-route-products">${r.income.length?r.income.map(x=>product(x,'income')).join(''):'No verified route'}</div></div></div></details>`;
  }
  function inject(){
    document.querySelectorAll('.stock-card,.watch-card').forEach(card=>{
      const h=card.querySelector('h3,h4'); const t=String(h?.textContent||'').trim().toUpperCase();
      if(!routes[t]||card.querySelector('.wais-route-selector'))return;
      card.insertAdjacentHTML('beforeend',markup(t));
    });
  }
  async function load(){
    try{const r=await fetch(`stock-prices.json?r=${Date.now()}`,{cache:'no-store'});if(r.ok){const j=await r.json();prices=j.prices||{};}}
    catch(e){console.error('[WAIS] route price refresh failed',e);}
    inject();
  }
  const css=document.createElement('style');
  css.textContent=`.wais-route-selector{margin-top:14px;border:1px solid rgba(87,213,255,.35);border-radius:14px;background:rgba(4,18,35,.42);overflow:hidden}.wais-route-selector summary{cursor:pointer;list-style:none;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;padding:12px 14px}.wais-route-selector summary::-webkit-details-marker{display:none}.wais-route-selector summary span{font-size:10px;color:#7ee7ff}.wais-route-selector summary b{font-size:12px}.wais-route-selector summary em{font-size:10px;font-style:normal;opacity:.7}.wais-route-status-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:0 12px 10px}.wais-route-status,.wais-route-box{border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:8px}.wais-route-status span{display:block;font-size:8px;opacity:.7}.wais-route-status b{font-size:10px}.wais-route-policy{padding:0 14px 12px;font-size:10px;opacity:.75}.wais-route-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:0 12px 12px}.wais-route-box>strong{display:block;font-size:10px;margin-bottom:7px}.wais-route-products{display:flex;gap:5px;flex-wrap:wrap}.wais-route-product{display:inline-flex;flex-direction:column;border-radius:8px;padding:6px 8px;background:rgba(255,255,255,.07);min-width:74px}.wais-route-product b{font-size:11px}.wais-route-product small{font-size:8px;opacity:.75}@media(max-width:760px){.wais-route-status-row{grid-template-columns:repeat(2,minmax(0,1fr))}.wais-route-grid{grid-template-columns:1fr}.wais-route-selector summary{grid-template-columns:1fr}.wais-route-selector summary em{display:none}.wais-route-product{flex:1 1 42%;min-width:0}}`;
  document.head.appendChild(css);
  function observeGrid(id){const g=document.getElementById(id);if(!g)return;new MutationObserver(()=>requestAnimationFrame(inject)).observe(g,{childList:true,subtree:false});}
  const start=()=>{observeGrid('topPicksGrid');observeGrid('watchlistCards');load();setTimeout(inject,800);};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
  window.addEventListener('wais:quotes-updated',load);
})();