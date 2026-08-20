// WAIS Early Radar incremental update — 2026-08-20 11:50 ET
// Loads after the canonical state; contains only evidence-backed ranking changes.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-20T11:50:00-04:00';

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-20 11:50 ET';
  d.earlyRadar.preReadyEarly=Array.from(new Set([...(d.earlyRadar.preReadyEarly||[]),'DIOD']));

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 11:50 ET radar sync';
  d.opportunityPipeline.preReadyEarly=Array.from(new Set([...(d.opportunityPipeline.preReadyEarly||[]),'DIOD']));
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'DIOD']));
  d.opportunityPipeline.closestToReady=Array.from(new Set([...(d.opportunityPipeline.closestToReady||[]),'DIOD']));
  d.opportunityPipeline.statusChanges=[
    'DIOD enters PRE-READY EARLY: Q2 revenue +21.7% YoY to $445.5M, gross margin expanded to 33.1%, and Q3 guidance calls for about $510M revenue (+30% YoY) with ~35% gross margin. Baird recently named DIOD a small-cap semiconductor top idea and raised its target to $192. Current price around $94 is roughly 25% below the 52-week high, but insider open-market sales around $103-$107 in May and a high trailing valuation are important counterweights.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const existing=stocks.find(x=>String(x.ticker||'').toUpperCase()==='DIOD');
  const fields={
    ticker:'DIOD',company:'Diodes Incorporated',category:'Semiconductors / analog & mixed signal',bucket:'HIDDEN_GEM',risk:'High',
    rating:'Pre-Ready Early',stance:'PRE-READY EARLY · CYCLICAL RECOVERY / AI-ATE',researchStage:'PRE-READY EARLY',
    evidenceConfidence:72,entry:null,target:null,showInWatchlist:false,universeStatus:'IN',
    currentAction:'VERIFY PRICE STRUCTURE · SMALL START ONLY',executionStage:'PRE-READY EARLY',executionAction:'INFER -> SIZE SMALL -> VERIFY -> ADD/EXIT',
    note:'Q2 revenue $445.5M (+21.7% YoY), GAAP gross margin 33.1% vs 31.5% YoY, and Q3 revenue guide ~$510M (+30% YoY) with ~35% gross margin show a real cyclical/operating inflection. The announced $250M ElevATE Semiconductor acquisition adds higher-margin ATE exposure and is expected to be immediately accretive, with ~$50M first-year revenue and >20% four-year CAGR. Baird recently called DIOD a small-cap semiconductor top idea and lifted its price target to $192. Counterevidence: insiders sold shares around $103-$107 in May, current trailing valuation is elevated, and the stock remains volatile. No blind chase.'
  };
  if(existing) Object.assign(existing,fields); else stocks.push(fields);

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD。DIOD係cyclical recovery + margin expansion + AI/ATE optionality setup；仍需price structure驗證，不可blind chase。');
})();