const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PAGES = path.join(ROOT, "pages"); // تحديث المسار
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && p.endsWith(".html")) out.push(p);
  }
  return out;
}

function ensureLogDir() {
  if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
}

function run() {
  const files = walk(PAGES);
  const changed = [];
  for (const f of files) {
    let html = fs.readFileSync(f, "utf8");
    if (html.includes("/scripts/site-paths.js")) continue;
    // find insertion point: before first <script src="/scripts/ or <script src="/pages/scripts/
    const scriptRegex = /<script\s+src=(['"])\/(scripts|pages\/scripts)\//i;
    const m = scriptRegex.exec(html);
    const tag = '\n    <script src="/scripts/site-paths.js"></script>';
    if (m) {
      const idx = m.index;
      // insert tag just before match
      html = html.slice(0, idx) + tag + html.slice(idx);
    } else {
      // fallback: before </body>
      const bodyClose = html.lastIndexOf("</body>");
      if (bodyClose !== -1) {
        html = html.slice(0, bodyClose) + tag + "\n" + html.slice(bodyClose);
      } else {
        // append at end
        html = html + tag;
      }
    }
    fs.writeFileSync(f, html, "utf8");
    changed.push(path.relative(ROOT, f));
    console.log("[apply-site-paths] updated", f);
  }
  ensureLogDir();
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_apply_site_paths.md`);
  let md = `# apply-site-paths run ${new Date().toISOString()}\n\n`;
  if (!changed.length) md += "No files changed.\n";
  else {
    md += "Updated files:\n\n";
    for (const c of changed) md += `- ${c}\n`;
  }
  fs.writeFileSync(logPath, md, "utf8");
  console.log("[apply-site-paths] log written to", logPath);
}

if (require.main === module) run();
