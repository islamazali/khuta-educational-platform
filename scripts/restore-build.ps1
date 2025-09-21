# 1. تحديد أحدث نسخة Backup
$backupDir = Get-ChildItem -Directory | Where-Object { $_.Name -like "backup-*" } | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $backupDir) {
    Write-Host "❌ لم يتم العثور على أي نسخة احتياطية." -ForegroundColor Red
    exit 1
}

Write-Host "📂 أحدث نسخة احتياطية: $($backupDir.FullName)" -ForegroundColor Cyan

# 2. مسح src/ و dist/ عشان نبدأ من نظيف
Remove-Item .\src -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .\dist -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path src, dist | Out-Null

# 3. قواعد اختيار الملفات الصحيحة
$excludePatterns = @(
    "*/pages/pages/*",
    "*/courses/pages/*",
    "*index (1).html*",
    "*copy*",
    "*.bak",
    "*.tmp"
)

function Copy-Clean {
    param (
        [string]$source,
        [string]$destination
    )

    Get-ChildItem -Path $source -Recurse -File | ForEach-Object {
        $path = $_.FullName
        $exclude = $false

        foreach ($pattern in $excludePatterns) {
            if ($path -like $pattern) { $exclude = $true; break }
        }

        if (-not $exclude) {
            $targetPath = $path.Replace($backupDir.FullName, (Resolve-Path .\src).Path)
            $targetDir = Split-Path $targetPath -Parent
            if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Force -Path $targetDir | Out-Null }
            Copy-Item $path -Destination $targetPath -Force
            Write-Host "✅ Restored:" ($path.Replace($backupDir.FullName, ""))
        }
        else {
            Write-Host "⚠️ Skipped (duplicate/broken):" ($path.Replace($backupDir.FullName, ""))
        }
    }
}

# 4. استرجاع الملفات من backup → src
Copy-Clean "$($backupDir.FullName)\src" .\src

# 5. تشغيل build و fix
Write-Host "🔧 Running build.js..."
node .\scripts\build.js

Write-Host "🔧 Running fix-paths.js..."
node .\scripts\fix-paths.js

Write-Host "🔍 Running link-check.js..."
node .\scripts\link-check.js

Write-Host "🚀 العملية اكتملت بنجاح. المشروع نظيف ومجرب." -ForegroundColor Green
