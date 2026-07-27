import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf


MARKET_SYMBOLS = {
    "SP500": "^GSPC",
    "NASDAQ100": "^NDX",
    "SOX": "^SOX",
    "VIX": "^VIX",
    "US10Y": "^TNX",
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

    for indicator_name, yahoo_symbol in MARKET_SYMBOLS.items():
        try:
            ticker = yf.Ticker(yahoo_symbol)
            history = ticker.history(
                period="5d",
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

            if len(closes) >= 2:
                previous_close = float(closes.iloc[-2])
            else:
                previous_close = latest_value

            change = latest_value - previous_close

            if previous_close != 0:
                change_percent = (change / previous_close) * 100
            else:
                change_percent = 0

            indicators[indicator_name] = {
                "symbol": yahoo_symbol,
                "value": round(latest_value, 2),
                "previousClose": round(previous_close, 2),
                "change": round(change, 2),
                "changePercent": round(change_percent, 2),
            }

            successful_updates += 1

            print(
                f"{indicator_name}: "
                f"{latest_value:.2f} "
                f"({change_percent:+.2f}%)"
            )

        except Exception as error:
            print(f"Failed to update {indicator_name}: {error}")

    output = {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "marketStatus": (
            "updated"
            if successful_updates > 0
            else "update_failed"
        ),
        "indicators": indicators,
    }

    with OUTPUT_PATH.open("w", encoding="utf-8") as file:
        json.dump(
            output,
            file,
            ensure_ascii=False,
            indent=2,
        )
        file.write("\n")

    if successful_updates == 0:
        raise RuntimeError("No market indicators were updated.")


if __name__ == "__main__":
    main()
