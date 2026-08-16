import hashlib
import html
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path('research-discovery.json')
USER_AGENT = 'Mozilla/5.0 WAIS-Invest-Research/1.0'

# Official company sources that are accessible to the public workflow.
IR_SOURCES = {
    'ALMU': {
        'name': 'Aeluma, Inc.',
        'stage': 'VALIDATING',
        'url': 'https://www.aeluma.com/investors/news-events/press-releases',
        'sourceType': 'OFFICIAL_IR_PRESS_RELEASES',
    },
    'AMBQ': {
        'name': 'Ambiq Micro, Inc.',
        'stage': 'VALIDATING',
        'url': 'https://ambiq.com/news/',
        'sourceType': 'OFFICIAL_COMPANY_NEWS',
    },
}


def load_existing():
    try:
        return json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {}
    except Exception:
        return {}


def fetch_text(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read().decode('utf-8', errors='ignore')


def normalize_text(raw):
    text = re.sub(r'(?is)<script.*?</script>|<style.*?</style>', ' ', raw)
    text = re.sub(r'(?s)<[^>]+>', ' ', text)
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def extract_recent_items(text, limit=8):
    # Conservative generic extraction: capture date + nearby headline-like text.
    # Exact article parsing remains a separate validation step; this layer detects fresh official content.
    date_pat = re.compile(r'((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2},\s+20\d{2})', re.I)
    items = []
    for match in date_pat.finditer(text):
        start = match.start()
        end = min(len(text), match.end() + 260)
        snippet = text[start:end].strip(' -|')
        if snippet and snippet not in items:
            items.append(snippet)
        if len(items) >= limit:
            break
    return items


def fallback_source(previous_sources, key, now, exc, base):
    previous = previous_sources.get(key)
    if previous:
        out = dict(previous)
        out['status'] = 'LAST_KNOWN_GOOD'
        out['checkedAt'] = now
        out['lastError'] = str(exc)
        return out
    return {
        **base,
        'status': 'UNAVAILABLE',
        'checkedAt': now,
        'lastSuccessAt': None,
        'contentHash': None,
        'recentOfficialItems': [],
        'lastError': str(exc),
        'note': 'No prior valid snapshot exists. This adapter is isolated and will be retried automatically on the next scheduled cycle.'
    }


def main():
    now = datetime.now(timezone.utc).isoformat()
    previous = load_existing()
    previous_sources = previous.get('sources', {}) if isinstance(previous, dict) else {}
    sources = {}
    failures = []

    for ticker, meta in IR_SOURCES.items():
        key = f'IR:{ticker}'
        base = {
            'ticker': ticker,
            'company': meta['name'],
            'stage': meta['stage'],
            'sourceType': meta['sourceType'],
            'sourceUrl': meta['url'],
        }
        try:
            raw = fetch_text(meta['url'])
            text = normalize_text(raw)
            if len(text) < 200:
                raise RuntimeError('official page returned too little usable content')
            digest = hashlib.sha256(text.encode('utf-8')).hexdigest()
            prev_hash = previous_sources.get(key, {}).get('contentHash')
            items = extract_recent_items(text)
            sources[key] = {
                **base,
                'status': 'LIVE',
                'checkedAt': now,
                'lastSuccessAt': now,
                'contentHash': digest,
                'contentChanged': bool(prev_hash and prev_hash != digest),
                'recentOfficialItems': items,
                'contentPreview': text[:900],
                'note': 'Official company source. New page content triggers re-validation; it is evidence input, not an automatic Candidate/READY promotion.'
            }
            print(f'OK {key}: changed={bool(prev_hash and prev_hash != digest)} items={len(items)}')
        except Exception as exc:
            failures.append(key)
            sources[key] = fallback_source(previous_sources, key, now, exc, base)
            print(f'WARNING {key}: {exc}; fallback/isolation applied')

    # SEC is still part of WAIS validation, but GitHub-hosted runners can receive SEC 403 responses.
    # Record that limitation explicitly instead of pretending the feed is live.
    sources['SEC_PRIMARY'] = {
        'sourceType': 'SEC_CROSS_CHECK',
        'status': 'UNAVAILABLE',
        'checkedAt': now,
        'lastSuccessAt': None,
        'note': 'SEC remains a required validation source, but direct automated SEC submissions access from this GitHub runner returned HTTP 403. Official IR ingestion continues; SEC cross-check is performed through a compatible access path when available.'
    }

    # Serenity adapter is isolated until a machine-readable/connected source exists.
    serenity_prev = previous_sources.get('SERENITY')
    if serenity_prev:
        serenity = dict(serenity_prev)
        serenity['checkedAt'] = now
        if serenity.get('status') == 'LIVE':
            serenity['status'] = 'LAST_KNOWN_GOOD'
    else:
        serenity = {
            'sourceType': 'SPECIALIST_RESEARCH',
            'status': 'UNAVAILABLE',
            'checkedAt': now,
            'lastSuccessAt': None,
            'note': 'Serenity has no current machine-readable feed in this public workflow. Missing Serenity data does not block IR, market, ETF or other research ingestion.'
        }
    sources['SERENITY'] = serenity

    live = sum(1 for s in sources.values() if s.get('status') == 'LIVE')
    fallback = sum(1 for s in sources.values() if s.get('status') == 'LAST_KNOWN_GOOD')
    unavailable = sum(1 for s in sources.values() if s.get('status') == 'UNAVAILABLE')

    OUT.write_text(json.dumps({
        'version': 'WAIS Discovery Ingestion v1.1',
        'lastChecked': now,
        'contract': {
            'rule': 'No new data is not a system failure. Every scheduled cycle retries every configured adapter.',
            'states': ['LIVE', 'LAST_KNOWN_GOOD', 'STALE_BUT_USABLE', 'UNAVAILABLE'],
            'failureIsolation': True,
            'retryPolicy': 'Weekdays hourly; weekends every three hours; failed adapters retry on the next cycle.',
            'promotionRule': 'Discovery data is evidence input only; Candidate/READY promotion requires thesis, valuation, technical, catalyst and risk validation.',
            'overheatRule': 'Overheated/expensive is an entry warning, not a research rejection.'
        },
        'health': {
            'liveSources': live,
            'fallbackSources': fallback,
            'unavailableSources': unavailable,
            'failedThisCycle': failures,
        },
        'sources': sources,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    print(f'Completed discovery ingestion: live={live}, fallback={fallback}, unavailable={unavailable}')


if __name__ == '__main__':
    main()
