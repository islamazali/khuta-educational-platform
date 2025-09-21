const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const PAGES = path.join(ROOT, "src/pages");
const SCRIPTS = path.join(ROOT, "src/scripts");
const STYLES = path.join(ROOT, "src/styles");
const DIST = path.join(ROOT, "dist");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");
const BACKUP_DIR = path.join(ROOT, "backup", "archives");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else out.push(f);
  }
  return out;
}

function isExternal(url) {
  return !url || /^(https?:|\/\/|mailto:|tel:|data:)/i.test(url);
}

function extractLinks(html) {
  const re = /(?:src|href)\s*=\s*(["'])([^"']+)\1/gi;
  const links = [];
  let match;
  while ((match = re.exec(html)) !== null) {
    links.push(match[2]);
  }
  return links;
}

function findCandidateInDist(basename) {
  return walk(DIST).filter((f) => path.basename(f) === basename)[0] || null;
}

function toRootRelativeFromDist(abs) {
  return "/" + path.relative(DIST, abs).split(path.sep).join("/");
}

function backupSrcPages() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const dest = path.join(BACKUP_DIR, `src_pages_backup_${stamp}`);

  function copyDir(src, dst) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const dstPath = path.join(dst, entry.name);
      entry.isDirectory()
        ? copyDir(srcPath, dstPath)
        : fs.copyFileSync(srcPath, dstPath);
    }
  }

  copyDir(PAGES, dest);
  return dest;
}

function logChange(message) {
  fs.mkdirSync(LOGDIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_auto_fix_links.md`);
  fs.appendFileSync(logPath, message + "\n");
  return logPath;
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.error("dist missing — run build first");
    process.exit(1);
  }

  const backupPath = backupSrcPages();
  console.log("[auto-fix] backup created at", backupPath);

  const folders = [PAGES, SCRIPTS, STYLES];
  const exts = [".html", ".js", ".css"];
  const fixes = [];
  let totalFixes = 0;

  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;

    const files = walk(folder).filter((f) => exts.includes(path.extname(f)));

    for (const file of files) {
      let content = fs.readFileSync(file, "utf8");
      const links = extractLinks(content);

      for (const link of links) {
        if (isExternal(link)) continue;

        const [, base, query = "", hash = ""] =
          link.match(/^([^#?]*)([\?][^#]*)?(#.*)?$/) || [];
        const resolved = path.resolve(path.dirname(file), base);
        const expected = path.resolve(DIST, path.relative(ROOT, resolved));

        if (fs.existsSync(expected)) continue;

        const candidate = findCandidateInDist(path.basename(base));
        if (candidate) {
          const newUrl = toRootRelativeFromDist(candidate) + query + hash;
          const escaped = base.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
          content = content.replace(
            new RegExp(`(["'])(?:${escaped})(["'])`, "g"),
            `$1${newUrl}$2`,
          );
          fs.writeFileSync(file, content, "utf8");
          totalFixes++;
          fixes.push(
            `Fixed in ${path.relative(ROOT, file)}: ${link} -> ${newUrl}`,
          );
          console.log(
            "[auto-fix] updated",
            path.relative(ROOT, file),
            link,
            "->",
            newUrl,
          );
        }
      }
    }
  }

  if (fixes.length) {
    const logPath = logChange(
      `# auto-fix-links run ${new Date().toISOString()}\n\n` +
        fixes.map((f) => `- ${f}`).join("\n"),
    );
    console.log("[auto-fix] log written to", logPath);
  }

  console.log("[auto-fix] done. total fixes:", totalFixes);
}

if (require.main === module) main();
