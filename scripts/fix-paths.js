const fs = require("fs");
const path = require("path");

const rootDir = __dirname + "/..";
const targetDirs = ["src", "dist", "admin", "courses", "dashboard"];
const extensions = [".html", ".css", ".js"];

// قائمة المجلدات الشائعة اللي ممكن يحصل فيها تكرار
const commonFolders = [
  "pages",
  "courses",
  "assets",
  "styles",
  "scripts",
  "components",
  "images",
  "icons",
  "fonts",
  "admin",
  "dashboard",
  "student",
  "instructor",
  "utils",
  "learning",
  "particles",
];

// مسارات خاصة لملفات محددة
const specialMappings = {
  "codepen-menu.css": "/src/styles/components/codepen-menu.css",
  "codepen-enhancements.css": "/src/styles/components/codepen-enhancements.css",
  "codepen-menu.js": "/src/scripts/codepen-menu.js",
  "particle-background.js": "/src/components/particles/particle-background.js",
  "ai-learning-assistant.js": "/src/scripts/ai-learning-assistant.js",
  "permissions.js": "/src/scripts/utils/permissions.js",
  "main.css": "/src/styles/main.css",
};

function fixPath(link) {
  // تجاهل الروابط الخارجية أو الهاش أو البيانات
  if (
    /^(https?:)?\/\//.test(link) ||
    link.startsWith("#") ||
    link.startsWith("data:")
  )
    return link;

  // تحقق من المسارات الخاصة
  const fileName = path.basename(link);
  if (specialMappings[fileName]) {
    return specialMappings[fileName];
  }

  // خلي الرابط مطلق
  if (!link.startsWith("/")) link = "/" + link;

  // امسح ./ ../ و //
  link = link.replace(/(\.\/|\.\.\/)+/g, "/");
  link = link.replace(/\/{2,}/g, "/");

  // امسح أي تكرار زي folder/folder/
  commonFolders.forEach((folder) => {
    const regex = new RegExp(`(\/${folder}){2,}`, "g");
    link = link.replace(regex, `/${folder}`);
  });

  // تصحيح مسارات src إذا كانت مفقودة
  if (
    !link.startsWith("/src/") &&
    !link.startsWith("/admin/") &&
    !link.startsWith("/courses/") &&
    !link.startsWith("/dashboard/")
  ) {
    // تحديد النوع بناءً على الامتداد
    const ext = path.extname(link);
    if (ext === ".css") {
      link = "/src/styles" + link;
    } else if (ext === ".js") {
      link = "/src/scripts" + link;
    } else if (
      [".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico"].includes(ext)
    ) {
      link = "/src/assets/images" + link;
    } else if (ext === ".html") {
      link = "/src/pages" + link;
    }
  }

  return link;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;
  let changes = 0;

  // معالجة href و src
  content = content.replace(
    /(href|src)=["']([^"']+)["']/g,
    (match, attr, link) => {
      const fixed = fixPath(link);
      if (fixed !== link) changes++;
      return `${attr}="${fixed}"`;
    },
  );

  // معالجة import و require في ملفات JS
  if (path.extname(filePath) === ".js") {
    content = content.replace(
      /(import\s+[^"']*["'])([^"']+)(["'])/g,
      (match, prefix, link, suffix) => {
        const fixed = fixPath(link);
        if (fixed !== link) changes++;
        return prefix + fixed + suffix;
      },
    );

    content = content.replace(
      /(require\(["'])([^"']+)(["']\))/g,
      (match, prefix, link, suffix) => {
        const fixed = fixPath(link);
        if (fixed !== link) changes++;
        return prefix + fixed + suffix;
      },
    );
  }

  // معالجة @import في ملفات CSS
  if (path.extname(filePath) === ".css") {
    content = content.replace(
      /(@import\s+["'])([^"']+)(["'])/g,
      (match, prefix, link, suffix) => {
        const fixed = fixPath(link);
        if (fixed !== link) changes++;
        return prefix + fixed + suffix;
      },
    );
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed ${changes} paths in: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return;
  }

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // تجاهل مجلدات معينة
      if (!["node_modules", ".git", "backup", ".cursor"].includes(file)) {
        walkDir(fullPath);
      }
    } else if (extensions.includes(path.extname(file))) {
      processFile(fullPath);
    }
  });
}

console.log("🚀 Starting advanced path fixing...");

targetDirs.forEach((dir) => {
  const fullPath = path.join(rootDir, dir);
  console.log(`📂 Processing directory: ${dir}`);
  walkDir(fullPath);
});

console.log("✨ Advanced path fixing completed!");
