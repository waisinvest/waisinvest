import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]


def test_discovery_contract_and_sources():
    data=json.loads((ROOT/'research-discovery.json').read_text(encoding='utf-8'))
    assert data['contract']['failureIsolation'] is True
    assert 'LIVE' in data['contract']['states']
    assert 'LAST_KNOWN_GOOD' in data['contract']['states']
    assert data['contract']['overheatRule'].startswith('Overheated/expensive')
    assert data['sources']['IR:ALMU']['status'] in {'LIVE','LAST_KNOWN_GOOD'}
    assert data['sources']['IR:AMBQ']['status'] in {'LIVE','LAST_KNOWN_GOOD'}


def test_discovery_names_are_research_not_ready():
    text=(ROOT/'wais-discovery-v1.js').read_text(encoding='utf-8')
    assert "ticker:'ALMU'" in text and "ticker:'AMBQ'" in text
    assert "stance:'DISCOVERY'" in text
    assert "researchStage:'VALIDATING'" in text
    assert "Overheated or expensive does not equal reject" in text


def test_research_library_shows_absolute_and_percent_move():
    text=(ROOT/'wais-research-move-format-v1.js').read_text(encoding='utf-8')
    assert 'signed(q.change' in text
    assert 'pct(q.changePercent)' in text
    assert "'S&P 500':'SP500'" in text
    assert "'NASDAQ Composite':'NASDAQ'" in text
    assert "'SOX':'SOX'" in text


def test_new_discovery_quotes_are_in_combined_refresh():
    text=(ROOT/'update_income_research_universe.py').read_text(encoding='utf-8')
    assert '"ALMU": ("ALMU", "USD", False)' in text
    assert '"AMBQ": ("AMBQ", "USD", False)' in text
