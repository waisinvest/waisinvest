import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf


SYMBOLS = [
    "NVDA",
    "TSM",
    "AVGO",
    "MRVL",
    "MU",
    "COHR",
    "LITE",
    "AXTI",
    "TSEM",
    "POET",
]

OUTPUT_PATH = Path("stock-prices.json")


def load_existing_data():
    if not OUTPUT_PATH.exists():
        return {
            "lastUpdated": None,
            "marketStatus": "pending",
            "currency": "USD",
            "prices": {},
        }

    try:
        with OUTPUT_PATH.open("r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return {
            "lastUpdated": None,
            "marketStatus": "pending",
            "currency": "USD",
            "prices": {},
        }


def main():
    existing_data = load_existing_data()
    prices = existing_data.get("prices", {})
    successful_updates = 0

    for symbol in SYMBOLS:
        try:
            stock = yf.Ticker(symbol)
            history = stock.history(
                period="5d",
                interval="1d",
                auto_adjust=False,
                prepost=False,
            )

            if history.empty:
                print(f"No price returned for {symbol}")
                continue

            closes = history["Close"].dropna()

            if closes.empty:
                print(f"No closing price returned for {symbol}")
                continue

            latest_price = float(closes.iloc[-1])

            prices[symbol] = {
                "price": round(latest_price, 2),
                "currency": "USD",
            }

            successful_updates += 1
            print(f"{symbol}: {latest_price:.2f}")

        except Exception as error:
            print(f"Failed to update {symbol}: {error}")

    output = {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "marketStatus": (
            "updated"
            if successful_updates > 0
            else "update_failed"
        ),
        "currency": "USD",
        "prices": prices,
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
        raise RuntimeError("No stock prices were updated.")


if __name__ == "__main__":
    main()
