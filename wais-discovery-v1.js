// WAIS Discovery Engine public state — v1.0, 2026-08-15.
// Discovery names are research candidates, not buy instructions.
(() => {
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.discoveryPolicy={
    version:'1.0',
    principle:'Overheated or expensive does not equal reject. Keep strong companies in research so WAIS can read market leadership; separate thesis quality from entry quality.',
    stages:['DISCOVERY','RESEARCH','VALIDATING','CANDIDATE','CANDIDATE+','TECH READY','READY 1'],
    rejectOnlyWhen:['thesis materially breaks','evidence quality fails','financial/liquidity risk becomes unacceptable','better alternative makes the name structurally inferior'],
    targetMix:'50% existing-universe maintenance / 30% new-stock discovery / 20% deep validation',
    cashRule:'No READY 1 means no forced deployment; cash is a valid portfolio state.'
  };

  d.focusStocks=Array.isArray(d.focusStocks)?d.focusStocks:[];
  const existing=new Set(d.focusStocks.map(x=>String(x.ticker||'').toUpperCase()));
  const additions=[
    {
      ticker:'ALMU', company:'Aeluma', category:'AI Photonics / InGaAs', bucket:'HIDDEN_GEM',
      showInWatchlist:false, stance:'DISCOVERY', researchStage:'VALIDATING', evidenceConfidence:48,
      risk:'Very High', rating:'Early Discovery', entry:0, target:0,
      note:'New WAIS discovery. Nasdaq-listed early-stage photonics/semiconductor company. Validate revenue scale, customer concentration, dilution/capital-raising risk, product qualification and AI-data-center demand before any Candidate promotion. High price momentum would be an entry warning, not an automatic research rejection.'
    },
    {
      ticker:'AMBQ', company:'Ambiq Micro', category:'Ultra-Low-Power Edge AI Semiconductor', bucket:'HIDDEN_GEM',
      showInWatchlist:false, stance:'DISCOVERY', researchStage:'VALIDATING', evidenceConfidence:52,
      risk:'Very High', rating:'Early Discovery', entry:0, target:0,
      note:'New WAIS discovery. NYSE-listed edge-AI semiconductor company. Validate post-IPO valuation, revenue durability, customer concentration, margin path, liquidity and edge-AI adoption before Candidate promotion. Do not confuse strong growth with an immediate buy signal.'
    }
  ];
  additions.forEach(x=>{ if(!existing.has(x.ticker)) d.focusStocks.push(x); });

  d.opportunityPipeline=d.opportunityPipeline||{};
  d.opportunityPipeline.research=Array.isArray(d.opportunityPipeline.research)?d.opportunityPipeline.research:[];
  const pipelineSet=new Set(d.opportunityPipeline.research.map(x=>String(x.ticker||'').toUpperCase()));
  if(!pipelineSet.has('ALMU')) d.opportunityPipeline.research.push({ticker:'ALMU',status:'DISCOVERY · VALIDATING',reason:'Early-stage AI photonics / InGaAs exposure; verify commercial scale, customer evidence, dilution risk and valuation before promotion.'});
  if(!pipelineSet.has('AMBQ')) d.opportunityPipeline.research.push({ticker:'AMBQ',status:'DISCOVERY · VALIDATING',reason:'Ultra-low-power edge-AI semiconductor exposure; verify post-IPO valuation, margins, customer concentration and durable growth before promotion.'});

  d.researchIntegrity=d.researchIntegrity||{};
  d.researchIntegrity.discoveryRule='Discovery engine must continue scanning beyond the legacy watchlist. Expensive/overheated names remain monitored for market intelligence; entry quality is assessed separately from thesis quality.';
  window.WAIS_MARKET_DATA=d;
})();
