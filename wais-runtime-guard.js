// WAIS runtime freshness guard: cache-safe reads, visible freshness labels and stale-data protection.
(() => {
  const REFRESH_MS = 5 * 60 * 1000;
  const STALE_MINUTES = { stock: 20, indicator: 30, delayed: 60 };
  let busy = false;

  const $ = id => document.getElementById(id);
  const fetchJSON = async path => {
    const r = await fetch(`${path}?wais=${Date.now()}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } });
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
    return r.json();
  };
  const parseTime = value => { const t = Date.parse(value || ''); return Number.isFinite(t) ? t : null; };
  const ageMinutes = value => { const t = parseTime(value); return t == null ? Infinity : Math.max(0, (Date.now() - t) / 60000); };
  const isDelayed = item => /delayed/i.test(String(item?.dataStatus || '') + ' ' + String(item?.session || ''));
  const freshness = (item, kind='stock') => {
    const age = ageMinutes(item?.asOf);
    const limit = isDelayed(item) ? STALE_MINUTES.delayed : STALE_MINUTES[kind];
    return { age, stale: !Number.isFinite(age) || age > limit, delayed: isDelayed(item) };
  };
  const fmt = (n, digits=2) => Number.isFinite(Number(n)) ? Number(n).toLocaleString('en-US',{maximumFractionDigits:digits,minimumFractionDigits:digits}) : '—';
  const fmtPct = n => Number.isFinite(Number(n)) ? `${Number(n)>=0?'+':''}${Number(n).toFixed(2)}%` : '—';
  const set = (id, value) => { const el=$(id); if(el) el.textContent=value; };

  function renderIndicators(data) {
    const m = data?.indicators || {};
    const map = { SP500:['sp500Value','sp500Change'], NASDAQ100:['nasdaq100Value','nasdaq100Change'], SOX:['soxValue','soxChange'], VIX:['vixValue','vixChange'], US10Y:['us10yValue','us10yChange'], NASDAQ:['nasdaqValue','nasdaqChange'], DOW:['dowValue','dowChange'], HSI:['hsiValue','hsiChange'], HSTECH:['hstechValue','hstechChange'], HSIF:['hsifValue','hsifChange'] };
    Object.entries(map).forEach(([key,[vId,cId]]) => {
      const q=m[key]; if(!q) return;
      const f=freshness(q,'indicator');
      set(vId, f.stale ? `${fmt(q.value)} ⚠` : fmt(q.value));
      set(cId, `${fmtPct(q.changePercent)} · ${f.stale?'STALE':(f.delayed?'DELAYED':'LATEST')}`);
      const v=$(vId); const c=$(cId);
      if(v) v.title=`${q.source||'Unknown source'} · ${q.asOf||'unknown time'} · ${q.dataStatus||''}`;
      if(c) c.title=v?.title||'';
    });
    const stamp=data?.lastUpdated;
    set('marketIndicatorsUpdated', `AUTO DATA · ${stamp ? new Date(stamp).toLocaleString('en-CA',{timeZone:'America/New_York'})+' ET' : 'time unavailable'} · cache-safe`);
    set('marketIndicatorsTitle', '全球市場最新可取得指標');
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
      renderIndicators(indicators);
      exposeFreshQuotes(stocks);
      renderSystemState();
      window.WAIS_DATA_HEALTH = {
        ok: true, reason, checkedAt: new Date().toISOString(),
        indicatorsUpdatedAt: indicators.lastUpdated || null,
        stocksUpdatedAt: stocks.lastUpdated || null,
        failedSymbols: indicators.failedSymbols || [],
        staleIndicators: Object.entries(indicators.indicators||{}).filter(([,q])=>freshness(q,'indicator').stale).map(([k])=>k),
        staleStocks: Object.entries(stocks.prices||{}).filter(([,q])=>freshness(q,'stock').stale).map(([k])=>k)
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
