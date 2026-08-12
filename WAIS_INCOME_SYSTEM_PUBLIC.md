# WAIS INCOME FACTORY v2.0 — Public Architecture

> Sanitized public specification. Proprietary scoring weights, private portfolio data, credentials and internal model logic must not be stored in this repository.

## Mission
Build recurring weekly/monthly cash flow by acquiring quality income-producing ETFs at favourable prices while protecting NAV and total wealth.

## Decision Contract
**Approved for Research is not Approved to Buy.**

Only these states authorize capital deployment:
- `INCOME READY 1` — first tranche approved.
- `ADD 2` / `ADD 3` — additional tranche approved after a fresh review.

`RESEARCH`, `WATCH INCOME`, `INCOME CANDIDATE`, and `INCOME CANDIDATE+` are monitoring states only.

## Portfolio Sleeves
1. **Core Income** — diversified recurring income and stronger NAV discipline.
2. **Growth Income** — growth/technology exposure plus recurring distributions.
3. **Weekly Income** — higher-frequency cash flow with stricter sustainability checks.
4. **Tactical High Income** — high-volatility structures; smaller sizing and exceptional entry discipline.
5. **Crash Income Reserve** — dry powder reserved for dislocations where yield-on-cost improves without breaking the income thesis.

## Mandatory Gates
Every Income READY decision must review:
- underlying quality;
- distribution sustainability;
- distribution source and estimated ROC;
- NAV path and drawdown;
- total return;
- liquidity;
- volatility;
- entry valuation / yield-on-cost;
- ex-date and pay-date;
- earnings and macro event risk.

## Core Rules
- Income first, but never yield-chasing.
- Distribution rate is not total return.
- Cash received is assessed together with NAV change.
- A falling price is not automatically an ADD signal.
- Buy low only when the underlying and income mechanism remain healthy.
- Capital can be recycled after distributions when risk/reward deteriorates or the opportunity is complete.
- Competing income wrappers for the same underlying/theme must be compared continuously.
- No ETF has a permanent portfolio entitlement.

## Current Approved Research Universe — 2026-08-11
### Core / Growth Income
QQQI, SPYI, JEPQ, JEPI

### Weekly Income
FEPI, AIPI, QDTE

### Tactical High Income
PLYY, NVYY, TMYY, MUYY

### Research / Newer Structure
XQQI

This universe is dynamic. Inclusion is research approval only and does not constitute a buy signal.
