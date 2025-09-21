const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const OUT_DIR = path.join(ROOT, "docs", "automation-logs");

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function isLocalLink(url) {
  if (!url) return false;
  url = url.trim();
  if (
    url.startsWith("http") ||
    url.startsWith("//") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("data:")
  )
    return false;
  return true;
}

function extractLinks(html) {
  const re = /(?:src|href)\s*=\s*['"]([^'"#?]+)[^'"]*['"]/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error("dist/ not found — run build first");
    process.exit(1);
  }
  const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));
  const missing = [];
  for (const hf of htmlFiles) {
    const content = fs.readFileSync(hf, "utf8");
    const links = extractLinks(content);
    for (const l of links) {
      if (!isLocalLink(l)) continue;
      // normalize: if link is root-relative (/...), resolve under DIST; otherwise resolve relative to the HTML file
      const linkBase = l.split(/[?#]/)[0];
      let resolved;
      if (linkBase.startsWith("/")) {
        resolved = path.join(DIST, linkBase.slice(1));
      } else {
        resolved = path.resolve(path.dirname(hf), linkBase);
      }
      if (!fs.existsSync(resolved)) {
        missing.push({ page: path.relative(DIST, hf), link: l, resolved });
      }
    }
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const outPath = path.join(OUT_DIR, `${date}_404_report.md`);
  let md = `# 404 Report ${new Date().toISOString()}\n\n`;
  if (!missing.length) {
    md += "No missing local resources found.\n";
    console.log("No missing local resources found.");
  } else {
    md += `Found ${missing.length} missing resources:\n\n`;
    for (const m of missing)
      md += `- **page**: ${m.page} — **link**: ${m.link} — **resolved**: ${m.resolved}\n`;
    console.log(
      `Found ${missing.length} missing resources. Report written to ${outPath}`,
    );
  }
  fs.writeFileSync(outPath, md, "utf8");
  console.log("Report path:", outPath);
}

if (require.main === module) main();
