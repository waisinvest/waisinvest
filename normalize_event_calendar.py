import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

LIVE=Path('weekly-events.json')
MASTER=Path('verified-events.json')

def load(path, default):
    try:
        return json.loads(path.read_text(encoding='utf-8')) if path.exists() else default
    except Exception:
        return default

def main():
    live=load(LIVE,{'events':[]})
    master=load(MASTER,{'events':[]})
    today=datetime.now(timezone.utc).date()
    end=today+timedelta(days=13)
    keyed={}
    for e in list(master.get('events',[]))+list(live.get('events',[])):
        date=e.get('dateISO')
        if not date or not(today.isoformat() <= date <= end.isoformat()):
            continue
        keyed[(date,e.get('event'),e.get('time'))]=e
    events=sorted(keyed.values(),key=lambda x:(x.get('dateISO','9999'),x.get('time','99:99'),x.get('event','')))
    out={
        'lastUpdated':live.get('lastUpdated') or master.get('lastVerified') or datetime.now(timezone.utc).isoformat(),
        'lastVerifiedMaster':master.get('lastVerified'),
        'window':{'from':today.isoformat(),'to':end.isoformat()},
        'dataStatus':'Rolling 14-day verified calendar. Official auto feeds merge with the WAIS verified-event master; narrower or failed feeds cannot delete unrelated verified events.',
        'sourceHealth':live.get('sourceHealth',{}),
        'sourceErrors':live.get('sourceErrors',[]),
        'events':events,
    }
    LIVE.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Normalized event calendar: {len(events)} events, {today} -> {end}')

if __name__=='__main__': main()
