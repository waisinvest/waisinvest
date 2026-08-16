// WAIS sidebar priority order — Top Picks should appear before Watchlist.
(function(){
  function apply(){
    const nav=document.querySelector('.nav-list');
    if(!nav) return;
    const top=nav.querySelector('[data-section="top-picks"]');
    const watch=nav.querySelector('[data-section="watchlist"]');
    if(top&&watch&&watch.previousElementSibling!==top){
      nav.insertBefore(top,watch);
    }
  }
  document.addEventListener('DOMContentLoaded',apply);
  window.addEventListener('load',apply);
})();
