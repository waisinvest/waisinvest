// WAIS Early Radar incremental update — 2026-08-20 17:52 ET
// New PRE-READY EARLY candidate validated against company primary data and fresh analyst revisions.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-20T17:52:00-04:00';

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-20 17:52 ET';
  d.earlyRadar.preReadyEarly=Array.from(new Set([...(d.earlyRadar.preReadyEarly||[]),'GNRC']));

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 17:52 ET radar sync';
  d.opportunityPipeline.preReadyEarly=Array.from(new Set([...(d.opportunityPipeline.preReadyEarly||[]),'GNRC']));
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'GNRC']));
  d.opportunityPipeline.closestToReady=Array.from(new Set([...(d.opportunityPipeline.closestToReady||[]),'GNRC']));
  d.opportunityPipeline.statusChanges=[
    'GNRC enters PRE-READY EARLY after primary-data validation: Q2 sales +11% YoY to $1.17B, C&I sales +29% to $556M, FCF $63M vs $14M prior year, data-center backlog ~$1.6B, one hyperscaler committed nearly $700M of 2027 volume, a second hyperscaler supply agreement signed, and 2026 EBITDA-margin guidance raised to 20-21%. Aug 20 close $206.75 is ~30% below the $296.44 52-week high. UBS raised PT to $340, Cantor to $333, Stifel to $285 while Baird remains Buy/Outperform despite a modest PT trim; Roth is a Hold, so Smart Money is supportive but not unanimous.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const existing=stocks.find(x=>String(x.ticker||'').toUpperCase()==='GNRC');
  const fields={
    ticker:'GNRC',company:'Generac Holdings Inc.',category:'Data-center backup power / industrial power infrastructure',bucket:'HIDDEN_GEM',risk:'Medium-High',
    rating:'Pre-Ready Early',stance:'PRE-READY EARLY · DATA-CENTER BACKLOG / VALUATION RESET',researchStage:'PRE-READY EARLY',
    evidenceConfidence:79,entry:null,target:null,showInWatchlist:false,universeStatus:'IN',
    currentAction:'SMALL-SIZE WATCH · VERIFY SUPPORT',executionStage:'PRE-READY EARLY',executionAction:'INFER -> SIZE SMALL -> VERIFY -> ADD/EXIT',
    note:'Data: Q2 net sales $1.17B (+11% YoY), C&I $556.5M (+29%), FCF $62.9M vs $14.5M, data-center backlog ~$1.6B, first hyperscaler committed nearly $700M 2027 volume, second hyperscaler agreement signed, and 2026 adjusted EBITDA margin guidance raised to 20-21%. Smart Money: UBS $340 Buy, Cantor $333 Buy, Stifel $285 Buy, Baird still Buy/Outperform despite PT trim; Roth remains Hold, so sponsorship is broad but not unanimous. Catalyst: backlog conversion into 2027 revenue, second-hyperscaler product terms, capacity ramp >$1.25B by Q4 2026 with path to 3x by Q3 2027. Aug 20 close $206.75 is ~30% below the 52-week high $296.44. Estimated win probability 70-75%; first tranche ~0.5% portfolio only after support/reclaim; add if backlog converts, second hyperscaler terms firm and C&I margin/FCF stay strong; invalidate on hyperscaler delays/cancellations, backlog deterioration, material margin reversal or failed support with weakening AI infrastructure capex.'
  };
  if(existing) Object.assign(existing,fields); else stocks.push(fields);

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP, GLW, GNRC。GNRC係data-center backlog + valuation-reset setup；第一注只可小倉並等support/reclaim。');
})();