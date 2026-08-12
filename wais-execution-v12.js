// WAIS EXECUTION v1.2 — sanitized public execution layer.
// Public frontend receives labels/reasons only. Proprietary weights, private portfolio data,
// credentials and internal model rules must remain outside this repository.
(() => {
  const d = window.WAIS_MARKET_DATA || (window.WAIS_MARKET_DATA = {});

  d.executionSystem = {
    version: 'WAIS EXECUTION v1.2',
    updatedAt: '2026-08-12T13:55:00-04:00',
    principle: 'Technical analysis is continuous from Candidate onward; READY 1 is not the first time technical evidence is considered.',
    stages: [
      'DISCOVERY / RESEARCH',
      'CANDIDATE',
      'CANDIDATE+',
      'TECH READY / SCOUT ENTRY',
      'READY 1',
      'ADD / HOLD / PROTECT / EXIT'
    ],
    scoutEntry: {
      purpose: 'Allow a deliberately small evidence-based starter position before full READY 1 when fundamentals, catalysts and risk/reward are already strong and technical structure is beginning to transition.',
      guardrails: [
        'No Scout Entry from price alone.',
        'Require early technical transition evidence across structure, volume/momentum, moving-average reclaim/repair, relative strength and support/invalidation.',
        'Keep the starter tranche materially smaller than a normal READY 1 first tranche.',
        'Predefine invalidation; failed transition returns the name to Candidate/Candidate+ without averaging down automatically.',
        'Earnings proximity, macro-event risk, liquidity and extended-hours quality can block or reduce a Scout Entry.',
        'Thin pre-market/after-hours moves are evidence, not equivalent to regular-session confirmation.'
      ]
    },
    ready1: {
      purpose: 'Full first-tranche authorization after price, fundamentals, catalysts, event risk and technical confirmation align.',
      rule: 'TECH READY can precede READY 1; READY 1 remains the stronger confirmation state.'
    }
  };

  const byTicker = Object.fromEntries((d.focusStocks || []).map(s => [String(s.ticker || '').toUpperCase(), s]));

  // Current sanitized execution labels. These labels are deliberately separate from the main stance
  // so the website can show early technical progress without falsely presenting a full buy signal.
  const stageUpdates = {
    GFS: {
      executionStage: 'CANDIDATE+ · TECH WATCH',
      executionAction: 'WAIT FOR TRANSITION',
      executionReason: 'Price has revisited the planned entry area, but the latest WAIS quote snapshot remains below the 20D and 50D moving averages and has not produced enough regular-session confirmation for Scout Entry or READY 1.'
    },
    POWL: {
      executionStage: 'CANDIDATE+ · TECH WATCH',
      executionAction: 'WAIT FOR RECLAIM / SUPPORT',
      executionReason: 'Fundamental case remains investable enough to monitor closely, but trend repair is incomplete; keep it in the early-transition queue rather than waiting silently for READY 1.'
    },
    MOD: {
      executionStage: 'CANDIDATE+ · TECH WATCH',
      executionAction: 'WATCH FOR SCOUT TRIGGER',
      executionReason: 'Fundamentals are relatively strong and price is near the planned zone; technical transition is now monitored continuously for a possible small Scout Entry before full READY 1.'
    }
  };

  Object.entries(stageUpdates).forEach(([ticker, patch]) => {
    if (!byTicker[ticker]) return;
    Object.assign(byTicker[ticker], patch);
    const prefix = `Execution: ${patch.executionStage} · ${patch.executionAction}. `;
    if (!String(byTicker[ticker].note || '').startsWith('Execution:')) {
      byTicker[ticker].note = prefix + String(byTicker[ticker].note || '');
    }
  });

  d.actionPlan = Array.isArray(d.actionPlan) ? d.actionPlan : [];
  const executionAction = 'Execution v1.2：Candidate/Candidate+ 起已持續做技術分析；符合早期轉勢證據可先升 TECH READY / Scout Entry，小注試倉，不再等到完整 READY 1 才第一次看技術。';
  if (!d.actionPlan.some(x => String(x).includes('Execution v1.2'))) d.actionPlan.unshift(executionAction);

  d.weeklyMarketNotes = Array.isArray(d.weeklyMarketNotes) ? d.weeklyMarketNotes : [];
  if (!d.weeklyMarketNotes.some(x => String(x?.title || '').includes('TECH READY'))) {
    d.weeklyMarketNotes.unshift({
      title: 'NEW · TECH READY / SCOUT ENTRY',
      action: 'EARLIER EVIDENCE-BASED ENTRY',
      body: 'Candidate/Candidate+ 階段已開始連續追蹤價格結構、成交/動能、均線修復、相對強弱、支持位與 invalidation。當基本面/催化/風險回報已足夠，而技術開始轉勢，可先用小型 Scout Entry；READY 1 則保留作更高確認度的正式第一注。'
    });
  }

  function escapeHTML(value='') {
    return String(value)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#039;');
  }

  function decorateExecutionStages() {
    const stages = Object.values(byTicker).filter(s => s.executionStage);
    if (!stages.length) return;

    document.querySelectorAll('.stock-card, .watch-card').forEach(card => {
      const heading = card.querySelector('h3, h4');
      const ticker = String(heading?.textContent || '').trim().toUpperCase();
      const stock = byTicker[ticker];
      if (!stock?.executionStage || card.querySelector('.execution-stage-public')) return;

      const head = card.querySelector('.signal-card-head, .watch-card-head');
      if (!head) return;
      const badge = document.createElement('span');
      badge.className = 'execution-stage-public';
      badge.innerHTML = `<b>${escapeHTML(stock.executionStage)}</b><small>${escapeHTML(stock.executionAction || '')}</small>`;
      head.appendChild(badge);
    });
  }

  const css = document.createElement('style');
  css.textContent = `
    .execution-stage-public{display:inline-flex;flex-direction:column;gap:2px;padding:7px 9px;border:1px solid rgba(136,168,255,.42);border-radius:10px;background:rgba(136,168,255,.10);max-width:210px}
    .execution-stage-public b{font-size:11px;letter-spacing:.25px;line-height:1.15}
    .execution-stage-public small{font-size:9px;opacity:.78;line-height:1.15}
  `;
  document.head.appendChild(css);

  const boot = () => {
    decorateExecutionStages();
    ['topPicksGrid','watchlistCards'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      new MutationObserver(decorateExecutionStages).observe(el, { childList: true, subtree: true });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
