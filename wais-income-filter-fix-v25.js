// WAIS INCOME v2.5 — filter intersection + priceSymbol-aware 30D metrics.
// Public UI hotfix only. No proprietary ranking logic is exposed.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  function num(v){const n=Number(v);return Number.isFinite(n)?n:null;}
  function pct(v){const n=num(v);return n==null?'—':`${n.toFixed(2)}%`;}
  function tickerOf(card){return card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase()||card.querySelector('h3')?.textContent?.trim()?.toUpperCase()||'';}
  function itemOf(ticker){return (d.incomeEtfs||[]).find(x=>String(x.ticker||'').toUpperCase()===ticker)||null;}
  function quoteOf(ticker,item){
    if(typeof livePrices==='undefined') return {};
    const symbol=String(item?.priceSymbol||ticker).toUpperCase();
    return livePrices[symbol]||livePrices[ticker]||{};
  }
  function activeStage(){return document.querySelector('.income-stage-btn.active')?.dataset?.incomeStage||'all';}
  function stageMatches(card){const s=activeStage();return s==='all'||card.dataset.waisStage===s;}
  function rateMatches(rate,mode){
    if(mode==='all') return true;
    if(rate==null) return false;
    if(mode==='lte3') return rate<=3;
    if(mode==='gte3') return rate>=3;
    if(mode==='gte4') return rate>=4;
    if(mode==='gte5') return rate>=5;
    return true;
  }
  function cash10k(rate,currency){
    if(rate==null) return 'DATA PENDING';
    const cash=10000*rate/100;
    return `≈ ${String(currency||'USD').toUpperCase()} ${cash.toLocaleString('en-US',{maximumFractionDigits:0})} / $10k / 30D`;
  }
  function refresh(){
    const sel=document.getElementById('income30dFilter');
    const mode=sel?.value||'all';
    let visible=0;
    document.querySelectorAll('#income .income-card').forEach(card=>{
      const ticker=tickerOf(card),item=itemOf(ticker),q=quoteOf(ticker,item);
      const rate=num(q.current30dIncomeRate);
      const hero=card.querySelector('.yield-hero');
      if(hero){
        const label=hero.querySelector('span'),strong=hero.querySelector('strong'),small=hero.querySelector('small');
        if(label) label.textContent='CURRENT 30D INCOME RATE*';
        if(strong) strong.textContent=pct(rate);
        if(small) small.textContent=cash10k(rate,q.currency||item?.currency);
      }
      card.dataset.income30d=rate==null?'':String(rate);
      card.dataset.waisRateAvailable=rate==null?'0':'1';
      const show=stageMatches(card)&&rateMatches(rate,mode);
      card.hidden=!show;
      card.style.display=show?'':'none';
      if(show) visible++;
    });
    const count=document.getElementById('incomeYieldMatchCount');
    if(count) count.textContent=visible;
  }
  function schedule(){setTimeout(refresh,80);setTimeout(refresh,280);setTimeout(refresh,650);}
  document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,1300));
  document.addEventListener('change',e=>{if(e.target?.id==='income30dFilter'||e.target?.id==='incomeYieldFilter') schedule();});
  document.addEventListener('click',e=>{if(e.target.closest?.('.income-stage-btn')) schedule();});
  window.addEventListener('wais:quotes-updated',schedule);
  window.addEventListener('focus',schedule);
  window.WAIS_REFRESH_INCOME_FILTER=refresh;
})();
