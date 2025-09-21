const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const IN = path.join(ROOT, "docs", "automation-logs", "20250920_404_report.md");
const OUT_CSV = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_404_report.csv",
);
const OUT_SUM = path.join(
  ROOT,
  "docs",
  "automation-logs",
  "20250920_404_report_summary.md",
);

if (!fs.existsSync(IN)) {
  console.error("Input 404 report not found:", IN);
  process.exit(1);
}

const text = fs.readFileSync(IN, "utf8");
const lines = text.split(/\r?\n/);
const entries = [];
const re =
  /- \*\*page\*\*: ([^\u2014]+) — \*\*link\*\*: ([^\u2014]+) — \*\*resolved\*\*: (.+)$/;
for (const ln of lines) {
  const m = ln.match(re);
  if (m) {
    const page = m[1].trim();
    const link = m[2].trim();
    const resolved = m[3].trim();
    let kind = "other";
    if (link.startsWith("/pages/")) kind = "page";
    else if (link.startsWith("/styles/") || link.endsWith(".css"))
      kind = "style";
    else if (link.startsWith("/scripts/") || link.endsWith(".js"))
      kind = "script";
    else if (link.startsWith("/assets/")) kind = "asset";
    else if (link === "/index.html" || link === "index.html") kind = "index";
    else if (link.startsWith("/")) {
      const first = link.split("/")[1];
      if (first) kind = first;
    }
    entries.push({ page, link, resolved, kind });
  }
}

// write CSV
const header = "page,link,resolved,kind\n";
const csvLines = entries.map((e) => {
  const esc = (s) => '"' + String(s).replace(/"/g, '""') + '"';
  return [esc(e.page), esc(e.link), esc(e.resolved), esc(e.kind)].join(",");
});
fs.writeFileSync(OUT_CSV, header + csvLines.join("\n"), "utf8");

// summary
const total = entries.length;
const byKind = entries.reduce((acc, e) => {
  acc[e.kind] = (acc[e.kind] || 0) + 1;
  return acc;
}, {});
let md = `# 404 Report Summary\n\n`;
md += `Source report: \\docs/automation-logs/20250920_404_report.md\n\n`;
md += `Total missing resources: **${total}**\n\n`;
md += `## Counts by type\n\n`;
for (const k of Object.keys(byKind).sort()) md += `- **${k}**: ${byKind[k]}\n`;
md += `\n## Top missing files (by frequency)\n\n`;
const freq = entries.reduce((acc, e) => {
  acc[e.link] = (acc[e.link] || 0) + 1;
  return acc;
}, {});
const top = Object.entries(freq)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);
for (const [link, count] of top) md += `- ${link}: ${count}\n`;
md += `\nCSV exported to: \\docs/automation-logs/20250920_404_report.csv\n`;
fs.writeFileSync(OUT_SUM, md, "utf8");

console.log("Generated CSV:", OUT_CSV);
console.log("Generated summary:", OUT_SUM);
