// WAIS Route Registry v2.2 — sanitized public route universe.
// Product existence/listing is research evidence only. It is never a READY or Best approval.
// Inclusion rule: an underlying appears in Route Intelligence only when at least one independently verified leveraged or income product exists.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  const clean=s=>String(s||'').trim().toUpperCase();
  const stock=t=>(d.focusStocks||[]).find(x=>clean(x.ticker)===clean(t));
  const stockStatus=t=>stock(t)?.stance||'WATCH / REVIEW';

  const route=(ticker,leveraged=[],income=[],extra={})=>({
    stock:ticker,
    stockStatus:stockStatus(ticker),
    leveraged,
    leveragedStatus:leveraged.length?'VALIDATING · VERIFIED PRODUCT':'NO VERIFIED LIVE ROUTE',
    income,
    incomeStatus:income.length?'VALIDATING':'NO VERIFIED ROUTE',
    preferred:'NONE / VALIDATING',
    ...extra
  });

  d.relatedRoutes={
    GFS:route('GFS',['GFSG'],[],{
      preferred:'STOCK / PENDING',
      routeResearchNote:'GFSG is a verified listed 2x daily GFS product. Leveraged preference remains unapproved until activity, spread and tracking evidence pass.'
    }),
    NVDA:route('NVDA',['NVDL','NVDX','NVDU','NVDB'],['NVDY','NVYY','NYYY']),
    GOOGL:route('GOOGL',['GGLL','GOU','GOOL'],['GOOY','GOOW','GOOP']),
    MU:route('MU',['MUU','MULL','MIC'],['MUYY','MUIB'],{
      routeResearchNote:'MUYY and MUIB are separate income routes. MUYY has established weekly distributions and materially stronger observed trading activity in the current WAIS feed; MUIB is newly launched and remains DATA GAP for distribution-history metrics. Income READY remains independent of the stock/leveraged route.'
    }),
    AVGO:route('AVGO',['AVL','AVGU','AVGX','AVGG','AVGC'],['AVGW']),
    RKLB:route('RKLB',['RKLX','RKX'],[],{
      routeResearchNote:'RKLX and Corgi RKX are independently verified 2x long RKLB routes. RKX replaces the incorrect RKXX symbol. RKLZ is a -2x inverse product and is not included in the bullish long-route ranking.'
    }),
    TSEM:route('TSEM',['TSEG','TSEU'],[]),
    AXTI:route('AXTI',['AXTX','AXTU','AXTL','AXTC'],[]),
    TSM:route('TSM',['TSMX','TSMU','TSMG','TWSC'],['TSMY','TMYY']),
    MRVL:route('MRVL',['MRVU','MRVX'],[],{
      preferred:'STOCK / REVIEW',
      routeResearchNote:'MRVU and MRVX are verified 2x daily MRVL routes; Best remains withheld until current activity/tracking comparison passes.'
    }),
    COHR:route('COHR',['COHH'],[],{
      preferred:'STOCK / REVIEW',
      routeResearchNote:'COHH is a verified listed 2x daily COHR route. Route identity does not imply leveraged approval.'
    }),
    LITE:route('LITE',['LITX'],[],{
      preferred:'NONE / VALIDATING',
      routeResearchNote:'LITX is a verified 2x daily LITE route. High underlying volatility and route evidence still require independent validation.'
    }),
    AAOI:route('AAOI',['AAOG','AAOX'],[],{
      preferred:'NONE / VALIDATING',
      routeResearchNote:'AAOG and AAOX are verified 2x daily AAOI routes. Activity/tracking and extreme underlying volatility must pass before any preference.'
    })
  };

  d.routeRegistry={
    version:'2.2',
    asOf:'2026-08-16 21:05 ET',
    inclusionRule:'Only underlyings with at least one independently verified leveraged or income product are shown in Route Intelligence. Stock-only names stay in Top Picks / Watchlist.',
    rule:'Stock READY ≠ Leveraged READY ≠ Income READY. Verified product existence is not approval. Best requires sufficient current activity/liquidity/tracking or income/NAV/ROC/total-return evidence; otherwise VALIDATING / DATA GAP.',
    verifiedCoverage:['GFS/GFSG','NVDA','GOOGL','MU/MUYY+MUIB','AVGO','RKLB/RKLX+RKX','TSEM','AXTI','TSM','MRVL/MRVU+MRVX','COHR/COHH','LITE/LITX','AAOI/AAOG+AAOX'],
    excludedStockOnly:['POWL','MOD'],
    explicitGaps:['MUIB: new product with insufficient distribution history for sustainable-income comparison','RKX: verified live 2x long RKLB route; current activity/tracking data must refresh after ticker correction','POWL: no dedicated leveraged/income route independently verified — excluded from Route Intelligence','MOD: leveraged filing research exists but no independently verified live tradable route — excluded until verification']
  };

  window.WAIS_MARKET_DATA=d;
})();