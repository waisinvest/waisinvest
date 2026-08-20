// WAIS Early Radar incremental update — 2026-08-20 12:57 ET
// Evidence-backed ranking change plus catalyst-calendar integrity correction.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-20T12:57:00-04:00';

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-20 12:57 ET';
  d.earlyRadar.preReadyEarly=Array.from(new Set([...(d.earlyRadar.preReadyEarly||[]),'MCHP']));

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 12:57 ET radar sync';
  d.opportunityPipeline.preReadyEarly=Array.from(new Set([...(d.opportunityPipeline.preReadyEarly||[]),'MCHP']));
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'MCHP']));
  d.opportunityPipeline.closestToReady=Array.from(new Set([...(d.opportunityPipeline.closestToReady||[]),'MCHP']));
  d.opportunityPipeline.statusChanges=[
    'MCHP enters PRE-READY EARLY: fiscal Q1 2027 sales rose 38% YoY and 13.2% QoQ to $1.485B, non-GAAP gross margin reached 63.8%, inventory days fell to 175 from 185, bookings/book-to-bill remained strong, PCIe Gen6 design wins doubled sequentially, and September-quarter revenue guidance implies about 40.6% YoY growth. Shares were about 26% below the 52-week high on Aug 18. Citi remains Buy but cut PT to $95; UBS remains Buy at $120, while Morgan Stanley/TD Cowen are more cautious. This is a real recovery setup but not READY 1.',
    'Catalyst integrity correction: SVRA MOLBREEVI is NOT an Aug 22 PDUFA catalyst anymore. Savara company IR on Aug 11 states the FDA target action date is Nov 22, 2026. Third-party calendars still showing Aug 22 are stale; SVRA therefore stays outside PRE-READY for this near-term event window.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const existing=stocks.find(x=>String(x.ticker||'').toUpperCase()==='MCHP');
  const fields={
    ticker:'MCHP',company:'Microchip Technology',category:'Semiconductors / MCU & analog recovery',bucket:'HIDDEN_GEM',risk:'Medium-High',
    rating:'Pre-Ready Early',stance:'PRE-READY EARLY · CYCLICAL RECOVERY / MARGIN RE-EXPANSION',researchStage:'PRE-READY EARLY',
    evidenceConfidence:74,entry:null,target:null,showInWatchlist:false,universeStatus:'IN',
    currentAction:'VERIFY SUPPORT / NO CHASE',executionStage:'PRE-READY EARLY',executionAction:'INFER -> SIZE SMALL -> VERIFY -> ADD/EXIT',
    note:'Fiscal Q1 2027 sales $1.485B (+38% YoY, +13.2% QoQ) beat guidance; non-GAAP gross margin 63.8%, inventory days fell to 175 from 185, book-to-bill stayed well above 1, and PCIe Gen6 design wins doubled sequentially to 12. September-quarter revenue guidance of $1.589-$1.618B implies ~40.6% YoY growth at midpoint and non-GAAP gross margin 66%-67%. Net debt fell ~$170M in the quarter. Smart-money evidence is mixed-positive: Citi and UBS remain Buy but Citi cut target to $95, while Morgan Stanley/TD Cowen are Hold. Price on Aug 18 was $78.19, ~26% below the $105.91 52-week high. Need support/reclaim confirmation; no blind chase.'
  };
  if(existing) Object.assign(existing,fields); else stocks.push(fields);

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.eventCalendarCorrections=Array.from(new Set([...(d.researchIntegrity.eventCalendarCorrections||[]),'SVRA: MOLBREEVI PDUFA moved to 2026-11-22 per Savara Aug 11 company update; reject stale Aug 22 third-party calendar entries.']));

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP。MCHP係cyclical recovery + margin re-expansion setup；仍需support/reclaim驗證，不可blind chase。');
})();