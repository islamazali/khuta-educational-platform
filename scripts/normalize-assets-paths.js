const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full, out);
    else if (e.isFile() && full.endsWith(".html")) out.push(full);
  }
  return out;
}

const pages = walkHtml(path.join(SRC, "pages"));
const rootIndex = path.join(SRC, "index.html");
if (fs.existsSync(rootIndex)) pages.push(rootIndex);

const changes = [];
for (const file of pages) {
  let content = fs.readFileSync(file, "utf8");
  let orig = content;
  // replace patterns (both single and double quotes)
  content = content.replace(/href=(['"])\/pages\/styles\//g, "href=$1/styles/");
  content = content.replace(/src=(['"])\/pages\/scripts\//g, "src=$1/scripts/");
  content = content.replace(/href=(['"])\/pages\/assets\//g, "href=$1/assets/");
  content = content.replace(/src=(['"])\/pages\/assets\//g, "src=$1/assets/");
  content = content.replace(
    /href=(['"])\/pages\/styles\/particles\//g,
    "href=$1/styles/particles/",
  );
  // also handle cases where scripts/styles were referenced as /pages/styles/file.css without attribute name
  content = content.replace(/"\/pages\/styles\//g, '"/styles/');
  content = content.replace(/'\/pages\/styles\//g, "'/styles/");
  content = content.replace(/"\/pages\/scripts\//g, '"/scripts/');
  content = content.replace(/'\/pages\/scripts\//g, "'/scripts/");

  if (content !== orig) {
    fs.writeFileSync(file, content, "utf8");
    changes.push(path.relative(ROOT, file));
    console.log("[normalize-assets] updated", path.relative(ROOT, file));
  }
}

// write log
const LOGDIR = path.join(ROOT, "docs", "automation-logs");
if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_normalize_assets_paths.md`);
let md = `# normalize-assets-paths run ${new Date().toISOString()}\n\n`;
if (!changes.length) md += "No files changed.\n";
else {
  md += "Updated files:\n\n";
  for (const c of changes) md += `- ${c}\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[normalize-assets] log written to", logPath);
