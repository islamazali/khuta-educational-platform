const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const LOGDIR = path.join(ROOT, "docs", "automation-logs");
const BACKUP_DIR = path.join(ROOT, "backup", "archives");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, out);
    else out.push(fullPath);
  }
  return out;
}

ensureDir(LOGDIR);
ensureDir(BACKUP_DIR);

const tasks = [
  { srcPatterns: ["src/scripts/components"], dest: "src/components" },
  { srcPatterns: ["src/scripts/particles"], dest: "src/components/particles" },
  { srcPatterns: ["src/scripts/utils"], dest: "src/components/utils" },
  { srcPatterns: ["src/pages/courses"], dest: "src/courses" },
  { srcPatterns: ["src/pages/admin"], dest: "src/admin" },
  { srcPatterns: ["src/pages/dashboard"], dest: "src/dashboard" },
  { srcPatterns: ["src/assets/fonts", "src/assets"], dest: "src/assets" },
  { srcPatterns: ["src/styles/themes"], dest: "src/styles/themes" },
  { srcPatterns: ["src/styles/components"], dest: "src/styles/components" },
  { srcPatterns: ["src/pages"], dest: "src/pages" },
];

const actions = [];

for (const task of tasks) {
  for (const pattern of task.srcPatterns) {
    const srcPath = path.join(ROOT, pattern);
    if (!fs.existsSync(srcPath)) continue;

    const files = walk(srcPath);
    for (const file of files) {
      const relativePath = path.relative(srcPath, file);
      const destDir = path.join(ROOT, task.dest, path.dirname(relativePath));
      const destFile = path.join(destDir, path.basename(file));

      ensureDir(destDir);

      if (fs.existsSync(destFile)) {
        const srcContent = fs.readFileSync(file);
        const destContent = fs.readFileSync(destFile);

        if (Buffer.compare(srcContent, destContent) === 0) {
          actions.push({
            status: "exists",
            from: path.relative(ROOT, file),
            to: path.relative(ROOT, destFile),
          });
          continue;
        }

        const ext = path.extname(destFile);
        const baseName = path.basename(destFile, ext);
        const copyFile = path.join(destDir, `${baseName}_copy${ext}`);

        fs.copyFileSync(file, copyFile);
        actions.push({
          status: "copied_conflict",
          from: path.relative(ROOT, file),
          to: path.relative(ROOT, copyFile),
        });
      } else {
        fs.copyFileSync(file, destFile);
        actions.push({
          status: "copied",
          from: path.relative(ROOT, file),
          to: path.relative(ROOT, destFile),
        });
      }
    }
  }
}

const requiredDirs = [
  "src/components/particles",
  "src/components/admin",
  "src/components/learning",
  "src/assets/images",
  "src/assets/icons",
  "src/assets/fonts",
  "src/styles/themes",
  "src/tests/unit",
  "src/tests/integration",
  "src/tests/e2e",
];

for (const dir of requiredDirs) {
  ensureDir(path.join(ROOT, dir));
  actions.push({
    status: "mkdir",
    path: dir,
  });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "");
const logFile = path.join(LOGDIR, `${timestamp}_apply_workspace_structure.md`);

let logContent = `# apply-workspace-structure run ${new Date().toISOString()}\n\n`;

for (const action of actions) {
  switch (action.status) {
    case "copied":
      logContent += `- COPIED: ${action.from} -> ${action.to}\n`;
      break;
    case "exists":
      logContent += `- SKIPPED (exists, identical): ${action.from} -> ${action.to}\n`;
      break;
    case "copied_conflict":
      logContent += `- COPIED_AS_COPY (conflict): ${action.from} -> ${action.to}\n`;
      break;
    case "mkdir":
      logContent += `- MKDIR: ${action.path}\n`;
      break;
  }
}

fs.writeFileSync(logFile, logContent, "utf8");
console.log("Applied workspace structure (non-destructive). Log:", logFile);
