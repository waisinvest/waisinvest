// WAIS research-library market move presentation patch — 2026-08-15.
// Keeps point / level change and percentage together so Research Library matches Dashboard.
(() => {
  const signed = (n, digits=2) => Number.isFinite(Number(n))
    ? `${Number(n)>=0?'+':''}${Number(n).toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits})}`
    : '—';
  const pct = n => Number.isFinite(Number(n))
    ? `${Number(n)>=0?'+':''}${Number(n).toFixed(2)}%`
    : '—';

  const nameToKey = {
    'S&P 500':'SP500',
    'NASDAQ Composite':'NASDAQ',
    'SOX':'SOX',
    'VIX':'VIX',
    'US 10Y':'US10Y',
    'Hang Seng TECH':'HSTECH'
  };

  const moveText = (key,q) => {
    const digits = key==='US10Y' ? 3 : 2;
    if(key==='VIX') return `${signed(q.change,2)} (${pct(q.changePercent)}) · Level ${Number(q.value).toFixed(2)}`;
    if(key==='US10Y') return `${signed(q.change,digits)} (${pct(q.changePercent)}) · ${Number(q.value).toFixed(2)}%`;
    return `${signed(q.change,digits)} (${pct(q.changePercent)})`;
  };

  function apply(data){
    const indicators=data?.indicators||{};
    document.querySelectorAll('#research .structure-card').forEach(card=>{
      const name=card.querySelector('h3')?.textContent?.trim();
      const key=nameToKey[name];
      const q=key?indicators[key]:null;
      const move=card.querySelector('.structure-move');
      if(q && move) move.textContent=moveText(key,q);
    });
  }

  async function refresh(){
    try{
      const r=await fetch(`market-indicators.json?researchMove=${Date.now()}`,{cache:'no-store'});
      if(!r.ok) return;
      apply(await r.json());
    }catch(err){ console.error('[WAIS] research move format refresh failed',err); }
  }

  const observer=new MutationObserver(()=>refresh());
  window.addEventListener('load',()=>{
    setTimeout(refresh,250);
    const research=document.getElementById('research');
    if(research) observer.observe(research,{childList:true,subtree:true});
  });
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') setTimeout(refresh,100); });
  setInterval(refresh,5*60*1000);
})();
