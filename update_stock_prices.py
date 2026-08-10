import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf

SYMBOLS = {
    # WAIS stocks
    "NVDA": {"yf": "NVDA", "currency": "USD"},
    "TSM": {"yf": "TSM", "currency": "USD"},
    "AVGO": {"yf": "AVGO", "currency": "USD"},
    "MRVL": {"yf": "MRVL", "currency": "USD"},
    "MU": {"yf": "MU", "currency": "USD"},
    "COHR": {"yf": "COHR", "currency": "USD"},
    "LITE": {"yf": "LITE", "currency": "USD"},
    "AXTI": {"yf": "AXTI", "currency": "USD"},
    "TSEM": {"yf": "TSEM", "currency": "USD"},
    "POET": {"yf": "POET", "currency": "USD"},
    "GFS": {"yf": "GFS", "currency": "USD"},
    "POWL": {"yf": "POWL", "currency": "USD"},
    "MOD": {"yf": "MOD", "currency": "USD"},
    "GOOGL": {"yf": "GOOGL", "currency": "USD"},
    "AAOI": {"yf": "AAOI", "currency": "USD"},
    "AEHR": {"yf": "AEHR", "currency": "USD"},
    "FORM": {"yf": "FORM", "currency": "USD"},
    "MXL": {"yf": "MXL", "currency": "USD"},
    "NVTS": {"yf": "NVTS", "currency": "USD"},
    "OSS": {"yf": "OSS", "currency": "USD"},
    "AIRO": {"yf": "AIRO", "currency": "USD"},

    # WAIS Income ETFs
    "VDY.TO": {"yf": "VDY.TO", "currency": "CAD", "income": True},
    "ZWB.TO": {"yf": "ZWB.TO", "currency": "CAD", "income": True},
    "ZWC.TO": {"yf": "ZWC.TO", "currency": "CAD", "income": True},
    "ZWU.TO": {"yf": "ZWU.TO", "currency": "CAD", "income": True},
    "JEPI": {"yf": "JEPI", "currency": "USD", "income": True},
    "JEPQ": {"yf": "JEPQ", "currency": "USD", "income": True},
    "QYLD": {"yf": "QYLD", "currency": "USD", "income": True},
}

OUTPUT_PATH = Path("stock-prices.json")


def load_existing_data():
    if not OUTPUT_PATH.exists():
        return {"lastUpdated": None, "marketStatus": "pending", "prices": {}}
    try:
        with OUTPUT_PATH.open("r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return {"lastUpdated": None, "marketStatus": "pending", "prices": {}}


def main():
    existing_data = load_existing_data()
    prices = existing_data.get("prices", {})
    successful_updates = 0

    for output_symbol, meta in SYMBOLS.items():
        yf_symbol = meta["yf"]
        try:
            ticker = yf.Ticker(yf_symbol)
            history = ticker.history(
                period="1y" if meta.get("income") else "10d",
                interval="1d",
                auto_adjust=False,
                prepost=False,
                actions=True,
            )

            if history.empty or history["Close"].dropna().empty:
                print(f"No closing price returned for {output_symbol}")
                continue

            closes = history["Close"].dropna()
            latest_price = float(closes.iloc[-1])
            latest_date = closes.index[-1].date().isoformat()

            record = {
                "price": round(latest_price, 4),
                "currency": meta["currency"],
                "asOf": latest_date,
                "source": "Yahoo Finance via yfinance",
                "dataStatus": "Delayed / closing data; NOT REAL-TIME",
            }

            if meta.get("income") and "Dividends" in history.columns:
                distributions = history["Dividends"].fillna(0)
                positive = distributions[distributions > 0]

                if not positive.empty:
                    last_distribution = float(positive.iloc[-1])
                    last_distribution_date = positive.index[-1].date().isoformat()
                    trailing_12m_distribution = float(positive.sum())

                    record["lastDistribution"] = round(last_distribution, 6)
                    record["lastDistributionDate"] = last_distribution_date
                    record["trailing12mDistribution"] = round(trailing_12m_distribution, 6)

                    if latest_price > 0:
                        record["trailing12mDistributionYield"] = round(
                            trailing_12m_distribution / latest_price * 100, 4
                        )

            prices[output_symbol] = record
            successful_updates += 1
            print(f"{output_symbol}: {latest_price:.4f} {meta['currency']} @ {latest_date}")

        except Exception as error:
            print(f"Failed to update {output_symbol}: {error}")

    output = {
        "lastUpdated": datetime.now(timezone.utc).isoformat(),
        "marketStatus": "updated" if successful_updates > 0 else "update_failed",
        "dataStatus": "Delayed / closing data; NOT REAL-TIME",
        "prices": prices,
    }

    with OUTPUT_PATH.open("w", encoding="utf-8") as file:
        json.dump(output, file, ensure_ascii=False, indent=2)
        file.write("\n")

    if successful_updates == 0:
        raise RuntimeError("No stock / ETF prices were updated.")


if __name__ == "__main__":
    main()
