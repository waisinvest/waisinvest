WAIS INVEST — Director Auto Update Pack

REPLACE THESE 5 FILES IN GITHUB:
1) market-data.js
2) app.js
3) index.html
4) update_stock_prices.py
5) update_market_data.py

Existing GitHub Actions can remain unchanged.
They already run the two Python update scripts automatically on weekdays.

WHAT THIS VERSION CHANGES
- Dashboard title becomes:
  全球市場最新指標（截至 YYYY-MM-DD）
- Market Structure Board shows:
  market data date + data-file update time + As of on each card
- Market Structure values come from market-indicators.json, not hard-coded numbers
- Income ETFs show:
  last close price, currency, price date,
  last distribution amount/date,
  trailing-12-month distribution yield (derived)
- Adds automatic price coverage for:
  VDY.TO, ZWB.TO, ZWC.TO, ZWU.TO, JEPI, JEPQ, QYLD
  plus all current WAIS stocks / Top Picks / Hidden Gems
- All automatic market values are labelled delayed / closing data, NOT REAL-TIME
- HSIF is preserved only when separately verified; it is not fabricated by the auto updater.

AFTER REPLACING:
Go to GitHub > Actions and run:
- Update Market Data
- Update Stock Prices
once manually, then wait for both to finish.
After that refresh the website with Ctrl+Shift+R.

Suggested commit:
Improve WAIS data dates and automate market and income ETF updates
