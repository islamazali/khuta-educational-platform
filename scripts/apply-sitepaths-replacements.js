const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (
      e.isFile() &&
      (p.endsWith(".js") || p.endsWith(".html") || p.endsWith(".ts"))
    )
      out.push(p);
  }
  return out;
}

function applyReplacements(content) {
  let orig = content;
  // 1) `/pages/${getCourseUrl(courseId)}` -> `${SitePaths.courseHref(courseId)}`
  content = content.replace(
    /`\/pages\/\$\{\s*getCourseUrl\(([^)]+)\)\s*\}`/g,
    "`${SitePaths.courseHref($1)}`",
  );
  // 2) '/pages/' + getCourseUrl(courseId)  -> SitePaths.courseHref(courseId)
  content = content.replace(
    /['"]\/pages\/['"]\s*\+\s*getCourseUrl\(([^)]+)\)/g,
    "SitePaths.courseHref($1)",
  );
  content = content.replace(
    /'\/pages\/'\s*\+\s*getCourseUrl\(([^)]+)\)/g,
    "SitePaths.courseHref($1)",
  );
  // 3) `/pages/${someVar}` -> `${SitePaths.pageHref(someVar)}` (generic)
  content = content.replace(
    /`\/pages\/\$\{([^}]+)\}`/g,
    "`${SitePaths.pageHref($1)}`",
  );
  // 4) '/pages/' + someVar -> SitePaths.pageHref(someVar)
  content = content.replace(
    /['"]\/pages\/['"]\s*\+\s*([a-zA-Z0-9_$.\[\]]+)/g,
    "SitePaths.pageHref($1)",
  );
  // 5) "/pages/" + var
  content = content.replace(
    /"\/pages\/"\s*\+\s*([a-zA-Z0-9_$.\[\]]+)/g,
    "SitePaths.pageHref($1)",
  );

  // 6) Replace occurrences of "/pages/${getCourseUrl(courseId)}" inside string concatenations "..." - cover more cases
  content = content.replace(
    /"\/pages\/\$\{\s*getCourseUrl\(([^)]+)\)\s*\}"/g,
    "SitePaths.courseHref($1)",
  );

  return content === orig ? null : content;
}

function ensureLogDir() {
  if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
}

function run() {
  const files = walk(SRC);
  const changed = [];
  for (const f of files) {
    let content = fs.readFileSync(f, "utf8");
    const updated = applyReplacements(content);
    if (updated !== null) {
      fs.writeFileSync(f, updated, "utf8");
      changed.push(path.relative(ROOT, f));
      console.log("[apply-sitepaths-repl] updated", f);
    }
  }

  ensureLogDir();
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_apply_sitepaths_replacements.md`);
  let md = `# apply-sitepaths-replacements run ${new Date().toISOString()}\n\n`;
  if (!changed.length) md += "No files changed.\n";
  else {
    md += "Updated files:\n\n";
    for (const c of changed) md += `- ${c}\n`;
  }
  fs.writeFileSync(logPath, md, "utf8");
  console.log("[apply-sitepaths-repl] log written to", logPath);
}

if (require.main === module) run();
