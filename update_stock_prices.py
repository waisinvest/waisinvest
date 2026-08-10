import json
from datetime import datetime, timezone, time
from pathlib import Path
from zoneinfo import ZoneInfo
import yfinance as yf
SYMBOLS={
"NVDA":("NVDA","USD",False),"TSM":("TSM","USD",False),"AVGO":("AVGO","USD",False),"MRVL":("MRVL","USD",False),"MU":("MU","USD",False),"COHR":("COHR","USD",False),"LITE":("LITE","USD",False),"AXTI":("AXTI","USD",False),"TSEM":("TSEM","USD",False),"POET":("POET","USD",False),"GFS":("GFS","USD",False),"POWL":("POWL","USD",False),"MOD":("MOD","USD",False),"GOOGL":("GOOGL","USD",False),"AAOI":("AAOI","USD",False),"AEHR":("AEHR","USD",False),"FORM":("FORM","USD",False),"MXL":("MXL","USD",False),"NVTS":("NVTS","USD",False),"OSS":("OSS","USD",False),"AIRO":("AIRO","USD",False),
"WEEK":("WEEK","USD",True),"QDTE":("QDTE","USD",True),"TOPW":("TOPW","USD",True),"VDY.TO":("VDY.TO","CAD",True),"ZWB.TO":("ZWB.TO","CAD",True),"ZWC.TO":("ZWC.TO","CAD",True),"ZWU.TO":("ZWU.TO","CAD",True),"JEPI":("JEPI","USD",True),"JEPQ":("JEPQ","USD",True),"QYLD":("QYLD","USD",True)}
OUT=Path('stock-prices.json')
def existing():
 try:return json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {"prices":{}}
 except:return {"prices":{}}
def completed(h):
 if h.empty:return h
 now=datetime.now(timezone.utc).astimezone(ZoneInfo('America/New_York'))
 return h.iloc[:-1] if h.index[-1].date()==now.date() and now.time()<time(16,20) else h
def main():
 data=existing();prices=data.get('prices',{});ok=0
 for out,(sym,currency,income) in SYMBOLS.items():
  try:
   h=completed(yf.Ticker(sym).history(period='1y' if income else '6mo',interval='1d',auto_adjust=False,prepost=False,actions=True))
   c=h['Close'].dropna() if not h.empty else []
   if len(c)==0:continue
   p=float(c.iloc[-1]);d=c.index[-1].date().isoformat();r={"price":round(p,4),"currency":currency,"asOf":d,"source":"Yahoo Finance via yfinance","dataStatus":"Completed daily close; NOT REAL-TIME","sma20":round(float(c.tail(20).mean()),4) if len(c)>=5 else None,"sma50":round(float(c.tail(50).mean()),4) if len(c)>=10 else None}
   if len(c)>=2:
    prev=float(c.iloc[-2]);r['change']=round(p-prev,4);r['changePercent']=round((p/prev-1)*100,4) if prev else None
   if income and 'Dividends' in h.columns:
    div=h['Dividends'].fillna(0);pos=div[div>0]
    if not pos.empty:
     r['lastDistribution']=round(float(pos.iloc[-1]),6);r['lastDistributionDate']=pos.index[-1].date().isoformat();one_year_ago=(datetime.now(timezone.utc).date().replace(year=datetime.now(timezone.utc).date().year-1));trail=pos[[x.date()>=one_year_ago for x in pos.index]];s=float(trail.sum()) if not trail.empty else 0;r['trailing12mDistribution']=round(s,6);r['trailing12mDistributionYield']=round(s/p*100,4) if p>0 else None
   prices[out]=r;ok+=1;print(out,p,d)
  except Exception as e:print('failed',out,e)
 OUT.write_text(json.dumps({"lastUpdated":datetime.now(timezone.utc).isoformat(),"marketStatus":"updated" if ok else "update_failed","dataStatus":"Completed daily close; NOT REAL-TIME","prices":prices},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 if not ok:raise RuntimeError('No prices updated')
if __name__=='__main__':main()

