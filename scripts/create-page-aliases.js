import fs from "fs";
import path from "path";

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

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

const text = fs.readFileSync(REPORT, "utf8");
const lines = text.split(/\r?\n/);
const re =
  /- \*\*page\*\*: ([^\u2014]+) — \*\*link\*\*: ([^\u2014]+) — \*\*resolved\*\*: (.+)$/;

const missingLinks = [];
for (const ln of lines) {
  const m = ln.match(re);
  if (m) {
    const link = m[2].trim();
    if (link.startsWith("/pages/")) missingLinks.push(link);
  }
}

const distPages = walk(path.join(DIST, "pages"));
const basenameMap = {};
for (const f of distPages) {
  const b = path.basename(f);
  basenameMap[b] = basenameMap[b] || [];
  basenameMap[b].push(f);
}

const actions = [];
for (const link of Array.from(new Set(missingLinks))) {
  // only handle links that look like /pages/<name>.html
  const parts = link.split("/").filter(Boolean);
  if (parts.length < 2) continue;
  const expectedBasename = parts.slice(1).join("/");
  const expectedName = path.basename(expectedBasename);
  // if expected contains underscore, try hyphen variant
  const candidates = [];
  if (expectedName.indexOf("_") !== -1) {
    const hy = expectedName.replace(/_/g, "-");
    if (basenameMap[hy]) candidates.push(...basenameMap[hy]);
  }
  // also try swapping hyphen->underscore if expected has hyphen
  if (expectedName.indexOf("-") !== -1) {
    const us = expectedName.replace(/-/g, "_");
    if (basenameMap[us]) candidates.push(...basenameMap[us]);
  }
  // try exact basename if present (rare)
  if (basenameMap[expectedName]) candidates.push(...basenameMap[expectedName]);

  if (candidates.length) {
    const src = candidates[0];
    const dest = path.join(DIST, "pages", expectedName);
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      actions.push({
        status: "copied",
        link,
        from: path.relative(ROOT, src),
        to: path.relative(ROOT, dest),
      });
      console.log(
        "[alias] copied",
        path.relative(ROOT, src),
        "->",
        path.relative(ROOT, dest),
      );
    } catch (err) {
      actions.push({ status: "error", link, error: err.message });
      console.error("[alias] error copying", src, "->", dest, err.message);
    }
  } else {
    actions.push({ status: "not_found", link });
    console.log("[alias] no candidate for", link);
  }
}

if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_create_page_aliases.md`);
let md = `# create-page-aliases run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied")
    md += `- COPIED: ${a.link} <- ${a.from} -> ${a.to}\n`;
  else if (a.status === "not_found") md += `- NOT_FOUND: ${a.link}\n`;
  else md += `- ERROR: ${a.link} ( ${a.error} )\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[alias] log written to", logPath);
console.log("[alias] done. actions:", actions.length);
