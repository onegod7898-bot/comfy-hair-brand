# Deploy Comfy Hair Brand to Vercel
# Run this after: npx vercel login (one-time)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Building..." -ForegroundColor Cyan
$env:NODE_OPTIONS = "--max-old-space-size=4096"
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Deploying to Vercel..." -ForegroundColor Cyan
npx vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nIf you see 'token is not valid', run first: npx vercel login" -ForegroundColor Yellow
    exit 1
}
Write-Host "Done." -ForegroundColor Green
