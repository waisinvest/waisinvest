# Extend the standard WAIS stock/income updater with the wider market-research Income ETF universe.
# This deliberately reuses the same normalized TTM / 30D / consistency / sustainable-income calculations.
import update_stock_prices as base

base.SYMBOLS.update({
    "IWMI": ("IWMI", "USD", True),
    "NIHI": ("NIHI", "USD", True),
    "XSPI": ("XSPI", "USD", True),
    "CEPI": ("CEPI", "USD", True),
    "YSPY": ("YSPY", "USD", True),
    "ROCY": ("ROCY", "USD", True),
    "ROCQ": ("ROCQ", "USD", True),
    "HYBI": ("HYBI", "USD", True),
    "BNDI": ("BNDI", "USD", True),
    "MLPI": ("MLPI", "USD", True),
})

if __name__ == "__main__":
    base.main()
