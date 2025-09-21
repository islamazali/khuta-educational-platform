const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const BACKUP = path.join(ROOT, "backup", "archives");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function findFileCandidates(link, pageDir, indexedFiles) {
  const candidates = [];
  if (!link) return candidates;
  const cleaned = link.split("?")[0].split("#")[0];
  // absolute root-like
  if (cleaned.startsWith("/")) {
    const tryPath = path.join(SRC, cleaned.replace(/^\//, ""));
    candidates.push(tryPath);
  }
  // relative to page
  try {
    const rel = path.resolve(pageDir, cleaned);
    candidates.push(rel);
  } catch (e) {}
  // direct basename match in indexed files
  const base = path.basename(cleaned);
  if (indexedFiles.byBase[base]) {
    candidates.push(...indexedFiles.byBase[base]);
  }
  // also try under common dirs
  const common = [
    "styles",
    "scripts",
    "assets",
    "components",
    "pages",
    "images",
    "fonts",
  ];
  for (const d of common) {
    candidates.push(path.join(SRC, d, cleaned));
    candidates.push(path.join(SRC, d, base));
  }
  // normalize unique
  return Array.from(new Set(candidates.map((p) => path.normalize(p))));
}

// index src and backup files by full path and basename
console.log("Indexing files...");
const srcFiles = walk(SRC);
const backupFiles = walk(BACKUP);
const indexed = { all: srcFiles.concat(backupFiles), byBase: {} };
for (const f of indexed.all) {
  const b = path.basename(f);
  indexed.byBase[b] = indexed.byBase[b] || [];
  indexed.byBase[b].push(f);
}

// gather HTML files to scan
const htmlFiles = srcFiles.filter((f) => f.endsWith(".html"));
const report = { generatedAt: new Date().toISOString(), pages: {} };

const hrefSrcRegex =
  /(?:href|src)\s*=\s*"([^"]+)"|url\((?:'|")?([^'"\)]+)(?:'|")?\)/gi;
for (const html of htmlFiles) {
  const content = fs.readFileSync(html, "utf8");
  const pageDir = path.dirname(html);
  const links = new Set();
  let m;
  while ((m = hrefSrcRegex.exec(content))) {
    const link = m[1] || m[2];
    if (!link) continue;
    // skip external
    if (/^(https?:)?\/\//i.test(link)) continue;
    // skip data URIs
    if (/^data:/i.test(link)) continue;
    links.add(link.trim());
  }
  const pageKey = path.relative(SRC, html);
  report.pages[pageKey] = { links: {}, found: 0, missing: 0 };

  for (const link of links) {
    const candidates = findFileCandidates(link, pageDir, indexed);
    let found = null;
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        found = c;
        break;
      }
    }
    if (!found) {
      // also try stripping leading ./ or ../
      const alt = link.replace(/^\.{1,2}\//, "");
      if (indexed.byBase[path.basename(alt)])
        found = indexed.byBase[path.basename(alt)][0];
    }
    if (found) {
      report.pages[pageKey].links[link] = {
        status: "found",
        path: path.relative(ROOT, found),
      };
      report.pages[pageKey].found++;
    } else {
      report.pages[pageKey].links[link] = {
        status: "missing",
        hint: "searched src/ and backup/archives for basename",
        candidates: candidates.map((p) => path.relative(ROOT, p)),
      };
      report.pages[pageKey].missing++;
    }
  }
}

// write reports
if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const mdPath = path.join(LOGDIR, `${stamp}_asset-path-map.md`);
const jsonPath = path.join(LOGDIR, `${stamp}_asset-path-map.json`);

let md = `# Asset path map (${new Date().toISOString()})\n\n`;
for (const [page, data] of Object.entries(report.pages)) {
  md += `- **${page}** — found: ${data.found}, missing: ${data.missing}\n`;
  for (const [link, info] of Object.entries(data.links)) {
    if (info.status === "found") md += `  - ${link} -> \\\`${info.path}\\\`\n`;
    else
      md += `  - ${link} -> MISSING (candidates: ${info.candidates.join(", ")})\n`;
  }
  md += `\n`;
}

fs.writeFileSync(mdPath, md, "utf8");
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
console.log("Reports written:", mdPath, jsonPath);
