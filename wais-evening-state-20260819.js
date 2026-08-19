// WAIS 19:46 ET Wednesday content-sync overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-19';
  d.lastStrategyUpdated='2026-08-19T19:46:00-04:00';
  d.dataAsOf='2026-08-19 19:46 ET content sync using Aug 19 regular-close / extended-hours market feeds, verified event master, current discovery health, official IR/SEC checks and specialist industry research where retrievable';
  d.marketMode='DEFENSIVE'; d.riskScore=60; d.recommendedCash=45;
  d.defenseStatus='DEFENSIVE · SELECTIVE REBOUND'; d.readyList=[]; d.techReadyList=[];
  d.contentSyncStatus='CURRENT · POST-FOMC · SELECTIVE REBOUND · SEMI BREADTH STILL WEAK · DATA GAPS EXPLICIT';
  d.contentSyncReason='Aug 19 broad U.S. indices stabilized after the Aug 18 washout: S&P 500 +0.21% and Nasdaq +0.16%, while VIX fell to ~14.89 and the 10Y eased to ~4.653%. However NDX slipped ~0.22% and SOX fell another ~2.12%. MRVL rebounded strongly while COHR/LITE/AXTI/TSEM remained weak. WAIS therefore reduces—but does not remove—defense: cash moves to 45%, READY 1 remains NONE, and recovery ranking focuses on names showing actual relative strength rather than simply being oversold.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-19 19:46 ET';
  d.researchIntegrity.overallStatus='CURRENT · EVIDENCE-OF-WORK COMPLETE · GAPS LABELLED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'The configured Serenity adapter retried at 23:02 UTC and remains UNAVAILABLE because no current machine-readable public feed is configured. This is a missing specialist-evidence layer, not “no update”.'},
    {layer:'Company IR',status:'CHECKED',evidence:'NVIDIA IR reconfirms Q2 FY2027 results on Aug 26 with the call at 17:00 ET. Marvell IR reconfirms Q2 FY2027 results/call on Aug 27 at 16:45 ET and current AI memory/interconnect product activity. ALMU and AMBQ official discovery sources were live in the latest ingestion cycle with no content change.'},
    {layer:'SEC / regulatory',status:'CHECKED + DATA GAP',evidence:'Direct SEC_PRIMARY automation remains UNAVAILABLE because the GitHub runner receives HTTP 403, but SEC public indexed filings were independently checked. Current accessible primary filings include NVIDIA May 20 Q1 FY2027 8-K/10-Q, Marvell May 28 Q1 FY2027 10-Q and Ambiq 2026 quarterly filing. No post-event filing is inferred where current primary evidence was not retrieved.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED + DATA GAP',evidence:'NVDA Aug 26 and MRVL Aug 27 earnings timing are verified from company IR and are explicit event gates. Fabrinet post-Aug-17 results/guidance/transcript remain a retrievable-primary-evidence DATA GAP in this cycle; no status change is inferred from summaries.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce research was rechecked: 2026 marks CPO commercialization/volume ramp, but optical-engine yield, advanced packaging capacity and testing remain bottlenecks. This supports long-run AI interconnect demand while reinforcing execution/yield risk.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'Today’s tape diverged sharply inside the same AI infrastructure chain: MRVL rebounded ~9.9% regular session while COHR, LITE, AXTI and TSEM fell another ~5–11%. WAIS treats that divergence as evidence that stock-specific sponsorship and recovery speed now matter more than the broad thematic label.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'Latest discovery ingestion at 23:02 UTC reports ALMU and AMBQ official sources LIVE with contentChanged=false; both remain VALIDATING. SEC_PRIMARY and SERENITY are unavailable but failure isolation preserved working sources.'},
    {layer:'Route Intelligence',status:'CHECKED',evidence:'Route identity and directional decision remain separate. NVDA NVD/NVDD, MU MUD/MUZ, AVGO AVS, GOOGL GGLS, TSM TSMZ/STSM and RKLB RKLZ remain bearish/inverse tracks; bullish leveraged and income routes retain independent liquidity/tracking/NAV/ROC/total-return gates. No route is promoted to Best solely because the underlying moved.'}
  ];

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-19 19:46 ET';
  d.opportunityPipeline.actionNow='DEFEND · RANK RECOVERY LEADERS · NO CHASE';
  d.opportunityPipeline.ready1=[];
  d.opportunityPipeline.techReady=[];
  d.opportunityPipeline.candidatePlus=[
    {ticker:'MRVL',status:'CANDIDATE+ · RECOVERY LEADER / EVENT GATE',entry:'No chase after the rebound; wait for a controlled retest or hold above the low-$230s',target:'Tactical target deferred until setup confirms',trigger:'Hold ~$230–237 with improving SOX breadth or a constructive retest; earnings-risk sizing required',invalidation:'Lose the rebound structure / fall back through the low-$220s with weak breadth',reason:'MRVL regular close ~$237.27, up ~9.85% after the prior washout and back above its 50D trend. It is the clearest recovery leader today, but Aug 27 earnings and very high realized volatility block READY 1.'},
    {ticker:'GOOGL',status:'CANDIDATE+ · RELATIVE-STRENGTH WATCH',entry:'Only after support confirmation; no blind buy',target:'Deferred until trigger confirms',trigger:'Hold/reclaim ~$344–346 and improve above 20D trend with Nasdaq breadth',invalidation:'Clean support loss with renewed broad-market weakness',reason:'GOOGL closed ~$344.72, essentially flat/up while SOX fell >2%; relative resilience persists, but price remains around/below the 20D trend and READY remains closed.'},
    {ticker:'NVDA',status:'CANDIDATE+ · EVENT / SUPPORT WATCH',entry:'No pre-earnings chase',target:'Deferred through event gate',trigger:'Hold ~$212–218 / 20D trend zone and improve with SOX breadth',invalidation:'Break below the low-$210s with worsening breadth or new event risk',reason:'NVDA closed ~$217.56, down ~0.99% but still above its 20D average near $212.38. Aug 26 earnings remains the dominant event gate.'}
  ];
  d.opportunityPipeline.candidate=[
    {ticker:'MU',status:'CANDIDATE · STABILIZATION WATCH',trigger:'Hold above 20D trend and reclaim momentum with SOX breadth',reason:'MU closed ~$937.11, down only ~0.39% after the washout and remains above its 20D trend, but realized volatility is very high and 50D resistance remains overhead.'},
    {ticker:'GFS',status:'CANDIDATE · RESET',trigger:'Reclaim ~$51–52 after a stable normal session',reason:'GFS closed ~$48.58, below its 20D average. The previous confirmation zone remains invalidated.'},
    {ticker:'AVGO',status:'CANDIDATE · RISK RESET',trigger:'Reclaim the high-$370s / ~$380 then hold with sector stabilization',reason:'AVGO closed ~$362.48, down ~4.61% and materially below its 20D trend; thesis is not the same thing as an entry setup.'},
    {ticker:'TSEM',status:'CANDIDATE · WASHOUT REVIEW',trigger:'Reclaim ~$235–240 with volatility contraction',reason:'TSEM closed ~$226.46, down ~5.86% and below both 20D and 50D averages.'},
    {ticker:'AXTI',status:'CANDIDATE · HIGH-VOL RESET',trigger:'Form support and reclaim the mid/high-$70s without another volatility expansion',reason:'AXTI closed ~$73.43, down ~10.79% after an already severe prior-day washout; still researchable, not buyable by default.'},
    {ticker:'RKLB',status:'CANDIDATE · POST-EARNINGS',trigger:'Normal-session stabilization and recovery confirmation',reason:'Keep stock, bullish leveraged and bearish route decisions independent.'}
  ];
  d.opportunityPipeline.research=['POET','AEHR','FORM','MXL','NVTS','OSS','AIRO','ALMU','AMBQ'];
  d.opportunityPipeline.phaseOut=['POWL','MOD'];
  d.opportunityPipeline.noSetup=['PLTR'];
  d.opportunityPipeline.closestToReady=['MRVL','GOOGL','NVDA'];
  d.opportunityPipeline.washoutRecoveryWatch=['MRVL','MU','GFS','COHR','LITE','AXTI','TSEM'];
  d.opportunityPipeline.statusChanges=[
    'Broad-market stress eased, but SOX fell another ~2.12%; market remains DEFENSIVE with cash reduced from 50% to 45%, not back to Risk-On.',
    'MRVL becomes the leading recovery Candidate+ after a ~9.85% normal-session rebound, but Aug 27 earnings and extreme volatility block READY 1.',
    'NVDA and GOOGL remain Candidate+; both require technical confirmation and NVDA remains gated by Aug 26 earnings.',
    'MU improves from pure washout review to stabilization watch because it held near flat and above its 20D trend, but it is not READY.',
    'COHR/LITE/AXTI/TSEM continue to show weak recovery breadth; no averaging down.',
    'READY 1 = NONE and TECH READY = NONE.'
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const patch=(ticker,fields)=>{const s=stocks.find(x=>String(x.ticker||'').toUpperCase()===ticker); if(s) Object.assign(s,fields);};
  patch('MRVL',{stance:'CANDIDATE+ · RECOVERY LEADER / EVENT GATE',rating:'Candidate+',currentAction:'WAIT · DO NOT CHASE',executionStage:'CANDIDATE+ · RECOVERY',executionAction:'NO BUY UNTIL CONTROLLED RETEST / HOLD',entry:'Controlled retest/hold in low-$230s only after confirmation',target:'DEFERRED UNTIL TRIGGER CONFIRMS',confirmationTrigger:'Hold ~$230–237 with improving SOX breadth; respect Aug 27 earnings',invalidation:'Lose rebound structure / low-$220s with weak breadth',earnings:'2026-08-27 · AFTER CLOSE · 16:45 ET call',note:'Aug 19 regular close ~$237.27, +~9.85%. Strongest recovery signal in today’s washout cohort, but high volatility + earnings event keep READY closed.'});
  patch('GOOGL',{stance:'CANDIDATE+ · RELATIVE-STRENGTH WATCH',rating:'Candidate+',currentAction:'WAIT FOR TREND RECLAIM',executionStage:'CANDIDATE+ · RELATIVE STRENGTH',entry:'Only after ~$344–346 support/reclaim confirmation',target:'DEFERRED UNTIL TRIGGER CONFIRMS',confirmationTrigger:'Hold/reclaim ~$344–346 and improve above 20D trend with Nasdaq breadth',invalidation:'Support loss with worsening broad-market breadth',note:'Aug 19 regular close ~$344.72. Relative resilience remains better than semis, but price is still around/below the 20D trend.'});
  patch('NVDA',{stance:'CANDIDATE+ · EVENT / SUPPORT WATCH',rating:'Candidate+',currentAction:'WAIT · EARNINGS GATE',executionStage:'CANDIDATE+ · EVENT WATCH',entry:'No pre-earnings chase; only confirmed support setup',target:'DEFERRED THROUGH EVENT GATE',confirmationTrigger:'Hold ~$212–218 / 20D trend zone with improving SOX breadth',invalidation:'Break low-$210s with worsening breadth or new event risk',earnings:'2026-08-26 · AFTER CLOSE · 17:00 ET',note:'Aug 19 regular close ~$217.56, still above 20D ~$212.38. Earnings remains the hard event gate.'});
  patch('MU',{stance:'CANDIDATE · STABILIZATION WATCH',rating:'Candidate',currentAction:'WAIT · REQUIRE BREADTH',entry:'No automatic dip buy',confirmationTrigger:'Hold above 20D trend and reclaim momentum with SOX breadth',invalidation:'Break 20D/support with renewed high-volume selling',note:'Aug 19 regular close ~$937.11, roughly flat after the prior washout and above 20D, but volatility and 50D resistance remain significant.'});
  patch('GFS',{stance:'CANDIDATE · RESET',rating:'Candidate',currentAction:'WAIT · RESET TRIGGER',entry:'None until reclaim confirmation',confirmationTrigger:'Reclaim and hold ~$51–52 in a normal session',invalidation:'Stay below 20D / renew breakdown',note:'Aug 19 regular close ~$48.58, below 20D ~$51.43. Prior confirmation remains invalid.'});
  patch('AVGO',{stance:'CANDIDATE · RISK RESET',rating:'Candidate',currentAction:'WAIT',entry:'No buy while below broken trend',confirmationTrigger:'Reclaim high-$370s / ~$380 with sector stabilization',invalidation:'Renewed lower low / weak SOX breadth',note:'Aug 19 regular close ~$362.48, down ~4.61% and below 20D/50D trend.'});
  patch('COHR',{stance:'CANDIDATE · WASHOUT WEAK',rating:'Candidate',currentAction:'WAIT · NO AVERAGING DOWN',note:'Aug 19 regular close ~$287.47, down ~6.19% and below 20D/50D averages. Recovery confirmation absent.'});
  patch('LITE',{stance:'CANDIDATE · WASHOUT WEAK',rating:'Candidate',currentAction:'WAIT · NO AVERAGING DOWN',note:'Aug 19 regular close ~$827.60, down ~5.23%. Long-run optics thesis remains separate from short-run price sponsorship.'});
  patch('AXTI',{stance:'CANDIDATE · HIGH-VOL RESET',rating:'Candidate',currentAction:'WAIT · NO CATCHING KNIFE',note:'Aug 19 regular close ~$73.43, down ~10.79%. Require support formation and volatility contraction.'});
  patch('TSEM',{stance:'CANDIDATE · WASHOUT REVIEW',rating:'Candidate',currentAction:'WAIT',note:'Aug 19 regular close ~$226.46, down ~5.86% and below 20D/50D averages.'});
  patch('POET',{stance:'RESEARCH · FINANCIAL VALIDATION',rating:'Research',currentAction:'WATCH ONLY',note:'Optical-theme relevance remains, but financial quality/scale must improve before promotion.'});

  d.marketSummary={
    trend:'Aug 19 broad indices stabilized after the prior selloff: S&P 500 +0.21%, Nasdaq +0.16%, Dow +0.22%, but NDX -0.22% and SOX -2.12%. This is stabilization, not a clean semiconductor recovery.',
    breadth:'Breadth remains highly selective. MRVL rebounded strongly and MU stabilized, while COHR, LITE, AXTI and TSEM continued falling. Recovery leadership is therefore stock-specific.',
    volatility:'VIX eased to ~14.89 (-~6%), reducing immediate panic risk, but realized volatility in several AI/semiconductor names remains extreme.',
    liquidity:'U.S. 10Y eased to ~4.653%. Lower yields and lower VIX helped broad indices stabilize, but did not stop another SOX decline; sector sponsorship is still the key risk signal.'
  };
  d.keyRisks=[
    'Aug 20 10:00 ET: Advance Services Report is the next verified macro event.',
    'Aug 25 10:00 ET: New Home Sales.',
    'Aug 26 08:30 ET: GDP second estimate + Personal Income and Outlays + Advance Durable Goods; 17:00 ET: NVDA Q2 FY2027 results/call.',
    'Aug 27 08:30 ET: Advance Economic Indicators; 16:45 ET: MRVL Q2 FY2027 earnings call.',
    'FOMC minutes were scheduled for Aug 19 14:00 ET and are now a passed event gate, but no unsupported interpretation of the minutes is used where the official minutes text was not independently retrievable in this cycle.',
    'Leveraged/inverse ETFs reset daily. After large directional moves, do not chase either long or inverse products without activity, liquidity, tracking, trigger and invalidation evidence.'
  ];

  d.actionPlan=[
    'ACTION NOW：DEFEND但開始排Recovery Leaders。READY 1 = NONE；TECH READY = NONE；Cash 由50%降至45%，仍然保持防守。',
    'MRVL：升做Candidate+ Recovery Leader，但今日已反彈近10%，唔追；等低$230s附近有控制嘅retest/hold，並計入8/27業績風險。',
    'GOOGL：維持Candidate+ Relative Strength；要$344–346承接/重上20D並改善NASDAQ breadth先可升級。',
    'NVDA：維持Candidate+ Event Watch；$212–218 / 20D區要守，8/26業績前唔做無確認追價。',
    'MU：由純Washout Review改善為Stabilization Watch；仍要breadth及momentum確認。',
    'GFS / AVGO / COHR / LITE / AXTI / TSEM：未有足夠恢復證據；弱者唔因為跌多而加分。',
    'Hidden Gems / Research：POET、ALMU、AMBQ等維持Research/VALIDATING；未過財務、估值、催化、技術及風險驗證唔升級。',
    'Income ETFs：Income READY 1仍為NONE。高distribution yield唔等於Best；NAV、ROC、total return、liquidity、frequency history同entry全部要過關。',
    'Route Intelligence：Stock / Bullish Leveraged / Bearish-Inverse / Income四線獨立。任何route資料不足顯示VALIDATING / DATA GAP，product identity絕不覆蓋decision colour。'
  ];

  d.incomeStatus={
    asOf:'2026-08-19 19:46 ET',
    ready1:'NONE',
    rule:'Distribution yield is evidence, not approval. Best requires sufficient NAV/ROC/total-return/liquidity/history evidence and an acceptable entry setup.',
    MU:'MUYY remains the better-evidenced MU income route than MUIB on current activity/history, but neither is promoted to Income READY 1; MUIB remains DATA GAP where distribution history is insufficient.',
    note:'Percentage values remain neutral presentation data and never inherit READY/Candidate route colours.'
  };

  d.routeIntegrity={
    asOf:'2026-08-19 19:46 ET',
    rule:'Stock READY ≠ Bullish Leveraged READY ≠ Bearish READY ≠ Income READY. Product existence or one-day direction is not approval; Best requires sufficient current activity/liquidity/tracking or income/NAV/ROC/total-return evidence.',
    verifiedBearishExamples:'NVDA: NVD/NVDD · MU: MUD/MUZ · AVGO: AVS · GOOGL: GGLS · TSM: TSMZ/STSM · RKLB: RKLZ',
    identityControl:'RKLB bullish routes are RKLX and RKX; bearish route is RKLZ. Unverified ticker variants are excluded from registry/data pipeline.',
    gaps:'GFS/TSEM/AXTI/MRVL/COHR currently have no independently verified live same-underlying bearish route in the registry; LITE/AAOI short filings are not promoted until live tradable identity is independently verified.'
  };

  d.weekPlan={
    asOf:'2026-08-19 19:46 ET',
    thursday:'Aug 20: monitor Advance Services at 10:00 ET, then judge whether semiconductor breadth confirms or rejects today’s selective stabilization.',
    friday:'Focus on recovery-quality ranking and avoid forcing trades into a weak SOX tape.',
    nextWeek:'Aug 25 New Home Sales; Aug 26 GDP/PCE/Durable Goods + NVDA; Aug 27 Advance Economic Indicators + MRVL earnings. Position sizing must respect clustered event risk.'
  };

  d.decisionJourney={
    date:'2026-08-19',
    zh:'今日最大訊號唔係「大市反彈」，而係「同一AI鏈內強弱分化」。MRVL急彈，但COHR/LITE/AXTI/TSEM繼續跌，證明洗倉後最值錢嘅資料係邊隻先有真正承接。WAIS今日由全面防守轉為選擇性復甦排名，但READY 1仍然要等確認。',
    en:'The key signal today is not simply that the broad market stabilized; it is the sharp divergence inside the same AI chain. MRVL rebounded while several optics/material names kept falling. WAIS therefore shifts from blanket defense to selective recovery ranking, but READY 1 still requires confirmation.'
  };

  window.WAIS_MARKET_DATA=d;
})();
