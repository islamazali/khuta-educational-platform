const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PAGES = path.join(ROOT, "src", "pages");
const DIST = path.join(ROOT, "dist");
const REPORT = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_404_report.md",
);
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

if (!fs.existsSync(REPORT)) {
  console.error("404 report not found:", REPORT);
  process.exit(1);
}

const text = fs.readFileSync(REPORT, "utf8");
const lines = text.split(/\r?\n/);

const pageLinks = new Set();
const re =
  /- \*\*page\*\*: ([^\u2014]+) — \*\*link\*\*: ([^\u2014]+) — \*\*resolved\*\*: (.+)$/;
for (const ln of lines) {
  const m = ln.match(re);
  if (m) {
    const link = m[2].trim();
    if (link.startsWith("/pages/") || link.startsWith("/pages")) {
      const normalized = link.startsWith("/pages/")
        ? link
        : "/pages/" + link.split("/").slice(1).join("/");
      pageLinks.add(normalized);
    }
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.isFile()) out.push(f);
  }
  return out;
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

const pageFiles = walk(PAGES);
const basenameToFiles = {};
for (const f of pageFiles) {
  const b = path.basename(f);
  basenameToFiles[b] = basenameToFiles[b] || [];
  basenameToFiles[b].push(f);
}

const actions = [];
for (const link of Array.from(pageLinks)) {
  const basename = path.basename(link);
  const expectedDist = path.join(DIST, link.slice(1)); // Preserve directory structure
  if (fs.existsSync(expectedDist)) continue;

  const candidates = basenameToFiles[basename] || [];
  if (candidates.length) {
    const pageCandidate = candidates[0];
    ensureDir(path.dirname(expectedDist));
    fs.copyFileSync(pageCandidate, expectedDist);
    actions.push({
      link,
      from: path.relative(ROOT, pageCandidate),
      to: path.relative(ROOT, expectedDist),
      status: "copied",
    });
    console.log(
      "[fix-pages] copied",
      path.relative(ROOT, pageCandidate),
      "->",
      path.relative(ROOT, expectedDist),
    );
  } else {
    actions.push({
      link,
      from: null,
      to: path.relative(ROOT, expectedDist),
      status: "not_found",
    });
    console.warn("[fix-pages] candidate not found for", link);
  }
}

ensureDir(LOGDIR);
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_fix_missing_pages.md`);
let md = `# fix-missing-pages run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  md += `- ${a.status.toUpperCase()}: ${a.link} -> ${a.to}`;
  if (a.from) md += ` (from ${a.from})`;
  md += "\n";
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[fix-pages] log written to", logPath);
console.log("[fix-pages] done. total actions:", actions.length);
