// WAIS 19:35 ET Thursday content-sync overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-20';
  d.lastStrategyUpdated='2026-08-20T19:35:00-04:00';
  d.dataAsOf='2026-08-20 19:35 ET content sync using Aug 20 regular-close / extended-hours market feeds, verified-event master, discovery health, company IR/SEC checks and current industry/supply-chain research';

  d.marketMode='CAUTIOUS · SEMI RELATIVE STRENGTH';
  d.riskScore=64;
  d.recommendedCash=50;
  d.defenseStatus='DEFENSIVE BIAS · SELECTIVE LONG WATCH';
  d.readyList=[];
  d.techReadyList=[];
  d.contentSyncStatus='CURRENT · BROAD RISK-OFF / SEMI RELATIVE STRENGTH · READY 1 NONE';
  d.contentSyncReason='Aug 20 broad U.S. indices weakened while semiconductor leadership diverged positively: S&P 500 -0.87%, Nasdaq -1.00%, NDX -0.72% and Dow -1.32%, while SOX +0.53%. VIX rose to ~16.01 and the U.S. 10Y rose to ~4.696%. MRVL, MU and LITE materially outperformed the tape, so WAIS raises cash/defense but does not switch to blanket Risk-Off; selective relative-strength names remain under active review.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-20 19:35 ET';
  d.researchIntegrity.overallStatus='CURRENT · EVIDENCE-OF-WORK COMPLETE · GAPS LABELLED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'The configured Serenity adapter retried in the latest discovery cycle and remains UNAVAILABLE because no current machine-readable feed is configured. This is missing specialist evidence, not “no update”.'},
    {layer:'Company IR',status:'CHECKED',evidence:'Fabrinet official IR now provides Q4/FY2026 results and Q1 FY2027 guidance; Zymeworks IR verifies the Aug 25 zanidatamab PDUFA target action date; NVIDIA and Marvell IR reconfirm Aug 26 and Aug 27 earnings events. ERock, Generac and Powell official materials were also cross-checked for backlog/capacity claims used in Early Radar.'},
    {layer:'SEC / regulatory',status:'CHECKED + AUTOMATION DATA GAP',evidence:'Direct SEC_PRIMARY automation in the GitHub runner still reports HTTP 403, but independent SEC/IR filing paths were checked successfully. Current primary evidence includes Powell SEC filings confirming backlog/order acceleration and ERock 10-Q/8-K material confirming ~$1.7B contracted backlog and liquidity. Automation remains a DATA GAP; regulatory evidence itself was independently cross-checked.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED',evidence:'The previous Fabrinet post-event gap is resolved: official Aug 17 results show Q4 revenue $1.316B (+45% YoY), FY2026 revenue $4.64B (+36%), and Q1 FY2027 revenue guidance of $1.375B-$1.425B with non-GAAP EPS guidance $4.10-$4.25. NVDA Aug 26 and MRVL Aug 27 remain hard event gates.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce was rechecked. AI-server shipment growth and hyperscaler capex remain strong, while CPO/NPO commercialization is advancing. The long-run demand signal remains constructive, but industry evidence does not justify indiscriminate stock promotion.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'TrendForce continues to flag optical-engine yield, advanced packaging, testing, silicon-photonics precision and InP/CW-laser supply as real scaling constraints. Aug 20 tape also showed chain divergence: MRVL/MU/LITE strengthened while TSEM/GFS remained weak, confirming that sponsorship and execution must be ranked stock by stock.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'Latest discovery ingestion reports ALMU and AMBQ official sources LIVE with contentChanged=false. GNRC remains PRE-READY EARLY after primary backlog/guidance validation. FN is promoted from DISCOVERY SIGNAL to SMART-MONEY BUILD because the official post-earnings evidence gap is now resolved; price/valuation confirmation is still required before any READY promotion.'},
    {layer:'Route Intelligence',status:'CHECKED',evidence:'Latest Related Route refresh completed with no failed route symbols. Stock, bullish leveraged, bearish/inverse and income routes remain independent READY decisions; no product is called Best without sufficient activity/liquidity/tracking or income/NAV/ROC/total-return evidence.'}
  ];

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 19:35 ET closing sync';
  d.opportunityPipeline.actionNow='DEFEND BROAD TAPE · FOLLOW SEMI RELATIVE STRENGTH · NO CHASE';
  d.opportunityPipeline.ready1=[];
  d.opportunityPipeline.techReady=[];
  d.opportunityPipeline.candidatePlus=[
    {ticker:'MRVL',status:'CANDIDATE+ · RECOVERY LEADER / EVENT GATE',entry:'No chase after a second strong recovery session; wait for controlled retest/hold',target:'Deferred until setup confirms',trigger:'Hold above ~$237-240 after retest with constructive SOX breadth; earnings-risk sizing required',invalidation:'Lose the recovery structure / fall back through low-$230s on weak breadth',reason:'MRVL regular close ~$251.01, +~5.79% and above its 50D trend after the prior-day rebound. Relative strength is real, but Aug 27 earnings and extreme volatility block READY 1.'},
    {ticker:'MU',status:'CANDIDATE+ · RELATIVE-STRENGTH / TREND RECLAIM',entry:'No chase after +~4%; prefer controlled hold/retest above trend',target:'Deferred until trigger confirms',trigger:'Hold above 50D (~$963) and preserve strength versus SOX/Nasdaq',invalidation:'Lose 50D/20D support with renewed high-volume selling',reason:'MU regular close ~$974.33, +~3.97%, above both 20D (~$894) and 50D (~$963) while Nasdaq fell ~1%. Relative strength improves enough for Candidate+, but realized volatility remains very high.'},
    {ticker:'LITE',status:'CANDIDATE+ · OPTICAL RECOVERY LEADER',entry:'No chase after +~6%; wait for support/retest',target:'Deferred until trigger confirms',trigger:'Hold above the ~$810-815 20D/50D trend zone and form a higher low',invalidation:'Lose reclaimed trend with renewed optical-chain selling',reason:'LITE regular close ~$879.28, +~6.24%, decisively above 20D/50D after the prior washout. Strong recovery evidence, but volatility and supply-chain execution risk still block READY 1.'},
    {ticker:'NVDA',status:'CANDIDATE+ · EVENT / SUPPORT WATCH',entry:'No pre-earnings chase',target:'Deferred through event gate',trigger:'Hold ~$212-217 / 20D zone and improve with SOX breadth',invalidation:'Break below low-$210s with worsening breadth or new event risk',reason:'NVDA regular close ~$216.85, roughly flat while broad indices fell and remains above 20D/50D. Aug 26 earnings is still the dominant event gate.'}
  ];
  d.opportunityPipeline.candidate=[
    {ticker:'GOOGL',status:'CANDIDATE · TREND RESET',trigger:'Reclaim ~$347-352 trend zone with Nasdaq stabilization',reason:'GOOGL regular close ~$340.67, down ~1.17% and below both 20D and 50D; prior relative-strength Candidate+ status is downgraded until trend is reclaimed.'},
    {ticker:'GFS',status:'CANDIDATE · RESET',trigger:'Reclaim ~$50.5-52 after a stable normal session',reason:'GFS regular close ~$47.33, down ~2.57% and below 20D/50D. Previous confirmation remains invalid.'},
    {ticker:'AVGO',status:'CANDIDATE · RISK RESET',trigger:'Reclaim ~$380 then the 20D trend with sector stabilization',reason:'AVGO regular close ~$364.03, modestly positive but still materially below 20D/50D.'},
    {ticker:'TSEM',status:'CANDIDATE · WASHOUT REVIEW',trigger:'Reclaim ~$234-244 with volatility contraction',reason:'TSEM regular close ~$223.78, down ~1.18% and below both 20D and 50D averages.'},
    {ticker:'AXTI',status:'CANDIDATE · STABILIZATION / HIGH VOL',trigger:'Hold above 20D/50D and form a controlled higher low',reason:'AXTI regular close ~$73.12, roughly flat and above 20D/50D, but realized volatility remains extreme after the recent washout.'},
    {ticker:'COHR',status:'CANDIDATE · STABILIZATION WATCH',trigger:'Reclaim ~$304 20D trend with optical breadth',reason:'COHR regular close ~$290.03, slightly positive but still below 20D/50D.'},
    {ticker:'RKLB',status:'CANDIDATE · POST-EARNINGS / ROUTE WATCH',trigger:'Normal-session stabilization and recovery confirmation',reason:'Keep stock, bullish leveraged and bearish route decisions independent.'}
  ];
  d.opportunityPipeline.closestToReady=['MRVL','MU','LITE','NVDA','GNRC'];
  d.opportunityPipeline.washoutRecoveryWatch=['MRVL','MU','LITE','AXTI','COHR','GFS','TSEM'];
  d.opportunityPipeline.statusChanges=[
    'Broad tape weakened on Aug 20, so risk score rises to 64 and cash to 50%; however SOX closed positive, preventing a blanket full-defense call.',
    'MRVL remains the leading recovery name and stays PRE-READY EARLY / Candidate+; no chase ahead of Aug 27 earnings.',
    'MU upgrades to Candidate+ after reclaiming/holding above 50D while Nasdaq fell; high volatility still blocks READY.',
    'LITE upgrades to Candidate+ after a strong recovery above 20D/50D; no chase after the rebound.',
    'GOOGL downgrades from Candidate+ to Candidate because price closed below both 20D and 50D.',
    'FN upgrades from DISCOVERY SIGNAL to SMART-MONEY BUILD because official Q4/FY2026 results and forward guidance are now retrieved; live price/valuation remains a gating DATA GAP.',
    'READY 1 = NONE and TECH READY = NONE.'
  ];

  d.earlyRadar=d.earlyRadar||{};
  d.earlyRadar.asOf='2026-08-20 19:35 ET';
  d.earlyRadar.discoverySignal=(d.earlyRadar.discoverySignal||[]).filter(x=>x!=='FN');
  d.earlyRadar.smartMoneyBuild=Array.from(new Set([...(d.earlyRadar.smartMoneyBuild||[]),'FN']));
  d.opportunityPipeline.discoverySignal=(d.opportunityPipeline.discoverySignal||[]).filter(x=>x!=='FN');
  d.opportunityPipeline.smartMoneyBuild=Array.from(new Set([...(d.opportunityPipeline.smartMoneyBuild||[]),'FN']));

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const patch=(ticker,fields)=>{const s=stocks.find(x=>String(x.ticker||'').toUpperCase()===ticker); if(s) Object.assign(s,fields);};
  patch('MRVL',{stance:'PRE-READY EARLY · RECOVERY LEADER / EVENT GATE',rating:'Pre-Ready Early',researchStage:'PRE-READY EARLY',currentAction:'WAIT · DO NOT CHASE',executionStage:'PRE-READY EARLY',executionAction:'WAIT FOR CONTROLLED RETEST / HOLD',entry:'Controlled retest/hold above ~$237-240 only after confirmation',target:'DEFERRED UNTIL TRIGGER CONFIRMS',confirmationTrigger:'Hold above ~$237-240 after retest with constructive SOX breadth; respect Aug 27 earnings',invalidation:'Lose recovery structure / low-$230s with weak breadth',earnings:'2026-08-27 · AFTER CLOSE · 16:45 ET call',note:'Aug 20 regular close ~$251.01, +~5.79%. Strong recovery leadership persists, but earnings event + extreme volatility keep READY closed.'});
  patch('MU',{stance:'CANDIDATE+ · RELATIVE-STRENGTH / TREND RECLAIM',rating:'Candidate+',currentAction:'WAIT · NO CHASE',executionStage:'CANDIDATE+ · RELATIVE STRENGTH',entry:'Controlled retest/hold above 50D only',target:'DEFERRED UNTIL TRIGGER CONFIRMS',confirmationTrigger:'Hold 50D (~$963) and maintain strength versus SOX/Nasdaq',invalidation:'Lose 50D/20D with renewed high-volume selling',note:'Aug 20 regular close ~$974.33, +~3.97%, above both 20D and 50D while Nasdaq fell ~1%. Candidate+ improves; high realized volatility remains a hard risk gate.'});
  patch('LITE',{stance:'CANDIDATE+ · OPTICAL RECOVERY LEADER',rating:'Candidate+',currentAction:'WAIT · NO CHASE',executionStage:'CANDIDATE+ · RECOVERY',entry:'Wait for support/retest after rebound',target:'DEFERRED UNTIL TRIGGER CONFIRMS',confirmationTrigger:'Hold above ~$810-815 trend zone and form a higher low',invalidation:'Lose reclaimed trend with renewed optical-chain selling',note:'Aug 20 regular close ~$879.28, +~6.24%, back above 20D/50D. Strong recovery evidence but volatility and supply-chain execution risk keep READY closed.'});
  patch('NVDA',{stance:'CANDIDATE+ · EVENT / SUPPORT WATCH',rating:'Candidate+',currentAction:'WAIT · EARNINGS GATE',entry:'No pre-earnings chase',confirmationTrigger:'Hold ~$212-217 / 20D zone with improving SOX breadth',invalidation:'Break low-$210s with worsening breadth or event risk',earnings:'2026-08-26 · AFTER CLOSE · 17:00 ET',note:'Aug 20 regular close ~$216.85, roughly flat and above 20D/50D. Earnings remains the hard event gate.'});
  patch('GOOGL',{stance:'CANDIDATE · TREND RESET',rating:'Candidate',currentAction:'WAIT FOR TREND RECLAIM',entry:'None until trend reclaim',confirmationTrigger:'Reclaim ~$347-352 with Nasdaq stabilization',invalidation:'Renewed support loss / broad-market weakness',note:'Aug 20 regular close ~$340.67, below both 20D and 50D; downgrade from Candidate+ until trend is reclaimed.'});
  patch('GFS',{stance:'CANDIDATE · RESET',rating:'Candidate',currentAction:'WAIT · RESET TRIGGER',entry:'None until reclaim confirmation',confirmationTrigger:'Reclaim ~$50.5-52 in a normal session',invalidation:'Remain below 20D / renew breakdown',note:'Aug 20 regular close ~$47.33, below 20D/50D. Previous confirmation remains invalid.'});
  patch('AVGO',{stance:'CANDIDATE · RISK RESET',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$380 then 20D trend with sector stabilization',note:'Aug 20 regular close ~$364.03; modest positive relative move but still materially below 20D/50D.'});
  patch('TSEM',{stance:'CANDIDATE · WASHOUT REVIEW',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$234-244 with volatility contraction',note:'Aug 20 regular close ~$223.78, below both 20D/50D.'});
  patch('AXTI',{stance:'CANDIDATE · STABILIZATION / HIGH VOL',rating:'Candidate',currentAction:'WAIT · REQUIRE HIGHER LOW',confirmationTrigger:'Hold above 20D/50D and form controlled higher low',note:'Aug 20 regular close ~$73.12, near flat and above 20D/50D, but recent volatility remains extreme.'});
  patch('COHR',{stance:'CANDIDATE · STABILIZATION WATCH',rating:'Candidate',currentAction:'WAIT',confirmationTrigger:'Reclaim ~$304 20D trend with optical breadth',note:'Aug 20 regular close ~$290.03, slightly positive but still below 20D/50D.'});
  patch('FN',{stance:'SMART-MONEY BUILD · FUNDAMENTAL CONFIRMED / PRICE DATA GAP',rating:'Research',researchStage:'SMART-MONEY BUILD',universeStatus:'IN',currentAction:'VALIDATE PRICE / VALUATION · NO BLIND BUY',executionStage:'SMART-MONEY BUILD',executionAction:'VERIFY LIVE PRICE + VALUATION + SUPPORT',note:'Official Aug 17 results resolve the prior post-event evidence gap: Q4 revenue $1.316B (+45% YoY), FY2026 revenue $4.64B (+36%), Q1 FY2027 revenue guide $1.375B-$1.425B and non-GAAP EPS guide $4.10-$4.25. Promotion is research-stage only; current live price/valuation is not yet integrated into the WAIS quote feed.'});

  d.marketSummary={
    trend:'Aug 20 was broad risk-off but not semiconductor risk-off: S&P 500 -0.87%, Nasdaq -1.00%, NDX -0.72% and Dow -1.32%, while SOX +0.53%.',
    breadth:'Semiconductor breadth improved selectively. MRVL, MU and LITE materially outperformed; NVDA held near flat, while GFS/TSEM remained weak. Leadership is concentrated, not broad.',
    volatility:'VIX rose to ~16.01 (+~7.5%), so position sizing remains conservative even where relative strength improves.',
    liquidity:'U.S. 10Y rose to ~4.696% from ~4.653%. Higher yields plus weaker broad indices support a higher cash buffer, while positive SOX prevents a full blanket-defense classification.'
  };
  d.keyRisks=[
    'Aug 25: ZYME zanidatamab first-line HER2+ GEA U.S. PDUFA target action date; exact action time is DATA GAP.',
    'Aug 25 10:00 ET: New Home Sales.',
    'Aug 26 08:30 ET: GDP second estimate + Personal Income and Outlays + Advance Durable Goods; 17:00 ET: NVDA Q2 FY2027 results/call.',
    'Aug 27 08:30 ET: Advance Economic Indicators; 16:45 ET: MRVL Q2 FY2027 earnings call.',
    'Leveraged/inverse ETFs reset daily. Do not chase long or inverse products after large directional moves without current activity, liquidity, tracking, trigger and invalidation evidence.',
    'Serenity specialist feed remains a DATA GAP; missing data must not be interpreted as absence of research updates.'
  ];

  d.actionPlan=[
    'ACTION NOW：CAUTIOUS · SEMI RELATIVE STRENGTH。READY 1 = NONE；TECH READY = NONE；Cash 50%。',
    'PRE-READY EARLY：MRVL, ZYME, EROC, DIOD, MCHP, GLW, GNRC。MRVL最接近，但Aug 27 earnings前不可追。',
    'CANDIDATE+：MRVL, MU, LITE, NVDA。MU/LITE因Aug 20 relative-strength + trend reclaim改善；仍需retest/hold。',
    'SMART-MONEY BUILD：ADI, POWL, FN。FN官方業績/forward guide已取回，但live price/valuation仍要驗證。',
    'DISCOVERY SIGNAL：KEYS。ALMU/AMBQ保持VALIDATING；SERENITY = DATA GAP。',
    'GOOGL降回Candidate直至重上20D/50D；GFS/TSEM仍未修復；不平均溝貨。',
    'Route / Income：Stock、Bullish Leveraged、Bearish/Inverse、Income四套READY gate保持獨立；冇足夠證據不叫Best。'
  ];

  const syncVisibleState=()=>{
    const set=(id,text)=>{const el=document.getElementById(id); if(el) el.textContent=text;};
    set('marketMode',d.marketMode);
    set('actionPill',d.marketMode);
    set('defenseStatus',d.defenseStatus);
    set('riskLabel','Cautious / Selective Semi Strength');
    set('riskResultMode','Cautious / Selective Semi Strength');
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(syncVisibleState,0));
  else setTimeout(syncVisibleState,0);
})();
