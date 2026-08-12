// WAIS INCOME v1.1 — normalized percentage display layer.
// Public-output presentation only. Proprietary research logic remains private.
(function(){
  function pct(v,d=2){ const n=Number(v); return Number.isFinite(n)?`${n.toFixed(d)}%`:'—'; }
  function num(v,d=0){ const n=Number(v); return Number.isFinite(n)?n.toFixed(d):'—'; }

  function applyIncomeMetrics(){
    if(typeof livePrices==='undefined') return;
    document.querySelectorAll('.income-card').forEach(card=>{
      const ticker=card.querySelector('.income-title-row h3')?.textContent?.trim()?.toUpperCase();
      if(!ticker) return;
      const q=livePrices[ticker]||{};
      const ttm=Number(q.trailing12mDistributionYield);
      const rate30=Number(q.current30dIncomeRate);
      const sustainable=Number(q.sustainableIncomeYield);
      const consistency=Number(q.incomeConsistency);

      const hero=card.querySelector('.yield-hero');
      if(hero){
        const label=hero.querySelector('span');
        const strong=hero.querySelector('strong');
        const small=hero.querySelector('small');
        if(label) label.textContent='WAIS SUSTAINABLE INCOME YIELD*';
        if(strong) strong.textContent=pct(sustainable);
        if(small) small.textContent=`30D ${pct(rate30)} · Consistency ${num(consistency)}/100`;
      }

      const rows=[...card.querySelectorAll('.stock-meta > div')];
      const byLabel=(text)=>rows.find(r=>r.querySelector('span')?.textContent?.includes(text));
      const annual=byLabel('Annualized T12M Dist. Yield');
      if(annual){ annual.querySelector('span').textContent='TTM Income Yield*'; annual.querySelector('b').textContent=pct(ttm); }
      const monthly=byLabel('Est. Monthly Cash Yield');
      if(monthly){ monthly.querySelector('span').textContent='Current 30D Income Rate*'; monthly.querySelector('b').textContent=pct(rate30); }
      const weekly=rows.find(r=>/Est\. Weekly Cash Yield|Distribution Frequency/.test(r.querySelector('span')?.textContent||''));
      if(weekly){ weekly.querySelector('span').textContent='Income Consistency*'; weekly.querySelector('b').textContent=`${num(consistency)}/100`; }

      if(!byLabel('Sustainable Income Yield')){
        const meta=card.querySelector('.stock-meta');
        if(meta){
          const row=document.createElement('div');
          row.innerHTML=`<span>Sustainable Income Yield*</span><b>${pct(sustainable)}</b>`;
          meta.insertBefore(row,meta.children[5]||null);
        }
      }
    });

    const note=document.getElementById('incomeSystemNote');
    if(note) note.textContent='WAIS Income v1.1：Percentage 以四個不同用途顯示：TTM Income Yield = 過去12個月實際分派率；Current 30D Income Rate = 最近30日收入速度；Sustainable Income Yield = 以月度分派中位數及一致性修正後的研究性可持續收入率；Income Consistency = 0–100 的分派穩定度。Weekly / Monthly ETF 先轉成相同月度桶比較。5%+ screen 以 Sustainable Income Yield 為核心門檻之一，但不等於買入訊號；READY 1、NAV、Total Return、ROC及風險門檻仍然獨立。';
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setTimeout(applyIncomeMetrics,700);
    document.getElementById('incomeYieldFilter')?.addEventListener('change',()=>setTimeout(applyIncomeMetrics,80));
    window.addEventListener('focus',()=>setTimeout(applyIncomeMetrics,80));
  });
})();
