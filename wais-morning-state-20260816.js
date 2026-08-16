// WAIS 08:00 ET Sunday morning research/state overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-16';
  d.lastStrategyUpdated='2026-08-16T08:00:00-04:00';
  d.dataAsOf='2026-08-16 08:00 ET Sunday review using latest verified 2026-08-14 US/HK session and fresh primary-source research';
  d.marketMode='CAUTIOUS'; d.riskScore=47; d.recommendedCash=35;
  d.contentSyncStatus='CURRENT · EVIDENCE GAPS LOGGED';
  d.contentSyncReason='Data and research/state layers are synchronized for the Sunday 08:00 review. Market is closed; no new price signal exists. Any unavailable or stale external research is logged as DATA GAP rather than treated as no update.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-16 08:00 ET';
  d.researchIntegrity.overallStatus='CURRENT · EVIDENCE GAPS LOGGED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'CHECKED + DATA GAP',evidence:'Serenity tracker/aggregation sources were checked. A tracker is available, but the latest independently accessible feed in this cycle is not current enough for Sunday 08:00 status changes. No Serenity-derived ticker was promoted without fresher primary evidence.'},
    {layer:'Company IR',status:'CHECKED',evidence:'Micron Q3 FY2026 results and HBM4 shipment evidence checked; NVIDIA Aug 26 earnings timing checked; Fabrinet Q3 FY2026 results plus Aug 17 Q4/FY2026 earnings event checked; Coherent/Lumentum investor pages checked for optics-event context.'},
    {layer:'SEC / regulatory',status:'CHECKED',evidence:'GlobalFoundries SEC filing trail checked; Fabrinet filing availability checked through company IR/filings; no new regulatory item found that changes a WAIS state this morning.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED',evidence:'Micron record Q3 and FQ4 guidance remain supportive; Fabrinet reported record Q3 revenue/EPS and guides Q4 revenue $1.25B–$1.29B, with Q4/FY2026 results due Aug 17 at 17:00 ET. NVIDIA remains gated by Aug 26 earnings.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce continues to identify 800G/1.6T optics, EML and CW-DFB laser capacity as AI-data-center bottlenecks; external industry work is used only as a discovery/cross-check input.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'Optics demand was cross-checked across TrendForce, Fabrinet manufacturing exposure, and Coherent/Lumentum company materials. Memory demand remains cross-checked between Micron primary results and AI/HBM supply-chain work.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'Fabrinet (FN) added to VALIDATING because it is a major advanced optical manufacturing/packaging supplier with record Q3 growth and a confirmed Aug 17 earnings event. No pre-earnings promotion is allowed.'}
  ];

  d.opportunityPipeline={
    version:'1.3',asOf:'2026-08-16 08:00 ET',actionNow:'WAIT',ready1:[],
    techReady:[
      {ticker:'GFS',status:'TECH READY · MONDAY CONFIRM',reason:'Latest regular close 54.58, +4.0% vs prior close and above 20D SMA. Prior technical reclaim condition remains met, but Sunday provides no new regular-session confirmation.',trigger:'Monday regular session hold above ~53.5–54 with constructive SOX/breadth',invalidation:'Break below ~52.5 with weak breadth / failed reclaim'}
    ],
    candidatePlus:[
      {ticker:'NVDA',status:'CANDIDATE+ · EARNINGS WATCH',reason:'Latest regular close 225.16 above 20D/50D. NVIDIA Q2 FY2027 results are Aug 26 at 17:00 ET, so earnings risk remains an active gate.'},
      {ticker:'GOOGL',status:'CANDIDATE+ · ENTRY WATCH',reason:'Latest regular close 345.90 near 20D SMA. No fresh Sunday primary evidence justifies READY 1.'},
      {ticker:'MU',status:'CANDIDATE+ · HBM STRENGTH',reason:'Micron reported record Q3 FY2026, strong FQ4 guidance and HBM4 high-volume shipments. Latest regular close 971.66 shows relative strength, but price is extended and must not be chased.'}
    ],
    candidate:[
      {ticker:'AVGO',status:'CANDIDATE · PULLBACK REVIEW',reason:'Latest regular close 392.99 after a -5.8% day and near 50D SMA. AI thesis remains strong; stabilization is required before promotion.'},
      {ticker:'LITE',status:'CANDIDATE · OPTICS / EXTENDED',reason:'AI optics bottleneck thesis is strong, but latest regular close 926.14 is materially extended above 20D/50D. Do not chase.'},
      {ticker:'COHR',status:'CANDIDATE · OPTICS',reason:'AI optical-interconnect tailwind is validated. Latest regular close 325.83 is above 20D but below 50D, so confirmation remains incomplete.'},
      {ticker:'TSEM',status:'CANDIDATE · HIGH MOMENTUM',reason:'Latest regular close 265.48 after +5.2%, above 20D/50D; needs fresh company-primary evidence before Candidate+.'},
      {ticker:'AXTI',status:'CANDIDATE · HIGH VOL / EXPECTATIONS RISK',reason:'Latest regular close 81.64 after +5.7% and far above 20D; InP thesis is attractive but overheat and geopolitical/supply-chain risk block promotion.'}
    ],
    research:[
      {ticker:'FN',status:'VALIDATING · EARNINGS 8/17',reason:'Fabrinet is a major advanced optical manufacturing/packaging supplier. Q3 FY2026 revenue was $1.214B vs $871.8M YoY with record EPS; Q4/FY2026 results are due Aug 17 at 17:00 ET. Event risk blocks pre-earnings promotion.'},
      {ticker:'AAOI',status:'VALIDATING · OVERHEATED',reason:'Latest regular close 150.28 after +16.1%, roughly 30% above 20D; no chase.'},
      {ticker:'SNDK',status:'VALIDATING',reason:'AI memory/storage theme remains under primary-source validation.'},
      {ticker:'NBIS',status:'RESEARCH',reason:'AI infrastructure candidate; needs primary evidence + valuation + liquidity review.'},
      {ticker:'IREN',status:'RESEARCH',reason:'AI/data-center optionality; capital intensity and execution risk require full underwriting.'},
      {ticker:'SOI',status:'RESEARCH',reason:'Infrastructure/power-chain candidate; needs fresh company evidence before ranking.'}
    ],
    phaseOut:[],
    statusChanges:[
      'READY 1 remains NONE because Sunday has no new regular-session evidence.',
      'GFS remains TECH READY; Monday price/volume + SOX/breadth confirmation is still required.',
      'FN enters VALIDATING as a new optics-manufacturing discovery, but Aug 17 earnings blocks any pre-event promotion.',
      'MU remains Candidate+; strong HBM evidence does not override extension/entry risk.'
    ]
  };

  d.readyList=[];
  d.actionPlan=[
    'ACTION NOW：WAIT。Sunday市場休市，沒有可執行regular-session signal；READY 1仍為NONE。',
    'Monday第一優先仍是GFS TECH READY：只有regular session守住約53.5–54、SOX/breadth不惡化，才重新做完整READY 1確認。',
    'Candidate+：NVDA、GOOGL、MU。NVDA有8/26 earnings gate；MU基本面強但價格延伸，不追高。',
    'New discovery：FN進入VALIDATING；8/17 17:00 ET公布Q4/FY2026業績，業績前不升級。',
    'Optics：LITE/COHR/AAOI/AXTI繼續研究；產業證據強，但LITE/AAOI/AXTI價格過熱，COHR技術確認未完成。',
    'Macro：8/18 08:30 ET Housing Starts/Permits；09:15 ET Industrial Production；8/19 14:00 ET FOMC Minutes。',
    'FABIBOT仍是DESIGNED/MANUAL；未有production backtest/log前不得當作automated quant model。'
  ];

  d.waisEventCalendar=d.waisEventCalendar||{};
  d.waisEventCalendar.version='1.3'; d.waisEventCalendar.timezone='ET';
  d.waisEventCalendar.events=[
    {date:'2026-08-17',time:'17:00',type:'EARNINGS',ticker:'FN',title:'Fabrinet Q4 / FY2026 Financial Results',source:'Fabrinet Investor Relations',impact:'HIGH',gate:'New discovery is event-gated; do not promote before results/guidance review.'},
    {date:'2026-08-18',time:'08:30',type:'MACRO',title:'U.S. Housing Starts / Building Permits — July 2026',source:'U.S. Census Bureau',impact:'MEDIUM',gate:'Check rates/cyclicals and broader risk appetite.'},
    {date:'2026-08-18',time:'09:15',type:'MACRO',title:'U.S. Industrial Production — July 2026',source:'Federal Reserve',impact:'MEDIUM',gate:'Review cyclical breadth and semiconductor/industrial demand read-through.'},
    {date:'2026-08-19',time:'14:00',type:'MACRO',title:'FOMC Minutes — July 28–29 meeting',source:'Federal Reserve',impact:'HIGH',gate:'Rates/valuation event gate for high-duration AI equities.'},
    {date:'2026-08-26',time:'17:00',type:'EARNINGS',ticker:'NVDA',title:'NVIDIA Q2 FY2027 Financial Results',source:'NVIDIA Investor Relations',impact:'HIGH',gate:'Maintain earnings-risk flag for new NVDA deployment sizing.'}
  ];

  d.decisionJourney={
    date:'2026-08-16',
    zh:'星期日不製造交易訊號；真正有價值的是把星期一要驗證的條件、事件風險和新發現先準備好。',
    en:'Sunday is for preparation, not manufactured signals: define Monday confirmations, event gates and new discoveries before capital is deployed.'
  };

  window.WAIS_MARKET_DATA=d;
})();
