const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CSV = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_404_report.csv",
);
const SRC = path.join(ROOT, "src");
const BACKUP = path.join(ROOT, "backup", "archives");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(CSV)) {
  console.error("CSV not found:", CSV);
  process.exit(1);
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

console.log("Indexing src and backup files...");
const srcFiles = walk(SRC);
const backupFiles = walk(BACKUP);
const byBase = {};
for (const f of srcFiles) {
  const b = path.basename(f);
  byBase[b] = byBase[b] || { src: [], backup: [] };
  byBase[b].src.push(f);
}
for (const f of backupFiles) {
  const b = path.basename(f);
  byBase[b] = byBase[b] || { src: [], backup: [] };
  byBase[b].backup.push(f);
}

const lines = fs
  .readFileSync(CSV, "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean);
const actions = [];

for (const line of lines) {
  const parts = line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((s) => s.replace(/^"|"$/g, "").trim());
  if (parts.length < 3) continue;
  const [page, link, resolved] = parts;
  if (link.includes("${")) {
    actions.push({ status: "skipped_dynamic", link, resolved });
    continue;
  }
  const basename = path.basename(link);
  const candidates = byBase[basename] || { src: [], backup: [] };
  const foundSrc = candidates.src.length ? candidates.src[0] : null;
  const foundBackup =
    !foundSrc && candidates.backup.length ? candidates.backup[0] : null;
  const target =
    resolved.startsWith(path.sep) || /^[A-Z]:\\/i.test(resolved)
      ? resolved
      : path.join(DIST, resolved);

  if (!foundSrc && !foundBackup) {
    actions.push({ status: "not_found", link, target });
    continue;
  }

  const srcPath = foundSrc || foundBackup;
  try {
    if (fs.existsSync(target)) {
      const stamp = new Date().toISOString().replace(/[:.]/g, "");
      const bkDest = path.join(
        BACKUP,
        `pre_copy_${stamp}`,
        path.relative(DIST, target),
      );
      fs.mkdirSync(path.dirname(bkDest), { recursive: true });
      fs.copyFileSync(target, bkDest);
      actions.push({ status: "backed_up", target, backup: bkDest });
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(srcPath, target);
    actions.push({ status: "copied", from: srcPath, to: target });
    console.log("[apply-exact] copied", srcPath, "->", target);
  } catch (err) {
    actions.push({ status: "error", link, error: err.message });
    console.error(
      "[apply-exact] error copying",
      srcPath,
      "->",
      target,
      err.message,
    );
  }
}

if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_apply_exact_sources.md`);
let md = `# apply-exact-sources run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied") md += `- COPIED: ${a.from} -> ${a.to}\n`;
  else if (a.status === "backed_up")
    md += `- BACKED_UP: ${a.target} -> ${a.backup}\n`;
  else if (a.status === "not_found")
    md += `- NOT_FOUND: ${a.link} -> expected ${a.target}\n`;
  else if (a.status === "skipped_dynamic")
    md += `- SKIPPED_DYNAMIC: ${a.link}\n`;
  else md += `- ERROR: ${JSON.stringify(a)}\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("Log written to", logPath);
console.log("Done. actions:", actions.length);
