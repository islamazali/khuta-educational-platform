# fix-html-comments.ps1
$projectRoot = "C:\a-modern-minimalist-portfolio-template\src"

# كل ملفات HTML داخل src (ومجلداته)
Get-ChildItem -Path $projectRoot -Recurse -Include *.html | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    # استبدال الخطأ: أي سطر يبدأ بـ / (ومش <!-- HTML Comment -->)
    # نخليه يبدأ بـ //
    $content = $content -replace '(\r?\n)\s*/(?!/|<)', '$1//'

    # حفظ التغييرات
    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "✅ Fixed comments in:" $file
}

Write-Host "🚀 HTML comment fix completed!"
