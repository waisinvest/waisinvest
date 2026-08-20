// WAIS Early Radar incremental update — 2026-08-20 16:56 ET
// New PRE-READY EARLY candidate validated against company primary data.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-20T16:56:00-04:00';

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-20 16:56 ET';
  d.earlyRadar.preReadyEarly=Array.from(new Set([...(d.earlyRadar.preReadyEarly||[]),'GLW']));

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 16:56 ET radar sync';
  d.opportunityPipeline.preReadyEarly=Array.from(new Set([...(d.opportunityPipeline.preReadyEarly||[]),'GLW']));
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'GLW']));
  d.opportunityPipeline.closestToReady=Array.from(new Set([...(d.opportunityPipeline.closestToReady||[]),'GLW']));
  d.opportunityPipeline.statusChanges=[
    'GLW enters PRE-READY EARLY after a fresh Citi Buy upgrade/US$210 target was cross-checked against company primary evidence: Q2 core sales +17% YoY to $4.74B, core EPS +30%, Optical Communications +32%, Enterprise Networks +65%, core operating margin +190bp, adjusted FCF $1.42B, and Q3 guidance for ~16% sales growth / ~28% EPS growth. Shares around $152.46 on Aug 20 remain ~44% below the $271.78 52-week high. Multi-year hyperscaler agreements with Amazon, NVIDIA and Meta support the AI-fiber demand thesis. Recent insider Form 144/4 activity shows selling rather than open-market buying, so Smart Money is positive but not unanimous.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const existing=stocks.find(x=>String(x.ticker||'').toUpperCase()==='GLW');
  const fields={
    ticker:'GLW',company:'Corning Incorporated',category:'Optical fiber / AI data-center connectivity',bucket:'HIDDEN_GEM',risk:'Medium-High',
    rating:'Pre-Ready Early',stance:'PRE-READY EARLY · AI OPTICAL / VALUATION RESET',researchStage:'PRE-READY EARLY',
    evidenceConfidence:76,entry:null,target:null,showInWatchlist:false,universeStatus:'IN',
    currentAction:'SMALL-SIZE WATCH · VERIFY SUPPORT',executionStage:'PRE-READY EARLY',executionAction:'INFER -> SIZE SMALL -> VERIFY -> ADD/EXIT',
    note:'Data: Q2 core sales $4.74B (+17% YoY), core EPS $0.78 (+30%), Optical Communications +32%, Enterprise Networks +65%, core operating margin 20.9% (+190bp), adjusted FCF $1.42B; Q3 guide $4.9-$5.0B sales and $0.85-$0.89 EPS. Smart Money: Citi upgraded to Buy with $210 PT on Aug 20; company disclosures confirm multi-year Amazon/NVIDIA/Meta AI-data-center agreements, but recent insider filings include proposed/actual sales rather than open-market buying. Catalyst: Springboard execution, hyperscaler capacity ramps and Q3 margin/FCF delivery. Aug 20 price ~$152.46 is ~44% below 52-week high $271.78. Estimated win probability 69-74%; first tranche 0.5% portfolio only after support/reclaim; add if Q3 guide is met and optical growth stays >25%; invalidate on hyperscaler/LTA slippage, sharp margin reversal or failed support with worsening AI-capex evidence.'
  };
  if(existing) Object.assign(existing,fields); else stocks.push(fields);

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP, GLW。GLW係AI optical + valuation-reset setup；第一注只可小倉並等support/reclaim。');
})();