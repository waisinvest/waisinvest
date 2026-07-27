window.WAIS_MARKET_DATA = {
  lastUpdated: "2026-07-26",
  marketMode: "WAIT",
  riskScore: 58,
  recommendedCash: 40,

  marketSummary: {
    trend: "美股主要指數仍接近高位，但科技股及半導體近期轉弱，短線波動上升。",
    breadth: "市場廣度轉弱，升勢較集中，AI及高估值科技股承受較大壓力。",
    volatility: "聯儲局議息、大型科技股業績、油價及債息令本週事件風險偏高。",
    liquidity: "資金仍流向大型科技、能源及防守板塊，但追價風險上升。"
  },

  keyRisks: [
    "聯儲局政策及利率路徑不確定。",
    "10年期美債息偏高，壓抑高估值科技股。",
    "油價及地緣政治可能再次推高通脹。",
    "大型科技公司AI資本開支過高，市場開始質疑回報。",
    "半導體及AI硬件短線技術走勢轉弱。"
  ],

  focusStocks: [
    {
      ticker: "NVDA",
      category: "AI Compute",
      stance: "WAIT",
      evidenceConfidence: 88,
      risk: "Medium",
      entry: 185,
      target: 235,
      note: "長期AI核心，但高估值及市場波動下不宜追高。"
    },
    {
      ticker: "TSM",
      category: "Foundry",
      stance: "WAIT",
      evidenceConfidence: 90,
      risk: "Medium",
      entry: 360,
      target: 460,
      note: "AI先進製程核心，等待更理想估值及市場確認。"
    },
    {
      ticker: "AVGO",
      category: "Networking / ASIC",
      stance: "WAIT",
      evidenceConfidence: 87,
      risk: "Medium",
      entry: 340,
      target: 440,
      note: "ASIC及網絡需求強，但估值及AI資本開支風險需監察。"
    },
    {
      ticker: "MRVL",
      category: "AI Networking",
      stance: "READY 1",
      evidenceConfidence: 78,
      risk: "Medium High",
      entry: 175,
      target: 220,
      note: "接近第一注觀察區，但必須等待價格及市場穩定確認。"
    },
    {
      ticker: "MU",
      category: "Memory / HBM",
      stance: "READY 1",
      evidenceConfidence: 82,
      risk: "Medium High",
      entry: 830,
      target: 1050,
      note: "HBM及記憶體周期仍有支持，等待回調分段部署。"
    },
    {
      ticker: "COHR",
      category: "Optical",
      stance: "WAIT",
      evidenceConfidence: 76,
      risk: "High",
      entry: 180,
      target: 240,
      note: "光通訊受惠AI需求，但波動高，暫不追價。"
    },
    {
      ticker: "LITE",
      category: "Optical",
      stance: "WAIT",
      evidenceConfidence: 74,
      risk: "High",
      entry: 670,
      target: 900,
      note: "光學供應鏈有催化，但價格及競爭風險仍高。"
    },
    {
      ticker: "AXTI",
      category: "InP Materials",
      stance: "WATCH",
      evidenceConfidence: 62,
      risk: "Very High",
      entry: 40,
      target: 58,
      note: "Serenity重點供應鏈概念，但屬高投機，需驗證收入及訂單。"
    },
    {
      ticker: "TSEM",
      category: "Specialty Foundry",
      stance: "WATCH",
      evidenceConfidence: 70,
      risk: "High",
      entry: 205,
      target: 275,
      note: "特色製程具潛力，但需要更明確增長催化。"
    },
    {
      ticker: "POET",
      category: "Photonics",
      stance: "WATCH",
      evidenceConfidence: 52,
      risk: "Very High",
      entry: 5.8,
      target: 9,
      note: "潛在高回報亦高失敗風險，只適合極小注研究倉。"
    }
  ],

  readyList: [
    {
      ticker: "MRVL",
      level: "READY 1",
      action: "等待回調及市場確認後考慮第一注",
      maxInitialPosition: "2%"
    },
    {
      ticker: "MU",
      level: "READY 1",
      action: "等待回調及HBM基本面確認後考慮第一注",
      maxInitialPosition: "2%"
    }
  ],

  serenityData: [
    {
      theme: "AI optical and CPO",
      tickers: ["COHR", "LITE", "AXTI", "POET"],
      serenityView: "AI資料中心光學及InP供應鏈是長期樽頸。",
      waisView: "主題合理，但小型股估值、流動性及實際收入必須獨立驗證。"
    },
    {
      theme: "Taiwan AI supply chain",
      tickers: ["TSM", "TSEM"],
      serenityView: "台灣AI供應鏈、先進封裝及ASIC受惠資本開支。",
      waisView: "長期方向正面，但必須控制地緣政治及周期風險。"
    },
    {
      theme: "Memory and HBM",
      tickers: ["MU"],
      serenityView: "HBM及記憶體供應仍是AI基建重要樽頸。",
      waisView: "基本面支持較強，但記憶體股周期性高，宜分段部署。"
    }
  ],

  actionPlan: [
    "維持WAIT模式，不追高。",
    "建議保留40%現金，等待聯儲局及大型科技股業績後再調整。",
    "MRVL及MU列入READY 1，但未等於立即買入。",
    "如市場風險分數升至65以上，暫停所有新買入。",
    "如Nasdaq及半導體板塊重新企穩，可重新評估第一注。"
  ],

  notes: [
    "Serenity資料只作研究輸入，不代表WAIS最終結論。",
    "所有股票必須驗證公司公告、財報、估值及價格行為。",
    "投資決定必須分段執行，並設定最大持倉及退出條件。"
  ]
};
