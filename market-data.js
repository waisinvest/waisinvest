// WAIS market-data loader. Strategy state and automatic quote data are intentionally separate.
// Public files contain sanitized outputs only; never store credentials or proprietary model weights here.
document.write('<script src="market-data.base.js?v=20260815t"></script>');
document.write('<script src="market-data-override.js?v=20260815t"></script>');
// Baseline sanitized decision state loads before the current research-integrity overlay.
document.write('<script src="wais-public-state.js?v=20260815t"></script>');
document.write('<script src="wais-research-integrity-v1.js?v=20260815t"></script>');
document.write('<script src="wais-evening-state-20260815.js?v=20260815t"></script>');
// Discovery is additive: new names enter research/validation only and never auto-promote to READY.
document.write('<script src="wais-discovery-v1.js?v=20260815t"></script>');
// Rebuild a single canonical TOP PICK #1–#5 ranking after all stock-state overlays.
document.write('<script src="wais-top-picks-normalizer-v1.js?v=20260815t"></script>');
document.write('<script src="wais-income-v2.js?v=20260815t"></script>');
document.write('<script src="wais-income-universe-v26.js?v=20260815t"></script>');
document.write('<script src="wais-income-metrics-v11.js?v=20260815t"></script>');
document.write('<script src="wais-income-entry-v21.js?v=20260815t"></script>');
document.write('<script src="wais-income-filter-v24.js?v=20260815t"></script>');
document.write('<script src="wais-income-stage-nav-v22.js?v=20260815t"></script>');
document.write('<script src="wais-income-filter-fix-v25.js?v=20260815t"></script>');
document.write('<script src="wais-income-sort-v1.js?v=20260815t"></script>');
document.write('<script src="wais-execution-v13.js?v=20260815t"></script>');
// Watchlist order must be calculated after execution-stage patches so the final visible priority is authoritative.
document.write('<script src="wais-watchlist-order-v1.js?v=20260815t"></script>');
document.write('<script src="auto-refresh.js?v=20260815t"></script>');
document.write('<script src="wais-runtime-guard.js?v=20260815t"></script>');
document.write('<script src="wais-market-closed-fix-v1.js?v=20260815t"></script>');
// Presentation overlays: actual point moves (+/-) alongside percentages on Dashboard and Research Library.
document.write('<script src="wais-mobile-data-hotfix.js?v=20260815t"></script>');
document.write('<script src="wais-research-move-format-v1.js?v=20260815t"></script>');
document.write('<script src="wais-color-standard-v1.js?v=20260815t"></script>');
