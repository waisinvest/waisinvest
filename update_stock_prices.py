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

def latest_snapshot(ticker):
    intr=ticker.history(period='5d',interval='5m',auto_adjust=False,prepost=True,actions=False)
    if intr.empty or intr['Close'].dropna().empty:return None
    c=intr['Close'].dropna()
    ts=c.index[-1]
    if getattr(ts,'tzinfo',None) is None: ts=ts.tz_localize('UTC')
    et=ts.tz_convert(ET)
    return float(c.iloc[-1]), et, session_for(et)

def main():
    data=existing();prices=data.get('prices',{});ok=0
    now_utc=datetime.now(timezone.utc)
    for out,(sym,currency,income) in SYMBOLS.items():
        try:
            ticker=yf.Ticker(sym)
            h=completed(ticker.history(period='1y' if income else '6mo',interval='1d',auto_adjust=False,prepost=False,actions=True))
            c=h['Close'].dropna() if not h.empty else []
            if len(c)==0:continue
            regular_close=float(c.iloc[-1]); regular_date=c.index[-1].date().isoformat()
            display_price=regular_close; display_asof=regular_date; display_session='CLOSE'; display_status='Completed daily close'
            try:
                snap=latest_snapshot(ticker)
                if snap:
                    display_price,et,display_session=snap
                    display_asof=et.isoformat()
                    display_status='Latest available 5-minute snapshot; may be delayed; NOT exchange real-time'
            except Exception as exc:
                print('snapshot fallback',out,exc)
            r={"price":round(display_price,4),"currency":currency,"asOf":display_asof,"session":display_session,"source":"Yahoo Finance via yfinance","dataStatus":display_status,"regularClose":round(regular_close,4),"regularCloseDate":regular_date,"sma20":round(float(c.tail(20).mean()),4) if len(c)>=5 else None,"sma50":round(float(c.tail(50).mean()),4) if len(c)>=10 else None}
            if len(c)>=2:
                prev=float(c.iloc[-2]);r['previousClose']=round(prev,4);r['change']=round(display_price-prev,4);r['changePercent']=round((display_price/prev-1)*100,4) if prev else None
            if len(c)>=2:
                first=float(c.iloc[0]);r['priceReturnPeriodPct']=round((regular_close/first-1)*100,4) if first else None
            if income and 'Dividends' in h.columns:
                div=h['Dividends'].fillna(0);pos=div[div>0]
                if not pos.empty:
                    r['lastDistribution']=round(float(pos.iloc[-1]),6);r['lastDistributionDate']=pos.index[-1].date().isoformat()
                    cutoff=now_utc.date().replace(year=now_utc.date().year-1)
                    trail=pos[[x.date()>=cutoff for x in pos.index]]
                    s=float(trail.sum()) if not trail.empty else 0
                    count=int(len(trail));r['trailing12mDistribution']=round(s,6);r['trailing12mDistributionYield']=round(s/regular_close*100,4) if regular_close>0 else None;r['distributionCount12m']=count
                    r['observedFrequency']='Weekly' if count>=40 else ('Monthly' if count>=10 else ('Quarterly/Irregular' if count>=3 else 'Sparse/Unknown'))
                    y=r.get('trailing12mDistributionYield');pr=r.get('priceReturnPeriodPct')
                    if y is not None and y>=25:r['incomeRiskFlag']='VERY HIGH DISTRIBUTION — validate NAV/ROC/total return'
                    elif y is not None and y>=12:r['incomeRiskFlag']='HIGH DISTRIBUTION — review sustainability'
                    elif y is not None and y>=5:r['incomeRiskFlag']='5%+ SCREEN MATCH — not an automatic buy'
                    else:r['incomeRiskFlag']='Below 5% screen or insufficient data'
                    if y is not None and pr is not None:r['simpleIncomePlusPriceReturnPct']=round(y+pr,4)
            prices[out]=r;ok+=1;print(out,display_price,display_session,display_asof)
        except Exception as e:print('failed',out,e)
    OUT.write_text(json.dumps({"lastUpdated":now_utc.isoformat(),"marketStatus":"updated" if ok else "update_failed","dataStatus":"Latest available intraday/extended-hours snapshot when available; regular close retained separately; NOT guaranteed real-time","prices":prices},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if not ok:raise RuntimeError('No prices updated')
if __name__=='__main__':main()
