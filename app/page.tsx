import DailyFieldNote from "./DailyFieldNote";
import FukushimaEventAtlas from "./FukushimaEventAtlas";

const journeys = [
  { number: "01", eyebrow: "AIZU-WAKAMATSU · 2 DAYS", title: "A castle town in winter light", text: "Red tiles above fresh snow, lacquerware workshops, quiet streets and a local table shaped by the seasons.", image: "/images/tsuruga-winter.jpg", alt: "Tsuruga Castle in Aizuwakamatsu during winter", focus: "History · Craft · Sake" },
  { number: "02", eyebrow: "OKU-AIZU · SLOW RAIL", title: "Follow the river into deep Japan", text: "A small train, a green river and mountain villages where the journey is not a gap between destinations—it is the destination.", image: "/images/tadami-autumn.jpg", alt: "A Tadami Line train crossing the First Tadami River Bridge in autumn", focus: "Rail · Landscape · Onsen" },
  { number: "03", eyebrow: "MINAMI-AIZU · 1 DAY", title: "An Edo road beneath thatched roofs", text: "Walk a preserved post town early, before the day grows busy, then continue into the mountain country beyond.", image: "/images/ouchi-juku.jpg", alt: "Traditional thatched-roof houses lining the road at Ouchi-juku", focus: "Village · Food · Walking" },
];

const principles = [
  ["Quiet over crowded", "Places with room to look, listen and stay a little longer."],
  ["Routes with a reason", "Journeys edited around art, landscape and local craft—not checklists."],
  ["Verified before you go", "Practical details point back to official sources and show when they were checked."],
];

export default function Home() {
  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="The Quiet North of Japan home"><span className="brand-mark">QN</span><span>The Quiet North<br />of Japan</span></a>
      <nav aria-label="Primary navigation"><a href="#journeys">Journeys</a><a href="#events">Events</a><a href="#daily">Daily note</a></nav>
      <a className="header-cta" href="#journeys">Explore Fukushima <span>↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-photo" role="img" aria-label="Tsuruga Castle in winter" /><div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div><p className="kicker"><span /> An independent field guide to Fukushima</p><h1>Japan begins again<br />where the map<br /><em>grows quiet.</em></h1></div>
        <div className="hero-bottom"><p>Slow journeys through art, architecture,<br />craft, railways and the landscapes of Fukushima.</p><a href="#journeys" className="round-link" aria-label="View curated journeys">↓</a></div>
      </div>
      <p className="vertical-note">FUKUSHIMA PREFECTURE · JAPAN</p>
    </section>

    <section className="intro" id="approach">
      <div className="section-label">01 / WHY NORTH</div>
      <div className="intro-copy"><p className="lead">Not another list of Japan&apos;s<br />most famous places.</p><p className="body-copy">This is an English-language guide for the journey beyond Tokyo and Kyoto. For now, every story stays within Fukushima Prefecture—small museums, mountain railways, working studios and towns that reward attention rather than speed.</p></div>
    </section>

    <section className="journeys" id="journeys">
      <div className="section-heading"><div><p className="section-label">02 / CURATED JOURNEYS</p><h2>Three ways<br />into <em>Aizu.</em></h2></div><p>Begin with a place. Leave with a thread that ties the landscape, its makers and its history together.</p></div>
      <div className="journey-grid">{journeys.map((journey) => <article className="journey-card" key={journey.number}>
        <div className="image-wrap"><img src={journey.image} alt={journey.alt} /><span className="card-number">{journey.number}</span></div>
        <p className="card-eyebrow">{journey.eyebrow}</p><h3>{journey.title}</h3><p className="card-text">{journey.text}</p><div className="card-meta"><span>{journey.focus}</span><span aria-hidden="true">↗</span></div>
      </article>)}</div>
    </section>

    <section className="manifesto">
      <p className="section-label light">03 / OUR EDITORIAL PROMISE</p><blockquote>“A useful guide should<br />leave room for <em>wonder.</em>”</blockquote>
      <div className="principles">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <DailyFieldNote />
    <FukushimaEventAtlas />

    <footer>
      <a className="brand footer-brand" href="#top"><span className="brand-mark">QN</span><span>The Quiet North<br />of Japan</span></a>
      <p>Independent English-language field notes for thoughtful journeys within Fukushima Prefecture.</p><div className="footer-links"><a href="#journeys">Journeys</a><a href="#approach">About</a><a href="#daily">Daily note</a></div><p className="copyright">© 2026 The Quiet North of Japan<br />Text and design rights reserved.</p>
      <details className="credits"><summary>Photography licences and credits</summary><div className="credit-list">
        <p><a href="https://commons.wikimedia.org/wiki/File:Tsuruga-jyo_castle_in_winter.jpg">Tsuruga Castle in winter</a> · photograph by Breakover · CC BY-SA 3.0 · cropped and colour-adjusted.</p>
        <p><a href="https://commons.wikimedia.org/wiki/File:Tadami-Line-First-Bridge-Autumn.jpg">Tadami Line, First Tadami River Bridge in autumn</a> · photograph by MaedaAkihiko · CC BY-SA 4.0 · cropped and colour-adjusted.</p>
        <p><a href="https://commons.wikimedia.org/wiki/File:Ouchi-juku,_Fukushima_02.jpg">Ōuchi-juku</a> · photograph by Σ64 · CC BY 4.0 · cropped and colour-adjusted.</p>
        <p>Each photograph is a real photograph of the named location. No AI-generated imagery is used. Adapted photographs remain available under their respective Creative Commons terms.</p>
      </div></details>
    </footer>
  </main>;
}
