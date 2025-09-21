const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const PAGES = path.join(DIST, "pages");
const BACKUP_DIR = path.join(ROOT, "backup", "archives");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
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

function backupPages() {
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const dest = path.join(BACKUP_DIR, `dist_pages_backup_${stamp}`);
  ensureDir(dest);
  function copyDir(s, d) {
    ensureDir(d);
    for (const e of fs.readdirSync(s, { withFileTypes: true })) {
      const ss = path.join(s, e.name);
      const dd = path.join(d, e.name);
      if (e.isDirectory()) copyDir(ss, dd);
      else fs.copyFileSync(ss, dd);
    }
  }
  if (fs.existsSync(PAGES)) copyDir(PAGES, dest);
  return dest;
}

function classifyAndMove(file) {
  const ext = path.extname(file).toLowerCase();
  let targetDir = null;
  if (ext === ".html") return { status: "keep" };
  if (ext === ".css") targetDir = path.join(DIST, "styles");
  else if (ext === ".js" || ext === ".mjs")
    targetDir = path.join(DIST, "scripts");
  else if (
    [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"].includes(ext)
  )
    targetDir = path.join(DIST, "assets", "images");
  else if ([".woff", ".woff2", ".ttf", ".otf", ".eot"].includes(ext))
    targetDir = path.join(DIST, "assets", "fonts");
  else targetDir = path.join(DIST, "assets", "misc");

  ensureDir(targetDir);
  const dest = path.join(targetDir, path.basename(file));
  if (fs.existsSync(dest)) {
    // if exists, append suffix
    const name = path.basename(file, ext);
    const newDest = path.join(targetDir, `${name}_dup${ext}`);
    fs.copyFileSync(file, newDest);
    fs.unlinkSync(file);
    return { status: "moved", from: file, to: newDest };
  } else {
    fs.copyFileSync(file, dest);
    fs.unlinkSync(file);
    return { status: "moved", from: file, to: dest };
  }
}

function run() {
  if (!fs.existsSync(PAGES)) {
    console.log("No dist/pages directory — nothing to clean.");
    return;
  }
  console.log("Backing up dist/pages...");
  const backupPath = backupPages();
  console.log("Backup created at", backupPath);

  const files = walk(PAGES);
  const results = [];
  for (const f of files) {
    const res = classifyAndMove(f);
    results.push(res);
  }

  ensureDir(LOGDIR);
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_clean_dist_pages.md`);
  let md = `# clean-dist-pages run ${new Date().toISOString()}\n\n`;
  md += `backup: ${path.relative(ROOT, backupPath)}\n\n`;
  for (const r of results) {
    if (r.status === "keep")
      md += `- KEEP: ${path.relative(ROOT, r.from || "")}\n`;
    else
      md += `- MOVED: ${path.relative(ROOT, r.from)} -> ${path.relative(ROOT, r.to)}\n`;
  }
  fs.writeFileSync(logPath, md, "utf8");
  console.log("Clean log written to", logPath);
  console.log(
    "Done. moved files:",
    results.filter((r) => r.status === "moved").length,
  );
}

if (require.main === module) run();
