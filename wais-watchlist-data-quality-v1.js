// WAIS Watchlist data-quality presentation v1.0
// Distinguish a true data-pipeline gap from an intentionally unapproved Entry/Target.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const byTicker=Object.fromEntries(stocks.map(s=>[String(s.ticker||'').toUpperCase(),s]));

  d.watchDataPolicy={
    version:'1.0',
    rule:'Never show an ambiguous blank when WAIS knows why a field is unavailable. Missing quote data is DATA PENDING; an unapproved Entry/Target is PENDING REVIEW and must not be replaced by an invented level.'
  };

  const css=document.createElement('style');
  css.textContent=`
    .watch-data-pending{color:#f5c45e!important;font-size:11px!important;letter-spacing:.02em}
    .watch-review-pending{color:#9db7ff!important;font-size:11px!important;letter-spacing:.02em}
    .watch-data-note{margin-top:10px;padding:8px 10px;border-radius:10px;background:rgba(131,164,255,.07);border:1px solid rgba(131,164,255,.16);font-size:10px;color:#91a0bb;line-height:1.45}
  `;
  document.head.appendChild(css);

  function fieldStrong(card,label,scopeSelector){
    const scope=card.querySelector(scopeSelector);
    if(!scope) return null;
    const boxes=[...scope.children];
    const box=boxes.find(x=>String(x.querySelector('span')?.textContent||'').trim()===label);
    return box?.querySelector('strong')||null;
  }

  function decorate(){
    const grid=document.getElementById('watchlistCards');
    if(!grid) return;

    [...grid.querySelectorAll('.watch-card')].forEach(card=>{
      const ticker=String(card.querySelector('h4')?.textContent||'').trim().toUpperCase();
      const stock=byTicker[ticker];
      if(!stock) return;

      const current=fieldStrong(card,'Current / Last Close','.watch-prices');
      const entry=fieldStrong(card,'Entry','.watch-prices');
      const target=fieldStrong(card,'Target','.watch-prices');
      const priceDate=fieldStrong(card,'Price Date','.watch-meta-grid');
      const distance=fieldStrong(card,'Distance to Entry','.watch-meta-grid');

      let hasDataGap=false;
      let hasReviewPending=false;

      if(current && String(current.textContent).trim()==='—'){
        current.textContent='DATA PENDING';
        current.classList.add('watch-data-pending');
        hasDataGap=true;
      }
      if(priceDate && String(priceDate.textContent).trim()==='—'){
        priceDate.textContent='DATA PENDING';
        priceDate.classList.add('watch-data-pending');
        hasDataGap=true;
      }

      if(Number(stock.entry||0)<=0){
        if(entry){entry.textContent='PENDING REVIEW';entry.classList.add('watch-review-pending');}
        if(distance){distance.textContent='PENDING REVIEW';distance.classList.add('watch-review-pending');}
        hasReviewPending=true;
      }
      if(Number(stock.target||0)<=0){
        if(target){target.textContent='PENDING REVIEW';target.classList.add('watch-review-pending');}
        hasReviewPending=true;
      }

      let note=card.querySelector('.watch-data-note');
      if(hasDataGap||hasReviewPending){
        if(!note){note=document.createElement('div');note.className='watch-data-note';card.appendChild(note);}
        const parts=[];
        if(hasDataGap) parts.push('DATA PENDING = automatic quote pipeline has not supplied this field yet; do not treat it as a zero price.');
        if(hasReviewPending) parts.push('PENDING REVIEW = WAIS has deliberately not approved a current Entry/Target level; no number will be invented merely to fill the card.');
        note.textContent=parts.join(' ');
      }else if(note){
        note.remove();
      }
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.getElementById('watchlistCards');
    if(!grid) return;
    let scheduled=false;
    const run=()=>{
      if(scheduled) return;
      scheduled=true;
      requestAnimationFrame(()=>{scheduled=false;decorate();});
    };
    new MutationObserver(run).observe(grid,{childList:true,subtree:false});
    run();
  });
})();
