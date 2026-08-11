(function () {
  const d = window.WAIS_MARKET_DATA || {};
  d.lastUpdated = "2026-08-10";
  d.dataAsOf = "2026-08-10 US close; WAIS entry/income rules reviewed 2026-08-10 ET";

  // WAIS Decision Contract v1.1: an Entry number must never imply an automatic buy.
  // Preferred Entry Zone = price advantage; Confirmation Trigger = evidence that
  // the price action is stabilising. Current Action remains authoritative.
  d.decisionContract = {
    version: "1.1",
    rule: "Preferred Entry Zone is not a buy signal. Buy only after the stated confirmation trigger and risk checks.",
    fields: ["preferredEntryZone", "confirmationTrigger", "currentAction", "earningsRisk", "risk"]
  };

  const stocks = Array.isArray(d.focusStocks) ? d.focusStocks : [];
  const gfs = stocks.find(x => String(x.ticker).toUpperCase() === "GFS");
  if (gfs) {
    gfs.stance = "NEAR ENTRY";
    gfs.entry = 49.80; // compatibility value for the current card renderer
    gfs.preferredEntryLow = 48.80;
    gfs.preferredEntryHigh = 49.80;
    gfs.preferredEntryZone = "$48.80–$49.80";
    gfs.confirmationTrigger = "Reclaim / hold $50.50–$51.00 with normal-volume support";
    gfs.confirmationLow = 50.50;
    gfs.confirmationHigh = 51.00;
    gfs.currentAction = "WAIT";
    gfs.invalidation = "Below ~$48.50 without support: pause and reassess; do not average down automatically";
    gfs.target = 62;
    gfs.note = "Preferred Entry Zone $48.80–$49.80；現價若仍在約$50附近而未確認，動作仍是WAIT。另一條路徑是重新企穩／收復$50.50–$51.00後，以確認換取稍高入場價。Entry Zone ≠ Buy Trigger。";
  }

  // WAIS INCOME v1.0 public-output layer. Proprietary scoring/weights stay off the public repo.
  d.incomeArchitecture = {
    version: "1.0",
    minimumScreenYield: 5,
    goal: "Seek sustainable 5%+ cash income without sacrificing NAV/total-return discipline.",
    sleeves: [
      {name:"CORE WEALTH", purpose:"Long-term capital quality / growth base"},
      {name:"MONTHLY INCOME", purpose:"More stable recurring cash income"},
      {name:"WEEKLY INCOME", purpose:"Flexible weekly cash-flow opportunities; higher scrutiny"},
      {name:"CASH RESERVE", purpose:"Dry powder and drawdown protection"}
    ],
    rules: [
      "5%+ yield is a screen, not a buy instruction.",
      "Weekly distribution does not mean low risk or guaranteed income.",
      "Check distribution source, NAV path, total return, volatility and underlying quality before Income Ready 1.",
      "Very high distribution products remain tactical until NAV/total-return sustainability is validated.",
      "Underlying-to-Income: prefer strong underlying themes first, then compare the income wrapper versus owning the underlying directly."
    ]
  };

  d.incomeDefenseStatus = d.incomeDefenseStatus || "CAUTIOUS";
  const etfs = Array.isArray(d.incomeEtfs) ? d.incomeEtfs : [];
  etfs.forEach(item => {
    item.minimumYieldScreen = 5;
    item.autoBuy = false;
    item.requiresIncomeConfirmation = true;
  });

  const byTicker = Object.fromEntries(etfs.map(x => [String(x.ticker).toUpperCase(), x]));
  if (byTicker.WEEK) {
    byTicker.WEEK.incomeRole = "CASH RESERVE / DEFENSIVE WEEKLY";
    byTicker.WEEK.todayAction = "可作防守收入／現金管理候選；即使達5%+篩選亦只按價格、流動性及現金需要分注，不因每週派息自動買。";
  }
  if (byTicker.QDTE) {
    byTicker.QDTE.incomeRole = "TACTICAL WEEKLY";
    byTicker.QDTE.status = "WAIT INCOME";
    byTicker.QDTE.todayAction = "維持WAIT：先驗證NAV、12個月總回報、分派來源／ROC及0DTE波動；高派息不等於穩定收入。";
  }
  if (byTicker.TOPW) {
    byTicker.TOPW.incomeRole = "RESEARCH / HIGH RISK WEEKLY";
    byTicker.TOPW.status = "RESEARCH";
    byTicker.TOPW.todayAction = "研究席位；未完成槓桿／組合結構、NAV與總回報驗證前不升Income Ready。";
  }
  ["VDY","ZWB","ZWC","ZWU","JEPI","JEPQ"].forEach(t => {
    if (byTicker[t]) byTicker[t].incomeRole = "MONTHLY INCOME CANDIDATE";
  });
  if (byTicker.QYLD) {
    byTicker.QYLD.incomeRole = "TACTICAL MONTHLY / NAV CHECK";
    byTicker.QYLD.status = "WAIT INCOME";
  }

  window.WAIS_MARKET_DATA = d;

  // Public UI compatibility patch: make the default Income screen honour the
  // user's 5%+ objective without changing the underlying app code yet.
  document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("incomeYieldFilter");
    if (filter) {
      filter.value = "5";
      filter.dispatchEvent(new Event("change", {bubbles:true}));
    }
  });
})();
