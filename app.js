
const $ = (id) => document.getElementById(id);
const fmt = (n) => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);

const topPicks = [
  {ticker:'NVDA',company:'NVIDIA',role:'AI Compute',risk:'Medium',rating:'Core',status:'Wait',score:92,note:'AI 加速運算核心，但必須兼顧估值及市場預期。'},
  {ticker:'TSM',company:'TSMC',role:'Foundry',risk:'Medium',rating:'Core',status:'Wait',score:91,note:'先進製程與先進封裝關鍵供應商。'},
  {ticker:'AVGO',company:'Broadcom',role:'Networking / ASIC',risk:'Medium',rating:'Core',status:'Wait',score:89,note:'AI networking 與 custom silicon 具長期競爭力。'},
  {ticker:'MRVL',company:'Marvell',role:'AI Networking',risk:'Medium-High',rating:'Build',status:'Near Entry',score:86,note:'AI interconnect 與 custom silicon 催化劑值得追蹤。'},
  {ticker:'MU',company:'Micron',role:'HBM / Memory',risk:'High',rating:'Build',status:'Near Entry',score:84,note:'HBM 受惠明顯，但記憶體週期波動大。'},
  {ticker:'AXTI',company:'AXT',role:'Compound Materials',risk:'High',rating:'Research',status:'Watch',score:73,note:'上游材料潛力高，但財務與客戶集中度需驗證。'},
  {ticker:'COHR',company:'Coherent',role:'Photonics',risk:'High',rating:'Watch',status:'Wait',score:80,note:'光通訊長期受惠，短期要留意執行與負債。'},
  {ticker:'LITE',company:'Lumentum',role:'Optical Components',risk:'High',rating:'Watch',status:'Wait',score:78,note:'AI 光通訊相關，但收入波動及客戶週期要留意。'},
  {ticker:'TSEM',company:'Tower Semiconductor',role:'Specialty Foundry',risk:'Medium',rating:'Watch',status:'Wait',score:76,note:'特色製程穩健，需確認 AI 相關增量。'},
  {ticker:'AEHR',company:'Aehr Test Systems',role:'Testing',risk:'Very High',rating:'Speculative',status:'Wait',score:68,note:'測試設備具潛力，但收入集中與波動較高。'}
];

const gems = [
  {ticker:'AXTI',company:'AXT',role:'AI Materials',risk:'High',rating:'Research',status:'High Priority',score:73,note:'聚焦 InP、GaAs 等化合物半導體材料；需驗證 AI 光通訊需求轉化成盈利嘅速度。'},
  {ticker:'TSEM',company:'Tower Semiconductor',role:'Specialty Foundry',risk:'Medium',rating:'Watch',status:'Watch',score:76,note:'可留意電源管理、射頻及特色製程受惠程度。'},
  {ticker:'POET',company:'POET Technologies',role:'Photonics',risk:'Very High',rating:'Speculative',status:'Watch',score:62,note:'光子整合平台有想像空間，但商業化與融資風險高。'},
  {ticker:'IQE',company:'IQE plc',role:'Compound Semiconductor',risk:'Very High',rating:'Speculative',status:'Watch',score:60,note:'材料技術具價值，但要等待財務與需求改善證據。'}
];

function renderCards(items, target){
  $(target).innerHTML = items.map(x => `
    <article class="stock-card">
      <span class="tag">${x.status}</span>
      <h3>${x.ticker}</h3>
      <div class="company">${x.company}</div>
      <div class="stock-meta">
        <div><span>Role</span><b>${x.role}</b></div>
        <div><span>WAIS Score</span><b>${x.score}/100</b></div>
        <div><span>Risk</span><b>${x.risk}</b></div>
        <div><span>Rating</span><b>${x.rating}</b></div>
      </div>
      <p class="stock-note">${x.note}</p>
    </article>`).join('');
}
renderCards(topPicks,'topPicksGrid');
renderCards(gems,'hiddenGemsGrid');

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');
function showSection(id){
  navItems.forEach(x => x.classList.toggle('active',x.dataset.section===id));
  sections.forEach(x => x.classList.toggle('active',x.id===id));
  const active = [...navItems].find(x=>x.dataset.section===id);
  $('pageTitle').textContent = active ? active.textContent : 'Dashboard';
  $('sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navItems.forEach(x=>x.addEventListener('click',()=>showSection(x.dataset.section)));
document.querySelectorAll('[data-jump]').forEach(x=>x.addEventListener('click',()=>showSection(x.dataset.jump)));


$('todayDate').textContent = new Intl.DateTimeFormat('zh-Hant-CA',{year:'numeric',month:'long',day:'numeric'}).format(new Date());

let holdings = JSON.parse(localStorage.getItem('waisHoldings') || '[]');

function renderHoldings(){
  const body = $('holdingsTable');
  if(!holdings.length){
    body.innerHTML = '<tr><td colspan="7">暫時未有持倉。</td></tr>';
  }else{
    body.innerHTML = holdings.map((h,i)=>{
      const value=h.shares*h.price, cost=h.shares*h.cost, pl=value-cost;
      return `<tr>
        <td><b>${h.ticker}</b></td><td>${h.shares}</td><td>${fmt(h.cost)}</td><td>${fmt(h.price)}</td>
        <td>${fmt(value)}</td><td class="${pl>=0?'positive':''}">${fmt(pl)}</td>
        <td><button class="text-btn" onclick="removeHolding(${i})">Remove</button></td>
      </tr>`;
    }).join('');
  }
  const totalCost=holdings.reduce((s,h)=>s+h.shares*h.cost,0);
  const mv=holdings.reduce((s,h)=>s+h.shares*h.price,0);
  const pl=mv-totalCost;
  $('totalCost').textContent=fmt(totalCost);
  $('marketValue').textContent=fmt(mv);
  $('portfolioPL').textContent=fmt(pl);
  $('portfolioReturn').textContent=totalCost?((pl/totalCost)*100).toFixed(2)+'%':'0.00%';
  $('summaryPL').textContent=fmt(pl);
  $('summaryHoldings').textContent=holdings.length;
  $('holdingsCountLabel').textContent=`${holdings.length} 個持倉`;
  const assumedCash=100000;
  const investedPct=Math.min(100, Math.round(mv/(assumedCash+mv)*100));
  $('investedMetric').textContent=investedPct;
  $('summaryInvested').textContent=investedPct+'%';
  $('summaryCash').textContent=(100-investedPct)+'%';
}
window.removeHolding=(i)=>{holdings.splice(i,1);localStorage.setItem('waisHoldings',JSON.stringify(holdings));renderHoldings();}
$('holdingForm').addEventListener('submit',e=>{
  e.preventDefault();
  holdings.push({
    ticker:$('tickerInput').value.trim().toUpperCase(),
    shares:Number($('sharesInput').value),
    cost:Number($('costInput').value),
    price:Number($('priceInput').value)
  });
  localStorage.setItem('waisHoldings',JSON.stringify(holdings));
  e.target.reset(); renderHoldings();
});
$('clearHoldings').addEventListener('click',()=>{holdings=[];localStorage.removeItem('waisHoldings');renderHoldings();});
renderHoldings();

function riskState(score){
  if(score<=20)return {mode:'AGGRESSIVE',cash:15,label:'Aggressive',def:'NORMAL'};
  if(score<=40)return {mode:'WAIT',cash:25,label:'Normal',def:'NORMAL'};
  if(score<=60)return {mode:'CAUTIOUS',cash:40,label:'Cautious',def:'WARNING'};
  if(score<=80)return {mode:'DEFENSE',cash:60,label:'Defensive',def:'DEFENSIVE'};
  return {mode:'MOSTLY CASH',cash:85,label:'Crisis',def:'CRISIS'};
}
function updateRisk(score){
  const s=riskState(score);
  $('riskScoreMetric').textContent=score;
  $('riskProgress').style.width=score+'%';
  $('riskLabel').textContent=s.label;
  $('cashMetric').textContent=s.cash;
  $('marketMode').textContent=s.mode;
  $('actionPill').textContent=s.mode;
  $('defenseStatus').textContent=s.def;
  $('riskResultScore').textContent=score+' / 100';
  $('riskResultMode').textContent=s.label;
  $('cashRecommendation').textContent=s.cash+'%';
  $('cashRing').style.background=`conic-gradient(#88a8ff 0 ${s.cash}%,#1d2b45 ${s.cash}% 100%)`;
  localStorage.setItem('waisRiskScore',score);
}
const savedRisk=Number(localStorage.getItem('waisRiskScore') || 38);
$('riskSlider').value=savedRisk;updateRisk(savedRisk);
$('riskSlider').addEventListener('input',e=>updateRisk(Number(e.target.value)));

let journal = JSON.parse(localStorage.getItem('waisJournal') || '[]');
function renderJournal(){
  $('journalCount').textContent=journal.length;
  $('latestJournal').textContent=journal[0]?.title || '—';
  $('journalEntries').innerHTML=journal.map((j,i)=>`
    <article class="journal-entry">
      <button onclick="removeJournal(${i})">Delete</button>
      <span>${j.date}</span><h4>${j.title}</h4><p>${j.reason}</p>
    </article>`).join('');
}
window.removeJournal=(i)=>{journal.splice(i,1);localStorage.setItem('waisJournal',JSON.stringify(journal));renderJournal();}
$('journalForm').addEventListener('submit',e=>{
  e.preventDefault();
  journal.unshift({
    title:$('journalTitle').value.trim(),
    reason:$('journalReason').value.trim(),
    date:new Intl.DateTimeFormat('zh-Hant-CA',{year:'numeric',month:'long',day:'numeric'}).format(new Date())
  });
  localStorage.setItem('waisJournal',JSON.stringify(journal));
  e.target.reset();renderJournal();
});
renderJournal();

$('saveSnapshotBtn').addEventListener('click',()=>{
  const snapshot={
    savedAt:new Date().toISOString(),
    riskScore:Number(localStorage.getItem('waisRiskScore')||38),
    holdings,
    journal
  };
  const blob=new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='wais-snapshot.json';a.click();
  URL.revokeObjectURL(url);
});


// ===== WAIS INVEST v2: mobile menu =====
const sidebarOverlay = $('sidebarOverlay');

function closeMobileMenu(){
  $('sidebar').classList.remove('open');
  sidebarOverlay?.classList.remove('show');
  document.body.classList.remove('menu-open');
}

function toggleMobileMenu(){
  const willOpen = !$('sidebar').classList.contains('open');
  $('sidebar').classList.toggle('open', willOpen);
  sidebarOverlay?.classList.toggle('show', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
}

$('menuBtn').onclick = toggleMobileMenu;
sidebarOverlay?.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeMobileMenu();
});

// Replace the original menu closing behaviour with overlay-aware closing.
navItems.forEach(item => item.addEventListener('click', closeMobileMenu));
document.querySelectorAll('[data-jump]').forEach(item => item.addEventListener('click', closeMobileMenu));


// ===== WAIS INVEST v2: watchlist =====
let watchlist = JSON.parse(localStorage.getItem('waisWatchlist') || '[]');

const escapeHTML = (value='') => String(value)
  .replaceAll('&','&amp;')
  .replaceAll('<','&lt;')
  .replaceAll('>','&gt;')
  .replaceAll('"','&quot;')
  .replaceAll("'","&#039;");

function saveWatchlist(){
  localStorage.setItem('waisWatchlist', JSON.stringify(watchlist));
}

function renderWatchlist(){
  const target = $('watchlistCards');
  if(!target) return;

  $('watchTotal').textContent = watchlist.length;
  $('watchReady').textContent = watchlist.filter(
    item => item.status === 'Near Entry' || item.status === 'Ready'
  ).length;
  $('watchHighRisk').textContent = watchlist.filter(
    item => item.risk === 'High' || item.risk === 'Very High'
  ).length;

  if(!watchlist.length){
    target.innerHTML = '<div class="watch-empty">暫時未有觀察股票。</div>';
    return;
  }

  target.innerHTML = watchlist.map((item,index) => `
    <article class="watch-card">
      <div class="watch-card-head">
        <div>
          <h4>${escapeHTML(item.ticker)}</h4>
          <span class="watch-status">${escapeHTML(item.status)}</span>
        </div>
        <span class="tag">${escapeHTML(item.risk)} Risk</span>
      </div>

      <div class="watch-prices">
        <div>
          <span>Entry</span>
          <strong>${fmt(item.entry)}</strong>
        </div>
        <div>
          <span>Target</span>
          <strong>${fmt(item.target)}</strong>
        </div>
      </div>

      <div class="watch-meta">
        <span>Upside</span>
        <strong>${item.entry > 0 ? (((item.target-item.entry)/item.entry)*100).toFixed(1) : '0.0'}%</strong>
      </div>

      ${item.note ? `<p class="watch-note">${escapeHTML(item.note)}</p>` : ''}

      <div class="watch-actions">
        <button class="danger-btn" type="button" onclick="removeWatchItem(${index})">Remove</button>
      </div>
    </article>
  `).join('');
}

window.removeWatchItem = index => {
  watchlist.splice(index,1);
  saveWatchlist();
  renderWatchlist();
};

$('watchlistForm')?.addEventListener('submit', event => {
  event.preventDefault();

  const ticker = $('watchTicker').value.trim().toUpperCase();
  const entry = Number($('watchEntry').value);
  const target = Number($('watchTarget').value);

  if(!ticker || entry <= 0 || target <= 0){
    alert('請輸入有效股票代號、買入價及目標價。');
    return;
  }

  watchlist.unshift({
    ticker,
    entry,
    target,
    risk:$('watchRisk').value,
    status:$('watchStatus').value,
    note:$('watchNote').value.trim()
  });

  saveWatchlist();
  event.target.reset();
  $('watchRisk').value = 'Medium';
  $('watchStatus').value = 'Wait';
  renderWatchlist();
});

$('clearWatchlist')?.addEventListener('click', () => {
  if(!watchlist.length) return;
  if(confirm('確定清除全部 Watchlist？')){
    watchlist = [];
    saveWatchlist();
    renderWatchlist();
  }
});

renderWatchlist();
