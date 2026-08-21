// WAIS Early Radar incremental update — 2026-08-21 01:02 ET
// New PRE-READY EARLY biotech catalyst candidate validated against company primary data and fresh analyst coverage.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-21T01:02:00-04:00';

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-21 01:02 ET';
  d.earlyRadar.preReadyEarly=Array.from(new Set([...(d.earlyRadar.preReadyEarly||[]),'RARE']));

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-21 01:02 ET radar sync';
  d.opportunityPipeline.preReadyEarly=Array.from(new Set([...(d.opportunityPipeline.preReadyEarly||[]),'RARE']));
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'RARE']));
  d.opportunityPipeline.closestToReady=Array.from(new Set([...(d.opportunityPipeline.closestToReady||[]),'RARE']));
  d.opportunityPipeline.statusChanges=[
    'RARE enters PRE-READY EARLY ahead of the Aug 23 DTX401 PDUFA. Phase 3 GlucoGene met the primary endpoint with 41.3% mean cornstarch reduction vs 10.3% placebo at Week 48 (p<0.0001), reduced dosing frequency (p=0.0011), maintained glucose control, and showed an acceptable expected safety profile. Week 96 durability strengthened the package with ~61% mean cornstarch reduction. FDA granted Priority Review and said an AdCom was not anticipated. Smart Money is broadly constructive but not unanimous: recent Buy/Overweight-equivalent targets include Morgan Stanley $67, JPMorgan $72, Citi $45, TD Cowen $49, Wells Fargo $45, Jefferies $77 and Cantor $96, while Goldman remains Hold at $27 and Guggenheim cut to $35. Recent price is around $26-27, ~33% below the $39.89 52-week high.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const existing=stocks.find(x=>String(x.ticker||'').toUpperCase()==='RARE');
  const fields={
    ticker:'RARE',company:'Ultragenyx Pharmaceutical Inc.',category:'Rare-disease biotech / gene therapy',bucket:'EVENT_CATALYST',risk:'High',
    rating:'Pre-Ready Early',stance:'PRE-READY EARLY · AUG 23 PDUFA / POSITIVE PHASE 3',researchStage:'PRE-READY EARLY',
    evidenceConfidence:84,entry:null,target:null,showInWatchlist:false,universeStatus:'IN',
    currentAction:'SMALL-SIZE EVENT WATCH · VERIFY FDA ACTION',executionStage:'PRE-READY EARLY',executionAction:'INFER -> SIZE SMALL -> VERIFY -> ADD/EXIT',
    note:'Data: DTX401 Phase 3 GlucoGene showed 41.3% mean cornstarch reduction vs 10.3% placebo at Week 48 (p<0.0001), fewer daily doses (p=0.0011), maintained glucose control, acceptable expected AAV8 safety, and Week 96 durability with ~61% mean reduction. Smart Money: recent supportive targets include MS $67, JPM $72, Citi $45, TD Cowen $49, Wells $45, Jefferies $77 and Cantor $96; Goldman is Hold $27 and Guggenheim cut to $35, so sponsorship is strong but not unanimous. Catalyst: FDA Priority Review PDUFA Aug 23, 2026; FDA previously said AdCom was not anticipated. Recent price around $26-27 is ~33% below the 52-week high $39.89. Estimated win probability 78-84%; first tranche ~0.5% portfolio maximum because this is binary-event risk. Add only after approval and price acceptance, or on a controlled post-approval retest with no label/manufacturing surprise. Invalidate on CRL, material CMC/label restriction, unexpected safety concern, or failed post-event price acceptance.'
  };
  if(existing) Object.assign(existing,fields); else stocks.push(fields);

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP, GLW, GNRC, RARE。RARE係Aug 23 DTX401 PDUFA binary setup；Phase 3數據強，但第一注只可約0.5%，批准後先再驗證加碼。');
})();