const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");

function generateServiceWorker() {
  const swContent = `const CACHE_NAME = 'learning-platform-v1';
const urlsToCache = [
  '/',
  '/styles/unified-design.css',
  '/assets/fonts/font-definitions.css',
  '/assets/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});`;

  const swPath = path.join(DIST, "sw.js");
  fs.writeFileSync(swPath, swContent, "utf8");
  console.log("Service Worker generated:", swPath);
}

function generateManifest() {
  const manifest = {
    name: "منصة التعلم الإلكترونية",
    short_name: "Learning Platform",
    description:
      "منصة تعليمية شاملة متخصصة في المراجعة الداخلية وتحليل البيانات",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#ff6b6b",
    icons: [
      {
        src: "/assets/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    dir: "rtl",
    lang: "ar",
  };

  const manifestPath = path.join(DIST, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Web App Manifest generated:", manifestPath);
}

function deployPWA() {
  generateServiceWorker();
  generateManifest();

  // إضافة تسجيل Service Worker إلى index.html
  const indexHtmlPath = path.join(DIST, "index.html");
  if (fs.existsSync(indexHtmlPath)) {
    let content = fs.readFileSync(indexHtmlPath, "utf8");
    if (!content.includes("navigator.serviceWorker")) {
      const swScript = `
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
</script>
`;
      content = content.replace("</body>", swScript + "</body>");
      fs.writeFileSync(indexHtmlPath, content, "utf8");
      console.log("Service Worker script added to index.html");
    } else {
      console.log("Service Worker script already exists in index.html");
    }
  } else {
    console.log(
      "index.html not found, skipping Service Worker script addition.",
    );
  }
}

if (require.main === module) deployPWA();
