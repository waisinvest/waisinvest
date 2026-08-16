// WAIS sidebar priority order — Dashboard, Portfolio, Top Picks, Route Intelligence, Watchlist...
(function(){
  function apply(){
    const nav=document.querySelector('.nav-list');
    if(!nav) return;
    const top=nav.querySelector('[data-section="top-picks"]');
    const route=nav.querySelector('[data-section="route-intelligence"]');
    const watch=nav.querySelector('[data-section="watchlist"]');
    if(top&&watch){ nav.insertBefore(top,watch); }
    if(route&&watch){ nav.insertBefore(route,watch); }
    if(top&&route&&route.previousElementSibling!==top){ nav.insertBefore(route,top.nextElementSibling); }
  }
  document.addEventListener('DOMContentLoaded',apply);
  window.addEventListener('load',apply);
})();
