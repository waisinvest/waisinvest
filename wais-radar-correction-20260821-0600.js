// WAIS Early Radar research-integrity correction — 2026-08-21 06:00 ET
// Primary-source correction: Genglycos/DTX401 was FDA accelerated-approved on Aug 19, 2026; it is not an upcoming Aug 23 PDUFA binary.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastStrategyUpdated='2026-08-21T06:00:00-04:00';
  const remove=(arr,t)=>Array.isArray(arr)?arr.filter(x=>String(x).toUpperCase()!==t):[];

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-21 06:00 ET — research-integrity correction';
  d.earlyRadar.preReadyEarly=remove(d.earlyRadar.preReadyEarly,'RARE');

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-21 06:00 ET — RARE catalyst corrected';
  d.opportunityPipeline.preReadyEarly=remove(d.opportunityPipeline.preReadyEarly,'RARE');
  d.opportunityPipeline.closestToReady=remove(d.opportunityPipeline.closestToReady,'RARE');
  d.opportunityPipeline.inUniverse=Array.from(new Set([...(d.opportunityPipeline.inUniverse||[]),'RARE']));
  d.opportunityPipeline.statusChanges=[
    'RESEARCH INTEGRITY CORRECTION — RARE: FDA already granted accelerated approval to Genglycos (DTX401; pariglasgene brecaparvovec-opnr) on Aug 19, 2026 for GSDIa patients age 8+. The prior Aug 23 PDUFA-binary framing is stale/incorrect and must not drive sizing. RARE is removed from PRE-READY EARLY and moved to POST-APPROVAL VERIFY. New work: assess launch timing, certified-center rollout, payer/reimbursement, label breadth, durability/confirmatory-data obligations, uptake economics, valuation, and post-event price acceptance before any fresh upgrade.',
    ...(d.opportunityPipeline.statusChanges||[])
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const rare=stocks.find(x=>String(x.ticker||'').toUpperCase()==='RARE');
  if(rare) Object.assign(rare,{
    bucket:'POST_APPROVAL_VERIFY',
    rating:'Watch / Post-Approval Verify',
    stance:'POST-APPROVAL VERIFY · FDA APPROVED AUG 19',
    researchStage:'WATCH',
    evidenceConfidence:90,
    currentAction:'DO NOT TRADE AS UPCOMING PDUFA · REBUILD POST-APPROVAL THESIS',
    executionStage:'WATCH',
    executionAction:'VERIFY COMMERCIALIZATION -> REVALUE -> SIZE',
    note:'Research-integrity correction: FDA granted accelerated approval to Genglycos (DTX401) on Aug 19, 2026, so the previously modeled Aug 23 PDUFA binary no longer exists. Approval is based on reduced cornstarch use as a surrogate/intermediate endpoint and requires longer-term confirmatory follow-up. Keep RARE in the research universe, but remove it from PRE-READY EARLY until launch execution, reimbursement, certified-center rollout, label economics, confirmatory obligations, valuation and post-event price acceptance are reassessed from primary sources.'
  });

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  d.actionPlan=d.actionPlan.filter(x=>!String(x).startsWith('PRE-READY EARLY：'));
  d.actionPlan.splice(1,0,'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP, GLW, GNRC。RARE已於Aug 19獲FDA accelerated approval，移出PRE-READY EARLY，改列POST-APPROVAL VERIFY；不可再按Aug 23 PDUFA binary處理。');
})();