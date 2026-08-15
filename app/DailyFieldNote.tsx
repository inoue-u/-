"use client";

const notes = [
  { place: "Aizu-Wakamatsu", title: "Look up at the red roof", text: "Tsuruga Castle is known for the red tiles of its reconstructed keep. Let the roofline—not a checklist—be the beginning of your walk." },
  { place: "Mishima", title: "Let the train set the pace", text: "The Tadami Line follows river valleys through Oku-Aizu. Build the day around the railway rather than trying to fit the railway into a crowded day." },
  { place: "Shimogo", title: "Arrive before the road fills", text: "At Ōuchi-juku, an early arrival leaves more room to notice the pitch of the thatched roofs and the shape of the old post road." },
  { place: "Kitakata", title: "A city read in storehouses", text: "Kitakata’s kura storehouses appear in brick, plaster and timber. Walk slowly enough and the streets become an open-air lesson in local building craft." },
  { place: "Inawashiro", title: "Read the mountain from the lake", text: "Lake Inawashiro opens a broad view toward Mount Bandai. The scale of the landscape is clearest when the itinerary leaves time simply to stop." },
  { place: "Fukushima City", title: "Follow fruit country north", text: "The basin around Fukushima City is shaped by orchards and seasons. Treat roadside fruit stands as part of the landscape, not merely a shopping stop." },
  { place: "Iwaki", title: "Meet Fukushima at the Pacific", text: "Fukushima also faces the sea. In Iwaki, coastal light, working harbours and cultural sites reveal a geography very different from Aizu." },
];

export default function DailyFieldNote() {
  const today = new Date();
  const tokyoParts = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Tokyo" }).formatToParts(today);
  const part = (type: string) => Number(tokyoParts.find((item) => item.type === type)?.value);
  const dayNumber = Math.floor(Date.UTC(part("year"), part("month") - 1, part("day")) / 86400000);
  const note = notes[((dayNumber % notes.length) + notes.length) % notes.length];
  const date = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "Asia/Tokyo" }).format(today);

  return <section className="daily-note" id="daily">
    <div><p className="section-label">UPDATED DAILY · {date}</p><p className="daily-place">TODAY IN {note.place.toUpperCase()}</p></div>
    <div><h2>{note.title}</h2><p>{note.text}</p><p className="daily-disclaimer">A rotating editorial field note—not live operational advice. Check official sources before travelling.</p></div>
  </section>;
}
