// Project Audit Script - ES Modules compatible
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { parseSync } from '@babel/core';
import walk from 'walk';

// مسار المشروع
const projectDir = path.resolve('./');
console.log("🔍 بدء فحص المشروع:", projectDir);

// 1️⃣ فحص build باستخدام Vite
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (err) {
  console.log("❌ اكتشف Vite build errors");
}

// 2️⃣ فحص ملفات JSX/JS syntax
const walker = walk.walk(projectDir, { followLinks: false });

walker.on('file', (root, fileStats, next) => {
  const filePath = path.join(root, fileStats.name);
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
      parseSync(code, { sourceType: 'module', plugins: ['jsx'] });
    } catch (err) {
      console.log(`❌ Syntax Error: ${filePath}`);
      console.log(`  Line: ${err.loc?.line}, Column: ${err.loc?.column}`);
      console.log(`  Message: ${err.message}`);
    }
  }
  next();
});

walker.on('end', () => {
  console.log("✅ فحص JSX/JS اكتمل");

  // 3️⃣ فحص Tailwind CSS
  const tailwindConfig = path.join(projectDir, 'tailwind.config.js');
  if (!fs.existsSync(tailwindConfig)) {
    console.log('⚠️ ملف Tailwind config مفقود');
  } else {
    console.log('✅ ملف Tailwind موجود');
  }

  // 4️⃣ التحقق من CSS assets
  const cssFiles = ['tailwind.css', 'unified-design.css'];
  cssFiles.forEach(file => {
    const cssPath = path.join(projectDir, 'src', file);
    if (!fs.existsSync(cssPath)) console.log(`❌ CSS مفقود: ${file}`);
  });

  console.log("🚀 تقرير الفحص جاهز. قم بمراجعة الأخطاء أعلاه لإصلاح المشروع.");
});
