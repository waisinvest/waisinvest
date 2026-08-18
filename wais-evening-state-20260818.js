// WAIS 19:15 ET Tuesday content-sync overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-18';
  d.lastStrategyUpdated='2026-08-18T19:15:00-04:00';
  d.dataAsOf='2026-08-18 19:15 ET content sync using Aug 18 regular-close / extended-hours market feeds, current discovery health, official event-source checks and primary-source research where retrievable';
  d.marketMode='DEFENSIVE'; d.riskScore=66; d.recommendedCash=50;
  d.defenseStatus='DEFENSIVE'; d.readyList=[]; d.techReadyList=[];
  d.contentSyncStatus='CURRENT · DEFENSIVE RESET · VERIFIED MASTER RECHECKED · DATA GAPS EXPLICIT';
  d.contentSyncReason='Aug 18 produced a broad risk-off impulse inside the WAIS AI/semiconductor universe: S&P 500 -0.69%, Nasdaq -1.33%, NDX -1.68% and SOX -4.98%, while VIX rose to about 15.84. Falling 10Y yields did not prevent the semiconductor washout, so WAIS raises cash and shifts from chase prevention to washout-recovery validation. READY 1 remains NONE until stabilization is visible.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-18 19:15 ET';
  d.researchIntegrity.overallStatus='CURRENT · CHECKED LAYERS EXPLICIT · PRIMARY-SOURCE GAPS PRESERVED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'The scheduled discovery cycle retried the configured Serenity adapter; it remains UNAVAILABLE because no current machine-readable public feed is configured. This is recorded as missing specialist evidence, not as “no update”.'},
    {layer:'Company IR',status:'CHECKED + DATA GAP',evidence:'Fabrinet IR was rechecked after the Aug 17 Q4/FY2026 event. The official IR site still exposed the scheduled conference-call event in the retrievable public view, but the post-event results package was not independently ingestible in this cycle. NVIDIA IR independently reconfirmed Aug 26 Q2 FY2027 results at 17:00 ET.'},
    {layer:'SEC / regulatory',status:'CHECKED + DATA GAP',evidence:'The GitHub SEC_PRIMARY adapter again reports UNAVAILABLE because direct submissions access returns HTTP 403. A public SEC search path was also checked, but no fresh Fabrinet post-event filing could be safely promoted from the indexed result set; freshness/indexing uncertainty remains a DATA GAP.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED + DATA GAP',evidence:'FN post-event results/guidance/transcript remain a primary-evidence gap this cycle. NVDA Aug 26 earnings timing is independently verified and remains a high-priority event gate.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce optical-interconnect/CPO research was rechecked. It continues to identify AI data movement as a structural demand driver while emphasizing testing, yield, packaging, laser/material concentration and commercialization bottlenecks. Industry research is supporting evidence only, never an automatic promotion.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'The structural AI-memory/networking/optics thesis was cross-checked against the Aug 18 tape. MU, MRVL, COHR, LITE, TSEM and AXTI suffered very large one-day declines, so WAIS treats the move as a liquidity/positioning stress signal that requires stabilization before any recovery entry rather than as evidence that the long-term thesis has automatically failed.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'The latest discovery cycle shows ALMU and AMBQ official company sources LIVE with contentChanged=false; both remain VALIDATING. SEC_PRIMARY and SERENITY remain unavailable, while failure isolation preserved the live adapters.'},
    {layer:'Route Intelligence',status:'CHECKED',evidence:'Bearish/inverse routes remain independent tactical tracks. NVDA (NVD/NVDD), MU (MUD/MUZ), AVGO (AVS), GOOGL (GGLS), TSM (TSMZ/STSM) and RKLB (RKLZ) are tracked separately from stock and bullish leveraged decisions. After a large down day, WAIS does not chase an inverse ETF simply because the underlying already fell; liquidity, tracking, trigger and invalidation still apply.'}
  ];

  if(d.opportunityPipeline){
    d.opportunityPipeline.asOf='2026-08-18 19:15 ET';
    d.opportunityPipeline.actionNow='DEFEND · WATCH FOR STABILIZATION';
    d.opportunityPipeline.ready1=[];
    d.opportunityPipeline.techReady=[];
    d.opportunityPipeline.candidatePlus=[
      {ticker:'GOOGL',status:'CANDIDATE+ · RELATIVE-STRENGTH WATCH',trigger:'Hold/reclaim the $340–344 area with improving Nasdaq breadth; no falling-gap buy',invalidation:'Clean loss of support with worsening broad-market breadth',reason:'GOOGL was roughly flat while the Nasdaq and semiconductor complex sold off sharply, preserving relative strength but not creating an immediate buy signal.'},
      {ticker:'NVDA',status:'CANDIDATE+ · EVENT / WASHOUT WATCH',trigger:'Stabilize above the low-$210s / 20D trend area with breadth improvement and no pre-earnings deterioration',invalidation:'Breakdown with worsening SOX breadth or new thesis/event risk',reason:'NVDA fell about 2.6% but remains above its 20D trend; Aug 26 earnings keeps position sizing and READY approval gated.'}
    ];
    d.opportunityPipeline.candidate=[
      {ticker:'GFS',status:'CANDIDATE · RESET',trigger:'Reclaim $51–52 after at least one stable normal session',reason:'The prior $53.5–54 confirmation attempt failed and the stock closed near $49.90, so the old READY-watch trigger is invalidated and must reset.'},
      {ticker:'AVGO',status:'CANDIDATE · RISK RESET',trigger:'Reclaim/hold the high-$380s to ~$400 area with sector stabilization',reason:'AI ASIC/networking thesis remains intact, but the stock fell below its 20D trend and broad semis were weak.'},
      {ticker:'AXTI',status:'CANDIDATE · WASHOUT HIGH VOL',trigger:'Volatility contraction + support formation + no thesis deterioration',reason:'A roughly 16% one-day decline is a washout-recovery research trigger, not a dip-buy instruction.'},
      {ticker:'TSEM',status:'CANDIDATE · WASHOUT REVIEW',trigger:'Stabilize around the current 20D zone and recover with volume confirmation',reason:'The stock fell more than 10% and sits near its 20D trend; require evidence of support before any upgrade.'},
      {ticker:'RKLB',status:'CANDIDATE · POST-EARNINGS',trigger:'Normal-session stabilization and recovery confirmation',reason:'Keep post-earnings execution risk separate from market-wide risk reset.'}
    ];
    d.opportunityPipeline.discovery=['POET','AEHR','FORM','MXL','NVTS','OSS','AIRO','ALMU','AMBQ'];
    d.opportunityPipeline.noSetup=['PLTR'];
    d.opportunityPipeline.closestToReady=['GOOGL','NVDA'];
    d.opportunityPipeline.washoutRecoveryWatch=['GFS','MU','MRVL','COHR','LITE','AXTI','TSEM'];
    d.opportunityPipeline.statusChanges=[
      'Market regime moved from CAUTIOUS to DEFENSIVE after SOX fell about 5%; cash recommendation rises to 50%.',
      'GFS is downgraded from Candidate+ / Tech Transition to Candidate · Reset after the prior confirmation zone failed and price closed near $49.90.',
      'GOOGL retains Candidate+ because it showed strong relative resilience versus the Nasdaq/SOX selloff, but READY 1 remains blocked until breadth and support confirm.',
      'NVDA retains Candidate+ / Event Watch; Aug 26 earnings and today’s semiconductor washout require smaller-risk posture and confirmation.',
      'MU, MRVL, COHR, LITE, AXTI and TSEM enter a Washout-Recovery Watch lane. Sharp losses are opportunities to study fast recovery setups, not permission to average down.',
      'READY 1 and TECH READY remain NONE.'
    ];
  }

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const patch=(ticker,fields)=>{const s=stocks.find(x=>String(x.ticker||'').toUpperCase()===ticker); if(s) Object.assign(s,fields);};
  patch('GFS',{stance:'CANDIDATE · RESET',rating:'Candidate',currentAction:'WAIT · RESET TRIGGER',executionStage:'CANDIDATE · RESET',executionAction:'NO BUY · REQUIRE RECLAIM',confirmationTrigger:'Reclaim and hold ~$51–52 in a normal session after sector stabilization',invalidation:'Do not reuse the failed $53.5–54 trigger; thesis and technical setup must be revalidated',note:'Aug 18 regular close about $49.90 after ~7% decline. Prior Candidate+ confirmation failed; reset before any new entry.'});
  patch('GOOGL',{stance:'CANDIDATE+ · RELATIVE-STRENGTH WATCH',rating:'Candidate+',currentAction:'WAIT FOR BREADTH',executionStage:'CANDIDATE+ · RELATIVE STRENGTH',confirmationTrigger:'Hold/reclaim $340–344 with improving Nasdaq breadth',note:'Aug 18 regular close about $344.20, roughly flat while the Nasdaq and SOX sold off. Relative strength is constructive, but broad risk remains defensive.'});
  patch('NVDA',{stance:'CANDIDATE+ · EVENT / WASHOUT WATCH',rating:'Candidate+',currentAction:'WAIT · EARNINGS GATE',executionStage:'CANDIDATE+ · EVENT WATCH',confirmationTrigger:'Stabilize above the low-$210s / 20D trend area with improving SOX breadth',earnings:'2026-08-26 · AFTER CLOSE · 17:00 ET',note:'Aug 18 regular close about $219.74 after ~2.6% decline. Still above the 20D trend, but Aug 26 earnings and sector washout keep READY 1 closed.'});
  patch('AVGO',{stance:'CANDIDATE · RISK RESET',rating:'Candidate',currentAction:'WAIT',note:'Aug 18 regular close about $380 after ~3.3% decline; price is below the 20D trend. Keep thesis, reset entry timing.'});
  patch('AXTI',{stance:'CANDIDATE · WASHOUT HIGH VOL',rating:'Candidate',currentAction:'WAIT · NO CATCHING KNIFE',note:'Aug 18 regular close about $82.31 after ~16.4% decline. Put on washout-recovery watch only; require volatility contraction and support.'});
  patch('TSEM',{stance:'CANDIDATE · WASHOUT REVIEW',rating:'Candidate',currentAction:'WAIT',note:'Aug 18 regular close about $240.55 after >10% decline, near the 20D trend. Require support/reclaim confirmation.'});
  patch('MU',{currentAction:'WAIT · WASHOUT REVIEW',note:'Aug 18 regular close about $940.76 after ~7.7% decline. Large move creates a recovery-research setup, not an automatic buy.'});
  patch('MRVL',{currentAction:'WAIT · WASHOUT REVIEW',note:'Aug 18 regular close about $216 after ~8.7% decline. Require stabilization after the high-beta reversal.'});
  patch('COHR',{currentAction:'WAIT · WASHOUT REVIEW',note:'Aug 18 regular close about $306.43 after ~13.7% decline. Do not average down into uncontrolled volatility.'});
  patch('LITE',{currentAction:'WAIT · WASHOUT REVIEW',note:'Aug 18 regular close about $873.31 after ~10.6% decline. Structural optics thesis does not override short-term risk control.'});

  d.marketSummary={
    trend:'Aug 18 was a clear de-risking day for growth/AI: S&P 500 -0.69%, Nasdaq -1.33%, Nasdaq 100 -1.68%, and SOX -4.98%. This is no longer merely selective weakness; semiconductor breadth broke sharply.',
    breadth:'The most important signal is the breadth reversal inside semiconductors. MU, MRVL, COHR, LITE, AXTI and TSEM all suffered large declines; GOOGL showed notable relative resilience.',
    volatility:'VIX rose to about 15.84 (+4.3%). Absolute volatility is not extreme, but the combination of rising VIX and a ~5% SOX drop raises short-term execution risk.',
    liquidity:'U.S. 10Y eased to about 4.706%, yet high-beta AI equities still sold off. Lower yields were therefore not enough to stabilize risk appetite; tomorrow’s FOMC minutes remain an event gate.'
  };
  d.keyRisks=[
    'Aug 19 14:00 ET: FOMC Minutes. Do not promote a washout rebound to READY 1 immediately before the release without enough normal-session evidence.',
    'Aug 20 10:00 ET: Advance Services Report remains in the verified rolling calendar.',
    'Aug 26 08:30 ET: GDP second estimate + Personal Income and Outlays + Advance Durable Goods; 17:00 ET: NVDA earnings.',
    'FN post-event official results/guidance/transcript remain a DATA GAP in the retrievable primary-source cycle; do not infer a status change from unverified summaries.',
    'After a ~5% SOX decline, both long and inverse leveraged ETFs can gap violently. Do not chase either direction after the move; wait for setup-specific trigger, liquidity and invalidation.'
  ];

  d.actionPlan=[
    'ACTION NOW：DEFEND + WATCH。READY 1 = NONE；TECH READY = NONE；Cash提高至50%。',
    '8/19 14:00 ET先過FOMC Minutes event gate；之前只做washout ranking、support/reclaim觀察及route liquidity/tracking檢查。',
    'GOOGL：維持Candidate+，因今日相對強；但要等$340–344附近承接及NASDAQ breadth改善先考慮第一注。',
    'NVDA：維持Candidate+ / Event Watch；守低$210s至20D趨勢區並改善SOX breadth先可升級，8/26業績仍限制倉位。',
    'GFS：舊$53.5–54 trigger已失效，降回Candidate · Reset；先重上$51–52並守穩先再談READY。',
    'MU / MRVL / COHR / LITE / AXTI / TSEM：全部進入Washout-Recovery Watch。研究邊隻最快穩定、最快重上支持，但絕不因跌得多就自動買。',
    'Income ETFs：Income READY 1仍為NONE；高息率照舊要過NAV、ROC、total return、liquidity及entry gate。',
    'Route Intelligence：Stock / Bullish Leveraged / Bearish-Inverse / Income四條線完全獨立。今日已大跌後亦唔追inverse ETF；先睇underlying setup、volume、tracking同spread。'
  ];

  d.routeIntegrity={
    asOf:'2026-08-18 19:15 ET',
    rule:'Stock READY ≠ Bullish Leveraged READY ≠ Bearish READY ≠ Income READY. Product existence or a one-day directional move is not approval; Best requires sufficient current activity/liquidity/tracking or income/NAV/ROC/total-return evidence.',
    verifiedBearishExamples:'NVDA: NVD/NVDD · MU: MUD/MUZ · AVGO: AVS · GOOGL: GGLS · TSM: TSMZ/STSM · RKLB: RKLZ',
    gaps:'Any route without independently verified live identity or sufficient current evidence remains NO VERIFIED ROUTE / VALIDATING / DATA GAP. Route identity never overrides decision colour.'
  };

  d.decisionJourney={
    date:'2026-08-18',
    zh:'今日由「防追高」轉成「防接刀」。SOX急跌約5%後，最有價值嘅工作唔係估最低位，而係排名邊啲高質股票最先止跌、最先重上支持、最先恢復breadth。真正的機會通常出現在洗倉後的確認，而唔係第一支大陰燭。',
    en:'Today the task shifts from avoiding chases to avoiding falling knives. After a roughly 5% SOX washout, the edge is to rank which quality names stabilize first, reclaim support first and regain breadth—not to guess the exact bottom.'
  };

  window.WAIS_MARKET_DATA=d;
})();
