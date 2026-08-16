// WAIS Route Intelligence follow-up — 2026-08-16 evening.
// Sanitized evidence summary only; no proprietary scoring weights.
(function(){
  const d=window.WAIS_MARKET_DATA||(window.WAIS_MARKET_DATA={});
  d.routeIntegrity={
    asOf:'2026-08-16 19:45 ET',
    version:'2.0',
    rule:'Stock READY ≠ Leveraged READY ≠ Income READY. A verified live product must be shown even when route metrics are incomplete; incomplete metrics mean VALIDATING / DATA GAP, not No Product. Best requires sufficient activity/liquidity/tracking or income/NAV/ROC/total-return evidence.',
    checked:[
      'GFS: GFSG verified as a live 2x daily route; route remains VALIDATING until liquidity/tracking evidence passes.',
      'COHR: COHH verified as a live 2x daily route; no leveraged READY approval.',
      'LITE: LITX verified as a live 2x daily route; no leveraged READY approval.',
      'AAOI: AAOG and AAOX verified as live 2x daily routes; no leveraged READY approval.',
      'MRVL: MRVU and MRVX verified as live 2x daily routes; no Best label until current route metrics are compared.',
      'MOD: leveraged product filings located, but current live ticker/activity evidence remains DATA GAP.',
      'POWL: no dedicated leveraged or same-underlying income route independently verified in the current review.',
      'RKLB: RKXX remains a route-data gap where its feed fails; RKLX and stock decisions remain independent.'
    ]
  };

  d.researchIntegrity=d.researchIntegrity||{};
  const e=Array.isArray(d.researchIntegrity.evidenceOfWork)?d.researchIntegrity.evidenceOfWork:[];
  const idx=e.findIndex(x=>String(x.layer||'').toUpperCase()==='ROUTE INTELLIGENCE');
  const routeEvidence={
    layer:'Route Intelligence',
    status:'CHECKED + DATA GAP',
    evidence:'Route registry refreshed after exchange/issuer/SEC verification. Live leveraged routes added for GFS (GFSG), COHR (COHH), LITE (LITX), AAOI (AAOG/AAOX) and MRVL (MRVU/MRVX). MOD remains FILED/LIVE DATA GAP; POWL has no independently verified dedicated route. Product existence is not Best/READY; activity, tracking, liquidity and income/NAV/ROC/total-return gates remain independent.'
  };
  if(idx>=0)e[idx]=routeEvidence;else e.push(routeEvidence);
  d.researchIntegrity.evidenceOfWork=e;

  d.actionPlan=Array.isArray(d.actionPlan)?d.actionPlan:[];
  const line='Route Intelligence v2：已修正 verified-product coverage；GFS/COHR/LITE/AAOI/MRVL 的已驗證 leveraged route 必須顯示產品身份，若activity/tracking未齊則標 VALIDATING / DATA GAP，不可再誤寫 No verified product；MOD/POWL 保留明確 evidence gap。';
  if(!d.actionPlan.some(x=>String(x).includes('Route Intelligence v2')))d.actionPlan.push(line);

  window.WAIS_MARKET_DATA=d;
})();
