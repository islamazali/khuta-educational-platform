const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src", "pages");
const DIST_DIR = path.join(ROOT, "dist", "pages");
const OUT_DIR = path.join(ROOT, "docs", "automation-logs");
const OUT_FILE = path.join(OUT_DIR, "src_vs_dist_pages_report.md");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(path.relative(dir, full).split(path.sep).join("/"));
  }
  return out;
}

const srcFiles = walk(SRC_DIR).sort();
const distFiles = walk(DIST_DIR).sort();

const srcSet = new Set(srcFiles);
const distSet = new Set(distFiles);

const missingInDist = Array.from(srcSet).filter((x) => !distSet.has(x));
const extraInDist = Array.from(distSet).filter((x) => !srcSet.has(x));

let md = `# src/pages vs dist/pages report\n\n`;
md += `src/pages count: **${srcFiles.length}**\n\n`;
md += `dist/pages count: **${distFiles.length}**\n\n`;
md += `## Missing in dist (present in src but not in dist)\n\n`;
if (missingInDist.length)
  md += missingInDist.map((p) => `- ${p}`).join("\n") + "\n\n";
else md += "- None\n\n";
md += `## Extra in dist (present in dist but not in src)\n\n`;
if (extraInDist.length)
  md += extraInDist.map((p) => `- ${p}`).join("\n") + "\n\n";
else md += "- None\n\n";

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, md, "utf8");
console.log("Report written to", OUT_FILE);
