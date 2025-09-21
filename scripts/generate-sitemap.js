const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const SITEMAP_PATH = path.join(DIST, "sitemap.xml");

function generateSitemap() {
  const baseUrl = "https://your-learning-platform.com";
  const routes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/about", priority: "0.8", changefreq: "weekly" },
    { path: "/courses", priority: "0.9", changefreq: "weekly" },
    { path: "/courses/data-analysis", priority: "0.7", changefreq: "monthly" },
    {
      path: "/courses/internal-review-basic",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/courses/internal-review-intermediate",
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      path: "/courses/internal-review-advanced",
      priority: "0.7",
      changefreq: "monthly",
    },
    { path: "/courses/ai-tools", priority: "0.7", changefreq: "monthly" },
    { path: "/courses/leadership", priority: "0.7", changefreq: "monthly" },
    { path: "/admin", priority: "0.6", changefreq: "monthly" },
    { path: "/dashboard", priority: "0.8", changefreq: "weekly" },
    { path: "/contact", priority: "0.5", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
  </url>`,
  )
  .join("")}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemap, "utf8");
  console.log("Sitemap generated:", SITEMAP_PATH);
}

generateSitemap();
