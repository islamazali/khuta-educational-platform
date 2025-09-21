const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PAGES = path.join(ROOT, "src", "pages");
const LOGDIR = path.join(ROOT, "docs", "automation-logs");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && p.endsWith(".html")) out.push(p);
  }
  return out;
}

function ensureLogDir() {
  if (!fs.existsSync(LOGDIR)) fs.mkdirSync(LOGDIR, { recursive: true });
}

const runtimeSnippet = `\n    <script>\n    (function(){\n      if (window.SitePaths && typeof SitePaths.pageHref === 'function') {\n        document.querySelectorAll('a[data-page]').forEach(function(a){\n          try { a.setAttribute('href', SitePaths.pageHref(a.getAttribute('data-page'))); } catch(e){}\n        });\n      }\n    })();\n    </script>\n`;

function processFile(file) {
  let content = fs.readFileSync(file, "utf8");
  let orig = content;

  // Add data-page attribute for href="/pages/xxx" links
  content = content.replace(
    /<a(\s+[^>]*?)href=(['"])\/pages\/([^"'<>\s?#]+)([^"'>]*?)>/gi,
    (match, beforeAttrs, q, filename, afterAttrs) => {
      if (/data-page\s*=/.test(beforeAttrs + afterAttrs)) return match;
      return `<a${beforeAttrs} data-page="${filename}"href=${q}/pages/${filename}${q}${afterAttrs}>`;
    },
  );

  // Handle runtime snippet injection
  if (content.includes("/scripts/site-paths.js")) {
    if (!content.includes("SitePaths.pageHref")) {
      content = content.replace(
        /(<script\s+[^>]*src=(['"])\/scripts\/site-paths\.js\2[^>]*>\s*<\/script>)/i,
        `$1${runtimeSnippet}`,
      );
      if (content === orig) {
        const bodyIdx = content.lastIndexOf("</body>");
        if (bodyIdx !== -1) {
          content =
            content.slice(0, bodyIdx) + runtimeSnippet + content.slice(bodyIdx);
        }
      }
    }
  } else if (!content.includes("SitePaths.pageHref")) {
    const inject = `\n    <script src="/scripts/site-paths.js"></script>${runtimeSnippet}`;
    const bodyIdx = content.lastIndexOf("</body>");
    if (bodyIdx !== -1) {
      content = content.slice(0, bodyIdx) + inject + content.slice(bodyIdx);
    }
  }

  if (content !== orig) {
    fs.writeFileSync(file, content, "utf8");
    return true;
  }
  return false;
}

function run() {
  const files = walk(PAGES);
  const changed = [];

  for (const f of files) {
    try {
      if (processFile(f)) {
        changed.push(path.relative(ROOT, f));
      }
    } catch (e) {
      console.error("Error processing", f, e);
    }
  }

  ensureLogDir();
  const stamp = new Date().toISOString().replace(/[:.]/g, "");
  const logPath = path.join(LOGDIR, `${stamp}_add_data_page_attrs.md`);

  let md = `# add-data-page-attrs run ${new Date().toISOString()}\n\n`;
  if (!changed.length) {
    md += "No files changed.\n";
  } else {
    md += "Updated files:\n\n";
    changed.forEach((c) => (md += `- ${c}\n`));
  }

  fs.writeFileSync(logPath, md, "utf8");
  console.log("[add-data-page-attrs] log written to", logPath);
}

if (require.main === module) run();
