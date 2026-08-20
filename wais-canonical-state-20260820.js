// WAIS canonical decision state — 2026-08-20
// Loads last so stale overlays cannot override the current decision language.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});

  d.lastUpdated='2026-08-20';
  d.lastStrategyUpdated='2026-08-20T00:15:00-04:00';
  d.dataAsOf='2026-08-20 canonical decision sync; price fields remain sourced from the existing quote feed and retain their own timestamps';

  // Keep risk elevated without presenting the dashboard as blanket DEFENSE.
  d.riskScore=60;
  d.recommendedCash=45;
  d.marketMode='SELECTIVE RECOVERY WATCH';
  d.defenseStatus='SELECTIVE · NOT FULL DEFENSE';
  d.contentSyncStatus='CURRENT · EARLY RADAR SYNCED · SELECTIVE RECOVERY · READY 1 NONE';
  d.contentSyncReason='Broad index stress eased while semiconductor breadth stayed mixed. WAIS is not full Risk-On, but the canonical state is now Selective Recovery Watch rather than a stale blanket Defense label. READY 1 remains closed; earlier-stage sponsorship and reclaim quality determine priority.';

  d.readyList=[];
  d.techReadyList=[];

  d.earlyRadar={
    asOf:'2026-08-20',
    discoverySignal:['KEYS','FN'],
    smartMoneyBuild:['ADI'],
    preReadyEarly:['MRVL'],
    preReady:[],
    ready1:[]
  };

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.asOf='2026-08-20 canonical sync';
  d.opportunityPipeline.actionNow='SELECTIVE RECOVERY WATCH · NO CHASE · RANK EARLY SPONSORSHIP';
  d.opportunityPipeline.ready1=[];
  d.opportunityPipeline.techReady=[];
  d.opportunityPipeline.preReady=[];
  d.opportunityPipeline.preReadyEarly=['MRVL'];
  d.opportunityPipeline.smartMoneyBuild=['ADI'];
  d.opportunityPipeline.discoverySignal=['KEYS','FN'];
  d.opportunityPipeline.inUniverse=['MRVL','GOOGL','NVDA','MU','GFS','AVGO','TSEM','AXTI','RKLB','COHR','LITE','POET','AEHR','FORM','MXL','NVTS','OSS','AIRO','ALMU','AMBQ','ADI','KEYS','FN'];
  d.opportunityPipeline.outOfCore=['BYND','RARE','PRAX'];
  d.opportunityPipeline.phaseOut=['POWL','MOD'];
  d.opportunityPipeline.noSetup=['PLTR'];
  d.opportunityPipeline.closestToReady=['MRVL','GOOGL','NVDA'];
  d.opportunityPipeline.statusChanges=[
    'Canonical market state changed from blanket DEFENSIVE display to SELECTIVE RECOVERY WATCH while Risk Score remains 60 and cash remains 45%.',
    'MRVL is now PRE-READY EARLY: primary evidence improved, but no chase after the event-driven gap and Aug 27 earnings remains a hard event gate.',
    'ADI enters SMART-MONEY BUILD research; KEYS and FN enter DISCOVERY SIGNAL research. These are IN the research universe, not READY 1.',
    'BYND, RARE and PRAX are explicitly OUT OF WAIS CORE for now; they may be researched separately but do not enter the core ranking.',
    'POWL and MOD remain PHASE OUT; PLTR remains NO SETUP; READY 1 and TECH READY remain NONE.'
  ];

  const stocks=Array.isArray(d.focusStocks)?d.focusStocks:(d.focusStocks=[]);
  const find=(t)=>stocks.find(x=>String(x.ticker||'').toUpperCase()===t);
  const patch=(t,fields)=>{const s=find(t); if(s) Object.assign(s,fields);};
  const addResearch=(ticker,company,stage,note)=>{
    if(find(ticker)) return patch(ticker,{stance:stage,rating:'Research',researchStage:stage,universeStatus:'IN',currentAction:'RESEARCH ONLY',note});
    stocks.push({ticker,company,category:'WAIS Early Radar',bucket:'HIDDEN_GEM',risk:'High',rating:'Research',stance:stage,researchStage:stage,evidenceConfidence:'VALIDATING',entry:null,target:null,showInWatchlist:false,universeStatus:'IN',currentAction:'RESEARCH ONLY',note});
  };

  patch('MRVL',{stance:'PRE-READY EARLY · EVENT / RETEST WATCH',rating:'Pre-Ready Early',researchStage:'PRE-READY EARLY',universeStatus:'IN',currentAction:'WAIT · DO NOT CHASE',executionStage:'PRE-READY EARLY',executionAction:'WAIT FOR CONTROLLED RETEST / RECLAIM',note:'Primary evidence strengthened materially. Keep in core universe, but the event gap and Aug 27 earnings prevent READY 1; require controlled pullback/reclaim and acceptable volume/breadth.'});
  patch('GOOGL',{universeStatus:'IN'});
  patch('NVDA',{universeStatus:'IN'});
  patch('MU',{universeStatus:'IN'});
  patch('GFS',{universeStatus:'IN'});
  patch('AVGO',{universeStatus:'IN'});
  patch('TSEM',{universeStatus:'IN'});
  patch('AXTI',{universeStatus:'IN'});
  patch('RKLB',{universeStatus:'IN'});
  patch('COHR',{universeStatus:'IN'});
  patch('LITE',{universeStatus:'IN'});
  patch('POET',{universeStatus:'IN'});
  patch('POWL',{stance:'PHASE OUT',rating:'Phase Out',universeStatus:'OUT'});
  patch('MOD',{stance:'PHASE OUT',rating:'Phase Out',universeStatus:'OUT'});
  patch('PLTR',{stance:'NO SETUP',rating:'No Setup',universeStatus:'OUT'});

  addResearch('ADI','Analog Devices','SMART-MONEY BUILD','AI data-center power-management demand and guidance improvement justify active build-stage research; not READY and no automatic buy.');
  addResearch('KEYS','Keysight Technologies','DISCOVERY SIGNAL','Recent order/revenue acceleration supports an AI/high-speed-test discovery track; requires valuation, sponsorship and price-structure validation before promotion.');
  addResearch('FN','Fabrinet','DISCOVERY SIGNAL','Data-center optical/CPO exposure keeps FN in discovery; require primary-evidence and price/valuation cross-check before any promotion.');

  d.actionPlan=[
    'ACTION NOW：SELECTIVE RECOVERY WATCH。READY 1 = NONE；TECH READY = NONE；Cash 45%。',
    'IN / CORE：MRVL, GOOGL, NVDA, MU, GFS, AVGO, TSEM, AXTI, RKLB, COHR, LITE plus active research names.',
    'EARLY RADAR：MRVL = PRE-READY EARLY；ADI = SMART-MONEY BUILD；KEYS/FN = DISCOVERY SIGNAL。',
    'OUT OF CORE：BYND, RARE, PRAX。PHASE OUT：POWL, MOD。NO SETUP：PLTR。',
    'Do not promote any name because it was mentioned in chat; promotion requires primary evidence + valuation + expectations risk + price/volume + event-risk confirmation.'
  ];

  // Dashboard currently derives labels mechanically from Risk Score. Override the visible labels
  // so the site reflects the canonical strategy state instead of stale CAUTIOUS/DEFENSE wording.
  const syncVisibleState=()=>{
    const set=(id,text)=>{const el=document.getElementById(id); if(el) el.textContent=text;};
    set('marketMode',d.marketMode);
    set('actionPill',d.marketMode);
    set('defenseStatus',d.defenseStatus);
    set('riskLabel','Selective / Recovery Watch');
    set('riskResultMode','Selective / Recovery Watch');
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(syncVisibleState,0));
  else setTimeout(syncVisibleState,0);
})();
