const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

// أنواع الملفات التي تحتوي على روابط
const FILE_EXTENSIONS = [".html", ".js", ".css"];

// أنماط الروابط التي تحتاج إصلاح
const SRC_PATTERNS = [
  "/src/styles/",
  "/src/scripts/",
  "/src/assets/",
  "/src/pages/",
  "src/styles/",
  "src/scripts/",
  "src/assets/",
  "src/pages/",
  "/src/index.html",
  "src/index.html",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
    } else if (FILE_EXTENSIONS.includes(path.extname(entry.name))) {
      out.push(fullPath);
    }
  }
  return out;
}

function fixSrcPaths(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // إصلاح روابط /src/index.html
  if (content.includes("/src/index.html")) {
    content = content.replace(/\/src\/index\.html/g, "/index.html");
    modified = true;
  }

  if (content.includes("src/index.html")) {
    content = content.replace(/src\/index\.html/g, "index.html");
    modified = true;
  }

  // إصلاح باقي أنماط /src/
  for (const pattern of SRC_PATTERNS) {
    if (content.includes(pattern)) {
      const fixedPattern = pattern
        .replace(/^\/src\//, "/")
        .replace(/^src\//, "");
      content = content.replace(new RegExp(pattern, "g"), fixedPattern);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`[fixed] ${filePath}`);
  }
}

function main() {
  console.log("Fixing /src/ paths in all files...");

  const files = walk(SRC);

  for (const file of files) {
    fixSrcPaths(file);
  }

  console.log("Done fixing /src/ paths.");
}

main();
