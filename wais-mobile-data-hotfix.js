// WAIS mobile/data display hotfix — 2026-08-15.
// Public presentation only. No proprietary model logic belongs here.
(() => {
  const MOBILE_MAX = 820;
  const FUTURES_MAX_AGE_MIN = 60;
  const $ = id => document.getElementById(id);
  const parseTime = value => { const t = Date.parse(value || ''); return Number.isFinite(t) ? t : null; };
  const ageMinutes = value => { const t = parseTime(value); return t == null ? Infinity : Math.max(0, (Date.now() - t) / 60000); };
  const fmt = (n, digits=2) => Number.isFinite(Number(n)) ? Number(n).toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits}) : '—';
  const signed = (n, digits=2) => Number.isFinite(Number(n)) ? `${Number(n)>=0?'+':''}${Number(n).toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits})}` : '—';
  const pct = n => Number.isFinite(Number(n)) ? `${Number(n)>=0?'+':''}${Number(n).toFixed(2)}%` : '—';
  const dateInZone = (value, zone) => {
    const t=parseTime(value); if(t==null) return '—';
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(t));
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));
    return `${p.year}/${p.month}/${p.day}`;
  };

  const style=document.createElement('style');
  style.textContent=`
    @media (max-width:${MOBILE_MAX}px){
      html,body{min-height:100%;height:auto!important;overflow-x:hidden!important;overflow-y:auto!important;background-attachment:scroll!important}
      body{contain:none!important;transform:none!important;will-change:auto!important}
      .app-shell,.main-area,main{height:auto!important;min-height:100vh!important;overflow:visible!important;contain:none!important;transform:none!important}
      .page-section.active{display:block!important;height:auto!important;min-height:1px!important;overflow:visible!important;contain:none!important}
      .topbar{position:relative!important;top:auto!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;background:#07101f!important}
      .sidebar,.sidebar-overlay{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
      .market-indicators-panel,.market-indicators-grid,.market-indicator-card,.metrics-grid,.content-grid{contain:none!important;transform:none!important;will-change:auto!important}
      .market-indicator-card{min-height:0!important}
    }
  `;
  document.head.appendChild(style);

  const cardMeta = {
    SP500:['sp500Value','sp500Change','America/New_York','US'], NASDAQ100:['nasdaq100Value','nasdaq100Change','America/New_York','US'],
    SOX:['soxValue','soxChange','America/New_York','US'], VIX:['vixValue','vixChange','America/New_York','US'],
    US10Y:['us10yValue','us10yChange','America/New_York','US'], NASDAQ:['nasdaqValue','nasdaqChange','America/New_York','US'],
    DOW:['dowValue','dowChange','America/New_York','US'], HSI:['hsiValue','hsiChange','Asia/Hong_Kong','HK'],
    HSTECH:['hstechValue','hstechChange','Asia/Hong_Kong','HK'], HSIF:['hsifValue','hsifChange','Asia/Hong_Kong','HK FUTURES']
  };

  function moveText(key,q){
    // Index-like cards show the actual point move first, then percentage. For US10Y the
    // raw change is a yield-level move, so keep enough precision to avoid hiding it.
    const digits = key==='US10Y' ? 3 : 2;
    return `${signed(q.change,digits)} · ${pct(q.changePercent)}`;
  }

  function annotateCard(key,q){
    const meta=cardMeta[key]; if(!meta||!q) return;
    const [vId,cId,zone,market]=meta;
    const v=$(vId), c=$(cId), card=v?.closest('.market-indicator-card');
    const desc=card?.querySelector('p');
    const asOf=q.asOf || q.regularCloseDate;
    const d=dateInZone(asOf,zone);

    if(key==='HSIF'){
      const explicitlyClosed=String(q.freshness||'').toUpperCase()==='MARKET_CLOSED' || q.marketOpen===false;
      const age=ageMinutes(q.asOf);
      const tooOld=!explicitlyClosed && (!Number.isFinite(age) || age>FUTURES_MAX_AGE_MIN || /fallback/i.test(String(q.freshness||'')));
      if(tooOld){
        if(v) v.textContent='—';
        if(c) c.textContent='STALE FUTURES · NOT USED';
        if(desc) desc.textContent=`恒指期貨報價已過時（最後 ${d}）；WAIS 不會把舊價當最新訊號。`;
        card?.classList.add('wais-stale-market-card'); return;
      }
      if(v) v.textContent=fmt(q.value);
      if(c) c.textContent=`${moveText(key,q)} · ${explicitlyClosed?'MARKET CLOSED':String(q.session||'LATEST').toUpperCase()}`;
      if(desc) desc.textContent=`恒指期貨 ${q.session||'Latest'} · ${d} · ${String(q.freshness||'LATEST').toUpperCase()}`;
      card?.classList.remove('wais-stale-market-card'); return;
    }

    const isClose = q.regularCloseDate && String(q.regularCloseDate)===String(d).replaceAll('/','-');
    if(v) v.textContent=fmt(q.value);
    if(c) c.textContent=`${moveText(key,q)} · ${isClose?'CLOSE':'SNAPSHOT'} ${d}`;
    if(desc){
      const original=desc.dataset.waisBase || desc.textContent || market;
      desc.dataset.waisBase=original.replace(/ · (CLOSE|SNAPSHOT).*$/,'');
      desc.textContent=`${desc.dataset.waisBase} · ${isClose?'CLOSE':'SNAPSHOT'} ${d}`;
    }
  }

  async function refreshPresentation(){
    try{
      const r=await fetch(`market-indicators.json?presentation=${Date.now()}`,{cache:'no-store'}); if(!r.ok) return;
      const data=await r.json(); Object.entries(data.indicators||{}).forEach(([k,q])=>annotateCard(k,q));
      const stamp=data.lastUpdated, el=$('marketIndicatorsUpdated');
      if(el && stamp) el.textContent=`VERIFIED DATA FILE · ${new Date(stamp).toLocaleString('en-CA',{timeZone:'America/New_York'})} ET`;
    }catch(err){ console.error('[WAIS] presentation hotfix refresh failed',err); }
  }
  window.addEventListener('load',()=>setTimeout(refreshPresentation,150));
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') setTimeout(refreshPresentation,100); });
  window.addEventListener('wais:quotes-updated',()=>setTimeout(refreshPresentation,50));
  setInterval(refreshPresentation,5*60*1000);
})();