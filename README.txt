WAIS INVEST V3 COMPLETE REBUILD

Replace/add in order:
1 market-data.js
2 app.js
3 index.html
4 ADD wais-theme.css
5 update_stock_prices.py
6 update_market_data.py
7 ADD weekly-events.json
8 .github/workflows/update-market-data.yml
9 .github/workflows/update-stock-prices.yml

Then run both Actions once manually and Ctrl+Shift+R.

Key logic:
- Top Picks are selected FROM Watchlist using topPickRank.
- Hidden Gems are research-only and do not duplicate Watchlist.
- Full color action system: green READY, yellow WATCH, orange WAIT, red DEFENSE, blue RESEARCH.
- Income split Weekly / Monthly / Tactical with Today Action, Entry Zone, First Tranche, distribution data, SMA20 and dates.
- Prices / distributions / SMA / market dates / official weekly events auto update where practical.
- Automatic data never auto-promotes a security to READY 1 without WAIS strategy review.
- Completed-close guard prevents an open trading session being mislabeled as a closing value.

Commit: Rebuild WAIS signals income engine and automatic data architecture
