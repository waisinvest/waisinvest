// WAIS ROUTE INTELLIGENCE v1.0
// One thesis, multiple execution vehicles. Stock / Leveraged / Income each require independent approval.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clean=s=>String(s||'').trim().toUpperCase();
  const statusColour=s=>window.WAIS_COLOR_FOR_STATUS?window.WAIS_COLOR_FOR_STATUS(s):'grey';
  const fmtPct=v=>Number.isFinite(Number(v))?`${Number(v).toFixed(2)}%`:'—';
  const money=v=>Number.isFinite(Number(v))&&Number(v)>0?`$${Number(v).toFixed(2)}`:'—';
  const routeTypeMeta={
    stock:{label:'STOCK',icon:'◆',cls:'wais-route-type-stock'},
    leveraged:{label:'LEVERAGED',icon:'⚡',cls:'wais-route-type-leveraged'},
    income:{label:'INCOME',icon:'$',cls:'wais-route-type-income'}
  };
  window.WAIS_ROUTE_TYPE_META=Object.freeze(routeTypeMeta);

  function ensureShell(){
    const nav=document.querySelector('.nav-list');
    const top=nav?.querySelector('[data-section="top-picks"]');
    if(nav && top && !nav.querySelector('[data-section="route-intelligence"]')){
      const btn=document.createElement('button');
      btn.className='nav-item';
      btn.dataset.section='route-intelligence';
      btn.textContent='Route Intelligence';
      top.insertAdjacentElement('afterend',btn);
    }
    const main=document.querySelector('main');
    const watch=document.getElementById('watchlist');
    if(main && !document.getElementById('route-intelligence')){
      const section=document.createElement('section');
      section.className='page-section';
      section.id='route-intelligence';
      section.innerHTML=`
        <div class="section-banner">
          <div>
            <span class="panel-kicker">WAIS EXECUTION VEHICLE INTELLIGENCE</span>
            <h2>Route Intelligence｜投資路線</h2>
            <p>由同一個 underlying thesis 比較 Stock、⚡ Leveraged、Income。每條 route 獨立 READY；市場有產品不代表 WAIS 會選用。</p>
          </div>
        </div>
        <article class="panel route-intro-panel">
          <div class="panel-head"><div><span class="panel-kicker">WAIS ROUTE RULE</span><h3>Best Representative Route, not an ETF directory</h3></div><div class="route-audit-chip">DATA-DRIVEN</div></div>
          <div class="weekly-risk-note">Stock READY ≠ Leveraged READY ≠ Income READY。Route ranking 只有在足夠流動性、結構、收入／NAV及風險資料下才會標示 Best；否則顯示 VALIDATING / DATA GAP。</div>
        </article>
        <div id="routeIntelligenceGrid" class="route-intelligence-grid"></div>`;
      if(watch) main.insertBefore(section,watch); else main.appendChild(section);
    }
  }
  ensureShell();

  function stockByTicker(t){return (d.focusStocks||[]).find(x=>clean(x.ticker)===clean(t))||null;}
  function quoteMap(){return window.WAIS_RUNTIME_QUOTES||{};}
  function routeRecord(t){return d.relatedRoutes?.[clean(t)]||null;}
  function statusChip(status){const c=statusColour(status);return `<span class="wais-route-decision wais-color-${c}">${esc(status||'DATA GAP')}</span>`;}
  function routeHeader(type,ticker){const m=routeTypeMeta[type];return `<div class="wais-route-kind ${m.cls}"><span>${m.icon}</span><b>${m.label}</b>${ticker?`<em>${esc(ticker)}</em>`:''}</div>`;}
  function metricLine(label,value){return `<div class="route-metric"><span>${esc(label)}</span><b>${esc(value)}</b></div>`;}
  function productMetrics(ticker,type){
    const q=quoteMap()[clean(ticker)]||{};
    const rows=[metricLine('Price',money(q.price)),metricLine('Session',q.session||'—')];
    if(Number.isFinite(Number(q.avgDollarVolume20d))) rows.push(metricLine('20D $ Volume',`$${Math.round(Number(q.avgDollarVolume20d)).toLocaleString('en-US')}`));
    else rows.push(metricLine('20D $ Volume','DATA GAP'));
    if(type==='income'){
      rows.push(metricLine('30D Income',fmtPct(q.current30dIncomeRate)));
      rows.push(metricLine('Sustainable',fmtPct(q.sustainableIncomeYield)));
      rows.push(metricLine('Consistency',Number.isFinite(Number(q.incomeConsistency))?`${Number(q.incomeConsistency).toFixed(0)}/100`:'—'));
    }
    return rows.join('');
  }
  function preferredCandidate(list,type){
    const quotes=quoteMap();
    const scored=(list||[]).map(t=>({t,q:quotes[clean(t)]||{}})).filter(x=>x.t);
    if(!scored.length) return {ticker:null,reason:'No verified route'};
    scored.sort((a,b)=>Number(b.q.avgDollarVolume20d||0)-Number(a.q.avgDollarVolume20d||0));
    const first=scored[0];
    if(!Number.isFinite(Number(first.q.avgDollarVolume20d))) return {ticker:null,reason:'Liquidity ranking DATA GAP'};
    if(type==='income'){
      scored.sort((a,b)=>{
        const sa=(Number(a.q.sustainableIncomeYield)||0)*0.45+(Number(a.q.incomeConsistency)||0)*0.15+(Math.log10(Math.max(1,Number(a.q.avgDollarVolume20d)||1)))*3;
        const sb=(Number(b.q.sustainableIncomeYield)||0)*0.45+(Number(b.q.incomeConsistency)||0)*0.15+(Math.log10(Math.max(1,Number(b.q.avgDollarVolume20d)||1)))*3;
        return sb-sa;
      });
      return {ticker:scored[0].t,reason:'Provisional data score: sustainable income + consistency + liquidity. NAV/ROC/participation validation still required.'};
    }
    return {ticker:first.t,reason:'Provisional activity leader by 20D average dollar volume; spread/tracking/AUM validation still required.'};
  }
  function routeBox(type,ticker,status,note){
    return `<article class="route-detail-card ${routeTypeMeta[type].cls}">
      ${routeHeader(type,ticker)}
      <div class="route-status-line">${statusChip(status)}</div>
      <div class="route-metrics-grid">${ticker?productMetrics(ticker,type):metricLine('Route','No verified product')}</div>
      <p>${esc(note||'')}</p>
      ${ticker&&type==='income'?`<button class="route-link-btn" data-income-ticker="${esc(ticker)}">View Income ETF →</button>`:''}
    </article>`;
  }
  function renderOne(ticker){
    const s=stockByTicker(ticker); const r=routeRecord(ticker)||{};
    const lev=preferredCandidate(r.leveraged||[],'leveraged');
    const inc=preferredCandidate(r.income||[],'income');
    const stockStatus=r.stockStatus||s?.stance||'DATA GAP';
    const levStatus=r.leveragedStatus||'VALIDATING';
    const incStatus=r.incomeStatus||'VALIDATING';
    const preferred=(r.preferred&&r.preferred!=='REVIEW')?r.preferred:'NONE / VALIDATING';
    return `<article class="panel route-underlying-card" data-route-underlying="${esc(ticker)}">
      <div class="panel-head route-underlying-head"><div><span class="panel-kicker">UNDERLYING ROUTE MAP</span><h3>${esc(ticker)}${s?.company?` · ${esc(s.company)}`:''}</h3></div><div>${statusChip(s?.stance||stockStatus)}</div></div>
      <div class="route-preferred-bar"><span>WAIS PREFERRED ROUTE NOW</span><b>${esc(preferred)}</b><small>Only independent route approval can move to READY 1.</small></div>
      <div class="route-three-grid">
        ${routeBox('stock',r.stock||ticker,stockStatus,'Full underlying participation; no leverage reset or income-option cap.')}
        ${routeBox('leveraged',lev.ticker,lev.ticker?levStatus:'DATA GAP',lev.reason)}
        ${routeBox('income',inc.ticker,inc.ticker?incStatus:'DATA GAP',inc.reason)}
      </div>
      <div class="route-alternatives"><span>Leveraged alternatives</span><b>${esc((r.leveraged||[]).filter(x=>x!==lev.ticker).join(' · ')||'—')}</b><span>Income alternatives</span><b>${esc((r.income||[]).filter(x=>x!==inc.ticker).join(' · ')||'—')}</b></div>
      <div class="route-card-actions"><button class="route-link-btn" data-stock-ticker="${esc(ticker)}">View Watchlist / Top Pick →</button></div>
    </article>`;
  }
  function routeTickers(){
    const keys=Object.keys(d.relatedRoutes||{});
    const priority=(d.focusStocks||[]).filter(x=>x.showInWatchlist===true).map(x=>clean(x.ticker));
    return [...new Set([...priority,...keys])].filter(Boolean);
  }
  function render(){const g=document.getElementById('routeIntelligenceGrid');if(g)g.innerHTML=routeTickers().map(renderOne).join('')||'<article class="panel">No verified routes yet.</article>';}

  function openRoute(ticker){
    const nav=document.querySelector('[data-section="route-intelligence"]');
    if(nav) nav.click();
    setTimeout(()=>document.querySelector(`[data-route-underlying="${CSS.escape(clean(ticker))}"]`)?.scrollIntoView({behavior:'smooth',block:'start'}),120);
  }
  window.WAIS_OPEN_ROUTE=openRoute;

  function addCardLinks(){
    document.querySelectorAll('#topPicksGrid .stock-card,#watchlistCards .watch-card').forEach(card=>{
      const t=clean(card.querySelector('h3,h4')?.textContent); if(!t||!routeRecord(t)) return;
      if(!card.querySelector('.wais-full-route-btn')){
        const b=document.createElement('button'); b.type='button'; b.className='route-link-btn wais-full-route-btn'; b.textContent='View Full Route →'; b.addEventListener('click',()=>openRoute(t)); card.appendChild(b);
      }
      const inTop=!!document.querySelector(`#topPicksGrid .stock-card h3`)&&[...document.querySelectorAll('#topPicksGrid .stock-card h3')].some(h=>clean(h.textContent)===t);
      const inWatch=[...document.querySelectorAll('#watchlistCards .watch-card h4')].some(h=>clean(h.textContent)===t);
      let nav=card.querySelector('.wais-cross-nav'); if(!nav){nav=document.createElement('div');nav.className='wais-cross-nav';card.appendChild(nav);} nav.innerHTML=`${inTop?'<button type="button" data-cross="top">Top Pick</button>':''}${inWatch?'<button type="button" data-cross="watch">Watchlist</button>':''}`;
      nav.querySelector('[data-cross="top"]')?.addEventListener('click',()=>document.querySelector('[data-section="top-picks"]')?.click());
      nav.querySelector('[data-cross="watch"]')?.addEventListener('click',()=>document.querySelector('[data-section="watchlist"]')?.click());
    });
  }
  function bindRouteButtons(){
    document.addEventListener('click',e=>{
      const income=e.target.closest('[data-income-ticker]'); if(income){document.querySelector('[data-section="income"]')?.click();return;}
      const stock=e.target.closest('[data-stock-ticker]'); if(stock){const t=clean(stock.dataset.stockTicker);const s=stockByTicker(t);document.querySelector(`[data-section="${Number.isFinite(Number(s?.topPickRank))?'top-picks':'watchlist'}"]`)?.click();}
    });
  }

  const css=document.createElement('style');css.id='wais-route-intelligence-css';css.textContent=`
    .route-intelligence-grid{display:grid;gap:18px}.route-underlying-card{scroll-margin-top:24px}.route-underlying-head{align-items:flex-start}.route-preferred-bar{display:grid;grid-template-columns:auto auto 1fr;gap:12px;align-items:center;padding:11px 13px;margin-bottom:12px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.035)}.route-preferred-bar span{font-size:9px;letter-spacing:.8px;opacity:.7}.route-preferred-bar b{font-size:13px}.route-preferred-bar small{font-size:10px;opacity:.65}.route-three-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.route-detail-card{border:1px solid rgba(255,255,255,.14);border-left-width:4px;border-radius:14px;padding:13px;background:rgba(6,18,34,.44)}.wais-route-type-stock{--route-accent:#5f91ff}.wais-route-type-leveraged{--route-accent:#ff9f43}.wais-route-type-income{--route-accent:#39d7c7}.route-detail-card{border-left-color:var(--route-accent)}.wais-route-kind{display:flex;align-items:center;gap:7px;color:var(--route-accent)}.wais-route-kind span{font-size:15px}.wais-route-kind b{font-size:10px;letter-spacing:1px}.wais-route-kind em{font-size:12px;font-style:normal;color:#f2f6ff;margin-left:auto}.route-status-line{margin:10px 0}.wais-route-decision{display:inline-flex;border:1px solid;border-radius:999px;padding:5px 8px;font-size:9px;font-weight:800}.route-metrics-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}.route-metric{padding:7px;border:1px solid rgba(255,255,255,.08);border-radius:9px}.route-metric span{display:block;font-size:8px;opacity:.6}.route-metric b{font-size:10px}.route-detail-card p{font-size:10px;line-height:1.45;opacity:.72}.route-alternatives{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:8px 10px;margin-top:11px;font-size:9px;align-items:center}.route-alternatives span{opacity:.55}.route-alternatives b{font-weight:600}.route-link-btn,.wais-cross-nav button{border:1px solid rgba(101,170,255,.32);background:rgba(70,125,190,.10);color:#b8dcff;border-radius:9px;padding:7px 9px;font-size:9px;cursor:pointer}.route-card-actions,.wais-cross-nav{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.route-audit-chip{font-size:9px;padding:6px 9px;border:1px solid rgba(75,208,180,.35);border-radius:999px;color:#81e6d1}.wais-full-route-btn{margin-top:10px;width:100%}@media(max-width:820px){.route-three-grid{grid-template-columns:1fr}.route-preferred-bar{grid-template-columns:1fr}.route-alternatives{grid-template-columns:1fr}.route-underlying-card{padding:12px}.route-metrics-grid{grid-template-columns:1fr 1fr}}
  `;document.head.appendChild(css);

  const start=()=>{render();addCardLinks();bindRouteButtons();['topPicksGrid','watchlistCards'].forEach(id=>{const n=document.getElementById(id);if(n)new MutationObserver(()=>setTimeout(addCardLinks,30)).observe(n,{childList:true});});};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
  window.addEventListener('wais:quotes-updated',()=>setTimeout(render,50));
})();
