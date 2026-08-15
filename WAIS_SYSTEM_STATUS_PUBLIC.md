# WAIS SYSTEM STATUS — Research Integrity Audit

Updated: 2026-08-15

This file distinguishes what WAIS has **designed**, what is **manually executed**, and what is genuinely **automated**. It is a public, sanitized status record; proprietary scoring logic, FABIBOT weights, credentials and private portfolio data must remain outside this repository.

## Integrity Rule

**No log = not done. No source = not researched. No automation record = not automated.**

WAIS must not use words such as `continuous`, `automated`, `updated`, or `verified` unless the relevant execution evidence exists. When only part of the system has refreshed, public status must be `PARTIAL UPDATE`, not `UPDATED`.

## Current Production Status

| Module | Status | Evidence / Limitation |
|---|---|---|
| Market / stock price refresh | AUTOMATED | GitHub scheduled workflow writes timestamped JSON |
| Extended-hours snapshots | AUTOMATED / DELAYED | Provider 5-minute snapshots; not exchange-certified real-time |
| WAIS INVEST website | ACTIVE | GitHub Pages + runtime data loader |
| Integrity tests | ACTIVE | GitHub Actions tests on code changes |
| WAIS execution framework | ACTIVE | Candidate → Candidate+ → TECH READY → READY 1 decision contract |
| Income ETF metrics | ACTIVE / PARTIAL | TTM income, 30D rate, consistency and sustainable-income research metrics exist; full ROC/NAV attribution remains research work |
| Economic calendar | REPAIRED | Official-source seed refreshed 2026-08-15; automation still requires continued validation |
| Earnings calendar | PARTIAL | Critical dates are tracked, but a production ticker-wide ingestion engine is not yet complete |
| Serenity intelligence | MANUAL / REPAIRING | Public-source checking is required per research cycle; prior standalone automation had been disabled |
| Company IR / SEC ingestion | MANUAL | Must be explicitly checked and logged until automated ingestion exists |
| Institutional / industry research | MANUAL | No persistent provider ingestion pipeline yet |
| Early Discovery | PARTIAL | Technical/price universe exists; market-wide autonomous discovery engine is not yet production |
| Supply-chain intelligence | MANUAL / PARTIAL | Research framework exists; ingestion and evidence graph are not yet automated |
| FABIBOT validation | DESIGNED / MANUAL | Automated prediction log, outcome database and backtest engine remain pending |
| IBKR execution | DESIGNED | No live broker execution integration is active |

## Research Evidence Contract

Every WAIS research cycle should record the state of these layers:

- Serenity / specialist research: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- Company investor relations: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- SEC / regulatory filings: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- Earnings / guidance / transcripts: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- Institutional / industry research: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- Supply-chain cross-check: `CHECKED`, `NOT CHECKED`, or `DATA GAP`
- New-universe discovery scan: `CHECKED`, `NOT CHECKED`, or `DATA GAP`

Missing access or evidence must be labelled as a data gap. It must never be rewritten as “no new update.”

## Decision Discipline

Research input is not a buy signal. Serenity, institutional commentary, AI research tools and external analysts are discovery inputs only. WAIS must independently verify material claims using primary evidence where possible, then evaluate quality, valuation, expectations risk, technical structure, event risk and portfolio risk before capital deployment.

`READY 1` remains the first normal capital-deployment authorization. A weekend or stale label cannot be inherited automatically into the next trading session.

## Current Repair Priorities

1. Research-input logging and evidence-of-work.
2. Serenity + specialist research integration without treating any source as an auto-buy authority.
3. Company IR / SEC / earnings ingestion and cross-source validation.
4. Market-wide Early Discovery instead of repeatedly cycling a fixed watchlist.
5. Rolling economic and earnings calendars with freshness checks.
6. FABIBOT prediction logging and evidence-based backtesting.
7. Broker/API integration only after research and decision integrity are reliable.

## Public Status Vocabulary

- `AUTOMATED` — a real scheduled process runs and leaves machine-verifiable output/logs.
- `ACTIVE MANUAL` — performed during a WAIS research cycle but not running continuously in the background.
- `PARTIAL` — some components exist, but the end-to-end production process is incomplete.
- `DESIGNED` — architecture/rules are defined but production execution does not yet exist.
- `DATA GAP` — required evidence could not be obtained or verified.
- `PARTIAL UPDATE` — only some website/system layers have refreshed.

This status file should be updated whenever the actual operating state changes.
