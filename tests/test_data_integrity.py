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

def test_hsi_futures_generator_handles_market_closed_state():
    text=(ROOT/'update_market_data.py').read_text(encoding='utf-8')
    assert 'hk_futures_market_open' in text
    assert 'MARKET_CLOSED' in text
    assert 'marketOpen' in text and 'freshnessReason' in text

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
