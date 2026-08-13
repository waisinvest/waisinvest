// WAIS runtime freshness guard: cache-safe reads, visible freshness labels and stale-data protection.
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
  const dateInZone = (value, zone) => {
    const t=parseTime(value); if(t==null) return '—';
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(t));
    const obj=Object.fromEntries(parts.map(x=>[x.type,x.value]));
    return `${obj.year}/${obj.month}/${obj.day}`;
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
    SP500:['sp500Value','sp500Change','America/New_York','US'],
    NASDAQ100:['nasdaq100Value','nasdaq100Change','America/New_York','US'],
    SOX:['soxValue','soxChange','America/New_York','US'],
    VIX:['vixValue','vixChange','America/New_York','US'],
    US10Y:['us10yValue','us10yChange','America/New_York','US'],
    NASDAQ:['nasdaqValue','nasdaqChange','America/New_York','US'],
    DOW:['dowValue','dowChange','America/New_York','US'],
    HSI:['hsiValue','hsiChange','Asia/Hong_Kong','HK'],
    HSTECH:['hstechValue','hstechChange','Asia/Hong_Kong','HK'],
    HSIF:['hsifValue','hsifChange','Asia/Hong_Kong','HK FUTURES']
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
          set(vId,'—'); set(cId,'STALE FUTURES · NOT USED');
          if(desc) desc.textContent=`恒指期貨報價已過時（最後 ${qDate}）；WAIS 不會把舊價當最新訊號。`;
        }else{
          set(vId,fmt(q.value)); set(cId,`${fmtPct(q.changePercent)} · ${String(q.session||'LATEST').toUpperCase()}`);
          if(desc) desc.textContent=`恒指期貨 ${q.session||'Latest'} · ${qDate} · ${String(q.freshness||'LATEST').toUpperCase()}`;
        }
      }else{
        const closeDate=String(q.regularCloseDate||'');
        const isClose=closeDate && closeDate===qDate.replaceAll('/','-');
        set(vId,fmt(q.value));
        set(cId,`${fmtPct(q.changePercent)} · ${isClose?'CLOSE':'SNAPSHOT'} ${qDate}`);
        if(desc){
          const base=desc.dataset.waisBase || desc.textContent || '';
          desc.dataset.waisBase=base.replace(/ · (CLOSE|SNAPSHOT).*$/,'');
          desc.textContent=`${desc.dataset.waisBase} · ${isClose?'CLOSE':'SNAPSHOT'} ${qDate}`;
        }
      }
      if(v) v.title=`${q.source||'Unknown source'} · ${q.asOf||'unknown time'} · ${q.dataStatus||''}`;
      if(c) c.title=v?.title||'';
    });
    const stamp=data?.lastUpdated;
    set('marketIndicatorsUpdated', `VERIFIED DATA FILE · ${stamp ? new Date(stamp).toLocaleString('en-CA',{timeZone:'America/New_York'})+' ET' : 'time unavailable'}`);
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
        if(staleIndicators) staleParts.push('market indicators');
        if(staleStocks) staleParts.push('stock/ETF quotes');
        set('marketIndicatorsUpdated', `⚠ AUTO DATA STALE · ${staleParts.join(' + ')} · waiting for next scheduled refresh`);
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
      set('marketIndicatorsUpdated','⚠ AUTO DATA REFRESH FAILED · last displayed values may be stale');
    } finally { busy=false; }
  }

  window.WAIS_REFRESH_NOW=refresh;
  window.addEventListener('load',()=>refresh('page-load'));
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') refresh('visibility'); });
  setInterval(()=>refresh('5-minute-timer'),REFRESH_MS);
})();
