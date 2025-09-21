const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

function log(msg) {
  console.log("[build-react]", msg);
}

function rmrf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory()
      ? copyRecursive(srcPath, destPath)
      : fs.copyFileSync(srcPath, destPath);
  }
}

function run() {
  log("Building React application");

  // تنظيف مجلد dist
  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  try {
    // تشغيل vite build
    log("Running Vite build");
    execSync("npm run build", { stdio: "inherit", cwd: ROOT });

    // نسخ الأصول الثابتة الإضافية
    const staticAssets = [
      { from: path.join(SRC, "assets"), to: path.join(DIST, "assets") },
      { from: path.join(SRC, "styles"), to: path.join(DIST, "styles") },
    ];

    staticAssets.forEach(({ from, to }) => {
      if (fs.existsSync(from)) {
        log(`Copying ${from} -> ${to}`);
        copyRecursive(from, to);
      }
    });

    log("React build completed successfully");
  } catch (error) {
    console.error("Build failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) run();
