// WAIS INCOME v2.1 — sanitized public safe-entry + universe-governance layer.
// Public UI only. Proprietary ranking weights and private portfolio logic remain outside the public frontend.
(function(){
  const d = window.WAIS_MARKET_DATA || (window.WAIS_MARKET_DATA = {});
  d.incomeArchitecture = d.incomeArchitecture || {};
  d.incomeArchitecture.version = '2.1';
  d.incomeArchitecture.safeEntry = {
    name: 'WAIS SAFE ENTRY ZONE',
    rule: 'A favourable price zone is necessary but never sufficient for INCOME READY 1. Income quality, NAV/total-return health, distribution sustainability, liquidity, underlying/event risk and timing must still pass.',
    publicMethod: 'When an approved research band exists, the public site derives the zone from the latest 20D average plus the stored research band. No band = CALIBRATING; the site will not invent a buy price.'
  };
  d.incomeArchitecture.universeGovernance = {
    actions: ['DISCOVER','RESEARCH','PROMOTE','KEEP','DOWNGRADE','PHASE OUT / REMOVE'],
    rule: 'The Income universe is reviewed dynamically. A fund can be promoted when evidence and price improve, or phased out when income quality, NAV/total return, liquidity, structure or relative opportunity deteriorates.'
  };
  d.incomeArchitecture.current30dRule = 'Current 30D Income Rate uses actual distributions recorded in the rolling last 30 days divided by the latest regular close. It changes when the 30-day cash window or market price changes.';

  function n(v){ const x=Number(v); return Number.isFinite(x)?x:null; }
  function pct(v){ const x=n(v); return x==null?'—':`${x.toFixed(2)}%`; }
  function money(v,currency='USD'){ const x=n(v); return x==null?'—':`${currency} ${x.toFixed(2)}`; }
  function esc(v=''){ return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
  function byTicker(ticker){ return (d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===ticker); }
  function quote(ticker,item){
    if(typeof livePrices==='undefined') return {};
    return livePrices[String(item?.priceSymbol||ticker).toUpperCase()] || livePrices[ticker] || {};
  }
  function safeZone(item,q){
    const sma=n(q.sma20), lo=n(item?.entryBandLowPct), hi=n(item?.entryBandHighPct);
    if(sma==null || sma<=0 || lo==null || hi==null) return null;
    const a=sma*(1+lo/100), b=sma*(1+hi/100);
    return {low:Math.min(a,b),high:Math.max(a,b)};
  }
  function stage(item,current,zone){
    const s=String(item?.status||'RESEARCH').toUpperCase();
    if(s.includes('READY')) return 'INCOME READY 1';
    if(s.includes('CANDIDATE+')) return 'INCOME CANDIDATE+';
    if(s.includes('CANDIDATE')) return 'INCOME CANDIDATE';
    if(s.includes('BELOW 3')) return 'PHASE OUT · INCOME SLEEVE';
    if(zone && current!=null && current>=zone.low && current<=zone.high) return 'PRICE READY · AWAIT INCOME CONFIRMATION';
    if(s.includes('WATCH')||s.includes('WAIT')) return 'WATCH INCOME';
    return 'RESEARCH';
  }
  function universeAction(item){
    const s=String(item?.status||'').toUpperCase();
    if(s.includes('BELOW 3')) return 'PHASE OUT FROM INCOME READY · RETAIN ONLY IF CORE-WEALTH CASE REMAINS';
    if(s.includes('READY')) return 'KEEP / MANAGE';
    if(s.includes('CANDIDATE')) return 'PROMOTION QUEUE';
    if(s.includes('WATCH')||s.includes('WAIT')) return 'ACTIVE WATCH';
    return 'RESEARCH / PHASE-OUT REVIEW';
  }
  function entryRateRange(q,zone){
    const rate=n(q.current30dIncomeRate), close=n(q.regularClose);
    if(rate==null || close==null || close<=0 || !zone) return null;
    const cash30=close*rate/100;
    return {atLow:cash30/zone.low*100,atHigh:cash30/zone.high*100};
  }

  function decorateCards(){
    if(typeof livePrices==='undefined') return;
    document.querySelectorAll('.income-card').forEach(card=>{
      const ticker=card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase();
      if(!ticker) return;
      const item=byTicker(ticker); if(!item) return;
      const q=quote(ticker,item), current=n(q.price), zone=safeZone(item,q), rr=entryRateRange(q,zone);
      const current30=n(q.current30dIncomeRate);
      card.dataset.income30d = current30==null?'':String(current30);

      let box=card.querySelector('.wais-safe-entry-box');
      if(!box){
        box=document.createElement('div'); box.className='wais-safe-entry-box';
        const hero=card.querySelector('.yield-hero');
        if(hero) hero.insertAdjacentElement('afterend',box); else card.querySelector('.stock-meta')?.insertAdjacentElement('beforebegin',box);
      }
      const zoneText=zone?`${money(zone.low,q.currency||item.currency)} – ${money(zone.high,q.currency||item.currency)}`:'CALIBRATING · NO APPROVED PRICE ZONE';
      const rateText=rr?`${pct(rr.atHigh)} – ${pct(rr.atLow)}`:'—';
      const inZone=zone&&current!=null&&current>=zone.low&&current<=zone.high;
      box.innerHTML=`
        <div class="safe-entry-head"><span>WAIS SAFE ENTRY</span><b>${esc(stage(item,current,zone))}</b></div>
        <div class="safe-entry-grid">
          <div><span>Current Price</span><strong>${esc(money(current,q.currency||item.currency))}</strong></div>
          <div><span>Current 30D Income Rate</span><strong>${esc(pct(current30))}</strong></div>
          <div><span>Safe Entry Zone</span><strong>${esc(zoneText)}</strong></div>
          <div><span>30D Rate @ Safe Entry</span><strong>${esc(rateText)}</strong></div>
        </div>
        <div class="safe-entry-foot">${inZone?'PRICE IS INSIDE RESEARCH ZONE · ':'PRICE GATE: '+(zone?'WAIT FOR ZONE / REVALIDATION · ':'CALIBRATING · ')}${esc(universeAction(item))}</div>`;
    });
  }

  function install30dFilter(){
    const old=document.getElementById('incomeYieldFilter');
    if(!old || document.getElementById('income30dFilter')) return;
    // Keep legacy renderer open to the full universe; the new selector filters by the real rolling 30D metric.
    let allOpt=[...old.options].find(o=>Number(o.value)===0);
    if(!allOpt){ allOpt=document.createElement('option'); allOpt.value='0'; allOpt.textContent='All'; old.prepend(allOpt); }
    old.value='0'; old.style.display='none';
    const sel=document.createElement('select'); sel.id='income30dFilter'; sel.className=old.className;
    sel.innerHTML='<option value="all">全部</option><option value="lte3">≤ 3%</option><option value="gte3">≥ 3%</option><option value="gte4">≥ 4%</option><option value="gte5" selected>≥ 5%｜5%+</option>';
    old.insertAdjacentElement('afterend',sel);
    const label=old.closest('label')?.querySelector('span'); if(label) label.textContent='Current 30D Income Rate';

    const apply=()=>{
      const mode=sel.value; let visible=0;
      document.querySelectorAll('.income-card').forEach(card=>{
        const r=n(card.dataset.income30d); let show=true;
        if(mode==='lte3') show=r!=null&&r<=3;
        else if(mode==='gte3') show=r!=null&&r>=3;
        else if(mode==='gte4') show=r!=null&&r>=4;
        else if(mode==='gte5') show=r!=null&&r>=5;
        card.style.display=show?'':'none'; if(show) visible++;
      });
      const count=document.getElementById('incomeYieldMatchCount'); if(count) count.textContent=visible;
    };
    const rerenderAll=()=>{ old.value='0'; old.dispatchEvent(new Event('change',{bubbles:true})); setTimeout(()=>{decorateCards();apply();},140); };
    sel.addEventListener('change',rerenderAll);
    ['weeklyIncomeGrid','monthlyIncomeGrid','tacticalIncomeGrid'].forEach(id=>{
      const el=document.getElementById(id); if(el) new MutationObserver(()=>requestAnimationFrame(()=>{decorateCards();apply();})).observe(el,{childList:true});
    });
    setTimeout(rerenderAll,300);
  }

  const css=document.createElement('style');
  css.textContent=`
    .wais-safe-entry-box{margin:14px 0;padding:14px;border:1px solid rgba(83,199,170,.32);border-radius:14px;background:rgba(17,63,62,.16)}
    .safe-entry-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:10px}.safe-entry-head span{font-size:10px;font-weight:800;letter-spacing:1.4px;color:#8fa7ca}.safe-entry-head b{font-size:11px;text-align:right;color:#8de0c3}
    .safe-entry-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.safe-entry-grid div{display:flex;flex-direction:column;gap:4px}.safe-entry-grid span{font-size:10px;color:#8193ae}.safe-entry-grid strong{font-size:13px;line-height:1.25}.safe-entry-foot{margin-top:10px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);font-size:10px;line-height:1.4;color:#aab7cb}
    @media(max-width:620px){.safe-entry-grid{grid-template-columns:1fr}.safe-entry-head{flex-direction:column}.safe-entry-head b{text-align:left}}
  `; document.head.appendChild(css);

  document.addEventListener('DOMContentLoaded',()=>{ setTimeout(()=>{decorateCards();install30dFilter();},900); });
  window.addEventListener('focus',()=>setTimeout(decorateCards,120));
})();
