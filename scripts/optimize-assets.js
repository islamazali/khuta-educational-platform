const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");

function optimizeAssets() {
  console.log("Optimizing assets...");

  const assetsDir = path.join(DIST, "assets");
  if (!fs.existsSync(assetsDir)) return;

  // تحسين الصور (يتطلب تثبيت imagemin-cli)
  try {
    const imagesDir = path.join(assetsDir, "images");
    if (fs.existsSync(imagesDir)) {
      console.log("Optimizing images...");
      execSync("npx imagemin assets/images/* --out-dir=dist/assets/images", {
        stdio: "inherit",
        cwd: ROOT,
      });
    }
  } catch (error) {
    console.log("Image optimization skipped (imagemin not installed)");
  }

  // minify CSS
  const cssDir = path.join(DIST, "styles");
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"));
    cssFiles.forEach((file) => {
      const filePath = path.join(cssDir, file);
      let content = fs.readFileSync(filePath, "utf8");

      // إزالة المسافات الزائدة والتعليقات
      content = content
        .replace(/\/\*[\s\S]*?\*\//g, "") // إزالة التعليقات
        .replace(/\s+/g, " ") // إزالة المسافات الزائدة
        .replace(/;\s*/g, ";")
        .trim();

      fs.writeFileSync(filePath, content, "utf8");
      console.log("Minified:", file);
    });
  }

  console.log("Assets optimization completed");
}

optimizeAssets();
