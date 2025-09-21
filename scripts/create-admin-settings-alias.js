const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

const candidates = [
  path.join(DIST, "pages", "admin-settings.html"),
  path.join(DIST, "pages", "admin", "admin-settings.html"),
  path.join(DIST, "pages", "admin-settings", "index.html"),
  path.join(DIST, "pages", "admin", "settings.html"),
];

let found = null;
for (const c of candidates) {
  if (fs.existsSync(c)) {
    found = c;
    break;
  }
}

const actions = [];
if (found) {
  const dest = path.join(DIST, "pages", "admin_settings.html");
  ensureDir(path.dirname(dest));
  try {
    fs.copyFileSync(found, dest);
    actions.push({
      status: "copied",
      from: path.relative(ROOT, found),
      to: path.relative(ROOT, dest),
    });
    console.log(
      "[admin-alias] copied",
      path.relative(ROOT, found),
      "->",
      path.relative(ROOT, dest),
    );
  } catch (err) {
    actions.push({ status: "error", error: err.message });
    console.error("[admin-alias] error copying:", err.message);
  }
} else {
  actions.push({ status: "not_found" });
  console.log("[admin-alias] no candidate found in dist for admin-settings");
}

ensureDir(LOGDIR);
const stamp = new Date().toISOString().replace(/[:.]/g, "");
const logPath = path.join(LOGDIR, `${stamp}_create_admin_settings_alias.md`);
let md = `# create-admin-settings-alias run ${new Date().toISOString()}\n\n`;
for (const a of actions) {
  if (a.status === "copied") md += `- COPIED: ${a.from} -> ${a.to}\n`;
  else if (a.status === "not_found")
    md += `- NOT_FOUND: no candidate in dist\n`;
  else md += `- ERROR: ${a.error}\n`;
}
fs.writeFileSync(logPath, md, "utf8");
console.log("[admin-alias] log written to", logPath);
