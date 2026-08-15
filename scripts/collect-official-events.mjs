import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const sources = [
  { region: "Prefecture-wide", name: "Fukushima Prefecture", url: "https://www.pref.fukushima.lg.jp/calendar/" },
  { region: "Nakadori", name: "Fukushima City", url: "https://www.city.fukushima.fukushima.jp/calendar.html" },
  { region: "Nakadori", name: "Koriyama City", url: "https://www.city.koriyama.lg.jp/site/gakutokoriyama/54272.html" },
  { region: "Aizu", name: "Aizu-Wakamatsu City", url: "https://www.city.aizuwakamatsu.fukushima.jp/index_php/event_callen/" },
  { region: "Hamadori", name: "Iwaki City", url: "https://www.city.iwaki.lg.jp/www/genre/1452741939257/index.html" },
];

const outputDir = new URL("../public/data/", import.meta.url);
await mkdir(outputDir, { recursive: true });
let previous = {};
try { previous = JSON.parse(await readFile(new URL("source-status.json", outputDir), "utf8")); } catch {}

const checkedAt = new Date().toISOString();
const results = [];
for (const source of sources) {
  try {
    const response = await fetch(source.url, { headers: { "user-agent": "QuietNorthFukushima/1.0 (+official-source-monitor)" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const hash = createHash("sha256").update(html).digest("hex");
    results.push({ ...source, status: "reachable", changed: previous.sources?.find((item) => item.url === source.url)?.hash !== hash, hash, checkedAt });
  } catch (error) {
    results.push({ ...source, status: "held", changed: false, checkedAt, reason: String(error) });
  }
}

const report = {
  policy: "Official sources are monitored daily. A changed page enters editorial verification; the collector never guesses or auto-publishes ambiguous dates.",
  checkedAt,
  sources: results,
};
await writeFile(new URL("source-status.json", outputDir), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Checked ${results.length} official Fukushima sources; ${results.filter((item) => item.changed).length} changed.`);
