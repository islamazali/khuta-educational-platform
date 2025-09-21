const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

function walkHtmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkHtmlFiles(full));
    else if (entry.isFile() && full.endsWith(".html")) files.push(full);
  }
  return files;
}

function isExternal(url) {
  if (!url) return true;
  return /^(https?:|\/\/|mailto:|tel:|data:)/i.test(url);
}

function toRootRelative(resolved) {
  // resolved is absolute path under SRC
  const rel = path.relative(SRC, resolved).split(path.sep).join("/");
  return "/" + rel;
}

function normalizeFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;
  const attrRe = /(?:src|href)\s*=\s*(["'])([^"']+)\1/gi;
  content = content.replace(attrRe, (match, quote, url) => {
    if (isExternal(url)) return match; // skip external
    // preserve query/hash
    const m = url.match(/^([^#?]*)([\?][^#]*)?(#.*)?$/);
    const base = m ? m[1] : url;
    const query = m && m[2] ? m[2] : "";
    const hash = m && m[3] ? m[3] : "";

    // resolve relative to file
    const resolved = path.resolve(path.dirname(file), base);
    if (!resolved.startsWith(SRC)) {
      // not inside src, leave as-is
      return match;
    }
    if (!fs.existsSync(resolved)) {
      // target doesn't exist yet; still convert to root-relative if path points under src
      const newUrl = toRootRelative(resolved) + query + hash;
      if (newUrl !== url) changed = true;
      return match.replace(url, newUrl);
    }
    const newUrl = toRootRelative(resolved) + query + hash;
    if (newUrl !== url) changed = true;
    return match.replace(url, newUrl);
  });
  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log("[normalize] updated", path.relative(SRC, file));
  }
}

function main() {
  const pagesDir = path.join(SRC, "pages");
  const files = walkHtmlFiles(pagesDir);
  // include src/index.html if exists
  const rootIndex = path.join(SRC, "index.html");
  if (fs.existsSync(rootIndex)) files.push(rootIndex);
  files.forEach(normalizeFile);
  console.log("[normalize] done. files processed:", files.length);
}

if (require.main === module) main();
