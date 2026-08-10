window.WAIS_MARKET_DATA = {
  lastUpdated: "2026-08-09",
  dataAsOf: "2026-08-07 US/HK market close; Sunday 2026-08-09 review",
  marketMode: "CAUTIOUS",
  riskScore: 45,
  recommendedCash: 30,

  marketSummary: {
    trend: "美股主要指數於8月7日收高，S&P 500創新高，NASDAQ與半導體板塊保持強勢；但短線已累積較大升幅。",
    breadth: "市場氣氛改善，但AI硬件、光通訊及部分高beta股票單日升幅過急，追價風險上升。",
    volatility: "VIX仍處低位，但本週有CPI、PPI、零售銷售及多項科技業績，事件密度高。",
    liquidity: "債息回落有利風險資產，但10年期美債息仍處偏高水平，估值敏感板塊仍需控制倉位。"
  },

  keyRisks: [
    "8月12日美國CPI可能重新改變利率預期。",
    "8月13日美國PPI可能確認或否定成本通脹壓力。",
    "8月14日零售銷售將檢驗美國消費韌性。",
    "AI、光通訊及半導體部分股票短線升幅過急，回吐風險上升。",
    "地緣政治與油價變化仍可能重新推高通脹及市場波動。"
  ],

  focusStocks: [
    {
      ticker: "GFS",
      company: "GlobalFoundries",
      category: "Foundry",
      bucket: "TOP_PICK",
      showInWatchlist: true,
      stance: "WATCH",
      evidenceConfidence: 82,
      risk: "Medium High",
      rating: "Core Watch",
      entry: 51,
      target: 62,
      note: "8月7日收53.93美元；基本面與供應鏈位置值得跟進，但急升後先等回吐至較佳風險回報區。"
    },
    {
      ticker: "POWL",
      company: "Powell Industries",
      category: "Data Center Power",
      bucket: "TOP_PICK",
      showInWatchlist: true,
      stance: "WATCH",
      evidenceConfidence: 84,
      risk: "Medium High",
      rating: "Core Watch",
      entry: 205,
      target: 240,
      note: "8月7日收211.56美元；受惠資料中心電力需求，但現價不宜追高，等回調再評估。"
    },
    {
      ticker: "MOD",
      company: "Modine",
      category: "Data Center Cooling",
      bucket: "TOP_PICK",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 80,
      risk: "Medium High",
      rating: "Core Watch",
      entry: 187,
      target: 220,
      note: "8月7日收195.60美元；資料中心冷卻增長故事仍強，但估值及事件風險令現階段以等待為主。"
    },
    {
      ticker: "GOOGL",
      company: "Alphabet",
      category: "AI Platform / Cloud",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WATCH",
      evidenceConfidence: 90,
      risk: "Medium",
      rating: "Quality Watch",
      entry: 344,
      target: 392,
      note: "8月7日收354.30美元；質素高，但仍等待更理想入場位置。"
    },
    {
      ticker: "NVDA",
      company: "NVIDIA",
      category: "AI Compute",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 91,
      risk: "Medium High",
      rating: "Core Watch",
      entry: 217,
      target: 250,
      note: "8月7日收223.96美元；長期AI核心，但本週宏觀事件前不追高。"
    },
    {
      ticker: "AVGO",
      company: "Broadcom",
      category: "Networking / ASIC",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 89,
      risk: "Medium High",
      rating: "Core Watch",
      entry: 412,
      target: 470,
      note: "8月7日收427.76美元；AI網絡及ASIC需求仍強，但估值高，等價格回落。"
    },
    {
      ticker: "TSM",
      company: "TSMC",
      category: "Foundry",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WATCH",
      evidenceConfidence: 92,
      risk: "Medium",
      rating: "Core Watch",
      entry: 405,
      target: 455,
      note: "8月7日收420.04美元；先進製程核心地位不變，等較佳風險回報位置。"
    },
    {
      ticker: "MRVL",
      company: "Marvell Technology",
      category: "AI Networking",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 82,
      risk: "Medium High",
      rating: "Watch",
      entry: 205,
      target: 240,
      note: "8月7日收218.72美元；舊READY 1取消，因價格已離開原先理想買入區。"
    },
    {
      ticker: "MU",
      company: "Micron Technology",
      category: "Memory / HBM",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 85,
      risk: "Medium High",
      rating: "Watch",
      entry: 845,
      target: 980,
      note: "8月7日收877.57美元；HBM基本面仍具支持，但舊READY 1取消，等待回調。"
    },
    {
      ticker: "AAOI",
      company: "Applied Optoelectronics",
      category: "Optical",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 72,
      risk: "Very High",
      rating: "High Beta Watch",
      entry: 122,
      target: 158,
      note: "8月7日收135.63美元，單日升幅約9%；短線過熱，不追。"
    },
    {
      ticker: "AXTI",
      company: "AXT",
      category: "InP Materials",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 68,
      risk: "Very High",
      rating: "High Beta Watch",
      entry: 75,
      target: 100,
      note: "8月7日收88.58美元，單日升幅約17.8%；高波動，等待冷卻及基本面驗證。"
    },
    {
      ticker: "TSEM",
      company: "Tower Semiconductor",
      category: "Specialty Foundry",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 76,
      risk: "High",
      rating: "Watch",
      entry: 232,
      target: 278,
      note: "8月7日收252.49美元，單日升幅約12.4%；等回調後再評估。"
    },
    {
      ticker: "COHR",
      company: "Coherent",
      category: "Optical / Photonics",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 81,
      risk: "High",
      rating: "Watch",
      entry: 352,
      target: 420,
      note: "8月7日收379.13美元，單日升幅約13.4%；AI光通訊主題強，但現價追高風險高。"
    },
    {
      ticker: "LITE",
      company: "Lumentum",
      category: "Optical / Photonics",
      bucket: "WATCHLIST",
      showInWatchlist: true,
      stance: "WAIT",
      evidenceConfidence: 80,
      risk: "High",
      rating: "Event Watch",
      entry: 0,
      target: 0,
      note: "8月7日收890.17美元；業績事件前暫停設定新Entry/Target，等公布後重新評估。"
    },

    {
      ticker: "AEHR",
      company: "Aehr Test Systems",
      category: "Semiconductor Test",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 62,
      risk: "Very High",
      rating: "Research",
      note: "8月7日收103.07美元；研究價值高，但盈利與估值風險需要持續驗證。"
    },
    {
      ticker: "FORM",
      company: "FormFactor",
      category: "Semiconductor Test",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 67,
      risk: "High",
      rating: "Research",
      note: "8月7日收117.39美元；先保留研究席位，等待更清晰催化。"
    },
    {
      ticker: "MXL",
      company: "MaxLinear",
      category: "Connectivity / Analog",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 60,
      risk: "Very High",
      rating: "Research",
      note: "8月7日收74.98美元；高beta研究標的，未達部署級別。"
    },
    {
      ticker: "POET",
      company: "POET Technologies",
      category: "Photonics",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 55,
      risk: "Very High",
      rating: "Speculative",
      note: "8月7日收8.91美元；潛在高回報亦伴隨高執行及融資風險，只作研究。"
    },
    {
      ticker: "NVTS",
      company: "Navitas Semiconductor",
      category: "Power Semiconductors",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 58,
      risk: "Very High",
      rating: "Research",
      note: "8月7日收13.89美元；高波動，需驗證AI電源需求能否轉化為收入與盈利。"
    },
    {
      ticker: "OSS",
      company: "One Stop Systems",
      category: "Edge AI / Rugged Compute",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 56,
      risk: "Very High",
      rating: "Research",
      note: "8月7日收13.24美元；屬早期研究標的，暫不列入部署名單。"
    },
    {
      ticker: "AIRO",
      company: "AIRO Group",
      category: "Aerospace / Defense Tech",
      bucket: "HIDDEN_GEM",
      showInWatchlist: false,
      stance: "WATCH",
      evidenceConfidence: 50,
      risk: "Very High",
      rating: "Speculative",
      note: "8月7日收8.52美元；流動性及執行風險高，只作探索性研究。"
    }
  ],

  readyList: [],

  serenityData: [
    {
      theme: "AI optical and CPO",
      tickers: ["COHR", "LITE", "AAOI", "AXTI", "POET"],
      serenityView: "AI資料中心光學及InP供應鏈仍是重要研究主題。",
      waisView: "主題強，但8月7日多隻相關股急升；價格紀律優先於追逐主題。"
    },
    {
      theme: "AI foundry and specialty manufacturing",
      tickers: ["TSM", "GFS", "TSEM"],
      serenityView: "AI、ASIC及特色製程需求支持晶圓代工供應鏈。",
      waisView: "長期方向正面，但不同公司估值、製程位置及地緣風險必須分開評估。"
    },
    {
      theme: "Memory and HBM",
      tickers: ["MU"],
      serenityView: "HBM及記憶體供應仍是AI基建重要環節。",
      waisView: "基本面支持較強，但周期性高；舊READY 1已取消，重新等待Entry。"
    }
  ],

  weeklyEvents: [
    {
      date: "08月12日",
      event: "美國 CPI",
      time: "08:30 ET",
      referenceMonth: "2026年7月",
      source: "U.S. Bureau of Labor Statistics",
      waisNote: "本週最高優先級宏觀事件。"
    },
    {
      date: "08月13日",
      event: "美國 PPI",
      time: "08:30 ET",
      referenceMonth: "2026年7月",
      source: "U.S. Bureau of Labor Statistics",
      waisNote: "檢查成本通脹及利率重新定價風險。"
    },
    {
      date: "08月14日",
      event: "美國零售銷售",
      time: "08:30 ET",
      referenceMonth: "2026年7月",
      source: "U.S. Census Bureau",
      waisNote: "關注消費韌性與增長預期。"
    }
  ],

  weeklyMarketNotes: [
    { title: "利率主線", body: "CPI、PPI連續兩日公布；數據前不追高。若通脹重新升溫，先提高防守而不是急於加倉。" },
    { title: "AI / 半導體", body: "趨勢仍強，但部分高beta與光通訊股已急升。優先等有秩序回調，再比較基本面與Entry質素。" },
    { title: "香港市場", body: "恒指與恒科保持選擇性偏強；WAIS EAST仍以獨立風險參數判斷，不直接照搬美股訊號。" },
    { title: "本週執行", body: "Market Risk 45/100、Cash 約30%、READY 1 暫為0。先守紀律，再等高質素第一注。" }
  ],

  technicalSummary: [
    { key: "SP500", name: "S&P 500", signal: "STRONG", note: "大市趨勢仍強；接近高位時更重視Entry紀律。" },
    { key: "NASDAQ", name: "NASDAQ Composite", signal: "STRONG", note: "科技與成長股動能偏強，但高beta板塊已有延伸。" },
    { key: "SOX", name: "SOX", signal: "EXTENDED", note: "半導體強勢，但短線過熱風險上升，不追急升。" },
    { key: "VIX", name: "VIX", signal: "CALM", note: "波動率偏低，但事件密集時低VIX不等於低風險。" },
    { key: "US10Y", name: "US 10Y", signal: "WATCH", note: "仍是高估值成長股的重要估值壓力來源。" },
    { key: "HSTECH", name: "Hang Seng TECH", signal: "SELECTIVE", note: "香港科技股偏正面，但維持選股與風險紀律。" }
  ],

  incomeDefenseStatus: "CAUTIOUS",
  incomeEtfs: [
    { ticker: "VDY", priceSymbol: "VDY.TO", currency: "CAD", name: "Vanguard FTSE Canadian High Dividend Yield Index ETF", category: "Core Dividend", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium", upsideDrag: "Low", status: "RESEARCH", note: "加拿大高股息核心候選；重視總回報、股息質素與金融板塊集中度。" },
    { ticker: "ZWB", priceSymbol: "ZWB.TO", currency: "CAD", name: "BMO Covered Call Canadian Banks ETF", category: "Covered Call", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium", upsideDrag: "Medium", status: "RESEARCH", note: "銀行股收入型候選；同時評估covered-call限制上行的成本。" },
    { ticker: "ZWC", priceSymbol: "ZWC.TO", currency: "CAD", name: "BMO Canadian High Dividend Covered Call ETF", category: "Covered Call", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium", upsideDrag: "Medium", status: "RESEARCH", note: "高股息加covered-call；不以派息率單獨排序。" },
    { ticker: "ZWU", priceSymbol: "ZWU.TO", currency: "CAD", name: "BMO Covered Call Utilities ETF", category: "Covered Call / Utilities", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium", upsideDrag: "Medium", status: "RESEARCH", note: "公用事業收入候選；需檢查利率敏感度與資本回報。" },
    { ticker: "JEPI", priceSymbol: "JEPI", currency: "USD", name: "JPMorgan Equity Premium Income ETF", category: "Equity Premium Income", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium", upsideDrag: "Medium", status: "RESEARCH", note: "美股收入策略候選；重視收入穩定、總回報與下行控制。" },
    { ticker: "JEPQ", priceSymbol: "JEPQ", currency: "USD", name: "JPMorgan Nasdaq Equity Premium Income ETF", category: "Growth Income", frequency: "Monthly", incomeQuality: "Research", navRisk: "Medium High", upsideDrag: "Medium", status: "RESEARCH", note: "科技收入型候選；收入較高但成長與波動特性不同於傳統股息ETF。" },
    { ticker: "QYLD", priceSymbol: "QYLD", currency: "USD", name: "Global X Nasdaq 100 Covered Call ETF", category: "High Income / Covered Call", frequency: "Monthly", incomeQuality: "Research", navRisk: "High", upsideDrag: "High", status: "RESEARCH", note: "高收入研究標的；特別檢查NAV侵蝕、總回報及上行犧牲。" }
  ],

  actionPlan: [
    "維持CAUTIOUS模式；市場強，但本週事件密度高，不追星期五急升股。",
    "Market Risk 45/100，建議保留約30%現金。",
    "READY 1暫時為0；GFS、POWL、MOD列作Top Picks研究，但仍等待Entry。",
    "8月12日CPI及8月13日PPI公布前控制新倉；8月14日再檢視零售銷售。",
    "如高beta AI/光通訊股出現有秩序回調而基本面不變，再重新評估第一注。"
  ],

  dailyThought: {
    date: "2026年8月9日",
    zh: "強勢趨勢值得尊重，好的入場價值得等待。",
    en: "Respect the trend. Wait for the right price."
  },

  notes: [
    "截至2026年8月9日，股票價格引用最近可驗證的2026年8月7日美股收市資料；並非即時報價。",
    "Entry及Target屬WAIS策略規劃區間的代表值，不是市場報價或保證目標。",
    "Serenity資料只作研究輸入，不代表WAIS最終結論。",
    "所有股票必須重新驗證公司公告、財報、估值、價格行為及事件風險後才可升級READY 1。"
  ]
};
