const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function copyIfMissing(src, dest) {
  if (!fs.existsSync(src)) return 0;
  let count = 0;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  fs.mkdirSync(dest, { recursive: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      count += copyIfMissing(s, d);
    } else if (e.isFile()) {
      if (!fs.existsSync(d)) {
        fs.copyFileSync(s, d);
        count++;
      }
    }
  }
  return count;
}

function run() {
  if (!fs.existsSync(DIST)) {
    console.error("dist/ not found — run build first");
    process.exit(1);
  }

  const tasks = [
    { from: path.join(DIST, "styles"), to: path.join(DIST, "pages", "styles") },
    {
      from: path.join(DIST, "styles", "particles"),
      to: path.join(DIST, "pages", "styles", "particles"),
    },
    {
      from: path.join(DIST, "scripts"),
      to: path.join(DIST, "pages", "scripts"),
    },
    {
      from: path.join(DIST, "scripts", "components"),
      to: path.join(DIST, "pages", "scripts", "components"),
    },
    {
      from: path.join(DIST, "scripts", "particles"),
      to: path.join(DIST, "pages", "scripts", "particles"),
    },
    { from: path.join(DIST, "assets"), to: path.join(DIST, "pages", "assets") },
  ];

  const results = [];
  for (const t of tasks) {
    const copied = copyIfMissing(t.from, t.to);
    results.push({
      from: path.relative(ROOT, t.from),
      to: path.relative(ROOT, t.to),
      copied,
    });
    console.log("[duplicate] from", t.from, "->", t.to, "copied:", copied);
  }

  if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_duplicate_for_compat.md`);
  let md = `# duplicate-for-compat run ${new Date().toISOString()}\n\n`;
  for (const r of results)
    md += `- ${r.copied} files copied from ${r.from} -> ${r.to}\n`;
  md +=
    "\nNote: script only copies files that are missing (safe, non-destructive).\n";
  fs.writeFileSync(logPath, md, "utf8");
  console.log("[duplicate] log written to", logPath);
}

if (require.main === module) run();
