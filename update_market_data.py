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
    "SP500": "US", "NASDAQ": "US", "NASDAQ100": "US", "DOW": "US",
    "SOX": "US", "VIX": "US", "US10Y": "US", "HSI": "HK", "HSTECH": "HK",
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
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 WAIS-Invest/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="ignore")


def update_weekly_events():
    existing = load_json(EVENTS_PATH, {"events": []})
    today = datetime.now(timezone.utc).date()
    start = today - timedelta(days=today.weekday())
    end = start + timedelta(days=13)
    events = []
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
                events.append({"dateISO": day.isoformat(), "date": day.strftime("%m月%d日"), "event": name, "time": "08:30 ET", "source": "U.S. Bureau of Labor Statistics"})
    except Exception as exc:
        print(f"Weekly event refresh warning: {exc}")
    if events:
        events.sort(key=lambda x: (x["dateISO"], x["event"]))
        save_json(EVENTS_PATH, {"lastUpdated": datetime.now(timezone.utc).isoformat(), "window": {"from": start.isoformat(), "to": end.isoformat()}, "dataStatus": "Current week + next week official release schedule; verify again before trading", "events": events})
    elif not EVENTS_PATH.exists():
        save_json(EVENTS_PATH, existing)


def latest_intraday(ticker):
    intr = ticker.history(period="5d", interval="5m", auto_adjust=False, prepost=True, actions=False)
    if intr.empty or intr["Close"].dropna().empty:
        return None

    c = intr["Close"].dropna()
    ts = c.index[-1]
    if getattr(ts, "tzinfo", None) is None:
        ts = ts.tz_localize("UTC")

    current_session_date = ts.date()
    previous_session_close = None
    session_dates = sorted({idx.date() for idx in c.index if idx.date() < current_session_date})
    if session_dates:
        previous_session_date = session_dates[-1]
        previous_session = c[[idx.date() == previous_session_date for idx in c.index]]
        if not previous_session.empty:
            previous_session_close = float(previous_session.iloc[-1])

    return float(c.iloc[-1]), ts.isoformat(), previous_session_close


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
            ticker = yf.Ticker(symbol)
            daily = ticker.history(period="10d", interval="1d", auto_adjust=False, prepost=False, actions=False)
            closes = daily["Close"].dropna() if not daily.empty else []
            if len(closes) == 0:
                raise RuntimeError("no daily close returned")

            regular_close = float(closes.iloc[-1])
            regular_date = closes.index[-1].date().isoformat()
            previous_close = float(closes.iloc[-2]) if len(closes) >= 2 else regular_close

            value = regular_close
            as_of = regular_date
            status = "Completed daily close; intraday unavailable"
            source = "Yahoo Finance via yfinance"

            try:
                snap = latest_intraday(ticker)
                if snap:
                    value, as_of, intraday_previous_close = snap
                    if intraday_previous_close is not None and intraday_previous_close > 0:
                        previous_close = intraday_previous_close
                    status = "Latest available 5-minute snapshot; may be delayed; NOT exchange real-time"
            except Exception as intraday_exc:
                print(f"Intraday fallback {name}: {intraday_exc}")

            change = value - previous_close
            change_pct = (change / previous_close * 100) if previous_close else 0.0

            indicators[name] = {
                "symbol": symbol,
                "value": round(value, 4),
                "previousClose": round(previous_close, 4),
                "regularClose": round(regular_close, 4),
                "regularCloseDate": regular_date,
                "change": round(change, 4),
                "changePercent": round(change_pct, 4),
                "asOf": as_of,
                "source": source,
                "dataStatus": status,
            }

            group = MARKET_GROUP[name]
            old_date = market_dates.get(group)
            if not old_date or regular_date > old_date:
                market_dates[group] = regular_date
            successful += 1
            print(f"OK {name}: {value:.4f} @ {as_of}")
        except Exception as exc:
            failed.append(name)
            print(f"WARNING {name}: {exc}; previous verified value preserved.")

    if "HSIF" in indicators:
        indicators["HSIF"]["dataStatus"] = indicators["HSIF"].get("dataStatus", "Separately verified delayed futures data; NOT REAL-TIME")

    save_json(OUTPUT_PATH, {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "marketDates": market_dates,
        "marketStatus": "updated" if successful else "stale_preserved",
        "dataStatus": "Latest available intraday snapshot when available; fallback to completed close; NOT guaranteed real-time",
        "failedSymbols": failed,
        "indicators": indicators,
    })

    try:
        update_weekly_events()
    except Exception as exc:
        print(f"Weekly events warning: {exc}")

    print(f"Completed: {successful} updated, {len(failed)} preserved.")


if __name__ == "__main__":
    main()
