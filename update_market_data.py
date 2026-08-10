import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf

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

OUTPUT_PATH = Path("market-indicators.json")


def load_existing_data():
    if not OUTPUT_PATH.exists():
        return {}
    try:
        with OUTPUT_PATH.open("r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return {}


def main():
    existing_data = load_existing_data()
    indicators = existing_data.get("indicators", {})
    successful_updates = 0
    as_of_dates = []

    for indicator_name, yahoo_symbol in MARKET_SYMBOLS.items():
        try:
            ticker = yf.Ticker(yahoo_symbol)
            history = ticker.history(
                period="10d",
                interval="1d",
                auto_adjust=False,
                prepost=False,
            )

            if history.empty:
                print(f"No data returned for {indicator_name}")
                continue

            closes = history["Close"].dropna()
            if closes.empty:
                print(f"No closing value returned for {indicator_name}")
                continue

            latest_value = float(closes.iloc[-1])
            latest_date = closes.index[-1].date().isoformat()
            as_of_dates.append(latest_date)

            previous_close = float(closes.iloc[-2]) if len(closes) >= 2 else latest_value
            change = latest_value - previous_close
            change_percent = (change / previous_close * 100) if previous_close else 0

            indicators[indicator_name] = {
                "symbol": yahoo_symbol,
                "value": round(latest_value, 4),
                "previousClose": round(previous_close, 4),
                "change": round(change, 4),
                "changePercent": round(change_percent, 4),
                "asOf": latest_date,
                "source": "Yahoo Finance via yfinance",
                "dataStatus": "Delayed / closing data; NOT REAL-TIME",
            }

            successful_updates += 1
            print(f"{indicator_name}: {latest_value:.4f} ({change_percent:+.2f}%) @ {latest_date}")

        except Exception as error:
            print(f"Failed to update {indicator_name}: {error}")

    # Preserve separately verified HSIF if already present.
    # WAIS will not invent or auto-label an unverified futures quote as real-time.
    data_as_of = max(as_of_dates) if as_of_dates else existing_data.get("dataAsOf")

    output = {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "dataAsOf": data_as_of,
        "marketStatus": "updated" if successful_updates > 0 else "update_failed",
        "dataStatus": "Delayed / closing data; NOT REAL-TIME",
        "indicators": indicators,
    }

    with OUTPUT_PATH.open("w", encoding="utf-8") as file:
        json.dump(output, file, ensure_ascii=False, indent=2)
        file.write("\n")

    if successful_updates == 0:
        raise RuntimeError("No market indicators were updated.")


if __name__ == "__main__":
    main()
