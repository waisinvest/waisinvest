// WAIS 19:00 ET evening research/state overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-15';
  d.lastStrategyUpdated='2026-08-15T19:34:00-04:00';
  d.dataAsOf='2026-08-15 19:34 ET weekend review using latest verified 2026-08-14 market close / extended-hours snapshots';
  d.marketMode='CAUTIOUS'; d.riskScore=47; d.recommendedCash=35;
  d.contentSyncStatus='PARTIAL UPDATE';
  d.contentSyncReason='Data layer is current through the latest verified 2026-08-14 market session and the intelligence layer was actively reviewed, but Serenity/current specialist-source evidence and Lumentum Q4 FY2026 result materials were not independently retrievable in this cycle. Missing evidence is explicitly logged as DATA GAP.';

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-15 19:34 ET';
  d.researchIntegrity.overallStatus='PARTIAL UPDATE — EVIDENCE GAPS LOGGED';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'No current independently verifiable Serenity investment-research source was located in this cycle. Missing evidence is not treated as no update and cannot trigger any status change.'},
    {layer:'Company IR',status:'CHECKED',evidence:'NVIDIA Aug 26 Q2 FY2027 event confirmed via NVIDIA IR; Micron Q3 FY2026 results and HBM4 high-volume shipment evidence checked via Micron IR; GlobalFoundries Aug 5 Q2 event plus Jul 29 U.S. silicon-photonics award announcement checked; Broadcom Q2 FY2026 AI-revenue/guidance evidence checked.'},
    {layer:'SEC / regulatory',status:'CHECKED',evidence:'Micron Q3 FY2026 Form 10-Q and Broadcom Q2 FY2026 10-Q checked; Lumentum latest independently retrieved filing in this cycle is the May 6 Form 10-Q for period ended Mar 28, so later Q4 filing/results are not assumed.'},
    {layer:'Earnings / guidance / transcripts',status:'CHECKED + DATA GAP',evidence:'Micron Q3 results/FQ4 guidance and NVIDIA Aug 26 earnings timing verified. Lumentum Aug 11 earnings event was confirmed, but the Q4 FY2026 result release itself was not independently retrievable in this cycle; therefore Q4-specific claims remain DATA GAP.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce 2026 AI server, HBM and optical-interconnect research reviewed; evidence supports strong AI server/HBM demand and an optical-interconnect bottleneck shift, but external research cannot independently trigger a WAIS buy status.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'HBM demand was cross-checked between Micron primary results and TrendForce supply-demand work; optical demand was cross-checked against TrendForce CPO/optical-interconnect bottleneck research. Lumentum Q4-specific confirmation remains a data gap.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'LITE, COHR, AAOI, MU, SNDK, NBIS, IREN and SOI remain in validation/discovery beyond the legacy watchlist; no new symbol is promoted solely from third-party commentary.'}
  ];

  d.opportunityPipeline={
    version:'1.2',asOf:'2026-08-15 19:34 ET',actionNow:'WAIT',ready1:[],
    techReady:[
      {ticker:'GFS',status:'TECH READY · MONDAY CONFIRM',reason:'Fri regular close 54.58, +4.0% vs prior close, above 20D SMA; prior post-macro reclaim trigger has been met. TECH READY is technical-only and is not a buy approval.',trigger:'Monday hold above ~53.5–54 and constructive SOX/breadth in regular session',invalidation:'Break below ~52.5 with weak breadth / failed reclaim'}
    ],
    candidatePlus:[
      {ticker:'NVDA',status:'CANDIDATE+ · EARNINGS WATCH',reason:'Fri regular close 225.16 above 20D/50D; NVIDIA IR confirms Aug 26 Q2 FY2027 results. Earnings remains a major event gate.'},
      {ticker:'GOOGL',status:'CANDIDATE+ · ENTRY WATCH',reason:'Fri regular close 345.90 near 20D SMA; quality/valuation case remains under review, but no fresh primary-source evidence in this cycle justifies an upgrade.'},
      {ticker:'MU',status:'CANDIDATE+ · HBM STRENGTH',reason:'Micron IR reported record Q3 FY2026 results, strong FQ4 guidance and HBM4 high-volume shipments; Fri relative strength supports monitoring. Entry discipline still required.'}
    ],
    candidate:[
      {ticker:'AVGO',status:'CANDIDATE · PULLBACK REVIEW',reason:'Fri regular close 392.99, -5.8% from prior close and near 50D SMA. Broadcom Q2 primary evidence supports the AI thesis, but price must stabilize before promotion.'},
      {ticker:'LITE',status:'CANDIDATE · OPTICS / Q4 DATA GAP',reason:'Industry evidence supports AI optics demand, but Q4 FY2026 result materials were not independently retrieved this cycle and price is materially extended. No chase and no promotion.'},
      {ticker:'COHR',status:'CANDIDATE · OPTICS',reason:'Industry optical-interconnect tailwind is validated; price remains below 50D despite holding above 20D, so confirmation is incomplete and company-primary refresh is still required.'},
      {ticker:'TSEM',status:'CANDIDATE · HIGH MOMENTUM',reason:'Fri +5.2% and above 20D/50D; primary-evidence refresh still required before Candidate+.'},
      {ticker:'AXTI',status:'CANDIDATE · HIGH VOL / EXPECTATIONS RISK',reason:'Fri +5.7%, ~31% above 20D SMA; InP bottleneck thesis exists but geopolitical/supply-chain dependency and overheat block promotion.'}
    ],
    research:[
      {ticker:'AAOI',status:'VALIDATING · OVERHEATED',reason:'Fri +16.1%, ~30% above 20D; optical-demand theme is strong but chase risk is extreme and primary evidence must be refreshed.'},
      {ticker:'SNDK',status:'VALIDATING',reason:'Memory/storage AI demand theme; complete current primary-source validation before promotion.'},
      {ticker:'NBIS',status:'RESEARCH',reason:'AI infrastructure candidate; needs primary evidence + valuation + liquidity review.'},
      {ticker:'IREN',status:'RESEARCH',reason:'AI/data-center optionality; capital intensity and execution risk require full underwriting.'},
      {ticker:'SOI',status:'RESEARCH',reason:'Infrastructure/power-chain candidate; needs fresh company evidence before ranking.'}
    ],
    phaseOut:[],
    statusChanges:[
      'GFS remains TECH READY for Monday regular-session confirmation; TECH READY is not READY 1 and is not permission to buy.',
      'MU remains Candidate+ on Micron primary HBM/fundamental evidence plus Friday relative strength.',
      'LITE remains Candidate but is explicitly marked Q4 DATA GAP + overextended; no promotion.',
      'AAOI remains validation-only despite +16% Friday move because expectations/entry risk is too high.'
    ]
  };

  d.readyList=[];
  d.actionPlan=[
    'ACTION NOW：WAIT。Weekend無可執行regular-session signal；READY 1仍為NONE。',
    'Monday第一優先：GFS TECH READY。TECH READY只代表技術條件接近，若regular session守住約53.5–54、SOX/breadth不惡化，再重新做完整WAIS確認，先考慮是否升READY 1。',
    'Candidate+：NVDA、GOOGL、MU。NVDA有8/26 earnings gate；MU基本面證據強但不可追高。',
    'Optics：LITE/COHR/AAOI繼續研究；LITE Q4結果今輪為DATA GAP，AAOI價格過熱，因此全部未有買入批准。',
    'Macro：8/18 09:15 ET Industrial Production；8/19 14:00 ET FOMC Minutes。其他事件只有在官方來源可獨立確認後才加入高信心水平。',
    'Extended-hours只作輔助；Monday所有升級以regular-session price/volume + market regime + research evidence確認。'
  ];

  d.waisEventCalendar=d.waisEventCalendar||{};
  d.waisEventCalendar.version='1.2'; d.waisEventCalendar.timezone='ET';
  d.waisEventCalendar.events=[
    {date:'2026-08-18',time:'09:15',type:'MACRO',title:'U.S. Industrial Production — July 2026',source:'Federal Reserve',impact:'MEDIUM',gate:'Review cyclical breadth and semiconductor/industrial demand read-through.'},
    {date:'2026-08-19',time:'14:00',type:'MACRO',title:'FOMC Minutes — July 28–29 meeting',source:'Federal Reserve',impact:'HIGH',gate:'Rates/valuation event gate for high-duration AI equities.'},
    {date:'2026-08-26',time:'17:00',type:'EARNINGS',ticker:'NVDA',title:'NVIDIA Q2 FY2027 Financial Results',source:'NVIDIA Investor Relations',impact:'HIGH',gate:'Maintain earnings-risk flag for new NVDA deployment sizing.'}
  ];

  d.decisionJourney={
    date:'2026-08-15',
    zh:'週末最重要不是製造交易訊號，而是把證據缺口寫清楚；只有價格、研究與風險同時過關，才值得升級。',
    en:'The weekend is for exposing evidence gaps, not manufacturing trade signals. Upgrade only when price, research and risk all pass.'
  };

  window.WAIS_MARKET_DATA=d;
})();
