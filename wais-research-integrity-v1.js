(function(){
  const d = window.WAIS_MARKET_DATA || {};

  // WAIS Research Integrity Patch v1.0 — 2026-08-15
  // Purpose: prevent stale strategy content from being presented as fully current,
  // separate automated data from manual research, and expose evidence-of-work status.
  d.lastUpdated = "2026-08-15";
  d.dataAsOf = "2026-08-15 weekend system audit; market prices remain the latest verified 2026-08-14 close/extended-hours snapshots where available";
  d.marketMode = "CAUTIOUS";
  d.riskScore = 47;
  d.recommendedCash = 35;

  d.researchIntegrity = {
    version: "1.0",
    asOf: "2026-08-15 13:xx ET",
    overallStatus: "PARTIAL UPDATE",
    rule: "No log = not done. No source = not researched. No automation record = not automated.",
    layers: [
      {name:"Market / Stock Data", status:"AUTOMATED", evidence:"GitHub scheduled refresh + timestamped JSON"},
      {name:"Extended Hours", status:"AUTOMATED / DELAYED", evidence:"5-minute provider snapshots; not exchange-certified real-time"},
      {name:"WAIS Decision Framework", status:"ACTIVE", evidence:"Public execution architecture + live decision state"},
      {name:"Serenity Intelligence", status:"MANUAL / REPAIRING", evidence:"Fresh public-source check completed; independent automation had been disabled"},
      {name:"Company IR / SEC", status:"MANUAL", evidence:"Must be explicitly checked per research cycle until ingestion is automated"},
      {name:"Institutional / Industry Research", status:"MANUAL", evidence:"Must be explicitly logged; no persistent ingestion pipeline yet"},
      {name:"Early Discovery Scanner", status:"PARTIAL", evidence:"Price universe exists; full market-wide autonomous scanner not yet production"},
      {name:"Economic / Earnings Calendar", status:"REPAIRED SEED", evidence:"Official Fed, Census, BEA and company IR dates refreshed for the next window"},
      {name:"FABIBOT Validation", status:"DESIGNED / MANUAL", evidence:"Prediction-log and automated backtest engine still pending"},
      {name:"Broker Execution", status:"DESIGNED", evidence:"IBKR integration not yet active"}
    ]
  };

  d.opportunityPipeline = {
    version: "1.1",
    asOf: "2026-08-15 weekend audit",
    actionNow: "WAIT",
    ready1: [],
    candidatePlus: [
      {ticker:"GFS", status:"CANDIDATE+", trigger:"Revalidate Monday price/volume after energy/yield weekend gap risk", invalidation:"Failed support / worsening sector breadth", reason:"Quality thesis remains under review; do not inherit Friday timing automatically."},
      {ticker:"GOOGL", status:"CANDIDATE+", trigger:"Hold/reclaim constructive structure with rates stable", invalidation:"Material thesis deterioration or failed support", reason:"Quality remains strong but entry timing must be refreshed Monday."},
      {ticker:"NVDA", status:"CANDIDATE+ · EVENT WATCH", trigger:"Constructive market/sector confirmation without overextension", invalidation:"Breakdown with worsening breadth / risk regime", reason:"AI infrastructure evidence remains strong; Aug 26 earnings is an active event gate."}
    ],
    candidate: [
      {ticker:"AVGO", status:"CANDIDATE", trigger:"Better risk/reward with valuation discipline", reason:"AI networking/ASIC exposure remains attractive but expectations risk is elevated."},
      {ticker:"AXTI", status:"CANDIDATE · OVERHEAT WATCH", trigger:"Volatility contraction + support + primary-evidence revalidation", reason:"Bottleneck thesis remains important; recent extreme price discovery lowers entry attractiveness."},
      {ticker:"TSEM", status:"CANDIDATE", trigger:"Primary-evidence refresh + favourable entry", reason:"Specialty foundry / silicon-photonics relevance remains strategically interesting."},
      {ticker:"RKLB", status:"CANDIDATE · POST-EARNINGS", trigger:"Post-earnings support + normal-session confirmation", reason:"Remain in post-earnings review; execution risk still matters."}
    ],
    discovery: ["AEHR","FORM","MXL","POET","NVTS","OSS","AIRO"],
    priorityValidation: ["SIVE","LITE","COHR","AAOI","MU","SNDK","NBIS","IREN","SOI"],
    removed: [],
    closestToReady: ["GFS","GOOGL","NVDA"],
    statusChanges: [
      "No READY 1 is carried through the weekend without Monday price/timing revalidation.",
      "AXTI remains a thesis candidate but is explicitly flagged for overheat / expectations risk.",
      "Serenity-derived optical, memory and AI-infrastructure names enter Priority Validation only; they are not buy signals.",
      "Research status now distinguishes AUTOMATED, MANUAL, PARTIAL and DESIGNED instead of treating all as continuously active."
    ]
  };

  d.waisEventCalendar = {
    version: "1.1",
    timezone: "ET",
    lookAheadDays: 14,
    events: [
      {date:"2026-08-18", time:"08:30", type:"MACRO", title:"U.S. Housing Starts / Building Permits — July 2026", source:"U.S. Census Bureau", impact:"MEDIUM", gate:"Check rates and cyclical breadth."},
      {date:"2026-08-18", time:"09:15", type:"MACRO", title:"U.S. Industrial Production / Capacity Utilization", source:"Federal Reserve", impact:"MEDIUM", gate:"Check manufacturing / semiconductor read-through."},
      {date:"2026-08-19", time:"14:00", type:"FED", title:"FOMC Minutes — July 28-29 meeting", source:"Federal Reserve", impact:"HIGH", gate:"Do not ignore rate-path and inflation-risk repricing."},
      {date:"2026-08-20", time:"10:00", type:"MACRO", title:"Advance Services Report — Q2 2026", source:"U.S. Census Bureau", impact:"MEDIUM", gate:"Check service-demand and growth mix."},
      {date:"2026-08-25", time:"10:00", type:"MACRO", title:"U.S. New Home Sales — July 2026", source:"U.S. Census Bureau", impact:"MEDIUM", gate:"Housing / rates sensitivity check."},
      {date:"2026-08-26", time:"08:30", type:"MACRO", title:"U.S. GDP Second Estimate + Personal Income and Outlays — July 2026", source:"U.S. Bureau of Economic Analysis", impact:"HIGH", gate:"Growth/inflation mix can reprice long-duration equities."},
      {date:"2026-08-26", time:"17:00", type:"EARNINGS", ticker:"NVDA", title:"NVIDIA Q2 FY2027 Financial Results", source:"NVIDIA Investor Relations", impact:"HIGH", gate:"Active earnings-risk gate for NVDA and AI infrastructure chain."}
    ]
  };

  d.weeklyEvents = d.waisEventCalendar.events.map(e => ({
    date:e.date,
    event:`${e.ticker ? e.ticker + " · " : ""}${e.title}`,
    time:e.time,
    referenceMonth:e.type,
    source:e.source,
    waisNote:e.gate
  }));

  d.weeklyMarketNotes = [
    {title:"ACTION NOW", action:"WAIT · 0 READY 1", body:"Weekend state. Monday starts from fresh price/timing verification; no label is inherited as a buy authorization."},
    {title:"RESEARCH INTEGRITY", action:"PARTIAL UPDATE", body:"Automated market data is healthy; external research ingestion is not yet fully automated. Manual/automated status is now shown explicitly."},
    {title:"SERENITY", action:"MANUAL VERIFIED / PIPELINE REPAIR", body:"Fresh public Serenity checks continue to emphasize optical/CPO, InP, memory and AI-infrastructure bottlenecks. These are discovery inputs only and require WAIS primary-source verification."},
    {title:"NEXT HIGH GATE", action:"FOMC MINUTES · 08/19 14:00 ET", body:"Before then watch oil, long yields, semiconductor breadth and Monday gap quality."}
  ];

  d.actionPlan = [
    "READY 1：NONE。Weekend state remains WAIT; Monday re-underwrite Price + Timing from zero.",
    "Candidate+：GFS、GOOGL、NVDA。NVDA remains under Aug 26 earnings event risk.",
    "Candidate：AVGO、AXTI、TSEM、RKLB。AXTI adds explicit overheat / expectations-risk flag.",
    "Priority Validation：SIVE、LITE、COHR、AAOI、MU、SNDK、NBIS、IREN、SOI；all remain research-only until primary evidence passes.",
    "Research reports must show CHECKED / NOT CHECKED / DATA GAP. Missing evidence must never be phrased as 'no update'."
  ];

  window.WAIS_MARKET_DATA = d;

  document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.getElementById('dashboard');
    const oldPanel = document.getElementById('waisLiveSystemPanel');
    if (!dashboard) return;

    const status = d.researchIntegrity;
    const box = document.createElement('section');
    box.id = 'waisResearchIntegrityPanel';
    box.className = 'wais-live-system';
    box.style.margin = '18px 0';
    box.innerHTML = `
      <div class="wais-live-head">
        <div><span class="panel-kicker">WAIS RESEARCH INTEGRITY</span><h3>System Audit + Evidence of Work</h3></div>
        <div class="wais-live-time">Updated ${d.lastUpdated} · ${status.overallStatus}</div>
      </div>
      <div class="wais-action-banner">${status.rule}</div>
      <div class="wais-pipe-grid">
        ${status.layers.map(x=>`<div class="wais-pipe-col"><h4>${x.name}</h4><b>${x.status}</b><p style="margin:.4rem 0 0;opacity:.75;font-size:.8rem">${x.evidence}</p></div>`).join('')}
      </div>`;

    if (oldPanel) oldPanel.parentNode.insertBefore(box, oldPanel.nextSibling);
    else dashboard.insertBefore(box, dashboard.firstChild);

    const liveTime = oldPanel?.querySelector('.wais-live-time');
    if (liveTime) liveTime.textContent = `Updated ${d.lastUpdated} · weekend audit`;
    const banner = oldPanel?.querySelector('.wais-action-banner');
    if (banner) banner.textContent = `ACTION NOW｜WAIT · READY 1: NONE · Next high gate: FOMC Minutes 08/19 14:00 ET`;
  });
})();
