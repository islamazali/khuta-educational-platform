const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC_ADMIN = path.join(ROOT, "src", "pages", "admin");
const SRC_PAGES = path.join(ROOT, "src", "pages");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}
ensureDir(LOGDIR);

const mappings = [
  ["admin-dashboard.html", "admin_dashboard.html"],
  ["admin-users.html", "admin_users.html"],
  ["admin-courses.html", "admin_courses.html"],
  ["admin-reports.html", "admin_reports.html"],
];

const actions = [];
for (const [srcName, destName] of mappings) {
  const src = path.join(SRC_ADMIN, srcName);
  const dest = path.join(SRC_PAGES, destName);
  if (fs.existsSync(src)) {
    try {
      fs.copyFileSync(src, dest);
      actions.push({
        status: "copied",
        from: path.relative(ROOT, src),
        to: path.relative(ROOT, dest),
      });
      console.log("[copy-admin-to-src] copied", src, "->", dest);
    } catch (e) {
      actions.push({
        status: "error",
        src: path.relative(ROOT, src),
        error: e.message,
      });
      console.error("[copy-admin-to-src] error copying", src, e.message);
    }
  } else {
    actions.push({ status: "not_found", src: path.relative(ROOT, src) });
    console.warn("[copy-admin-to-src] not found", src);
  }
}

const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_copy_admin_to_src_pages.md`);
let md = `# copy-admin-to-src-pages run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied") md += `- COPIED: ${a.from} -> ${a.to}\n`;
  else if (a.status === "not_found") md += `- NOT_FOUND: ${a.src}\n`;
  else md += `- ERROR: ${a.src} (${a.error})\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[copy-admin-to-src] log written to", logPath);
