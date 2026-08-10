import json
import re
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

import yfinance as yf

OUTPUT_PATH = Path("market-indicators.json")
EVENTS_PATH = Path("weekly-events.json")

MARKET_SYMBOLS = {
    "SP500": "^GSPC",
    "NASDAQ": "^IXIC",
    "NASDAQ100": "^NDX",
    "DOW": "^DJI",
    "SOX": "^SOX",
    "VIX": "^VIX",
    "US10Y": "^TNX",
    "HSI": "^HSI",
    "HSTECH": "HSTECH.HK",
}

MARKET_GROUP = {
    "SP500": "US",
    "NASDAQ": "US",
    "NASDAQ100": "US",
    "DOW": "US",
    "SOX": "US",
    "VIX": "US",
    "US10Y": "US",
    "HSI": "HK",
    "HSTECH": "HK",
}


def load_json(path, default):
    try:
        if path.exists():
            return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"Warning: could not read {path}: {exc}")
    return default


def save_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def fetch_text(url):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 WAIS-Invest/1.0"}
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="ignore")


def update_weekly_events():
    existing = load_json(EVENTS_PATH, {"events": []})
    now_et = datetime.now(timezone.utc)
    today = now_et.date()
    # Calendar window = current Monday through end of next Sunday.
    start = today - timedelta(days=today.weekday())
    end = start + timedelta(days=13)
    events = []

    # BLS official ICS (best effort)
    try:
        text = fetch_text("https://www.bls.gov/schedule/news_release/bls.ics")
        text = re.sub(r"\r?\n[ \t]", "", text)
        for block in text.split("BEGIN:VEVENT")[1:]:
            s = re.search(r"SUMMARY:(.+)", block)
            d = re.search(r"DTSTART(?:;[^:]*)?:(\d{8})T?(\d{6})?", block)
            if not s or not d:
                continue
            summary = s.group(1).strip()
            if "Consumer Price Index" in summary:
                name = "美國 CPI"
            elif "Producer Price Index" in summary:
                name = "美國 PPI"
            else:
                continue
            day = datetime.strptime(d.group(1), "%Y%m%d").date()
            if start <= day <= end:
                events.append({
                    "dateISO": day.isoformat(),
                    "date": day.strftime("%m月%d日"),
                    "event": name,
                    "time": "08:30 ET",
                    "source": "U.S. Bureau of Labor Statistics"
                })
    except Exception as exc:
        print(f"Weekly event refresh warning (BLS): {exc}")

    # Preserve reviewed fallback when no official refresh is available.
    if events:
        events.sort(key=lambda x: (x["dateISO"], x["event"]))
        save_json(EVENTS_PATH, {
            "lastUpdated": datetime.now(timezone.utc).isoformat(),
            "window": {"from": start.isoformat(), "to": end.isoformat()},
            "dataStatus": "Current week + next week official release schedule; verify again before trading",
            "events": events,
        })
        print(f"weekly-events.json updated with {len(events)} event(s).")
    else:
        if not EVENTS_PATH.exists():
            save_json(EVENTS_PATH, existing)
        print("No official event refresh available; existing weekly-events.json preserved.")


def main():
    existing = load_json(OUTPUT_PATH, {})
    indicators = existing.get("indicators", {})
    market_dates = existing.get("marketDates", {"US": None, "HK": None})
    if not isinstance(market_dates, dict):
        market_dates = {"US": None, "HK": None}

    successful = 0
    failed = []

    for name, symbol in MARKET_SYMBOLS.items():
        try:
            hist = yf.Ticker(symbol).history(
                period="10d",
                interval="1d",
                auto_adjust=False,
                prepost=False,
            )

            if hist.empty or hist["Close"].dropna().empty:
                raise RuntimeError("no daily close returned")

            closes = hist["Close"].dropna()

            # Use the latest COMPLETED daily row. On weekends/after close this is naturally
            # the latest close. If a provider exposes an in-progress daily bar, do not
            # overwrite a newer verified close with an older date.
            latest = float(closes.iloc[-1])
            latest_date = closes.index[-1].date().isoformat()
            previous = float(closes.iloc[-2]) if len(closes) >= 2 else latest
            change = latest - previous
            change_pct = (change / previous * 100) if previous else 0.0

            indicators[name] = {
                "symbol": symbol,
                "value": round(latest, 4),
                "previousClose": round(previous, 4),
                "change": round(change, 4),
                "changePercent": round(change_pct, 4),
                "asOf": latest_date,
                "source": "Yahoo Finance via yfinance",
                "dataStatus": "Delayed / daily close; NOT REAL-TIME",
            }

            group = MARKET_GROUP[name]
            old_date = market_dates.get(group)
            if not old_date or latest_date > old_date:
                market_dates[group] = latest_date

            successful += 1
            print(f"OK {name}: {latest:.4f} @ {latest_date}")

        except Exception as exc:
            failed.append(name)
            print(f"WARNING {name}: {exc}; previous verified value preserved.")

    # Preserve separately-verified HSIF. Never fabricate it from another symbol.
    if "HSIF" in indicators:
        indicators["HSIF"]["dataStatus"] = indicators["HSIF"].get(
            "dataStatus",
            "Separately verified delayed futures data; NOT REAL-TIME"
        )

    status = "updated" if successful else "stale_preserved"
    save_json(OUTPUT_PATH, {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "marketDates": market_dates,
        "marketStatus": status,
        "dataStatus": "Delayed / daily close; NOT REAL-TIME",
        "failedSymbols": failed,
        "indicators": indicators,
    })

    # Best-effort calendar refresh must never break market-data publication.
    try:
        update_weekly_events()
    except Exception as exc:
        print(f"Weekly events warning: {exc}")

    print(f"Completed: {successful} updated, {len(failed)} preserved.")
    # Intentionally no RuntimeError here:
    # stale values remain explicitly labelled rather than breaking the website.


if __name__ == "__main__":
    main()
