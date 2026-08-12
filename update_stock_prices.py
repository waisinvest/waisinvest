import json
from datetime import datetime, timezone, time, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo
import statistics
import yfinance as yf

SYMBOLS={
"NVDA":("NVDA","USD",False),"TSM":("TSM","USD",False),"AVGO":("AVGO","USD",False),"MRVL":("MRVL","USD",False),"MU":("MU","USD",False),"COHR":("COHR","USD",False),"LITE":("LITE","USD",False),"AXTI":("AXTI","USD",False),"TSEM":("TSEM","USD",False),"POET":("POET","USD",False),"GFS":("GFS","USD",False),"POWL":("POWL","USD",False),"MOD":("MOD","USD",False),"VRT":("VRT","USD",False),"GOOGL":("GOOGL","USD",False),"AAOI":("AAOI","USD",False),"AEHR":("AEHR","USD",False),"FORM":("FORM","USD",False),"MXL":("MXL","USD",False),"NVTS":("NVTS","USD",False),"OSS":("OSS","USD",False),"AIRO":("AIRO","USD",False),
"WEEK":("WEEK","USD",True),"QDTE":("QDTE","USD",True),"TOPW":("TOPW","USD",True),"VDY.TO":("VDY.TO","CAD",True),"ZWB.TO":("ZWB.TO","CAD",True),"ZWC.TO":("ZWC.TO","CAD",True),"ZWU.TO":("ZWU.TO","CAD",True),"JEPI":("JEPI","USD",True),"JEPQ":("JEPQ","USD",True),"QYLD":("QYLD","USD",True),
"QQQI":("QQQI","USD",True),"SPYI":("SPYI","USD",True),"FEPI":("FEPI","USD",True),"AIPI":("AIPI","USD",True),"PLYY":("PLYY","USD",True),"NVYY":("NVYY","USD",True),"TMYY":("TMYY","USD",True),"MUYY":("MUYY","USD",True),"XQQI":("XQQI","USD",True)}
OUT=Path('stock-prices.json')
ET=ZoneInfo('America/New_York')

def existing():
    try:return json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {"prices":{}}
    except:return {"prices":{}}

def completed(h):
    if h.empty:return h
    now=datetime.now(timezone.utc).astimezone(ET)
    return h.iloc[:-1] if h.index[-1].date()==now.date() and now.time()<time(16,20) else h

def session_for(dt):
    t=dt.time()
    if time(4,0)<=t<time(9,30): return 'PRE-MARKET'
    if time(9,30)<=t<time(16,0): return 'REGULAR'
    if time(16,0)<=t<=time(20,0): return 'AFTER-HOURS'
    return 'CLOSED/OTHER'

def latest_snapshot(ticker):
    intr=ticker.history(period='5d',interval='5m',auto_adjust=False,prepost=True,actions=False)
    if intr.empty or intr['Close'].dropna().empty:return None
    c=intr['Close'].dropna();ts=c.index[-1]
    if getattr(ts,'tzinfo',None) is None: ts=ts.tz_localize('UTC')
    et=ts.tz_convert(ET)
    return float(c.iloc[-1]),et,session_for(et)

def income_metrics(h, pos, regular_close, now_utc):
    """Public-output metrics only. Weekly/monthly funds are normalized to comparable monthly buckets."""
    if pos.empty or regular_close <= 0:
        return {}
    today=now_utc.date()
    cutoff12=today-timedelta(days=365)
    trail=pos[[x.date()>=cutoff12 for x in pos.index]]
    ttm_cash=float(trail.sum()) if not trail.empty else 0.0
    ttm_yield=ttm_cash/regular_close*100

    cutoff30=today-timedelta(days=30)
    cash30=float(pos[[x.date()>=cutoff30 for x in pos.index]].sum())
    rate30=cash30/regular_close*100

    # Aggregate actual distributions into calendar-month buckets so weekly and monthly ETFs
    # are compared on the same basis. Missing months remain zero and reduce consistency.
    month_keys=[]
    y=today.year; m=today.month
    for _ in range(12):
        month_keys.append((y,m))
        m-=1
        if m==0: y-=1; m=12
    month_keys=list(reversed(month_keys))
    buckets=[]
    for yy,mm in month_keys:
        buckets.append(sum(float(v) for idx,v in trail.items() if idx.year==yy and idx.month==mm))

    active=[x for x in buckets if x>0]
    coverage=len(active)/12
    if len(active)>=2:
        mean=statistics.fmean(active)
        cv=statistics.pstdev(active)/mean if mean>0 else 1.0
    else:
        cv=1.0
    consistency=max(0.0,min(100.0,100.0-(55.0*min(cv,1.5))-(30.0*(1.0-coverage))))

    # Median monthly cash flow is resistant to one unusually large distribution.
    # A modest consistency haircut prevents unstable headline yields from being treated as durable income.
    median_month=statistics.median(active) if active else 0.0
    median_annual_yield=(median_month*12/regular_close*100) if regular_close>0 else 0.0
    stability_factor=0.70+0.30*(consistency/100.0)
    sustainable=min(ttm_yield,median_annual_yield)*stability_factor
    sustainable=max(0.0,sustainable)

    return {
        'trailing12mDistribution':round(ttm_cash,6),
        'trailing12mDistributionYield':round(ttm_yield,4),
        'current30dIncomeRate':round(rate30,4),
        'incomeConsistency':round(consistency,1),
        'sustainableIncomeYield':round(sustainable,4),
        'sustainableMonthlyEquivalent':round(sustainable/12,4),
        'distributionCoverageMonths12m':len(active),
        'incomeMetricMethod':'TTM actual distributions + rolling 30D cash rate + calendar-month consistency + median-month sustainable-yield normalization; research metric, not a forecast or guarantee'
    }

def main():
    data=existing();prices=data.get('prices',{});ok=0;failed=[]
    now_utc=datetime.now(timezone.utc)
    for out,(sym,currency,income) in SYMBOLS.items():
        try:
            ticker=yf.Ticker(sym)
            h=completed(ticker.history(period='1y' if income else '6mo',interval='1d',auto_adjust=False,prepost=False,actions=True))
            c=h['Close'].dropna() if not h.empty else []
            if len(c)==0: failed.append(out);continue
            regular_close=float(c.iloc[-1]);regular_date=c.index[-1].date().isoformat()
            display_price=regular_close;display_asof=regular_date;display_session='CLOSE';display_status='Completed daily close'
            try:
                snap=latest_snapshot(ticker)
                if snap:
                    display_price,et,display_session=snap;display_asof=et.isoformat();display_status='Latest available 5-minute snapshot; may be delayed; NOT exchange real-time'
            except Exception as exc: print('snapshot fallback',out,exc)
            r={"price":round(display_price,4),"currency":currency,"asOf":display_asof,"session":display_session,"source":"Yahoo Finance via yfinance","dataStatus":display_status,"regularClose":round(regular_close,4),"regularCloseDate":regular_date,"sma20":round(float(c.tail(20).mean()),4) if len(c)>=5 else None,"sma50":round(float(c.tail(50).mean()),4) if len(c)>=10 else None}
            if len(c)>=2:
                prev=float(c.iloc[-2]);r['previousClose']=round(prev,4);r['change']=round(display_price-prev,4);r['changePercent']=round((display_price/prev-1)*100,4) if prev else None
                first=float(c.iloc[0]);r['priceReturnPeriodPct']=round((regular_close/first-1)*100,4) if first else None
            if income and 'Dividends' in h.columns:
                div=h['Dividends'].fillna(0);pos=div[div>0]
                if not pos.empty:
                    r['lastDistribution']=round(float(pos.iloc[-1]),6);r['lastDistributionDate']=pos.index[-1].date().isoformat()
                    r.update(income_metrics(h,pos,regular_close,now_utc))
                    count=int(len(pos[[x.date()>=now_utc.date()-timedelta(days=365) for x in pos.index]]));r['distributionCount12m']=count
                    r['observedFrequency']='Weekly' if count>=40 else ('Monthly' if count>=10 else ('Quarterly/Irregular' if count>=3 else 'Sparse/Unknown'))
                    y=r.get('trailing12mDistributionYield');pr=r.get('priceReturnPeriodPct')
                    if y is not None and y>=25:r['incomeRiskFlag']='VERY HIGH DISTRIBUTION — validate NAV/ROC/total return'
                    elif y is not None and y>=12:r['incomeRiskFlag']='HIGH DISTRIBUTION — review sustainability'
                    elif y is not None and y>=5:r['incomeRiskFlag']='5%+ SCREEN MATCH — not an automatic buy'
                    else:r['incomeRiskFlag']='Below 5% screen or insufficient data'
                    if y is not None and pr is not None:r['simpleIncomePlusPriceReturnPct']=round(y+pr,4)
            prices[out]=r;ok+=1;print(out,display_price,display_session,display_asof)
        except Exception as e: failed.append(out);print('failed',out,e)
    OUT.write_text(json.dumps({"lastUpdated":now_utc.isoformat(),"marketStatus":"updated" if ok else "update_failed","dataStatus":"Latest available intraday/extended-hours snapshot when available; regular close retained separately; NOT guaranteed real-time","incomeMetricsVersion":"WAIS INCOME v1.1 normalized percentages","failedSymbols":failed,"prices":prices},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not ok:raise RuntimeError('No prices updated')
if __name__=='__main__':main()
