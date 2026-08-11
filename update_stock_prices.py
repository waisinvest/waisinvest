import json
from datetime import datetime, timezone, time
from pathlib import Path
from zoneinfo import ZoneInfo
import yfinance as yf

SYMBOLS={
"NVDA":("NVDA","USD",False),"TSM":("TSM","USD",False),"AVGO":("AVGO","USD",False),"MRVL":("MRVL","USD",False),"MU":("MU","USD",False),"COHR":("COHR","USD",False),"LITE":("LITE","USD",False),"AXTI":("AXTI","USD",False),"TSEM":("TSEM","USD",False),"POET":("POET","USD",False),"GFS":("GFS","USD",False),"POWL":("POWL","USD",False),"MOD":("MOD","USD",False),"VRT":("VRT","USD",False),"GOOGL":("GOOGL","USD",False),"AAOI":("AAOI","USD",False),"AEHR":("AEHR","USD",False),"FORM":("FORM","USD",False),"MXL":("MXL","USD",False),"NVTS":("NVTS","USD",False),"OSS":("OSS","USD",False),"AIRO":("AIRO","USD",False),
"WEEK":("WEEK","USD",True),"QDTE":("QDTE","USD",True),"TOPW":("TOPW","USD",True),"VDY.TO":("VDY.TO","CAD",True),"ZWB.TO":("ZWB.TO","CAD",True),"ZWC.TO":("ZWC.TO","CAD",True),"ZWU.TO":("ZWU.TO","CAD",True),"JEPI":("JEPI","USD",True),"JEPQ":("JEPQ","USD",True),"QYLD":("QYLD","USD",True)}
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

def add_extended_quote(ticker, r):
    try:
        intr=ticker.history(period='5d',interval='5m',auto_adjust=False,prepost=True,actions=False)
        if intr.empty or intr['Close'].dropna().empty:return
        c=intr['Close'].dropna()
        ts=c.index[-1]
        if getattr(ts,'tzinfo',None) is None:
            ts=ts.tz_localize('UTC')
        et=ts.tz_convert(ET)
        r['extendedPrice']=round(float(c.iloc[-1]),4)
        r['extendedAsOf']=et.isoformat()
        r['extendedSession']=session_for(et)
        r['extendedDataStatus']='5-minute provider quote; may be delayed; extended-hours liquidity can be thin'
    except Exception as exc:
        r['extendedDataStatus']=f'extended quote unavailable: {exc}'

def main():
    data=existing();prices=data.get('prices',{});ok=0
    now_utc=datetime.now(timezone.utc)
    for out,(sym,currency,income) in SYMBOLS.items():
        try:
            ticker=yf.Ticker(sym)
            h=completed(ticker.history(period='1y' if income else '6mo',interval='1d',auto_adjust=False,prepost=False,actions=True))
            c=h['Close'].dropna() if not h.empty else []
            if len(c)==0:continue
            p=float(c.iloc[-1]);d=c.index[-1].date().isoformat()
            r={"price":round(p,4),"currency":currency,"asOf":d,"source":"Yahoo Finance via yfinance","dataStatus":"Completed daily close; NOT REAL-TIME","sma20":round(float(c.tail(20).mean()),4) if len(c)>=5 else None,"sma50":round(float(c.tail(50).mean()),4) if len(c)>=10 else None}
            if len(c)>=2:
                prev=float(c.iloc[-2]);r['change']=round(p-prev,4);r['changePercent']=round((p/prev-1)*100,4) if prev else None
            if len(c)>=2:
                first=float(c.iloc[0]);r['priceReturnPeriodPct']=round((p/first-1)*100,4) if first else None
            if income and 'Dividends' in h.columns:
                div=h['Dividends'].fillna(0);pos=div[div>0]
                if not pos.empty:
                    r['lastDistribution']=round(float(pos.iloc[-1]),6);r['lastDistributionDate']=pos.index[-1].date().isoformat()
                    cutoff=now_utc.date().replace(year=now_utc.date().year-1)
                    trail=pos[[x.date()>=cutoff for x in pos.index]]
                    s=float(trail.sum()) if not trail.empty else 0
                    count=int(len(trail))
                    r['trailing12mDistribution']=round(s,6)
                    r['trailing12mDistributionYield']=round(s/p*100,4) if p>0 else None
                    r['distributionCount12m']=count
                    r['observedFrequency']='Weekly' if count>=40 else ('Monthly' if count>=10 else ('Quarterly/Irregular' if count>=3 else 'Sparse/Unknown'))
                    y=r.get('trailing12mDistributionYield')
                    pr=r.get('priceReturnPeriodPct')
                    if y is not None and y>=25:r['incomeRiskFlag']='VERY HIGH DISTRIBUTION — validate NAV/ROC/total return'
                    elif y is not None and y>=12:r['incomeRiskFlag']='HIGH DISTRIBUTION — review sustainability'
                    elif y is not None and y>=5:r['incomeRiskFlag']='5%+ SCREEN MATCH — not an automatic buy'
                    else:r['incomeRiskFlag']='Below 5% screen or insufficient data'
                    if y is not None and pr is not None:r['simpleIncomePlusPriceReturnPct']=round(y+pr,4)
            add_extended_quote(ticker,r)
            prices[out]=r;ok+=1;print(out,p,d,r.get('extendedSession'))
        except Exception as e:print('failed',out,e)
    OUT.write_text(json.dumps({"lastUpdated":now_utc.isoformat(),"marketStatus":"updated" if ok else "update_failed","dataStatus":"Completed close + best-effort extended-hours quote; NOT guaranteed real-time","prices":prices},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not ok:raise RuntimeError('No prices updated')
if __name__=='__main__':main()
