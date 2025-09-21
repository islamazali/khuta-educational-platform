const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
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
  if (m)
    missing.push({
      page: m[1].trim(),
      link: m[2].trim(),
      resolved: m[3].trim(),
    });
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

const distFiles = walk(DIST);
const byBase = {};
for (const f of distFiles) {
  const b = path.basename(f);
  byBase[b] = byBase[b] || [];
  byBase[b].push(f);
}

const actions = [];
for (const item of missing) {
  const resolved = item.resolved;
  // normalize resolved to absolute path inside repo if it looks like C:\ or /...
  let expected = resolved;
  if (!path.isAbsolute(expected)) expected = path.join(DIST, expected);
  // if already exists, skip
  if (fs.existsSync(expected)) {
    actions.push({ status: "exists", target: expected });
    continue;
  }
  const expectedBasename = path.basename(expected);
  const candidates = byBase[expectedBasename] || [];
  if (candidates.length) {
    const src = candidates[0];
    try {
      fs.mkdirSync(path.dirname(expected), { recursive: true });
      fs.copyFileSync(src, expected);
      actions.push({
        status: "copied",
        from: path.relative(ROOT, src),
        to: path.relative(ROOT, expected),
      });
      console.log(
        "[post-build-fix] copied",
        path.relative(ROOT, src),
        "->",
        path.relative(ROOT, expected),
      );
    } catch (err) {
      actions.push({ status: "error", target: expected, error: err.message });
      console.error("[post-build-fix] error copying", err.message);
    }
  } else {
    actions.push({ status: "not_found", target: expected, link: item.link });
    console.log("[post-build-fix] no candidate for", item.link);
  }
}

if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_post_build_fix.md`);
let md = `# post-build-fix run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied") md += `- COPIED: ${a.from} -> ${a.to}\n`;
  else if (a.status === "exists") md += `- EXISTS: ${a.target}\n`;
  else if (a.status === "not_found")
    md += `- NOT_FOUND: ${a.link} -> expected ${a.target}\n`;
  else md += `- ERROR: ${a.target} (${a.error})\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[post-build-fix] log written to", logPath);
console.log("[post-build-fix] done. actions:", actions.length);
