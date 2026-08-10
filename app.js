const $ = (id) => document.getElementById(id);
const fmt = (n) => new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);
const fmtUSD = (n) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
let livePrices = {};
let livePricesUpdatedAt = null;
let marketIndicatorsSnapshot = null;

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

const stockUniverse = window.WAIS_MARKET_DATA?.focusStocks || [];

const topPicks = stockUniverse
  .filter(stock => stock.bucket === "TOP_PICK")
  .map(stock => ({
    ticker: stock.ticker,
    company: stock.company || stock.ticker,
    role: stock.category,
    risk: stock.risk,
    rating: stock.rating || (stock.stance === "READY 1" ? "Build" : "Core"),
    status: stock.stance,
    score: stock.evidenceConfidence,
    entry: Number(stock.entry) || null,
    target: Number(stock.target) || null,
    note: stock.note
  }));

const gems = stockUniverse
  .filter(stock => stock.bucket === "HIDDEN_GEM")
  .map(stock => ({
    ticker: stock.ticker,
    company: stock.company || stock.ticker,
    role: stock.category,
    risk: stock.risk,
    rating: stock.rating || (stock.risk === "Very High" ? "Speculative" : "Research"),
    status: stock.stance,
    score: stock.evidenceConfidence,
    entry: Number(stock.entry) || null,
    target: Number(stock.target) || null,
    note: stock.note
  }));

const incomeEtfs = window.WAIS_MARKET_DATA?.incomeEtfs || [];

function renderCards(items, target){
  const targetElement = $(target);
  if(!targetElement) return;

  targetElement.innerHTML = items.map(x => {
    const ticker = String(x.ticker).toUpperCase();
    const current = livePrices[ticker]?.price;
    const entry = Number(x.entry);
    const targetPrice = Number(x.target);
    const upside = Number.isFinite(entry) && entry > 0 && Number.isFinite(targetPrice) && targetPrice > 0
      ? (((targetPrice-entry)/entry)*100).toFixed(1) + '%'
      : '—';

    return `
      <article class="stock-card">
        <span class="tag">${escapeHTML(x.status)}</span>
        <h3>${escapeHTML(x.ticker)}</h3>
        <div class="company">${escapeHTML(x.company)}</div>
        <div class="stock-meta">
          <div><span>Role</span><b>${escapeHTML(x.role)}</b></div>
          <div><span>WAIS Score</span><b>${escapeHTML(x.score)}/100</b></div>
          <div><span>Current Price</span><b>${current != null ? fmtUSD(current) : "—"}</b></div>
          <div><span>Entry</span><b>${Number.isFinite(entry) && entry > 0 ? fmtUSD(entry) : "—"}</b></div>
          <div><span>Target</span><b>${Number.isFinite(targetPrice) && targetPrice > 0 ? fmtUSD(targetPrice) : "—"}</b></div>
          <div><span>Planned Upside</span><b>${upside}</b></div>
          <div><span>Risk</span><b>${escapeHTML(x.risk)}</b></div>
          <div><span>Rating</span><b>${escapeHTML(x.rating)}</b></div>
        </div>
        <p class="stock-note">${escapeHTML(x.note)}</p>
      </article>`;
  }).join('');
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

function getHoldingPrice(holding){
  const ticker = String(holding.ticker || '').toUpperCase();
  const live = Number(livePrices[ticker]?.price);
  if(Number.isFinite(live) && live > 0) return live;

  const fallback = Number(holding.price);
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 0;
}

function renderHoldings(){
  const body = $('holdingsTable');
  if(!body) return;

  if(!holdings.length){
    body.innerHTML = '<tr><td colspan="7">暫時未有持倉。</td></tr>';
  }else{
    body.innerHTML = holdings.map((h,i)=>{
      const currentPrice = getHoldingPrice(h);
      const value = h.shares * currentPrice;
      const cost = h.shares * h.cost;
      const pl = value - cost;
      const priceSource = livePrices[String(h.ticker).toUpperCase()]?.price != null ? 'WAIS' : 'Manual';

      return `<tr>
        <td><b>${escapeHTML(h.ticker)}</b></td>
        <td>${h.shares}</td>
        <td>${fmt(h.cost)}</td>
        <td>${currentPrice > 0 ? `${fmtUSD(currentPrice)} <small>${priceSource}</small>` : '—'}</td>
        <td>${fmt(value)}</td>
        <td class="${pl>=0?'positive':''}">${fmt(pl)}</td>
        <td><button class="text-btn" onclick="removeHolding(${i})">Remove</button></td>
      </tr>`;
    }).join('');
  }

  const totalCost = holdings.reduce((s,h)=>s+h.shares*h.cost,0);
  const mv = holdings.reduce((s,h)=>s+h.shares*getHoldingPrice(h),0);
  const pl = mv-totalCost;

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
  const ticker = $('tickerInput').value.trim().toUpperCase();
  const manualPrice = Number($('priceInput').value);
  const autoPrice = Number(livePrices[ticker]?.price);

  holdings.push({
    ticker,
    shares:Number($('sharesInput').value),
    cost:Number($('costInput').value),
    price:Number.isFinite(manualPrice) && manualPrice > 0
      ? manualPrice
      : (Number.isFinite(autoPrice) && autoPrice > 0 ? autoPrice : 0)
  });
  localStorage.setItem('waisHoldings',JSON.stringify(holdings));
  e.target.reset(); renderHoldings();
});
renderHoldings();

function riskState(score, cashOverride = null){
  let state;
  if(score<=20) state = {mode:'AGGRESSIVE',cash:15,label:'Aggressive',def:'NORMAL'};
  else if(score<=40) state = {mode:'WAIT',cash:25,label:'Normal / Selective',def:'NORMAL'};
  else if(score<=60) state = {mode:'CAUTIOUS',cash:30,label:'Cautious',def:'CAUTIOUS'};
  else if(score<=80) state = {mode:'DEFENSE',cash:50,label:'Defensive',def:'DEFENSIVE'};
  else state = {mode:'MOSTLY CASH',cash:75,label:'Crisis',def:'CRISIS'};

  if(Number.isFinite(Number(cashOverride))){
    state.cash = Number(cashOverride);
  }
  return state;
}
function updateRisk(score, cashOverride = null){
  const s=riskState(score, cashOverride);
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
const systemCash=Number(window.WAIS_MARKET_DATA?.recommendedCash);
$('riskSlider').value=savedRisk;
updateRisk(savedRisk, systemCash);
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
  .filter(stock => stock.showInWatchlist === true)
  .map(stock => {
    const savedItem = savedWatchlist.find(
      item => String(item.ticker).toUpperCase() === stock.ticker.toUpperCase()
    );

    return {
      ticker: stock.ticker,
      status: stock.stance === "READY 1" ? "Ready" : stock.stance === "WATCH" ? "Watch" : "Wait",
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
        ? fmtUSD(livePrices[String(item.ticker).toUpperCase()].price)
        : "—"
    }</strong>
  </div>

  <div>
    <span>Entry</span>
    <strong>${item.entry > 0 ? fmtUSD(item.entry) : "—"}</strong>
  </div>

  <div>
    <span>Target</span>
    <strong>${item.target > 0 ? fmtUSD(item.target) : "—"}</strong>
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
function renderDashboardResearchLists(){
  const compactList = document.querySelector('#dashboard .compact-list');
  if(compactList){
    const dashboardPicks = topPicks.slice(0,5);
    compactList.innerHTML = dashboardPicks.length
      ? dashboardPicks.map((x,index) => `
        <div><span class="rank">${index+1}</span><b>${escapeHTML(x.ticker)}</b><em>${escapeHTML(x.status)}</em></div>
      `).join('')
      : '<div><span class="rank">—</span><b>No READY / Top Pick</b><em>Wait</em></div>';
  }

  const gemGrid = document.querySelector('#dashboard .gem-grid');
  if(gemGrid){
    gemGrid.innerHTML = gems.slice(0,4).map(x => `
      <div class="mini-card">
        <b>${escapeHTML(x.ticker)}</b>
        <span>${escapeHTML(x.role)}</span>
        <small>${escapeHTML(x.rating)}</small>
      </div>
    `).join('');
  }
}

function renderWeeklyPlan(){
  const target = $('weeklyPlan');
  const plan = window.WAIS_MARKET_DATA?.actionPlan || [];
  if(!target || !plan.length) return;

  target.innerHTML = plan.slice(0,5).map((item,index) => `
    <div><b>${String(index+1).padStart(2,'0')}</b><span>${escapeHTML(item)}</span></div>
  `).join('');
}

function renderDailyThought(){
  const thought = window.WAIS_MARKET_DATA?.dailyThought;
  const box = document.querySelector('.daily-thought');
  if(!thought || !box) return;

  box.innerHTML = `
    <div class="daily-thought-label">WAIS 今日思考｜WAIS Thought of the Day｜${escapeHTML(thought.date || '')}</div>
    <div class="daily-thought-zh">${escapeHTML(thought.zh || '')}</div>
    <div class="daily-thought-en">${escapeHTML(thought.en || '')}</div>
  `;
}


function renderEconomicEvents(){
  const events = window.WAIS_MARKET_DATA?.weeklyEvents || [];
  const target = $('economicEventsList');
  const updated = $('economicEventsUpdated');
  if(!target) return;

  if(updated){
    updated.textContent = `最後核對：${window.WAIS_MARKET_DATA?.lastUpdated || '—'}｜官方日程`;
  }

  target.innerHTML = events.length
    ? events.map((event,index) => `
      <div>
        <span>${String(index+1).padStart(2,'0')}</span>
        <p>
          <strong>${escapeHTML(event.date || '')}｜${escapeHTML(event.event || '')}</strong><br>
          ${escapeHTML(event.time || '')}${event.referenceMonth ? `｜${escapeHTML(event.referenceMonth)}` : ''}<br>
          ${escapeHTML(event.waisNote || '')}
        </p>
      </div>
    `).join('')
    : '<div><span>—</span><p>暫時沒有已確認的高影響事件。</p></div>';
}

function renderWeeklyMarketNotes(){
  const notes = window.WAIS_MARKET_DATA?.weeklyMarketNotes || [];
  const target = $('weeklyMarketNotesList');
  const review = $('weeklyMarketReviewDate');
  const riskNote = $('weeklyMarketRiskNote');
  if(!target) return;

  if(review){
    review.textContent = `最後更新：${window.WAIS_MARKET_DATA?.lastUpdated || '—'}｜策略檢視`;
  }

  target.innerHTML = notes.length
    ? notes.slice(0,4).map((item,index) => `
      <div>
        <span>${String(index+1).padStart(2,'0')}</span>
        <p>
          <strong>${escapeHTML(item.title || '')}</strong><br>
          ${escapeHTML(item.body || '')}
        </p>
      </div>
    `).join('')
    : '<div><span>—</span><p>暫時沒有新的 WAIS 策略重點。</p></div>';

  if(riskNote){
    const risk = window.WAIS_MARKET_DATA?.riskScore ?? '—';
    const cash = window.WAIS_MARKET_DATA?.recommendedCash ?? '—';
    const readyCount = (window.WAIS_MARKET_DATA?.readyList || []).length;
    riskNote.textContent =
      `WAIS RISK NOTE · Market Risk ${risk}/100｜${window.WAIS_MARKET_DATA?.marketMode || '—'}｜建議約${cash}%現金｜READY 1：${readyCount}。Calendar 負責「何時發生」；本欄只講「市場影響與部署」。`;
  }
}

function renderTechnicalSummary(){
  const configs = window.WAIS_MARKET_DATA?.technicalSummary || [];
  const target = $('waisTechnicalSummary');
  const updated = $('technicalSummaryUpdated');
  if(!target) return;

  const data = marketIndicatorsSnapshot || {};
  const indicators = data.indicators || {};
  const dataAsOf = data.dataAsOf || data.marketDate || window.WAIS_MARKET_DATA?.dataAsOf || '—';
  const fileUpdated = data.lastUpdated ? new Date(data.lastUpdated).toLocaleString("en-CA") : '—';

  if(updated){
    updated.textContent = `市場數據截至：${dataAsOf}｜資料檔更新：${fileUpdated}｜NOT REAL-TIME`;
  }

  target.innerHTML = configs.length
    ? configs.map(item => {
        const indicator = indicators[item.key] || {};
        const value = formatMarketValue(indicator.value, item.key);
        let move = '--';

        if(item.key === 'VIX' && Number.isFinite(Number(indicator.value))){
          move = `Level ${Number(indicator.value).toFixed(2)}`;
        } else if(item.key === 'US10Y' && Number.isFinite(Number(indicator.value))){
          move = `${Number(indicator.value).toFixed(2)}%`;
        } else if(Number.isFinite(Number(indicator.changePercent))){
          const pct = Number(indicator.changePercent);
          move = `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
        }

        return `
          <article class="research-card">
            <span>${escapeHTML(item.signal || 'WAIS')}</span>
            <h3>${escapeHTML(item.name || item.key || '')}</h3>
            <div class="stock-meta">
              <div><span>Value</span><b>${escapeHTML(value)}</b></div>
              <div><span>Move / Level</span><b>${escapeHTML(move)}</b></div>
              <div><span>Signal</span><b>${escapeHTML(item.signal || '—')}</b></div>
              <div><span>As of</span><b>${escapeHTML(indicator.asOf || dataAsOf)}</b></div>
            </div>
            <p>${escapeHTML(item.note || '')}</p>
          </article>
        `;
      }).join('')
    : '<article class="research-card"><span>WAIS</span><h3>No verified summary</h3><p>等待已確認市場資料。</p></article>';
}

function renderIncomeEtfs(){
  const target = $('incomeEtfGrid');
  if(!target) return;

  const items = incomeEtfs;
  const ready = items.filter(item => String(item.status).toUpperCase().includes('READY')).length;

  if($('incomeUniverseCount')) $('incomeUniverseCount').textContent = items.length;
  if($('incomeReadyCount')) $('incomeReadyCount').textContent = ready;
  if($('incomeDefenseStatus')){
    $('incomeDefenseStatus').textContent =
      window.WAIS_MARKET_DATA?.incomeDefenseStatus ||
      window.WAIS_MARKET_DATA?.marketMode ||
      'CAUTIOUS';
  }

  if($('incomeUpdated')){
    const updatedText = livePricesUpdatedAt
      ? new Date(livePricesUpdatedAt).toLocaleString("en-CA")
      : '—';
    $('incomeUpdated').textContent =
      `價格／分派資料檔更新：${updatedText}｜Delayed / closing data`;
  }

  target.innerHTML = items.map(item => {
    const priceKey = String(item.priceSymbol || item.ticker || '').toUpperCase();
    const quote = livePrices[priceKey] || {};
    const price = quote.price != null
      ? `${quote.currency || item.currency || ''} ${Number(quote.price).toFixed(2)}`.trim()
      : '—';
    const priceDate = quote.asOf || quote.priceDate || '—';

    const distribution =
      quote.lastDistribution != null
        ? `${quote.currency || item.currency || ''} ${Number(quote.lastDistribution).toFixed(4)}`.trim()
        : '—';
    const distributionDate = quote.lastDistributionDate || '—';

    const trailingYield =
      quote.trailing12mDistributionYield != null
        ? `${Number(quote.trailing12mDistributionYield).toFixed(2)}%`
        : '—';

    return `
      <article class="stock-card">
        <span class="tag">${escapeHTML(item.status || 'RESEARCH')}</span>
        <h3>${escapeHTML(item.ticker || '')}</h3>
        <div class="company">${escapeHTML(item.name || '')}</div>
        <div class="stock-meta">
          <div><span>Current / Last Close</span><b>${escapeHTML(price)}</b></div>
          <div><span>Price Date</span><b>${escapeHTML(priceDate)}</b></div>
          <div><span>Last Distribution</span><b>${escapeHTML(distribution)}</b></div>
          <div><span>Distribution Date</span><b>${escapeHTML(distributionDate)}</b></div>
          <div><span>T12M Dist. Yield*</span><b>${escapeHTML(trailingYield)}</b></div>
          <div><span>Frequency</span><b>${escapeHTML(item.frequency || '—')}</b></div>
          <div><span>Category</span><b>${escapeHTML(item.category || '—')}</b></div>
          <div><span>Income Quality</span><b>${escapeHTML(item.incomeQuality || 'Research')}</b></div>
          <div><span>NAV Risk</span><b>${escapeHTML(item.navRisk || '—')}</b></div>
          <div><span>Upside Drag</span><b>${escapeHTML(item.upsideDrag || '—')}</b></div>
        </div>
        <p class="stock-note">${escapeHTML(item.note || '')}</p>
      </article>
    `;
  }).join('');

  const note = document.querySelector('#income .weekly-risk-note');
  if(note){
    note.textContent =
      'WAIS Income：價格及最近分派由 stock-prices.json 自動更新；*T12M Distribution Yield 為最近12個月分派總額 ÷ 最近收市價的衍生值，並非基金公司官方 forward yield。所有數據均標示日期，並非即時報價。';
  }
}

function formatMarketValue(value, indicatorName) {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

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

  const pointChange =
    change === null || change === undefined || change === ""
      ? NaN
      : Number(change);

  const percentChange =
    changePercent === null || changePercent === undefined || changePercent === ""
      ? NaN
      : Number(changePercent);

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
    marketIndicatorsSnapshot = data;
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
  },
  HSIF: {
    valueId: "hsifValue",
    changeId: "hsifChange"
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

    const dataAsOf =
      data.dataAsOf ||
      data.marketDate ||
      Object.values(indicators)
        .map(x => x?.asOf)
        .filter(Boolean)[0] ||
      "—";

    const titleElement = $("marketIndicatorsTitle");
    if (titleElement) {
      titleElement.textContent = `全球市場最新指標（截至 ${dataAsOf}）`;
    }

    if (updatedElement) {
      if (updatedTime) {
        const date = new Date(updatedTime);
        updatedElement.textContent =
          `資料檔更新：${date.toLocaleString("en-CA")}｜NOT REAL-TIME`;
      } else {
        updatedElement.textContent = `數據截至：${dataAsOf}｜NOT REAL-TIME`;
      }
    }

    renderTechnicalSummary();

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

  renderHoldings();
  renderCards(topPicks, "topPicksGrid");
  renderCards(gems, "hiddenGemsGrid");
  renderWatchlist();
  renderDashboardResearchLists();
  renderWeeklyPlan();
  renderDailyThought();
  renderEconomicEvents();
  renderWeeklyMarketNotes();
  renderIncomeEtfs();
}
initializeApp();
