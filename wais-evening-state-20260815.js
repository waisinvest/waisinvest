// WAIS 19:00 ET evening research/state overlay — sanitized public output only.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.lastUpdated='2026-08-15';
  d.lastStrategyUpdated='2026-08-15T19:03:00-04:00';
  d.dataAsOf='2026-08-15 19:03 ET weekend review using latest verified 2026-08-14 market close / extended-hours snapshots';
  d.marketMode='CAUTIOUS'; d.riskScore=47; d.recommendedCash=35;

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.asOf='2026-08-15 19:03 ET';
  d.researchIntegrity.overallStatus='CHECKED — WEEKEND REVIEW';
  d.researchIntegrity.evidenceOfWork=[
    {layer:'Serenity / specialist research',status:'DATA GAP',evidence:'No current independently verifiable Serenity source located in this cycle; missing evidence is not treated as no update.'},
    {layer:'Company IR',status:'CHECKED',evidence:'NVIDIA Aug 26 earnings event; Micron Q3/FQ4 outlook and HBM4 shipments; Lumentum AI/optics earnings materials reviewed.'},
    {layer:'SEC / regulatory',status:'CHECKED',evidence:'Recent Micron and Lumentum 10-Q filings cross-checked; Federal Reserve/BLS official calendars checked.'},
    {layer:'Earnings / guidance',status:'CHECKED',evidence:'Micron Q3 results + FQ4 guidance; Lumentum FY26 optics demand read-through; NVIDIA earnings date confirmed.'},
    {layer:'Institutional / industry research',status:'CHECKED',evidence:'TrendForce AI server/HBM/optical interconnect and Dell’Oro AI networking outlook reviewed.'},
    {layer:'Supply-chain cross-check',status:'CHECKED',evidence:'Optics demand confirmed against transceiver/laser bottlenecks; HBM demand checked against Micron product/guidance evidence.'},
    {layer:'New-universe discovery',status:'CHECKED',evidence:'LITE, COHR, AAOI, MU, SNDK, NBIS, IREN and SOI retained/added for validation beyond legacy watchlist.'}
  ];

  d.opportunityPipeline={
    version:'1.2',asOf:'2026-08-15 19:03 ET',actionNow:'WAIT',ready1:[],
    techReady:[
      {ticker:'GFS',status:'TECH READY · MONDAY CONFIRM',reason:'Fri regular close 54.58, +4.0% vs prior close, above 20D SMA; prior post-macro reclaim trigger has been met. Weekend prevents a fresh executable confirmation.',trigger:'Monday hold above ~53.5–54 and constructive SOX/breadth in regular session',invalidation:'Break below ~52.5 with weak breadth / failed reclaim'}
    ],
    candidatePlus:[
      {ticker:'NVDA',status:'CANDIDATE+ · EARNINGS WATCH',reason:'Fri regular close 225.16 above 20D/50D; Aug 26 earnings remains a major event gate.'},
      {ticker:'GOOGL',status:'CANDIDATE+ · ENTRY WATCH',reason:'Fri regular close 345.90 near 20D SMA; valuation/quality remain constructive but relative momentum is not yet decisive.'},
      {ticker:'MU',status:'CANDIDATE+ · HBM STRENGTH',reason:'Micron reported record Q3 results, strong FQ4 outlook and HBM4 high-volume shipments; Fri price strength confirmed relative to weak SOX. Entry discipline still required.'}
    ],
    candidate:[
      {ticker:'AVGO',status:'CANDIDATE · PULLBACK REVIEW',reason:'Fri regular close 392.99, -5.8% from prior close and near 50D SMA; strong thesis but needs stabilization before promotion.'},
      {ticker:'LITE',status:'CANDIDATE · OPTICS LEADER / OVERHEAT',reason:'Primary/industry evidence supports AI optics demand, but price is materially extended above 20D/50D; do not chase.'},
      {ticker:'COHR',status:'CANDIDATE · OPTICS',reason:'AI optics tailwind is validated; price remains below 50D despite holding above 20D, so confirmation is incomplete.'},
      {ticker:'TSEM',status:'CANDIDATE · HIGH MOMENTUM',reason:'Fri +5.2% and above 20D/50D; primary-evidence refresh still required before Candidate+.'},
      {ticker:'AXTI',status:'CANDIDATE · HIGH VOL / EXPECTATIONS RISK',reason:'Fri +5.7%, ~31% above 20D SMA; InP bottleneck thesis exists but geopolitical/supply-chain dependency and overheat block promotion.'}
    ],
    research:[
      {ticker:'AAOI',status:'VALIDATING · OVERHEATED',reason:'Fri +16.1%, ~30% above 20D; strong optical demand but chase risk is extreme.'},
      {ticker:'SNDK',status:'VALIDATING',reason:'Memory/storage AI demand theme; complete current primary-source validation before promotion.'},
      {ticker:'NBIS',status:'RESEARCH',reason:'AI infrastructure candidate; needs primary evidence + valuation + liquidity review.'},
      {ticker:'IREN',status:'RESEARCH',reason:'AI/data-center optionality; capital intensity and execution risk require full underwriting.'},
      {ticker:'SOI',status:'RESEARCH',reason:'Infrastructure/power-chain candidate; needs fresh company evidence before ranking.'}
    ],
    phaseOut:[],
    statusChanges:[
      'GFS upgraded Candidate+ → TECH READY for Monday regular-session confirmation; not READY 1 yet.',
      'MU upgraded Validation → Candidate+ on primary HBM/fundamental evidence plus Friday relative strength.',
      'LITE promoted into Candidate research tier but explicitly flagged overextended; no chase.',
      'AAOI remains validation-only despite +16% Friday move because expectations/entry risk is too high.'
    ]
  };

  d.readyList=[];
  d.actionPlan=[
    'ACTION NOW：WAIT。Weekend無可執行regular-session signal；READY 1仍為NONE。',
    'Monday第一優先：GFS TECH READY，若regular session守住約53.5–54、SOX/breadth不惡化，再判斷是否升READY 1。',
    'Candidate+：NVDA、GOOGL、MU。NVDA有8/26 earnings gate；MU基本面升級但不可追高。',
    'Optics：LITE/COHR基本面與產業需求確認，但LITE已明顯過熱；AAOI更過熱，只可觀察回調與承接。',
    'Macro：8/18 08:30 ET Import/Export Prices、09:15 ET Industrial Production；8/19 14:00 ET FOMC Minutes。',
    'Extended-hours只作輔助；Monday所有升級以regular-session price/volume + market regime確認。'
  ];

  d.waisEventCalendar=d.waisEventCalendar||{};
  d.waisEventCalendar.version='1.2'; d.waisEventCalendar.timezone='ET';
  d.waisEventCalendar.events=[
    {date:'2026-08-18',time:'08:30',type:'MACRO',title:'U.S. Import & Export Prices — July 2026',source:'U.S. Bureau of Labor Statistics',impact:'MEDIUM',gate:'Recheck rates and growth-multiple sensitivity.'},
    {date:'2026-08-18',time:'09:15',type:'MACRO',title:'U.S. Industrial Production — July 2026',source:'Federal Reserve',impact:'MEDIUM',gate:'Review cyclical breadth and semiconductor/industrial demand read-through.'},
    {date:'2026-08-19',time:'14:00',type:'MACRO',title:'FOMC Minutes — July 28–29 meeting',source:'Federal Reserve',impact:'HIGH',gate:'Rates/valuation event gate for high-duration AI equities.'},
    {date:'2026-08-26',time:'AFTER CLOSE',type:'EARNINGS',ticker:'NVDA',title:'NVIDIA Q2 FY2027 Financial Results',source:'NVIDIA Investor Relations',impact:'HIGH',gate:'Maintain earnings-risk flag for new NVDA deployment sizing.'}
  ];

  window.WAIS_MARKET_DATA=d;
})();
