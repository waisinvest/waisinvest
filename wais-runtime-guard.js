// WAIS runtime freshness guard: cache-safe reads, concise session labels and stale-data protection.
(() => {
  const REFRESH_MS = 5 * 60 * 1000;
  const STALE_MINUTES = 35;
  const FUTURES_MAX_AGE_MIN = 60;
  let busy = false;
  const $ = id => document.getElementById(id);
  const fetchJSON = async path => {
    const r = await fetch(`${path}?wais=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    return r.json();
  };
  const parseTime = value => { const t = Date.parse(value || ''); return Number.isFinite(t) ? t : null; };
  const ageMinutes = value => { const t = parseTime(value); return t == null ? Infinity : Math.max(0, (Date.now() - t) / 60000); };
  const fmt = (n, digits=2) => Number.isFinite(Number(n)) ? Number(n).toLocaleString('en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits}) : '—';
  const fmtPct = n => Number.isFinite(Number(n)) ? `${Number(n)>=0?'+':''}${Number(n).toFixed(2)}%` : '—';
  const set = (id, value) => { const el=$(id); if(el) el.textContent=value; };
  const zonedParts = (value, zone) => {
    const t=parseTime(value); if(t==null) return null;
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(t));
    return Object.fromEntries(parts.map(x=>[x.type,x.value]));
  };
  const dateInZone = (value, zone) => {
    const p=zonedParts(value,zone); return p?`${p.year}/${p.month}/${p.day}`:'—';
  };
  const todayInZone = zone => dateInZone(new Date().toISOString(),zone);
  const nowMinutesInZone = zone => {
    const p=zonedParts(new Date().toISOString(),zone); return p?Number(p.hour)*60+Number(p.minute):null;
  };
  const marketSession = (key,q,zone,qDate) => {
    const explicit=String(q?.session||'').trim().toUpperCase();
    if(explicit && explicit!=='LATEST') return explicit;
    const status=String(q?.dataStatus||'');
    if(/completed.*close|daily close/i.test(status) && !/snapshot/i.test(status)) return 'CLOSE';
    if(qDate!==todayInZone(zone)) return 'CLOSE';
    const m=nowMinutesInZone(zone);
    if(m==null) return 'SNAPSHOT';
    if(key==='HSI'||key==='HSTECH'){
      if((m>=570&&m<720)||(m>=780&&m<960)) return 'REGULAR';
      if(m>=720&&m<780) return 'MIDDAY';
      return 'CLOSE';
    }
    if(m>=570&&m<960) return 'REGULAR';
    return 'CLOSE';
  };

  const mobileStyle=document.createElement('style');
  mobileStyle.textContent=`@media(max-width:820px){
    html,body{height:auto!important;min-height:100%!important;overflow-x:hidden!important;overflow-y:auto!important;background-attachment:scroll!important}
    body,.app-shell,.main-area,main,.page-section.active{contain:none!important;transform:none!important;will-change:auto!important}
    .app-shell,.main-area,main{height:auto!important;min-height:100vh!important;overflow:visible!important}
    .page-section.active{display:block!important;height:auto!important;overflow:visible!important}
    .topbar{position:relative!important;top:auto!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;background:#07101f!important}
    .sidebar,.sidebar-overlay{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    .market-indicators-panel,.market-indicators-grid,.market-indicator-card,.metrics-grid,.content-grid{contain:none!important;transform:none!important;will-change:auto!important}
  }`;
  document.head.appendChild(mobileStyle);

  const map = {
    SP500:['sp500Value','sp500Change','America/New_York'],
    NASDAQ100:['nasdaq100Value','nasdaq100Change','America/New_York'],
    SOX:['soxValue','soxChange','America/New_York'],
    VIX:['vixValue','vixChange','America/New_York'],
    US10Y:['us10yValue','us10yChange','America/New_York'],
    NASDAQ:['nasdaqValue','nasdaqChange','America/New_York'],
    DOW:['dowValue','dowChange','America/New_York'],
    HSI:['hsiValue','hsiChange','Asia/Hong_Kong'],
    HSTECH:['hstechValue','hstechChange','Asia/Hong_Kong'],
    HSIF:['hsifValue','hsifChange','Asia/Hong_Kong']
  };

  function renderIndicators(data) {
    const m = data?.indicators || {};
    Object.entries(map).forEach(([key,[vId,cId,zone]]) => {
      const q=m[key]; if(!q) return;
      const v=$(vId), c=$(cId), card=v?.closest('.market-indicator-card'), desc=card?.querySelector('p');
      const qDate=dateInZone(q.asOf || q.regularCloseDate, zone);
      if(key==='HSIF'){
        const age=ageMinutes(q.asOf);
        const stale=!Number.isFinite(age) || age>FUTURES_MAX_AGE_MIN || /fallback/i.test(String(q.freshness||''));
        if(stale){
          set(vId,'—'); set(cId,'STALE');
          if(desc) desc.textContent=`Last ${qDate}`;
        }else{
          const session=String(q.session||'LATEST').toUpperCase();
          set(vId,fmt(q.value)); set(cId,`${fmtPct(q.changePercent)} · ${session}`);
          if(desc) desc.textContent=`${String(q.contractMonth||'').toUpperCase()} · ${qDate}`.replace(/^ · /,'');
        }
      }else{
        const session=marketSession(key,q,zone,qDate);
        set(vId,fmt(q.value));
        set(cId,`${fmtPct(q.changePercent)} · ${session}`);
        if(desc){
          const base=(desc.dataset.waisBase||desc.textContent||'').replace(/ · (CLOSE|SNAPSHOT|REGULAR|MIDDAY).*$/,'').replace(/ · \d{4}\/\d{2}\/\d{2}$/,'');
          desc.dataset.waisBase=base;
          desc.textContent=`${base} · ${qDate}`;
        }
      }
      if(v) v.title=`${q.source||'Unknown source'} · ${q.asOf||'unknown time'} · ${q.dataStatus||''}`;
      if(c) c.title=v?.title||'';
    });
    const stamp=data?.lastUpdated;
    set('marketIndicatorsUpdated', `VERIFIED DATA · ${stamp ? new Date(stamp).toLocaleString('en-CA',{timeZone:'America/New_York'})+' ET' : 'time unavailable'}`);
    set('marketIndicatorsTitle', '全球市場最新可確認指標');
  }

  function exposeFreshQuotes(data) {
    window.WAIS_RUNTIME_QUOTES = data?.prices || {};
    window.WAIS_RUNTIME_QUOTES_UPDATED_AT = data?.lastUpdated || null;
    window.dispatchEvent(new CustomEvent('wais:quotes-updated', { detail: data }));
  }

  function renderSystemState() {
    const d=window.WAIS_MARKET_DATA||{};
    set('riskScoreMetric', d.riskScore ?? '—');
    set('cashMetric', d.recommendedCash ?? '—');
    set('marketMode', d.marketMode || 'WAIT');
    set('defenseStatus', d.defenseStatus || (Number(d.riskScore)>60?'DEFENSIVE':'WATCH'));
    const p=$('riskProgress'); if(p && Number.isFinite(Number(d.riskScore))) p.style.width=`${Math.max(0,Math.min(100,Number(d.riskScore)))}%`;
  }

  async function refresh(reason='timer') {
    if(busy) return; busy=true;
    try {
      const [indicators, stocks] = await Promise.all([fetchJSON('market-indicators.json'), fetchJSON('stock-prices.json')]);
      const staleIndicators = ageMinutes(indicators?.lastUpdated) > STALE_MINUTES;
      const staleStocks = ageMinutes(stocks?.lastUpdated) > STALE_MINUTES;
      renderIndicators(indicators);
      exposeFreshQuotes(stocks);
      renderSystemState();
      if(staleIndicators || staleStocks){
        const staleParts=[];
        if(staleIndicators) staleParts.push('market');
        if(staleStocks) staleParts.push('stocks/ETFs');
        set('marketIndicatorsUpdated', `⚠ STALE · ${staleParts.join(' + ')}`);
      }
      window.WAIS_DATA_HEALTH = {
        ok:!(staleIndicators||staleStocks),reason,checkedAt:new Date().toISOString(),
        indicatorsUpdatedAt:indicators.lastUpdated||null,stocksUpdatedAt:stocks.lastUpdated||null,
        staleIndicators,staleStocks,staleThresholdMinutes:STALE_MINUTES,
        failedSymbols:[...(indicators.failedSymbols||[]),...(stocks.failedSymbols||[])]
      };
    } catch(error) {
      console.error('[WAIS] runtime data refresh failed', error);
      window.WAIS_DATA_HEALTH={ok:false,reason,error:String(error),checkedAt:new Date().toISOString()};
      set('marketIndicatorsUpdated','⚠ DATA REFRESH FAILED');
    } finally { busy=false; }
  }

  window.WAIS_REFRESH_NOW=refresh;
  window.addEventListener('load',()=>refresh('page-load'));
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') refresh('visibility'); });
  setInterval(()=>refresh('5-minute-timer'),REFRESH_MS);
})();
