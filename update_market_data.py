import json
import re
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import yfinance as yf

OUTPUT_PATH = Path("market-indicators.json")
EVENTS_PATH = Path("weekly-events.json")

MARKET_SYMBOLS = {
    "SP500": "^GSPC", "NASDAQ": "^IXIC", "NASDAQ100": "^NDX", "DOW": "^DJI",
    "SOX": "^SOX", "VIX": "^VIX", "US10Y": "^TNX", "HSI": "^HSI", "HSTECH": "HSTECH.HK",
}
MARKET_GROUP = {
    "SP500":"US", "NASDAQ":"US", "NASDAQ100":"US", "DOW":"US", "SOX":"US", "VIX":"US", "US10Y":"US",
    "HSI":"HK", "HSTECH":"HK",
}
MARKET_ZONE = {"US":"America/New_York", "HK":"Asia/Hong_Kong"}


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
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 WAIS-Invest/1.0"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return r.read().decode("utf-8", errors="ignore")


def latest_intraday(ticker):
    intr = ticker.history(period="5d", interval="5m", auto_adjust=False, prepost=True, actions=False)
    if intr.empty or intr["Close"].dropna().empty:
        return None
    c = intr["Close"].dropna()
    ts = c.index[-1]
    if getattr(ts, "tzinfo", None) is None:
        ts = ts.tz_localize("UTC")
    current_date = ts.date()
    previous_session_close = None
    prior_dates = sorted({idx.date() for idx in c.index if idx.date() < current_date})
    if prior_dates:
        prior_date = prior_dates[-1]
        prior = c[[idx.date() == prior_date for idx in c.index]]
        if not prior.empty:
            previous_session_close = float(prior.iloc[-1])
    return float(c.iloc[-1]), ts, previous_session_close


def hk_futures_market_open(now_hk):
    """Broad HK index-futures trading windows; weekends are explicitly closed."""
    if now_hk.weekday() >= 5:
        return False
    minutes = now_hk.hour * 60 + now_hk.minute
    return (510 <= minutes <= 980) or (1020 <= minutes <= 1800)


def update_hsi_futures(indicators):
    now_hk = datetime.now(ZoneInfo("Asia/Hong_Kong"))
    contract = now_hk.strftime("%Y%m")
    url = f"https://www.etnet.com.hk/www/eng/futures/index.php?month={contract}&subtype=HSI"
    compact = re.sub(r"\s+", " ", fetch_text(url))
    regular = re.search(rf"HSI\(0?{now_hk.month}/\d{{4}}\) Regular.*?([0-9]{{2}},[0-9]{{3}}).*?([+-][0-9,]+)\s*\(([+-][0-9.]+)%\).*?C[^0-9]*([0-9]{{2}},[0-9]{{3}})", compact, re.I)
    at = re.search(rf"HSI\(0?{now_hk.month}/\d{{4}}\) AT.*?([0-9]{{2}},[0-9]{{3}}).*?([+-][0-9,]+)\s*\(([+-][0-9.]+)%\)", compact, re.I)
    stamp = re.search(r"Futures are real time updated\.\s*Last updated:\s*(\d{2}/\d{2}/\d{4}\s+\d{2}:\d{2})", compact, re.I)
    expiry = re.search(r"Expiry Date\s*\|\s*(\d{2}/\d{2}/\d{4})", compact, re.I)
    if not regular or not stamp:
        raise RuntimeError("ET Net HSI futures fields not found")

    as_of_hk = datetime.strptime(stamp.group(1), "%d/%m/%Y %H:%M").replace(tzinfo=ZoneInfo("Asia/Hong_Kong"))
    regular_value = float(regular.group(1).replace(",", ""))
    regular_change = float(regular.group(2).replace(",", ""))
    regular_pct = float(regular.group(3))
    previous_close = float(regular.group(4).replace(",", ""))
    quote_value, quote_change, quote_pct, session = regular_value, regular_change, regular_pct, "Regular"

    if at and (as_of_hk.hour >= 17 or as_of_hk.hour < 3):
        quote_value = float(at.group(1).replace(",", ""))
        quote_change = float(at.group(2).replace(",", ""))
        quote_pct = float(at.group(3))
        session = "After-Trade"

    age_minutes = max(0, int((now_hk - as_of_hk).total_seconds() // 60))
    market_open = hk_futures_market_open(now_hk)
    if not market_open:
        freshness = "MARKET_CLOSED"
        freshness_reason = "Market closed; last verified source session preserved"
    else:
        freshness = "LIVE" if age_minutes <= 5 else ("RECENT" if age_minutes <= 20 else "DELAYED")
        freshness_reason = "Wall-clock freshness applies while HK futures market is open"
    indicators["HSIF"] = {
        "symbol": f"HSI-{contract}", "contract": contract, "value": quote_value,
        "previousClose": previous_close, "regularClose": regular_value,
        "regularCloseDate": as_of_hk.date().isoformat(), "change": quote_change,
        "changePercent": quote_pct, "asOf": as_of_hk.isoformat(),
        "source": "ET Net / HKEX market data public display", "sourceUrl": url,
        "session": session, "freshness": freshness, "ageMinutes": age_minutes,
        "marketOpen": market_open, "freshnessReason": freshness_reason,
        "expiryDate": expiry.group(1) if expiry else None,
        "dataStatus": f"{session} HSI spot-month futures; {freshness_reason}; source timestamp preserved; public-display source, not direct exchange API",
    }
    print(f"OK HSIF: {quote_value:.0f} ({session}, {freshness}) @ {as_of_hk.isoformat()}")


def update_weekly_events():
    existing = load_json(EVENTS_PATH, {"events":[]})
    today = datetime.now(timezone.utc).date()
    start = today - timedelta(days=today.weekday())
    end = start + timedelta(days=13)
    events = []
    try:
        text = re.sub(r"\r?\n[ \t]", "", fetch_text("https://www.bls.gov/schedule/news_release/bls.ics"))
        for block in text.split("BEGIN:VEVENT")[1:]:
            s = re.search(r"SUMMARY:(.+)", block)
            d = re.search(r"DTSTART(?:;[^:]*)?:(\d{8})T?(\d{6})?", block)
            if not s or not d:
                continue
            summary=s.group(1).strip()
            if "Consumer Price Index" in summary: name="美國 CPI"
            elif "Producer Price Index" in summary: name="美國 PPI"
            else: continue
            day=datetime.strptime(d.group(1), "%Y%m%d").date()
            if start <= day <= end:
                events.append({"dateISO":day.isoformat(),"date":day.strftime("%m月%d日"),"event":name,"time":"08:30 ET","source":"U.S. Bureau of Labor Statistics"})
    except Exception as exc:
        print(f"Weekly event refresh warning: {exc}")
    if events:
        events.sort(key=lambda x:(x["dateISO"],x["event"]))
        save_json(EVENTS_PATH,{"lastUpdated":datetime.now(timezone.utc).isoformat(),"window":{"from":start.isoformat(),"to":end.isoformat()},"dataStatus":"Current week + next week official release schedule; verify again before trading","events":events})
    elif not EVENTS_PATH.exists():
        save_json(EVENTS_PATH, existing)


def main():
    existing=load_json(OUTPUT_PATH,{})
    indicators=existing.get("indicators",{})
    market_dates=existing.get("marketDates",{"US":None,"HK":None})
    if not isinstance(market_dates,dict): market_dates={"US":None,"HK":None}
    successful=0; failed=[]

    for name,symbol in MARKET_SYMBOLS.items():
        try:
            ticker=yf.Ticker(symbol)
            daily=ticker.history(period="10d",interval="1d",auto_adjust=False,prepost=False,actions=False)
            closes=daily["Close"].dropna() if not daily.empty else []
            if len(closes)==0: raise RuntimeError("no daily close returned")
            regular_close=float(closes.iloc[-1])
            regular_date=closes.index[-1].date().isoformat()
            previous_close=float(closes.iloc[-2]) if len(closes)>=2 else regular_close
            value=regular_close; as_of=regular_date; status="Completed daily close; intraday unavailable"
            try:
                snap=latest_intraday(ticker)
                if snap:
                    value, ts, intraday_previous_close=snap
                    group=MARKET_GROUP[name]
                    local_ts=ts.tz_convert(MARKET_ZONE[group]) if hasattr(ts,"tz_convert") else ts
                    as_of=local_ts.isoformat()
                    status="Latest available 5-minute snapshot; may be delayed; NOT exchange real-time"
                    if group=="HK" and intraday_previous_close is not None and intraday_previous_close>0:
                        previous_close=intraday_previous_close
                    if local_ts.date().isoformat() > regular_date and local_ts.hour >= 16:
                        regular_close=float(value)
                        regular_date=local_ts.date().isoformat()
            except Exception as intraday_exc:
                print(f"Intraday fallback {name}: {intraday_exc}")
            change=value-previous_close
            change_pct=(change/previous_close*100) if previous_close else 0.0
            indicators[name]={
                "symbol":symbol,"value":round(value,4),"previousClose":round(previous_close,4),
                "regularClose":round(regular_close,4),"regularCloseDate":regular_date,
                "change":round(change,4),"changePercent":round(change_pct,4),"asOf":as_of,
                "source":"Yahoo Finance via yfinance","dataStatus":status,
            }
            group=MARKET_GROUP[name]
            old_date=market_dates.get(group)
            if not old_date or regular_date>old_date: market_dates[group]=regular_date
            successful+=1
            print(f"OK {name}: {value:.4f} @ {as_of}")
        except Exception as exc:
            failed.append(name)
            print(f"WARNING {name}: {exc}; previous verified value preserved.")

    try:
        update_hsi_futures(indicators); successful+=1
    except Exception as exc:
        failed.append("HSIF")
        print(f"WARNING HSIF: {exc}; previous verified futures quote preserved.")
        if "HSIF" in indicators:
            indicators["HSIF"]["freshness"]="FALLBACK"
            indicators["HSIF"]["dataStatus"]="Primary futures refresh failed; previous verified quote preserved with original timestamp"

    save_json(OUTPUT_PATH,{
        "lastUpdated":datetime.now(timezone.utc).isoformat(),"marketDates":market_dates,
        "marketStatus":"updated" if successful else "stale_preserved",
        "dataStatus":"Latest available intraday snapshot when available; US index previous close uses daily series; HK index previous close uses prior intraday session when available; HSI futures preserve source timestamp/session and distinguish market-closed state from stale data; NOT all feeds are direct exchange APIs",
        "failedSymbols":failed,"indicators":indicators,
    })
    try: update_weekly_events()
    except Exception as exc: print(f"Weekly events warning: {exc}")
    print(f"Completed: {successful} updated, {len(failed)} preserved.")


if __name__ == "__main__":
    main()
