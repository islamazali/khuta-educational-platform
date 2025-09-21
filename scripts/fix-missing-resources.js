const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
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
const re =
  /- \*\*page\*\*: ([^\u2014]+) — \*\*link\*\*: ([^\u2014]+) — \*\*resolved\*\*: (.+)$/;

const missing = [];
for (const ln of lines) {
  const m = ln.match(re);
  if (m) {
    const page = m[1].trim();
    const link = m[2].trim();
    const resolved = m[3].trim();
    let expected = resolved;
    try {
      expected = path.resolve(resolved);
    } catch (e) {
      expected = path.join(DIST, path.basename(resolved));
    }
    missing.push({ page, link, expected });
  }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

console.log("[fix-missing-resources] indexing src files...");
const allSrc = walk(SRC);
const byBase = {};
for (const f of allSrc) {
  const b = path.basename(f);
  byBase[b] = byBase[b] || [];
  byBase[b].push(f);
}

function scoreCandidate(expectedRelParts, candidatePath) {
  const candParts = candidatePath.split(path.sep).map((p) => p.toLowerCase());
  let score = 0;
  for (const p of expectedRelParts)
    if (candParts.includes(p.toLowerCase())) score++;
  return score;
}

const actions = [];
for (const item of missing) {
  const expected = item.expected;
  let relToDist = expected;
  if (path.isAbsolute(expected)) {
    if (expected.startsWith(DIST)) relToDist = path.relative(DIST, expected);
    else relToDist = path.basename(expected);
  }
  const expectedBasename = path.basename(relToDist);

  if (fs.existsSync(expected)) {
    actions.push({ status: "exists", target: expected });
    continue;
  }

  const candidates = byBase[expectedBasename] || [];
  let chosen = null;
  if (candidates.length === 1) chosen = candidates[0];
  else if (candidates.length > 1) {
    const parts = relToDist.split(path.sep).filter(Boolean);
    let best = null;
    let bestScore = -1;
    for (const c of candidates) {
      const s = scoreCandidate(parts, c);
      if (s > bestScore) {
        bestScore = s;
        best = c;
      }
    }
    chosen = best;
  }

  if (!chosen) {
    const key = expectedBasename.replace(/[-_.]/g, " ").split(" ")[0];
    const fuzzy = allSrc.find((f) =>
      path.basename(f).toLowerCase().includes(key.toLowerCase()),
    );
    if (fuzzy) chosen = fuzzy;
  }

  if (chosen) {
    try {
      const dest = expected;
      const destDir = path.dirname(dest);
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(chosen, dest);
      actions.push({ status: "copied", from: chosen, to: dest });
      console.log(
        "[fix-missing-resources] copied",
        path.relative(ROOT, chosen),
        "->",
        path.relative(ROOT, dest),
      );
    } catch (err) {
      actions.push({ status: "error", error: err.message, target: expected });
      console.error(
        "[fix-missing-resources] error copying to",
        expected,
        err.message,
      );
    }
  } else {
    actions.push({ status: "not_found", target: expected, link: item.link });
    console.log(
      "[fix-missing-resources] no candidate for",
      item.link,
      "->",
      expectedBasename,
    );
  }
}

if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_fix_missing_resources.md`);
let md = `# fix-missing-resources run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied") md += `- COPIED: ${a.from} -> ${a.to}\n`;
  else if (a.status === "exists") md += `- EXISTS: ${a.target}\n`;
  else if (a.status === "not_found")
    md += `- NOT_FOUND: ${a.link} -> expected ${a.target}\n`;
  else md += `- ERROR: ${a.target} (${a.error})\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[fix-missing-resources] log written to", logPath);
console.log("[fix-missing-resources] done. actions:", actions.length);
