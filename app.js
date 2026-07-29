
const $ = (id) => document.getElementById(id);
const fmt = (n) => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);
let livePrices = {};
let livePricesUpdatedAt = null;

async function loadLivePrices() {
  try {
    const response = await fetch(
    `stock-prices.json?t=${Date.now()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    livePrices = data.prices || {};
    livePricesUpdatedAt = data.lastUpdated || null;
  } catch (error) {
    console.error("Unable to load stock prices:", error);
    livePrices = {};
    livePricesUpdatedAt = null;
  }
}

const topPicks = (window.WAIS_MARKET_DATA?.focusStocks || [])
  .filter(stock => stock.stance !== "WATCH")
  .map(stock => ({
    ticker: stock.ticker,
    company: stock.ticker,
    role: stock.category,
    risk: stock.risk,
    rating: stock.stance === "READY 1" ? "Build" : "Core",
    status: stock.stance,
    score: stock.evidenceConfidence,
    note: stock.note
  }));

const gems = (window.WAIS_MARKET_DATA?.focusStocks || [])
  .filter(stock => stock.stance === "WATCH")
  .map(stock => ({
    ticker: stock.ticker,
    company: stock.ticker,
    role: stock.category,
    risk: stock.risk,
    rating: stock.risk === "Very High" ? "Speculative" : "Research",
    status: stock.stance,
    score: stock.evidenceConfidence,
    note: stock.note
  }));

function renderCards(items, target){
  $(target).innerHTML = items.map(x => `
    <article class="stock-card">
      <span class="tag">${x.status}</span>
      <h3>${x.ticker}</h3>
      <div class="company">${x.company}</div>
      <div class="stock-meta">
        <div><span>Role</span><b>${x.role}</b></div>
        <div><span>WAIS Score</span><b>${x.score}/100</b></div>
        <div><span>Current Price</span><b>${
  livePrices[String(x.ticker).toUpperCase()]?.price != null
    ? fmt(livePrices[String(x.ticker).toUpperCase()].price)
    : "—"
}</b></div>
        <div><span>Risk</span><b>${x.risk}</b></div>
        <div><span>Rating</span><b>${x.rating}</b></div>
      </div>
      <p class="stock-note">${x.note}</p>
    </article>`).join('');
}

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
const savedRisk=Number(window.WAIS_MARKET_DATA?.riskScore ?? 38);
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
const savedWatchlist = JSON.parse(localStorage.getItem("waisWatchlist") || "[]");

const autoWatchlist = (window.WAIS_MARKET_DATA?.focusStocks || [])
  .filter(stock => stock.stance === "READY 1" || stock.stance === "WATCH")
  .map(stock => {
    const savedItem = savedWatchlist.find(
      item => String(item.ticker).toUpperCase() === stock.ticker.toUpperCase()
    );

    return {
      ticker: stock.ticker,
      status: stock.stance === "READY 1" ? "Ready" : "Watch",
      risk: stock.risk,
     entry: Number(savedItem?.entry ?? stock.entry) || 0,
target: Number(savedItem?.target ?? stock.target) || 0,
      note: stock.note
    };
  });

let watchlist = [
  ...autoWatchlist,
  ...savedWatchlist.filter(
    savedItem =>
      !autoWatchlist.some(
        autoItem =>
          autoItem.ticker.toUpperCase() ===
          String(savedItem.ticker).toUpperCase()
      )
  )
];

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
    <span>Current Price</span>
    <strong>${
      livePrices[String(item.ticker).toUpperCase()]?.price != null
        ? fmt(livePrices[String(item.ticker).toUpperCase()].price)
        : "—"
    }</strong>
  </div>

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

    ${autoWatchlist.some(autoItem => autoItem.ticker.toUpperCase() === String(item.ticker).toUpperCase()) ? "" : '<div class="watch-actions"><button class="danger-btn" type="button" onclick="removeWatchItem(' + index + ')">Remove</button></div>'}
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
function formatMarketValue(value, indicatorName) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "--";
  }

  if (indicatorName === "US10Y") {
    return `${number.toFixed(2)}%`;
  }

  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function showMarketChange(elementId, change, changePercent) {
  const element = $(elementId);
  if (!element) return;

  const pointChange = Number(change);
  const percentChange = Number(changePercent);

  element.classList.remove(
    "market-change-up",
    "market-change-down",
    "market-change-flat"
  );

  if (!Number.isFinite(pointChange) && !Number.isFinite(percentChange)) {
    element.textContent = "--";
    element.classList.add("market-change-flat");
    return;
  }

  const directionValue = Number.isFinite(percentChange)
    ? percentChange
    : pointChange;

  const sign = directionValue > 0 ? "+" : "";

  if (Number.isFinite(pointChange) && Number.isFinite(percentChange)) {
    element.textContent =
      `${sign}${pointChange.toFixed(2)} ` +
      `(${sign}${percentChange.toFixed(2)}%)`;
  } else if (Number.isFinite(percentChange)) {
    element.textContent = `${sign}${percentChange.toFixed(2)}%`;
  } else {
    element.textContent = `${sign}${pointChange.toFixed(2)}`;
  }

  if (directionValue > 0) {
    element.classList.add("market-change-up");
  } else if (directionValue < 0) {
    element.classList.add("market-change-down");
  } else {
    element.classList.add("market-change-flat");
  }
}

async function loadMarketIndicators() {
  const updatedElement = $("marketIndicatorsUpdated");

  try {
    const response = await fetch(
      `market-indicators.json?v=${Date.now()}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Market data request failed: ${response.status}`);
    }

    const data = await response.json();
    const indicators = data.indicators || data;

    const indicatorMap = {
    
  SP500: {
    valueId: "sp500Value",
    changeId: "sp500Change"
  },
  NASDAQ: {
    valueId: "nasdaqValue",
    changeId: "nasdaqChange"
  },
  NASDAQ100: {
    valueId: "nasdaq100Value",
    changeId: "nasdaq100Change"
  },
  DOW: {
    valueId: "dowValue",
    changeId: "dowChange"
  },
  SOX: {
    valueId: "soxValue",
    changeId: "soxChange"
  },
  VIX: {
    valueId: "vixValue",
    changeId: "vixChange"
  },
  US10Y: {
    valueId: "us10yValue",
    changeId: "us10yChange"
  },
  HSI: {
    valueId: "hsiValue",
    changeId: "hsiChange"
  },
  HSTECH: {
    valueId: "hstechValue",
    changeId: "hstechChange"
  }
};

    Object.entries(indicatorMap).forEach(([name, elementIds]) => {
      const indicator = indicators[name] || {};

      const value =
        indicator.value ??
        indicator.price ??
        indicator.current ??
        indicator.close;

      const change =
        indicator.change ??
        indicator.pointChange ??
        indicator.dailyChange;

      const changePercent =
        indicator.changePercent ??
        indicator.percentChange ??
        indicator.changePct;

      const valueElement = $(elementIds.valueId);

      if (valueElement) {
        valueElement.textContent = formatMarketValue(value, name);
      }

      showMarketChange(
        elementIds.changeId,
        change,
        changePercent
      );
    });

    const updatedTime =
      data.lastUpdated ||
      data.updatedAt ||
      data.timestamp;

    if (updatedElement) {
      if (updatedTime) {
        const date = new Date(updatedTime);

        updatedElement.textContent =
          `更新：${date.toLocaleString("en-CA")}`;
      } else {
        updatedElement.textContent = "市場資料已更新";
      }
    }

  } catch (error) {
    console.error("Failed to load market indicators:", error);

    if (updatedElement) {
      updatedElement.textContent = "市場資料暫時未能載入";
    }
  }
}
async function initializeApp() {
  await loadLivePrices();
  await loadMarketIndicators();

  renderCards(topPicks, "topPicksGrid");
  renderCards(gems, "hiddenGemsGrid");
  renderWatchlist();
}
initializeApp();
