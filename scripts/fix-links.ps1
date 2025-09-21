# PowerShell script to normalize and verify links in src/pages
$ErrorActionPreference = 'Stop'

$root = Join-Path (Get-Location) 'src'
$pagesDir = Join-Path $root 'pages'
if(-not (Test-Path $pagesDir)){
  Write-Output "pages directory not found: $pagesDir"
  exit 1
}

$pages = Get-ChildItem -Path $pagesDir -Recurse -Filter *.html -File
Write-Output "Found $($pages.Count) HTML pages under $pagesDir"

# Normalize common variants to ../styles, ../scripts, ../assets
foreach($f in $pages){
  $path = $f.FullName
  $content = Get-Content -Raw -LiteralPath $path
  $orig = $content

  # Normalize styles references
  $content = [regex]::Replace($content, '(?i)(href\s*=\s*)(["\'])\s*(?:\\?\./|/|\\+)?(?:styles|css)[\\/\\]+', '$1$2../styles/')
  # Normalize scripts references
  $content = [regex]::Replace($content, '(?i)(src\s*=\s*)(["\'])\s*(?:\\?\./|/|\\+)?(?:scripts|js)[\\/\\]+', '$1$2../scripts/')
  # Normalize assets (images/fonts) references
  $content = [regex]::Replace($content, '(?i)(?:href\s*=\s*|src\s*=\s*)(["\'])\s*(?:\\?\./|/|\\+)?(?:assets|fonts|img|images)[\\/\\]+', '$1$2../assets/')

  # Convert backslashes to forward slashes for consistency
  $content = $content -replace '\\','/'

  if($content -ne $orig){
    Set-Content -LiteralPath $path -Value $content -Encoding utf8
    Write-Output "normalized: $path"
  }
}

# Verify all href/src references and export report
$out = @()
$rx = '(?i)(?:href|src)\s*=\s*(?:"([^"]+)"|''([^'']+)'')'
foreach($f in $pages){
  $dir = Split-Path $f.FullName -Parent
  $content = Get-Content -Raw -LiteralPath $f.FullName
  $matches = [regex]::Matches($content, $rx)
  foreach($m in $matches){
    $ref = if($m.Groups[1].Value) { $m.Groups[1].Value } else { $m.Groups[2].Value }
    $isExternal = $ref -match '^(?:https?:|//|mailto:|#|data:|tel:)'
    if($isExternal){
      $exists = 'EXTERNAL'
      $resolved = ''
    } else {
      try{
        $resolved = [System.IO.Path]::GetFullPath((Join-Path $dir $ref))
        $exists = Test-Path $resolved
      } catch {
        $resolved = ''
        $exists = $false
      }
    }
    $out += [pscustomobject]@{
      page = $f.FullName
      reference = $ref
      exists = $exists
      resolved = $resolved
    }
  }
}

$csvAll = Join-Path $root 'link-verify.csv'
$csvUnresolved = Join-Path $root 'link-verify-unresolved.csv'
$out | Export-Csv -Path $csvAll -NoTypeInformation -Encoding utf8
$out | Where-Object { $_.exists -eq $false } | Export-Csv -Path $csvUnresolved -NoTypeInformation -Encoding utf8

Write-Output "WROTE: $csvAll"
Write-Output "WROTE: $csvUnresolved (missing references)" 