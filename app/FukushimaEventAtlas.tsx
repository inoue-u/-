"use client";

import { useMemo, useState } from "react";

type EventItem = {
  id: string; title: string; start: string; end: string; city: string;
  region: "Aizu" | "Nakadori" | "Hamadori"; category: "Art" | "Festival" | "Culture" | "Outdoor";
  venue: string; source: string; sourceName: string; verified: string; note: string;
};

const events: EventItem[] = [
  { id:"landscape", title:"My Favourite Fukushima Landscape — Instagram Photo Campaign", start:"2026-06-12", end:"2026-09-30", city:"Prefecture-wide", region:"Nakadori", category:"Outdoor", venue:"Online / across Fukushima", source:"https://www.pref.fukushima.lg.jp/calendar/", sourceName:"Fukushima Prefecture", verified:"2026-08-16", note:"A prefectural campaign marking 150 years since the present shape of Fukushima Prefecture was established." },
  { id:"lindberg", title:"Stig Lindberg: A Master of 20th-Century Nordic Design", start:"2026-06-27", end:"2026-08-23", city:"Iwaki", region:"Hamadori", category:"Art", venue:"Iwaki City Art Museum", source:"https://www.city.iwaki.lg.jp/www/contents/1001000005268/index.html", sourceName:"Iwaki City Art Museum", verified:"2026-08-16", note:"The museum’s official 2026 exhibition programme lists this exhibition through 23 August." },
  { id:"manhole", title:"Iwaki Design Manhole Photo Rally 2026 — Part Two", start:"2026-08-01", end:"2027-02-28", city:"Iwaki", region:"Hamadori", category:"Outdoor", venue:"Locations across Iwaki", source:"https://www.city.iwaki.lg.jp/www/genre/1452741939257/index.html", sourceName:"Iwaki City", verified:"2026-08-16", note:"A city-listed photo rally running across multiple locations. Check the official page for participation details." },
  { id:"yoko", title:"Yoko Matsumoto: The Day I Saw the Evening Star", start:"2026-09-12", end:"2026-11-01", city:"Iwaki", region:"Hamadori", category:"Art", venue:"Iwaki City Art Museum", source:"https://www.city.iwaki.lg.jp/www/contents/1001000005268/index.html", sourceName:"Iwaki City Art Museum", verified:"2026-08-16", note:"Dates are taken from the museum’s official annual exhibition programme." },
  { id:"watanabe", title:"New Art Scene in Iwaki: Jun Watanabe", start:"2026-09-12", end:"2026-11-01", city:"Iwaki", region:"Hamadori", category:"Art", venue:"Iwaki City Art Museum", source:"https://www.city.iwaki.lg.jp/www/contents/1001000005268/index.html", sourceName:"Iwaki City Art Museum", verified:"2026-08-16", note:"Runs alongside the Yoko Matsumoto exhibition, creating a verified same-venue pairing." },
  { id:"rehearsal", title:"Koriyama Symphony Orchestra Open Rehearsal", start:"2026-08-26", end:"2026-08-26", city:"Koriyama", region:"Nakadori", category:"Culture", venue:"Musical Gakutokan Small Hall", source:"https://www.city.koriyama.lg.jp/site/gakutokoriyama/54272.html", sourceName:"Koriyama City", verified:"2026-08-16", note:"Official listing: 18:45 start; advance application and admission conditions apply." },
  { id:"mandolin", title:"Meiji University Mandolin Club Koriyama Concert", start:"2026-08-27", end:"2026-08-27", city:"Koriyama", region:"Nakadori", category:"Culture", venue:"Koriyama Civic Cultural Center", source:"https://www.city.koriyama.lg.jp/site/gakutokoriyama/54272.html", sourceName:"Koriyama City", verified:"2026-08-16", note:"Official listing: 18:30 start; reserved seating and paid admission." },
  { id:"chamber", title:"Chamber Music Lab 2026", start:"2026-08-29", end:"2026-08-29", city:"Koriyama", region:"Nakadori", category:"Culture", venue:"Koriyama Public Hall", source:"https://www.city.koriyama.lg.jp/site/gakutokoriyama/54272.html", sourceName:"Koriyama City", verified:"2026-08-16", note:"Official listing: 14:00 start; ticket conditions apply." },
  { id:"water", title:"Late-Summer Aquatic Recreation Day", start:"2026-09-13", end:"2026-09-13", city:"Aizu-Wakamatsu", region:"Aizu", category:"Festival", venue:"Aizu-Wakamatsu Community Pool", source:"https://www.city.aizuwakamatsu.fukushima.jp/index_php/event_callen/show_callen.php?data_id=2026071403542253302e83108c48bb23684ac7787e82", sourceName:"Aizu-Wakamatsu City", verified:"2026-08-16", note:"Official listing: registration from 09:30; capacity, fee and age conditions apply." },
];

const regions = ["All", "Aizu", "Nakadori", "Hamadori"] as const;
const categories = ["All", "Art", "Festival", "Culture", "Outdoor"] as const;

function iso(date: Date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
function labelDate(value:string){ return new Intl.DateTimeFormat("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(`${value}T00:00:00Z`)); }

export default function FukushimaEventAtlas(){
  const today = new Date();
  const [month,setMonth] = useState(new Date(today.getFullYear(),today.getMonth(),1));
  const [region,setRegion] = useState<(typeof regions)[number]>("All");
  const [category,setCategory] = useState<(typeof categories)[number]>("All");
  const [selected,setSelected] = useState<string|null>(null);
  const first = new Date(month.getFullYear(),month.getMonth(),1);
  const last = new Date(month.getFullYear(),month.getMonth()+1,0);
  const monthStart=iso(first), monthEnd=iso(last);
  const visible=useMemo(()=>events.filter(e=>e.end>=monthStart&&e.start<=monthEnd&&(region==="All"||e.region===region)&&(category==="All"||e.category===category)),[monthStart,monthEnd,region,category]);
  const cells=[...Array(first.getDay()).fill(null),...Array(last.getDate()).keys()].map((v,i)=>v===null?null:new Date(month.getFullYear(),month.getMonth(),v+1));
  const chosen=events.find(e=>e.id===selected);
  const paired=chosen?events.filter(e=>e.id!==chosen.id&&e.city===chosen.city&&e.start<=chosen.end&&e.end>=chosen.start):[];

  return <section className="event-atlas" id="events">
    <div className="atlas-heading"><div><p className="section-label">04 / FUKUSHIMA EVENT ATLAS</p><h2>Events, with<br /><em>receipts.</em></h2></div><p>Every listing links to a municipal, prefectural or venue-operated source. If dates conflict or a source disappears, the listing is held back rather than guessed.</p></div>
    <div className="source-status"><span className="status-dot"/> OFFICIAL-SOURCE DATASET <b>{events.length} VERIFIED LISTINGS</b><span>Last editorial verification: 16 August 2026</span></div>
    <div className="atlas-tools">
      <div className="filter-group"><span>REGION</span>{regions.map(x=><button className={region===x?"active":""} onClick={()=>setRegion(x)} key={x}>{x}</button>)}</div>
      <div className="filter-group"><span>INTEREST</span>{categories.map(x=><button className={category===x?"active":""} onClick={()=>setCategory(x)} key={x}>{x}</button>)}</div>
    </div>
    <div className="calendar-shell">
      <div className="calendar-main">
        <div className="month-nav"><button aria-label="Previous month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>←</button><h3>{new Intl.DateTimeFormat("en-GB",{month:"long",year:"numeric"}).format(month)}</h3><button aria-label="Next month" onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>→</button></div>
        <div className="weekdays">{["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d=><span key={d}>{d}</span>)}</div>
        <div className="month-grid">{cells.map((date,index)=>{
          if(!date)return <div className="day empty" key={`e${index}`}/>;
          const key=iso(date); const dayEvents=visible.filter(e=>e.start<=key&&e.end>=key);
          return <div className={`day ${key===iso(today)?"today":""}`} key={key}><span className="day-number">{date.getDate()}</span>{dayEvents.slice(0,3).map(e=><button key={e.id} className={`event-pill ${e.region.toLowerCase()}`} onClick={()=>setSelected(e.id)}><i/>{e.title}</button>)}{dayEvents.length>3&&<small>+{dayEvents.length-3} more</small>}</div>;
        })}</div>
      </div>
      <aside className="event-panel">
        {chosen?<><button className="close-panel" onClick={()=>setSelected(null)}>CLOSE ×</button><p className="card-eyebrow">{chosen.region} · {chosen.category}</p><h3>{chosen.title}</h3><p className="event-date">{labelDate(chosen.start)}{chosen.end!==chosen.start&&` — ${labelDate(chosen.end)}`}</p><dl><div><dt>PLACE</dt><dd>{chosen.venue}<br/>{chosen.city}</dd></div><div><dt>WHY TRUST IT</dt><dd>Verified against {chosen.sourceName} on {labelDate(chosen.verified)}.</dd></div></dl><p>{chosen.note}</p><a className="source-link" href={chosen.source} target="_blank" rel="noreferrer">OPEN OFFICIAL SOURCE ↗</a>{paired.length>0&&<div className="smart-pair"><span>SMART PAIR · SAME PLACE & DATE</span>{paired.map(e=><button key={e.id} onClick={()=>setSelected(e.id)}>{e.title} →</button>)}</div>}</>:<><p className="card-eyebrow">HOW TO USE</p><h3>Choose a coloured event.</h3><p>Open any listing to see its official source, verification date and practical caveats.</p><div className="unique-feature"><span>UNIQUE FEATURE</span><h4>Smart Pair</h4><p>When two verified events overlap in the same city, the atlas surfaces them together—helping you build a richer day with less travel.</p></div></>}
      </aside>
    </div>
    <p className="atlas-legal">Event details can change. This calendar never substitutes for the organiser’s official page. Always confirm opening hours, admission, booking and cancellation information before travel.</p>
  </section>;
}
