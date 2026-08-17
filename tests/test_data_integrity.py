import json
from datetime import datetime
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

def load(name): return json.loads((ROOT/name).read_text(encoding='utf-8'))
def dt(s): return datetime.fromisoformat(str(s).replace('Z','+00:00'))

def test_market_json_shape():
    d=load('market-indicators.json')
    assert d['indicators']
    for k in ['SP500','NASDAQ','NASDAQ100','DOW','SOX','VIX','US10Y','HSI','HSTECH']:
        q=d['indicators'][k]
        assert q.get('source') and q.get('asOf')
        assert isinstance(q.get('value'),(int,float))

def test_hsi_futures_shape_and_freshness_contract():
    d=load('market-indicators.json')
    q=d['indicators']['HSIF']
    for k in ['source','asOf','contract','session','freshness']:
        assert q.get(k) is not None
    assert isinstance(q.get('value'),(int,float))
    assert q['freshness'] in ['LIVE','RECENT','DELAYED','MARKET_CLOSED','FALLBACK']

def test_hsi_futures_generator_handles_market_closed_state_and_0300_boundary():
    text=(ROOT/'update_market_data.py').read_text(encoding='utf-8')
    assert 'hk_futures_market_open' in text
    assert 'MARKET_CLOSED' in text
    assert 'marketOpen' in text and 'freshnessReason' in text
    assert 'hsi_futures_session' in text
    assert 'minutes <= 3 * 60' in text
    assert 'previous_close = regular_value' in text
    assert 'regular_close_date = regular_close_date - timedelta(days=1)' in text

def test_market_data_loader_keeps_current_research_overlay_authoritative():
    text=(ROOT/'market-data.js').read_text(encoding='utf-8')
    baseline=text.index('wais-public-state.js')
    research=text.index('wais-research-integrity-v1.js')
    assert baseline < research

def test_public_state_is_not_older_than_current_research_audit():
    public=(ROOT/'wais-public-state.js').read_text(encoding='utf-8')
    research=(ROOT/'wais-research-integrity-v1.js').read_text(encoding='utf-8')
    assert "2026-08-15" in public
    assert "2026-08-15" in research
    assert "d.marketMode = 'CAUTIOUS'" in public
    assert 'd.marketMode = "CAUTIOUS"' in research

def test_stock_json_shape():
    d=load('stock-prices.json')
    assert d['prices']
    for k in ['NVDA','TSM','AVGO','GFS','AXTI','GOOGL']:
        q=d['prices'][k]
        assert q.get('source') and q.get('asOf') and q.get('session')
        assert isinstance(q.get('price'),(int,float))

def test_regular_close_not_future_dated():
    d=load('stock-prices.json')
    top=dt(d['lastUpdated']).date()
    for q in d['prices'].values():
        if q.get('regularCloseDate'):
            assert datetime.fromisoformat(q['regularCloseDate']).date() <= top

def test_no_secrets_in_public_state():
    text=(ROOT/'wais-public-state.js').read_text(encoding='utf-8').lower()
    forbidden=['api_key=','apikey=','secret=','password=','bearer ','private_key']
    assert not any(x in text for x in forbidden)

def test_runtime_guard_cache_busting_and_stale_protection():
    text=(ROOT/'wais-runtime-guard.js').read_text(encoding='utf-8')
    assert "cache: 'no-store'" in text
    assert 'STALE_MINUTES' in text
    assert 'staleIndicators' in text and 'staleStocks' in text

def test_route_selector_does_not_observe_whole_page_subtree():
    loader=(ROOT/'market-data.js').read_text(encoding='utf-8')
    assert 'wais-route-selector-safe-v13.js' in loader
    text=(ROOT/'wais-route-selector-safe-v13.js').read_text(encoding='utf-8')
    assert "observeGrid('topPicksGrid')" in text
    assert "observeGrid('watchlistCards')" in text
    assert "observe(g,{childList:true,subtree:false})" in text
    assert "observe(document.body,{childList:true,subtree:true})" not in text

def test_route_intelligence_is_loaded_before_app_navigation_snapshot():
    loader=(ROOT/'market-data.js').read_text(encoding='utf-8')
    assert 'wais-route-registry-v2.js' in loader
    assert 'wais-route-intelligence-v2.js' in loader
    registry=loader.index('wais-route-registry-v2.js')
    route=loader.index('wais-route-intelligence-v2.js')
    selector=loader.index('wais-route-selector-safe-v13.js')
    assert registry < route < selector
    text=(ROOT/'wais-route-intelligence-v2.js').read_text(encoding='utf-8')
    assert 'Route Intelligence' in text
    assert "data-section=\"route-intelligence\"" in text or "dataset.section='route-intelligence'" in text
    assert 'Stock READY ≠ Leveraged READY ≠ Income READY' in text
    assert '⚡' in text
    assert 'VALIDATING · DATA GAP' in text

def test_route_intelligence_excludes_stock_only_underlyings():
    registry=(ROOT/'wais-route-registry-v2.js').read_text(encoding='utf-8')
    route=(ROOT/'wais-route-intelligence-v2.js').read_text(encoding='utf-8')
    assert 'Only underlyings with at least one independently verified leveraged or income product' in registry
    assert "POWL:route(" not in registry
    assert "MOD:route(" not in registry
    assert 'hasRouteProduct' in route
    assert 'Object.keys(rs).filter(t=>hasRouteProduct(rs[t]))' in route
    assert '!hasRouteProduct(routes()[t])' in route

def test_universal_colour_contract_is_locked_and_income_metrics_are_neutral():
    text=(ROOT/'wais-color-standard-v1.js').read_text(encoding='utf-8')
    for token in ['READY 1 / BUY / ADD','WAIT / CANDIDATE+','WATCH / CANDIDATE / RESEARCH','DEFENSE / PROTECT PROFIT / TRIM','EXIT / REJECT','DATA GAP']:
        assert token in text
    assert '--wais-route-stock' in text
    assert '--wais-route-leveraged' in text
    assert '--wais-route-income' in text
    assert 'wais-neutral-metric' in text

def test_related_route_pipeline_is_wired_into_auto_refresh():
    workflow=(ROOT/'.github/workflows/refresh-wais-data.yml').read_text(encoding='utf-8')
    script=(ROOT/'update_related_routes_data.py').read_text(encoding='utf-8')
    assert 'update_related_routes_data.py' in workflow
    assert 'avgDollarVolume20d' in script
    assert 'trackingErrorMeanAbs60dPct' in script
    assert 'current30dIncomeRate' in script
    assert 'sustainableIncomeYield' in script
    for ticker in ['GFSG','RKX','MUYY','MUIB','MRVU','MRVX','COHH','LITX','AAOG','AAOX']:
        assert ticker in script

def test_rklb_ticker_and_income_frequency_contract():
    registry=(ROOT/'wais-route-registry-v2.js').read_text(encoding='utf-8')
    script=(ROOT/'update_related_routes_data.py').read_text(encoding='utf-8')
    route=(ROOT/'wais-route-intelligence-v2.js').read_text(encoding='utf-8')
    assert "RKLB:route('RKLB',['RKLX','RKX']" in registry
    assert "'RKX': {'underlying':'RKLB'" in script
    assert "'RKXX': {'underlying':'RKLB'" not in script
    assert "prices.pop('RKXX',None)" in script
    assert 'infer_distribution_frequency' in script
    assert "return 'Weekly'" in script
    assert 'ttmCoverageStatus' in script
    assert 'observedFrequency' in route
    assert 'TTM Coverage' in route
    assert 'altSummary' in route
