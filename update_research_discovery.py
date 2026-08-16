import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path('research-discovery.json')
USER_AGENT = 'WAIS Invest research bot contact: public-repo@users.noreply.github.com'

# Primary-source adapters. Add new names here as discovery expands.
SEC_COMPANIES = {
    'ALMU': {'name': 'Aeluma, Inc.', 'cik': '0001828805', 'stage': 'VALIDATING'},
    'AMBQ': {'name': 'Ambiq Micro, Inc.', 'cik': '0001500412', 'stage': 'VALIDATING'},
}


def load_existing():
    try:
        return json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {}
    except Exception:
        return {}


def fetch_json(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': USER_AGENT,
        'Accept-Encoding': 'identity',
        'Accept': 'application/json',
    })
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.loads(response.read().decode('utf-8'))


def filing_rows(submissions, limit=8):
    recent = submissions.get('filings', {}).get('recent', {})
    forms = recent.get('form', [])
    accessions = recent.get('accessionNumber', [])
    dates = recent.get('filingDate', [])
    primary = recent.get('primaryDocument', [])
    rows = []
    for i in range(min(limit, len(forms), len(accessions), len(dates), len(primary))):
        rows.append({
            'form': forms[i],
            'filingDate': dates[i],
            'accessionNumber': accessions[i],
            'primaryDocument': primary[i],
        })
    return rows


def main():
    now = datetime.now(timezone.utc).isoformat()
    previous = load_existing()
    previous_sources = previous.get('sources', {}) if isinstance(previous, dict) else {}
    sources = {}
    failures = []

    for ticker, meta in SEC_COMPANIES.items():
        key = f'SEC:{ticker}'
        url = f"https://data.sec.gov/submissions/CIK{meta['cik']}.json"
        try:
            payload = fetch_json(url)
            rows = filing_rows(payload)
            sources[key] = {
                'ticker': ticker,
                'company': meta['name'],
                'stage': meta['stage'],
                'sourceType': 'SEC_SUBMISSIONS',
                'sourceUrl': url,
                'status': 'LIVE',
                'checkedAt': now,
                'lastSuccessAt': now,
                'latestFilings': rows,
                'latestFilingDate': rows[0]['filingDate'] if rows else None,
                'note': 'Primary-source filing feed. Filing presence is evidence input, not an automatic promotion or buy signal.'
            }
            print(f'OK {key}: {len(rows)} recent filings')
        except Exception as exc:
            failures.append(key)
            fallback = previous_sources.get(key)
            if fallback:
                fallback = dict(fallback)
                fallback['status'] = 'LAST_KNOWN_GOOD'
                fallback['checkedAt'] = now
                fallback['lastError'] = str(exc)
                sources[key] = fallback
                print(f'WARNING {key}: {exc}; last-known-good preserved')
            else:
                sources[key] = {
                    'ticker': ticker,
                    'company': meta['name'],
                    'stage': meta['stage'],
                    'sourceType': 'SEC_SUBMISSIONS',
                    'sourceUrl': url,
                    'status': 'UNAVAILABLE',
                    'checkedAt': now,
                    'lastSuccessAt': None,
                    'latestFilings': [],
                    'lastError': str(exc),
                    'note': 'No valid prior snapshot exists yet. This source is isolated and does not stop other research feeds.'
                }
                print(f'WARNING {key}: {exc}; no prior snapshot')

    # Adapter registry records sources that require their own connector/feed. Their absence
    # must never stop SEC/market/IR research. Serenity is intentionally explicit rather than fabricated.
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
            'note': 'Serenity adapter has no current machine-readable feed in this public workflow. Missing Serenity data does not block other research ingestion.'
        }
    sources['SERENITY'] = serenity

    live = sum(1 for s in sources.values() if s.get('status') == 'LIVE')
    fallback = sum(1 for s in sources.values() if s.get('status') == 'LAST_KNOWN_GOOD')
    unavailable = sum(1 for s in sources.values() if s.get('status') == 'UNAVAILABLE')

    OUT.write_text(json.dumps({
        'version': 'WAIS Discovery Ingestion v1.0',
        'lastChecked': now,
        'contract': {
            'rule': 'No new data is not a system failure. Every scheduled cycle retries all configured adapters.',
            'states': ['LIVE', 'LAST_KNOWN_GOOD', 'STALE_BUT_USABLE', 'UNAVAILABLE'],
            'failureIsolation': True,
            'promotionRule': 'Discovery data is evidence input only; Candidate/READY promotion requires separate thesis, valuation, technical, catalyst and risk validation.'
        },
        'health': {
            'liveSources': live,
            'fallbackSources': fallback,
            'unavailableSources': unavailable,
            'failedThisCycle': failures,
        },
        'sources': sources,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    # Never raise solely because one adapter failed; the next scheduled run must retry it.
    print(f'Completed discovery ingestion: live={live}, fallback={fallback}, unavailable={unavailable}')


if __name__ == '__main__':
    main()
