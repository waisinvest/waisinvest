import json,re,urllib.request
from datetime import datetime,timezone,time,timedelta
from pathlib import Path
from zoneinfo import ZoneInfo
import yfinance as yf
SYMS={"SP500":("^GSPC","US"),"NASDAQ":("^IXIC","US"),"NASDAQ100":("^NDX","US"),"DOW":("^DJI","US"),"SOX":("^SOX","US"),"VIX":("^VIX","US"),"US10Y":("^TNX","US"),"HSI":("^HSI","HK"),"HSTECH":("HSTECH.HK","HK")};OUT=Path('market-indicators.json');EV=Path('weekly-events.json')
def load(p,d):
 try:return json.loads(p.read_text(encoding='utf-8')) if p.exists() else d
 except:return d
def complete(h,m):
 if h.empty:return h
 tz=ZoneInfo('Asia/Hong_Kong' if m=='HK' else 'America/New_York');now=datetime.now(timezone.utc).astimezone(tz)
 return h.iloc[:-1] if h.index[-1].date()==now.date() and now.time()<time(16,20) else h
def fetch(u):
 r=urllib.request.Request(u,headers={'User-Agent':'WAIS-Invest/1.0'});return urllib.request.urlopen(r,timeout=20).read().decode('utf-8','ignore')
def events():
 out=[]
 try:
  t=re.sub(r'\r?\n[ \t]','',fetch('https://www.bls.gov/schedule/news_release/bls.ics'))
  for b in t.split('BEGIN:VEVENT')[1:]:
   sm=re.search(r'SUMMARY:(.+)',b);dm=re.search(r'DTSTART(?:;[^:]*)?:(\d{8})',b)
   if not sm or not dm:continue
   name='美國 CPI' if 'Consumer Price Index' in sm.group(1) else ('美國 PPI' if 'Producer Price Index' in sm.group(1) else None)
   if name:
    d=datetime.strptime(dm.group(1),'%Y%m%d').date();out.append({"dateISO":d.isoformat(),"date":d.strftime('%m月%d日'),"event":name,"time":"08:30 ET","source":"U.S. Bureau of Labor Statistics"})
 except Exception as e:print('BLS events failed',e)
 try:
  h=re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',fetch('https://www.census.gov/economic-indicators/calendar-listview.html')));months={m:i for i,m in enumerate('January February March April May June July August September October November December'.split(),1)}
  for m,d,y in re.findall(r'Advance Monthly Sales for Retail and Food Services\s+([A-Z][a-z]+)\s+(\d{1,2}),\s+(20\d{2})\s+8:30 AM',h):
   dt=datetime(int(y),months[m],int(d)).date();out.append({"dateISO":dt.isoformat(),"date":dt.strftime('%m月%d日'),"event":"美國零售銷售","time":"08:30 ET","source":"U.S. Census Bureau"})
 except Exception as e:print('Census events failed',e)
 today=datetime.now(timezone.utc).astimezone(ZoneInfo('America/New_York')).date();end=today+timedelta(days=7);out=[e for e in out if today<=datetime.fromisoformat(e['dateISO']).date()<=end];out.sort(key=lambda e:(e['dateISO'],e['time'],e['event']));
 if out:EV.write_text(json.dumps({"lastUpdated":datetime.now(timezone.utc).isoformat(),"window":{"from":today.isoformat(),"to":end.isoformat()},"dataStatus":"Official release schedules; verify again before trading","events":out},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def main():
 old=load(OUT,{});ind=old.get('indicators',{});dates={"US":None,"HK":None};ok=0
 for name,(sym,mkt) in SYMS.items():
  try:
   h=complete(yf.Ticker(sym).history(period='10d',interval='1d',auto_adjust=False,prepost=False));c=h['Close'].dropna() if not h.empty else []
   if len(c)==0:continue
   p=float(c.iloc[-1]);d=c.index[-1].date().isoformat();prev=float(c.iloc[-2]) if len(c)>=2 else p;chg=p-prev;pct=chg/prev*100 if prev else 0;ind[name]={"symbol":sym,"value":round(p,4),"previousClose":round(prev,4),"change":round(chg,4),"changePercent":round(pct,4),"asOf":d,"source":"Yahoo Finance via yfinance","dataStatus":"Completed daily close; NOT REAL-TIME"};dates[mkt]=max([x for x in [dates[mkt],d] if x]);ok+=1
  except Exception as e:print('failed',name,e)
 if 'HSIF' in ind:ind['HSIF']['dataStatus']=ind['HSIF'].get('dataStatus','Separately verified futures data; NOT REAL-TIME')
 OUT.write_text(json.dumps({"lastUpdated":datetime.now(timezone.utc).isoformat(),"marketDates":dates,"marketStatus":"updated" if ok else "update_failed","dataStatus":"Completed daily close / separately verified delayed data; NOT REAL-TIME","indicators":ind},ensure_ascii=False,indent=2)+'\n',encoding='utf-8');events()
 if not ok:raise RuntimeError('No market indicators updated')
if __name__=='__main__':main()
