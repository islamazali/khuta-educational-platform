# fix-html-paths.ps1
$projectRoot = "C:\a-modern-minimalist-portfolio-template\src"

# كل ملفات HTML داخل src (ومجلداته)
Get-ChildItem -Path $projectRoot -Recurse -Include *.html | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    # 1) تعديل المسار الغلط style.css
    $content = $content -replace '/src/styles/scripts/style.css', '/src/styles/style.css'

    # 2) تصحيح روابط tailwind
    $content = $content -replace 'src="/https:', 'src="https:'

    # حفظ التغييرات
    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "✅ Fixed:" $file
}

Write-Host "🚀 HTML paths fixed successfully!"
