// WAIS Watchlist visual priority order v1.0
// Keep TOP PICK #1-#5 first, then arrange the remaining Watchlist by action priority.
// CSS Grid fills row-major, so this produces a clear left-to-right, then next-row reading order.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];

  const visible=stocks.filter(s=>s&&s.showInWatchlist===true);
  const ticker=s=>String(s?.ticker||'').toUpperCase().trim();
  const status=s=>String(s?.stance||'').toUpperCase();

  // TOP PICK #1-#5 are canonical and always stay first.
  const top=[...visible]
    .filter(s=>Number.isFinite(Number(s.topPickRank)))
    .sort((a,b)=>Number(a.topPickRank)-Number(b.topPickRank));

  const topSet=new Set(top.map(ticker));

  // After Top 5, sort by how close the name is to an actionable setup,
  // then by WAIS evidence score. This replaces the old alphabetical ordering.
  function stageRank(s){
    const x=status(s);
    if(x.includes('READY')) return 0;
    if(x.includes('NEAR ENTRY')||x.includes('ENTRY WATCH')||x.includes('TECH WATCH')) return 1;
    if(x.includes('CANDIDATE+')) return 2;
    if(x.includes('CANDIDATE')) return 3;
    if(x.includes('WATCH')) return 4;
    if(x.includes('WAIT')||x.includes('CAUTIOUS')) return 5;
    if(x.includes('RESEARCH')||x.includes('VALIDAT')) return 6;
    return 7;
  }

  const rest=[...visible]
    .filter(s=>!topSet.has(ticker(s)))
    .sort((a,b)=>
      stageRank(a)-stageRank(b) ||
      Number(b.evidenceConfidence||0)-Number(a.evidenceConfidence||0) ||
      ticker(a).localeCompare(ticker(b))
    );

  const ordered=[...top,...rest];
  d.watchPriorityOrder=ordered.map(ticker);
  d.watchPriorityPolicy={
    version:'1.0',
    readingOrder:'LEFT_TO_RIGHT_THEN_NEXT_ROW',
    rule:'TOP PICK #1-#5 first; remaining Watchlist names are ordered by action stage, then WAIS evidence score, never alphabetically by default.',
    stagePriority:['READY/NEAR ENTRY','CANDIDATE+','CANDIDATE','WATCH','WAIT','RESEARCH']
  };

  ordered.forEach((s,i)=>{ s.watchPriorityRank=i+1; });
  window.WAIS_MARKET_DATA=d;

  function applyVisualOrder(){
    const grid=document.getElementById('watchlistCards');
    if(!grid) return;
    const cards=[...grid.querySelectorAll('.watch-card')];
    if(!cards.length) return;

    const orderIndex=new Map(d.watchPriorityOrder.map((t,i)=>[t,i]));
    const sorted=[...cards].sort((a,b)=>{
      const ta=String(a.querySelector('h4')?.textContent||'').trim().toUpperCase();
      const tb=String(b.querySelector('h4')?.textContent||'').trim().toUpperCase();
      return (orderIndex.get(ta)??999)-(orderIndex.get(tb)??999);
    });

    sorted.forEach((card,index)=>{
      grid.appendChild(card);
      const t=String(card.querySelector('h4')?.textContent||'').trim().toUpperCase();
      const s=stocks.find(x=>ticker(x)===t);
      if(!s) return;

      // TOP PICK #1-#5 retain their existing TOP PICK chip.
      // From #6 onward show WATCH # so the reading sequence stays obvious.
      if(!Number.isFinite(Number(s.topPickRank))){
        const head=card.querySelector('.signal-card-head');
        if(head && !head.querySelector('.watch-priority-chip')){
          const chip=document.createElement('span');
          chip.className='priority-chip watch-priority-chip';
          chip.textContent=`WATCH #${index+1}`;
          head.appendChild(chip);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.getElementById('watchlistCards');
    if(!grid) return;
    let busy=false;
    const observer=new MutationObserver(()=>{
      if(busy) return;
      busy=true;
      observer.disconnect();
      applyVisualOrder();
      observer.observe(grid,{childList:true});
      busy=false;
    });
    applyVisualOrder();
    observer.observe(grid,{childList:true});
  });
})();
