const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "..", "dist"); // غيّر حسب الحاجة
const regex = /pages\/pages\//g;
const replacement = "pages/";

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (/\.(html|css|js)$/i.test(full)) {
      let content = fs.readFileSync(full, "utf8");
      if (regex.test(content)) {
        const updated = content.replace(regex, replacement);
        fs.writeFileSync(full, updated, "utf8");
        console.log("✔ Fixed:", full);
      }
    }
  });
}

walk(targetDir);
console.log("Done fixing paths in dist.");
