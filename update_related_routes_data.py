import json
import math
import statistics
from datetime import datetime, timezone, timedelta
from pathlib import Path
import yfinance as yf

OUT = Path('stock-prices.json')

# Public research universe only. A product appearing here is NOT a buy approval.
# Product identity is independently verified in the public route registry; this feed supplies
# activity/tracking/income evidence used to decide VALIDATING vs eligible-for-ranking.
ROUTES = {
    # GFS
    'GFSG': {'underlying':'GFS','type':'leveraged','multiple':2},
    # NVDA
    'NVDL': {'underlying':'NVDA','type':'leveraged','multiple':2},
    'NVDX': {'underlying':'NVDA','type':'leveraged','multiple':2},
    'NVDU': {'underlying':'NVDA','type':'leveraged','multiple':2},
    'NVDB': {'underlying':'NVDA','type':'leveraged','multiple':2},
    'NVDY': {'underlying':'NVDA','type':'income'},
    'NVYY': {'underlying':'NVDA','type':'income'},
    'NYYY': {'underlying':'NVDA','type':'income'},
    # GOOGL
    'GGLL': {'underlying':'GOOGL','type':'leveraged','multiple':2},
    'GOU': {'underlying':'GOOGL','type':'leveraged','multiple':2},
    'GOOL': {'underlying':'GOOGL','type':'leveraged','multiple':2},
    'GOOY': {'underlying':'GOOGL','type':'income'},
    'GOOW': {'underlying':'GOOGL','type':'income'},
    'GOOP': {'underlying':'GOOGL','type':'income'},
    # MU
    'MUU': {'underlying':'MU','type':'leveraged','multiple':2},
    'MULL': {'underlying':'MU','type':'leveraged','multiple':2},
    'MIC': {'underlying':'MU','type':'leveraged','multiple':2},
    'MUYY': {'underlying':'MU','type':'income'},
    'MUIB': {'underlying':'MU','type':'income'},
    # AVGO
    'AVL': {'underlying':'AVGO','type':'leveraged','multiple':2},
    'AVGU': {'underlying':'AVGO','type':'leveraged','multiple':2},
    'AVGX': {'underlying':'AVGO','type':'leveraged','multiple':2},
    'AVGG': {'underlying':'AVGO','type':'leveraged','multiple':2},
    'AVGC': {'underlying':'AVGO','type':'leveraged','multiple':2},
    'AVGW': {'underlying':'AVGO','type':'income'},
    # TSM
    'TSMX': {'underlying':'TSM','type':'leveraged','multiple':2},
    'TSMU': {'underlying':'TSM','type':'leveraged','multiple':2},
    'TSMG': {'underlying':'TSM','type':'leveraged','multiple':2},
    'TWSC': {'underlying':'TSM','type':'leveraged','multiple':2},
    'TSMY': {'underlying':'TSM','type':'income'},
    'TMYY': {'underlying':'TSM','type':'income'},
    # RKLB / TSEM / AXTI
    'RKLX': {'underlying':'RKLB','type':'leveraged','multiple':2},
    'RKXX': {'underlying':'RKLB','type':'leveraged','multiple':2},
    'TSEG': {'underlying':'TSEM','type':'leveraged','multiple':2},
    'TSEU': {'underlying':'TSEM','type':'leveraged','multiple':2},
    'AXTX': {'underlying':'AXTI','type':'leveraged','multiple':2},
    'AXTU': {'underlying':'AXTI','type':'leveraged','multiple':2},
    'AXTL': {'underlying':'AXTI','type':'leveraged','multiple':2},
    'AXTC': {'underlying':'AXTI','type':'leveraged','multiple':2},
    # Newly verified live routes from current exchange / issuer / SEC review
    'MRVU': {'underlying':'MRVL','type':'leveraged','multiple':2},
    'MRVX': {'underlying':'MRVL','type':'leveraged','multiple':2},
    'COHH': {'underlying':'COHR','type':'leveraged','multiple':2},
    'LITX': {'underlying':'LITE','type':'leveraged','multiple':2},
    'AAOG': {'underlying':'AAOI','type':'leveraged','multiple':2},
    'AAOX': {'underlying':'AAOI','type':'leveraged','multiple':2},
}

# Stock-route cards need the same activity evidence as ETF routes. These are current public
# Watchlist underlyings; adding liquidity metrics does not change their stock decision status.
WATCH_UNDERLYINGS = [
    'GFS','NVDA','GOOGL','MU','AVGO','POWL','MOD','RKLB','TSEM','AXTI','TSM','MRVL','COHR','LITE','AAOI'
]

def load_data():
    try:
        return json.loads(OUT.read_text(encoding='utf-8'))
    except Exception:
        return {'prices':{}}

def pct_returns(series):
    vals=[float(x) for x in series.dropna().tolist()]
    return [(vals[i]/vals[i-1]-1.0) for i in range(1,len(vals)) if vals[i-1] != 0]

def income_metrics(hist, close):
    if 'Dividends' not in hist.columns or close <= 0:
        return {}
    div=hist['Dividends'].fillna(0)
    pos=div[div>0]
    if pos.empty:
        return {}
    today=datetime.now(timezone.utc).date()
    ttm=pos[[x.date()>=today-timedelta(days=365) for x in pos.index]]
    cash_ttm=float(ttm.sum()) if not ttm.empty else 0.0
    cash30=float(pos[[x.date()>=today-timedelta(days=30) for x in pos.index]].sum())
    ttm_yield=cash_ttm/close*100
    rate30=cash30/close*100
    buckets=[]
    for offset in range(11,-1,-1):
        y=today.year; m=today.month-offset
        while m<=0: y-=1; m+=12
        buckets.append(sum(float(v) for idx,v in ttm.items() if idx.year==y and idx.month==m))
    active=[x for x in buckets if x>0]
    coverage=len(active)/12
    if len(active)>=2:
        mean=statistics.fmean(active); cv=statistics.pstdev(active)/mean if mean>0 else 1.0
    else:
        cv=1.0
    consistency=max(0.0,min(100.0,100.0-(55.0*min(cv,1.5))-(30.0*(1.0-coverage))))
    median_month=statistics.median(active) if active else 0.0
    annual=(median_month*12/close*100) if close>0 else 0.0
    sustainable=max(0.0,min(ttm_yield,annual)*(0.70+0.30*(consistency/100.0)))
    count=len(ttm)
    return {
        'trailing12mDistributionYield':round(ttm_yield,4),
        'current30dIncomeRate':round(rate30,4),
        'incomeConsistency':round(consistency,1),
        'sustainableIncomeYield':round(sustainable,4),
        'distributionCount12m':count,
        'observedFrequency':'Weekly' if count>=40 else ('Monthly' if count>=10 else ('Quarterly/Irregular' if count>=3 else 'Sparse/Unknown')),
        'lastDistribution':round(float(pos.iloc[-1]),6),
        'lastDistributionDate':pos.index[-1].date().isoformat(),
    }

def activity_metrics(hist, close):
    if hist.empty or close <= 0:
        return {}
    vols=hist['Volume'].dropna().tail(20) if 'Volume' in hist.columns else []
    avg_vol=float(vols.mean()) if len(vols) else None
    avg_dollar=(avg_vol*close) if avg_vol is not None else None
    closes=hist['Close'].dropna()
    rets=pct_returns(closes.tail(61))
    vol60=(statistics.pstdev(rets)*math.sqrt(252)*100) if len(rets)>=10 else None
    return {
        'avgVolume20d':round(avg_vol,2) if avg_vol is not None else None,
        'avgDollarVolume20d':round(avg_dollar,2) if avg_dollar is not None else None,
        'realizedVol60dAnnualizedPct':round(vol60,2) if vol60 is not None else None,
    }

def main():
    data=load_data(); prices=data.setdefault('prices',{})
    now=datetime.now(timezone.utc)
    underlying_cache={}
    failed=[]; updated=0

    for symbol,meta in ROUTES.items():
        try:
            t=yf.Ticker(symbol)
            hist=t.history(period='1y',interval='1d',auto_adjust=False,prepost=False,actions=True)
            closes=hist['Close'].dropna()
            if closes.empty:
                failed.append(symbol); continue
            close=float(closes.iloc[-1]); date=closes.index[-1].date().isoformat()
            q={
                'price':round(close,4),'regularClose':round(close,4),'regularCloseDate':date,'asOf':date,
                'currency':'USD','session':'CLOSE','source':'Yahoo Finance via yfinance',
                'dataStatus':'Completed daily close / Related Route research feed',
                'routeUnderlying':meta['underlying'],'routeType':meta['type'],
                **activity_metrics(hist,close),
            }
            if meta['type']=='leveraged':
                u=meta['underlying']
                if u not in underlying_cache:
                    uh=yf.Ticker(u).history(period='4mo',interval='1d',auto_adjust=False,prepost=False,actions=False)
                    underlying_cache[u]=uh['Close'].dropna()
                ur=underlying_cache[u]
                joined=closes.tail(61).to_frame('route').join(ur.tail(61).to_frame('underlying'),how='inner')
                rr=pct_returns(joined['route']); uu=pct_returns(joined['underlying']); n=min(len(rr),len(uu))
                q['targetDailyMultiple']=float(meta.get('multiple',2))
                if n>=10:
                    multiple=float(meta.get('multiple',2)); errs=[abs(rr[-n+i]-(multiple*uu[-n+i])) for i in range(n)]
                    q['trackingErrorMeanAbs60dPct']=round(statistics.fmean(errs)*100,4)
                else:
                    q['trackingErrorMeanAbs60dPct']=None
            else:
                q.update(income_metrics(hist,close))
            prices[symbol]=q; updated+=1
        except Exception as exc:
            print('related route failed',symbol,exc); failed.append(symbol)

    # Enrich the underlying stock records with route-comparison activity metrics. Preserve the
    # existing stock quote/session fields produced by update_stock_prices.py.
    stock_metric_failed=[]
    for symbol in WATCH_UNDERLYINGS:
        try:
            hist=yf.Ticker(symbol).history(period='6mo',interval='1d',auto_adjust=False,prepost=False,actions=False)
            closes=hist['Close'].dropna()
            if closes.empty:
                stock_metric_failed.append(symbol); continue
            close=float(closes.iloc[-1]); date=closes.index[-1].date().isoformat()
            record=prices.setdefault(symbol,{})
            record.update(activity_metrics(hist,close))
            record['routeStockMetricsAsOf']=date
            record['routeStockMetricsStatus']='Completed daily activity metrics for Route Intelligence; stock READY remains independent.'
        except Exception as exc:
            print('stock route metrics failed',symbol,exc); stock_metric_failed.append(symbol)

    data['relatedRoutesLastUpdated']=now.isoformat()
    data['relatedRoutesDataStatus']='Verified-route activity / tracking / income research metrics; public data may be delayed; not exchange real-time; route approval remains separate.'
    data['relatedRoutesFailedSymbols']=sorted(set(failed))
    data['relatedRouteStockMetricFailures']=sorted(set(stock_metric_failed))
    OUT.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('related route updated',updated,'failed',len(failed),'stock metric failed',len(stock_metric_failed))

if __name__=='__main__': main()
