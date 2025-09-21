import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

function log(msg) {
  console.log("[build]", msg);
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
  log("Start build");
  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  [
    { from: path.join(SRC, "assets"), to: path.join(DIST, "assets") },
    { from: path.join(SRC, "pages"), to: path.join(DIST, "pages") },
    { from: path.join(SRC, "styles"), to: path.join(DIST, "styles") },
    { from: path.join(SRC, "scripts"), to: path.join(DIST, "scripts") },
  ].forEach((t) => {
    log(`Copying ${t.from} -> ${t.to}`);
    copyRecursive(t.from, t.to);
  });

  const rootIndex = path.join(SRC, "index.html");
  if (fs.existsSync(rootIndex)) {
    fs.copyFileSync(rootIndex, path.join(DIST, "index.html"));
    log("Copied root index.html to dist/index.html");
  }

  const paths = {
    adminStyles: path.join(DIST, "pages", "admin", "styles"),
    adminScripts: path.join(DIST, "pages", "admin", "scripts"),
    componentsScripts: path.join(DIST, "pages", "scripts", "components"),
    particlesScripts: path.join(DIST, "pages", "scripts", "particles"),
    srcAdminStyles: path.join(SRC, "pages", "admin", "styles"),
    srcAdminScripts: path.join(SRC, "pages", "admin", "scripts"),
    srcComponents: path.join(SRC, "scripts", "components"),
    srcParticles: path.join(SRC, "scripts", "particles"),
  };

  Object.entries(paths)
    .slice(0, 4)
    .forEach(([, dir]) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

  if (fs.existsSync(paths.srcAdminStyles))
    copyRecursive(paths.srcAdminStyles, paths.adminStyles);
  if (fs.existsSync(paths.srcAdminScripts))
    copyRecursive(paths.srcAdminScripts, paths.adminScripts);
  if (fs.existsSync(paths.srcComponents))
    copyRecursive(paths.srcComponents, paths.componentsScripts);
  if (fs.existsSync(paths.srcParticles))
    copyRecursive(paths.srcParticles, paths.particlesScripts);

  log("Build finished");

  try {
    const aliasScript = path.join(ROOT, "scripts", "create-page-aliases.js");
    if (fs.existsSync(aliasScript)) {
      log("Running page aliases script");
      execSync(`node "${aliasScript}"`, { stdio: "inherit" });
    }
  } catch (err) {
    console.warn("Failed to run create-page-aliases.js:", err?.message);
  }
}

run();
