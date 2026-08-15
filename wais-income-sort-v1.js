// WAIS Income sorting: within each income section, show the highest Current 30D Income Rate first.
(function(){
  function rate(card){
    const n=Number(card?.dataset?.income30d);
    return Number.isFinite(n)?n:-Infinity;
  }
  function sort(){
    const cards=[...document.querySelectorAll('#income .income-card')];
    const parents=[...new Set(cards.map(c=>c.parentElement).filter(Boolean))];
    parents.forEach(parent=>{
      const group=[...parent.children].filter(el=>el.classList?.contains('income-card'));
      group.sort((a,b)=>rate(b)-rate(a)).forEach(card=>parent.appendChild(card));
    });
    document.querySelectorAll('#income .income-filter-panel h3').forEach(h=>{
      h.title='Cards are sorted high-to-low by Current 30D Income Rate within each income section.';
    });
  }
  function schedule(){setTimeout(sort,120);setTimeout(sort,420);}
  document.addEventListener('DOMContentLoaded',()=>setTimeout(sort,1500));
  window.addEventListener('wais:quotes-updated',schedule);
  document.addEventListener('change',e=>{if(e.target?.id==='income30dFilter'||e.target?.id==='incomeYieldFilter') schedule();});
  document.addEventListener('click',e=>{if(e.target.closest?.('.income-stage-btn')) schedule();});
  window.WAIS_SORT_INCOME_HIGH_TO_LOW=sort;
})();
