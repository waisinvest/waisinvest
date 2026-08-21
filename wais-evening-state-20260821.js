// WAIS 19:20 ET Friday content-sync overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-21';
  d.lastStrategyUpdated='2026-08-21T19:20:00-04:00';
  d.dataAsOf='2026-08-21 19:20 ET content sync using Aug 21 regular-close / extended-hours market feeds, verified-event master, discovery health, company IR/SEC checks and current industry/supply-chain research';

  d.marketMode='CAUTIOUS · BROAD REBOUND / SEMI LAG';
  d.riskScore=61;
  d.recommendedCash=45;
  d.defenseStatus='CAUTIOUS DEFENSE · SELECTIVE LONG WATCH · EVENT-RISK WEEK AHEAD';
  d.readyList=[];
  d.techReadyList=[];
  d.contentSyncStatus='CURRENT · BROAD REBOUND BUT SOX LAGS · READY 1 NONE';
  d.contentSyncReason='Aug 21 U.S. indices rebounded (S&P 500 +0.43%, Nasdaq +0.43%, NDX +0.33%, Dow +0.98%) and VIX eased to ~15.13, but SOX fell ~0.51% and the U.S. 10Y rose to ~4.738%. The week still ended with elevated bond/oil risk and semiconductors under pressure. WAIS lowers defense slightly from Aug 20 but keeps 45% cash and no READY 1 ahead of NVDA earnings, MRVL earnings, GDP/PCE and Jackson Hole.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-21 19:20 ET';
  d.researchIntegrity.overallStatus='CURRENT · EVIDENCE-OF-WORK COMPLETE · GAPS LABELLED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'Latest automated discovery cycle retried the Serenity adapter at 23:01 UTC and it remains UNAVAILABLE because no machine-readable feed is configured. This is missing specialist evidence, not “no update”.'},
    {layer:'Company IR',status:'CHECKED',evidence:'NVIDIA IR reconfirms Aug 26 Q2 FY2027 results / 17:00 ET call; Marvell IR reconfirms Aug 27 Q2 FY2027 / 16:45 ET call and current AI-memory/storage product updates. Fabrinet official post-event results remain incorporated. Zymeworks IR continues to support the Aug 25 PDUFA target date.'},
    {layer:'SEC / regulatory',status:'CHECKED + AUTOMATION DATA GAP',evidence:'SEC_PRIMARY automation still reports HTTP 403 in the GitHub runner. Independent SEC/IR filing paths remain usable; Marvell primary filing materials support the prior Q1 revenue/outlook base. Direct automation is still a DATA GAP and is not described as “no filing”.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED',evidence:'Next hard gates are NVDA Aug 26 and MRVL Aug 27. Marvell prior official Q1 results reported $2.418B revenue and guided Q2 revenue to $2.7B +/-5%, so the upcoming print is material to the current recovery thesis.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'Current market research was rechecked: the AI trade remains the key market pillar, while rising global bond yields are raising the discount-rate hurdle for long-duration technology. No broad Risk-On promotion is justified by one rebound session.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'Memory and foundry demand remain structurally strong: Micron announced a $10B Boise AI-memory research investment over the next decade, while advanced-node capacity remains tight. Optical/CPO scaling constraints in yield, packaging and testing remain active, so stock selection stays evidence-based rather than theme-based.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'Latest automated discovery reports ALMU and AMBQ official sources LIVE with contentChanged=false; no automatic promotion occurs. Existing FN/GNRC/EROC/POWL research stays in validation stages according to current evidence and price structure.'},
    {layer:'Route Intelligence',status:'CHECKED',evidence:'Related-route refresh completed at 22:57 UTC with relatedRoutesFailedSymbols=[] and relatedRouteStockMetricFailures=[]. Stock, bullish leveraged, bearish/inverse and income remain independent READY decisions.'}
  ];

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-21 19:20 ET closing sync';
  d.opportunityPipeline.actionNow='KEEP CASH BUFFER · FOLLOW TRUE RELATIVE STRENGTH · NO PRE-EVENT CHASE';
  d.opportunityPipeline.ready1=[];
  d.opportunityPipeline.techReady=[];
  d.opportunityPipeline.candidatePlus=[
    {ticker:'LITE',status:'CANDIDATE+ · OPTICAL TREND LEADER',entry:'Wait for controlled retest / higher low; do not chase',target:'Deferred until trigger confirms',trigger:'Hold above ~$814-817 20D/50D zone and preserve relative strength',invalidation:'Lose reclaimed trend with renewed optical-chain selling',reason:'LITE regular close ~$866.71 remains well above 20D (~$817) and 50D (~$814) despite a modest pullback. Trend leadership survives, but realized volatility remains high.'},
    {ticker:'MU',status:'CANDIDATE+ · AI MEMORY / 50D TEST',entry:'No chase; require confirmed hold above 50D',target:'Deferred until trigger confirms',trigger:'Hold/reclaim ~$965 50D and maintain relative strength into next week',invalidation:'Lose 50D then fail the rising 20D with renewed heavy selling',reason:'MU regular close ~$966.78 sits almost exactly on its 50D (~$964.6) and well above 20D (~$896). Micron also announced a $10B Boise AI-memory R&D investment, but volatility remains extreme.'},
    {ticker:'NVDA',status:'CANDIDATE+ · HARD EARNINGS GATE',entry:'No pre-earnings chase',target:'Deferred through event gate',trigger:'Hold ~$213 20D / low-$210s and confirm post-earnings direction',invalidation:'Break low-$210s with worsening breadth or negative event shock',reason:'NVDA regular close ~$214.72 remains just above 20D (~$213.18) and above 50D (~$207.58). Aug 26 earnings is the dominant gate.'},
    {ticker:'MRVL',status:'CANDIDATE+ · GOOGLE-DEAL PULLBACK / EARNINGS GATE',entry:'Do not buy the first sharp pullback; require stabilization',target:'Deferred until trigger confirms',trigger:'Hold/reclaim ~$237-240 after volatility contracts; respect Aug 27 earnings',invalidation:'Lose 50D (~$233.85) and fail to recover on constructive breadth',reason:'MRVL regular close ~$237.04 fell ~5.6% after the Google-deal surge but still sits slightly above its 50D. The Google custom-AI-chip partnership is strategically material; earnings next week keeps READY closed.'}
  ];
  d.opportunityPipeline.candidate=[
    {ticker:'GOOGL',status:'CANDIDATE · REBOUND / TREND RECLAIM WATCH',trigger:'Reclaim ~$348-352 with Nasdaq stabilization',reason:'GOOGL regular close ~$344.82 rebounded ~1.2% but remains below 20D/50D; improved tape is not yet a trend reclaim.'},
    {ticker:'TSM',status:'CANDIDATE · PARTIAL TREND RECOVERY',trigger:'Hold above 20D (~$413) then reclaim 50D (~$424.5)',reason:'TSM regular close ~$418.95 is above 20D but still below 50D, so recovery is incomplete.'},
    {ticker:'GFS',status:'CANDIDATE · RESET',trigger:'Reclaim ~$50.7-52 in a normal session',reason:'GFS regular close ~$48.05 improved but remains below 20D and far below 50D.'},
    {ticker:'AVGO',status:'CANDIDATE · RISK RESET',trigger:'Reclaim ~$388-396 trend band with sector stabilization',reason:'AVGO regular close ~$368.45 remains below both 20D and 50D despite a positive session.'},
    {ticker:'AXTI',status:'CANDIDATE · HIGH-VOL TREND TEST',trigger:'Hold above ~$68-69 20D/50D and form a controlled higher low',reason:'AXTI regular close ~$70.74 remains above 20D/50D but pulled back sharply and realized volatility is extreme.'},
    {ticker:'COHR',status:'CANDIDATE · OPTICAL REPAIR WATCH',trigger:'Reclaim ~$304 20D then build a higher low',reason:'COHR regular close ~$289.52 remains below 20D/50D; stabilization is incomplete.'},
    {ticker:'TSEM',status:'CANDIDATE · WASHOUT REVIEW',trigger:'Reclaim ~$233-244 with volatility contraction',reason:'TSEM regular close ~$222.59 remains below both trend averages.'},
    {ticker:'RKLB',status:'CANDIDATE · STOCK / DIRECTIONAL ROUTE WATCH',trigger:'Require underlying direction confirmation before any long or inverse route',reason:'Bullish RKLX/RKX and bearish RKLZ remain independent tactical routes; product existence is not READY.'}
  ];
  d.opportunityPipeline.closestToReady=['LITE','MU','NVDA','MRVL','GNRC'];
  d.opportunityPipeline.washoutRecoveryWatch=['LITE','MU','MRVL','AXTI','COHR','GFS','TSEM'];
  d.opportunityPipeline.statusChanges=[
    'Market mode improves modestly from CAUTIOUS semi-relative-strength to CAUTIOUS broad rebound / semi lag; cash eases from 50% to 45%, but READY 1 remains NONE.',
    'LITE remains Candidate+ because price stays well above 20D/50D despite the pullback.',
    'MU remains Candidate+ but is now explicitly a 50D hold test; the $10B Boise AI-memory investment strengthens the long-term thesis, not the immediate entry signal.',
    'MRVL remains Candidate+ but shifts from recovery leader to Google-deal pullback / earnings gate after a ~5.6% drop; do not catch the first sharp pullback.',
    'GOOGL improves on price action but remains Candidate until the ~$348-352 trend zone is reclaimed.',
    'READY 1 = NONE and TECH READY = NONE ahead of a dense Aug 25-29 event cluster.'
  ];

  d.incomeRouteReview={
    asOf:'2026-08-21',
    status:'VALIDATING · NO INCOME READY 1',
    note:'High distribution yield is not a buy signal. Income approval still requires NAV/ROC/total-return and liquidity evidence in addition to payout history.',
    highlights:[
      'MUYY: observed Weekly; since-inception/partial-history distribution yield ~36.41%; 20D dollar volume ~$823K; PARTIAL_HISTORY. Evidence leader versus MUIB, but not Best/READY.',
      'MUIB: 20D dollar volume only ~$66.5K and no mature distribution-history metrics in the current feed; DATA GAP / VALIDATING.',
      'AVGW: FULL_TTM distribution history and ~74% trailing distribution yield, but very high payout requires NAV/ROC/total-return validation before any approval.'
    ]
  };

  d.routeIntegrity={
    asOf:'2026-08-21',
    status:'CHECKED · FOUR INDEPENDENT GATES',
    rule:'Stock READY ≠ Bullish Leveraged READY ≠ Bearish READY ≠ Income READY.',
    verifiedBearishExamples:['NVDA: NVD / NVDD','MU: MUD / MUZ','AVGO: AVS','GOOGL: GGLS','TSM: TSMZ / STSM','RKLB: RKLZ'],
    note:'Latest route refresh has no failed route symbols. Daily-reset leveraged/inverse products remain tactical and are never promoted solely because the underlying moved.'
  };

  d.decisionJourney=[
    'Aug 18 washout: defense rose because broad tech and SOX sold off hard.',
    'Aug 19-20: selective semiconductor/AI leadership re-emerged, but breadth stayed mixed and bond yields remained a risk.',
    'Aug 21: broad indices rebounded and VIX fell, yet SOX lagged and 10Y rose to ~4.738%; therefore defense eases only modestly, not to Risk-On.',
    'Next decision gates: Aug 25 PDUFA/New Home Sales; Aug 26 GDP/PCE/Durables + NVDA; Aug 27 MRVL + Jackson Hole start; Aug 28 labor benchmark.'
  ];

  d.weekPlan={
    asOf:'2026-08-21 closing',
    plan:[
      'Keep 45% cash and avoid adding leverage before the Aug 26-29 macro/earnings cluster.',
      'Watch LITE/MU/NVDA/MRVL for controlled support holds; no chase and no first-day knife catching.',
      'Treat NVDA and MRVL earnings as hard gates; refresh underlying + route rankings only after post-event price/liquidity confirmation.',
      'Reassess duration-sensitive tech if 10Y holds above ~4.7% or rises further; a broad rebound with rising yields is not automatically Risk-On.',
      'Maintain Income ETF validation: yield alone never overrides NAV/ROC/total-return risk.'
    ]
  };

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const patch=(ticker,fields)=>{const s=stocks.find(x=>String(x.ticker||'').toUpperCase()===ticker); if(s) Object.assign(s,fields);};
  patch('LITE',{stance:'CANDIDATE+ · OPTICAL TREND LEADER',rating:'Candidate+',currentAction:'WAIT · NO CHASE',entry:'Controlled retest / higher low only',confirmationTrigger:'Hold above ~$814-817 20D/50D zone',invalidation:'Lose reclaimed trend with renewed optical-chain selling',note:'Aug 21 regular close ~$866.71; still well above 20D/50D despite a modest pullback.'});
  patch('MU',{stance:'CANDIDATE+ · AI MEMORY / 50D TEST',rating:'Candidate+',currentAction:'WAIT · REQUIRE 50D HOLD',entry:'Controlled hold/retest above ~$965 50D only',confirmationTrigger:'Hold/reclaim 50D and preserve relative strength',invalidation:'Lose 50D then fail rising 20D with heavy selling',note:'Aug 21 regular close ~$966.78, almost exactly on 50D; $10B Boise AI-memory R&D investment strengthens long-term evidence but not immediate entry approval.'});
  patch('NVDA',{stance:'CANDIDATE+ · HARD EARNINGS GATE',rating:'Candidate+',currentAction:'WAIT · EARNINGS GATE',entry:'No pre-earnings chase',confirmationTrigger:'Hold ~$213 20D / low-$210s then confirm post-event direction',invalidation:'Break low-$210s with worsening breadth or event shock',earnings:'2026-08-26 · AFTER CLOSE · 17:00 ET',note:'Aug 21 regular close ~$214.72; still above 20D/50D but Aug 26 earnings dominates the setup.'});
  patch('MRVL',{stance:'CANDIDATE+ · GOOGLE-DEAL PULLBACK / EARNINGS GATE',rating:'Candidate+',currentAction:'WAIT · DO NOT CATCH FIRST PULLBACK',entry:'Stabilization / reclaim around ~$237-240 only',confirmationTrigger:'Hold/reclaim ~$237-240 after volatility contracts; respect Aug 27 earnings',invalidation:'Lose 50D (~$233.85) and fail to recover',earnings:'2026-08-27 · AFTER CLOSE · 16:45 ET call',note:'Aug 21 regular close ~$237.04 after a sharp pullback from the Google-deal rally; strategic thesis improved, timing risk remains high.'});
  patch('GOOGL',{stance:'CANDIDATE · REBOUND / TREND RECLAIM WATCH',rating:'Candidate',currentAction:'WAIT FOR TREND RECLAIM',confirmationTrigger:'Reclaim ~$348-352 with Nasdaq stabilization',note:'Aug 21 regular close ~$344.82; rebound is constructive but still below 20D/50D.'});
  patch('TSM',{stance:'CANDIDATE · PARTIAL TREND RECOVERY',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Hold 20D (~$413) then reclaim 50D (~$424.5)',note:'Aug 21 regular close ~$418.95; above 20D but below 50D.'});
  patch('GFS',{stance:'CANDIDATE · RESET',rating:'Candidate',currentAction:'WAIT · RESET TRIGGER',confirmationTrigger:'Reclaim ~$50.7-52 in a normal session',note:'Aug 21 regular close ~$48.05; still below 20D/50D.'});
  patch('AVGO',{stance:'CANDIDATE · RISK RESET',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$388-396 trend band with sector stabilization',note:'Aug 21 regular close ~$368.45; still below 20D/50D.'});
  patch('AXTI',{stance:'CANDIDATE · HIGH-VOL TREND TEST',rating:'Candidate',currentAction:'WAIT · REQUIRE HIGHER LOW',confirmationTrigger:'Hold ~$68-69 trend zone and form controlled higher low',note:'Aug 21 regular close ~$70.74; above 20D/50D but volatility remains extreme.'});
  patch('COHR',{stance:'CANDIDATE · OPTICAL REPAIR WATCH',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$304 20D then build a higher low',note:'Aug 21 regular close ~$289.52; stabilization remains incomplete.'});
  patch('TSEM',{stance:'CANDIDATE · WASHOUT REVIEW',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$233-244 with volatility contraction',note:'Aug 21 regular close ~$222.59; below both 20D/50D.'});

  window.WAIS_MARKET_DATA=d;
})();
