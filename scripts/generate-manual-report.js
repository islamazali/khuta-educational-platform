const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CSV = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_404_report.csv",
);
const OUT = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_missing_resources_manual_report.md",
);

if (!fs.existsSync(CSV)) {
  console.error("CSV not found:", CSV);
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

const srcFiles = walk(path.join(ROOT, "src"));
const backupFiles = walk(path.join(ROOT, "backup"));

const csv = fs
  .readFileSync(CSV, "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean);
let md = `# Manual Fix Report — Missing resources\n\n`;
md += `Source CSV: \`docs/automation-logs/20250920_404_report.csv\`\n\n`;
md += `Total missing entries: **${csv.length}**\n\n`;
md += `> For each entry: expected path in \`dist/\`, and suggested candidate sources (in \`src/\` or \`backup/archives/\`).\n\n`;

function findCandidates(basename) {
  const low = basename.toLowerCase();
  const bySrc = srcFiles.filter((f) => path.basename(f).toLowerCase() === low);
  const fuzzySrc = srcFiles.filter((f) =>
    path.basename(f).toLowerCase().includes(low.replace(/[-_.]/g, "")),
  );
  const byBackup = backupFiles.filter(
    (f) => path.basename(f).toLowerCase() === low,
  );
  const fuzzyBackup = backupFiles.filter((f) =>
    path.basename(f).toLowerCase().includes(low.replace(/[-_.]/g, "")),
  );
  const uniq = (arr) =>
    Array.from(new Set(arr.map((p) => path.relative(ROOT, p)))).slice(0, 6);
  return {
    exactSrc: uniq(bySrc),
    fuzzySrc: uniq(fuzzySrc),
    exactBackup: uniq(byBackup),
    fuzzyBackup: uniq(fuzzyBackup),
  };
}

for (const line of csv) {
  // parse CSV line: page,link,resolved,kind
  const parts = line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((s) => s.replace(/^"|"$/g, "").trim());
  if (parts.length < 3) continue;
  const [page, link, resolved, kind] = parts;
  md += `## ${link} \n\n`;
  md += `- referenced on page: \`${page}\`\n`;
  md += `- expected (resolved) path: \`${resolved}\`\n`;

  // dynamic link check
  if (link.includes("${") || link.includes("getCourseUrl")) {
    md += `- **Note**: this is a dynamic/generated link; check the JS that builds it (e.g. in the page script) or provide a stable placeholder page.\n\n`;
    continue;
  }

  const basename = path.basename(link);
  const cand = findCandidates(basename);
  md += `- basename: **${basename}**\n`;
  md += `- candidate sources (exact match in src):\n`;
  if (cand.exactSrc.length)
    md += cand.exactSrc.map((p) => `  - \`${p}\``).join("\n") + "\n";
  else md += `  - _none_\n`;
  md += `- candidate sources (fuzzy match in src):\n`;
  if (cand.fuzzySrc.length)
    md += cand.fuzzySrc.map((p) => `  - \`${p}\``).join("\n") + "\n";
  else md += `  - _none_\n`;
  md += `- candidate sources (exact match in backup):\n`;
  if (cand.exactBackup.length)
    md += cand.exactBackup.map((p) => `  - \`${p}\``).join("\n") + "\n";
  else md += `  - _none_\n`;
  md += `- candidate sources (fuzzy match in backup):\n`;
  if (cand.fuzzyBackup.length)
    md += cand.fuzzyBackup.map((p) => `  - \`${p}\``).join("\n") + "\n";
  else md += `  - _none_\n`;
  md += `\n---\n\n`;
}

fs.writeFileSync(OUT, md, "utf8");
console.log("Manual report written to", OUT);
