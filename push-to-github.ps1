# PowerShell Script to Push to GitHub
# Run this AFTER creating the repository on GitHub

Write-Host "🚀 Pushing portfolio to GitHub..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "C:\Users\AshutoshAagawane\Desktop\ashutosh website\python-portfolio"

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "✅ Remote already configured" -ForegroundColor Green
} else {
    Write-Host "⚠️  Remote not found. Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/Ashu9594/python-portfolio.git
}

# Ensure we're on main branch
git branch -M main

Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  Username: Ashu9594" -ForegroundColor White
Write-Host "  Password: Use your Personal Access Token (not your GitHub password)" -ForegroundColor White
Write-Host "`n💡 Get token at: https://github.com/settings/tokens/new" -ForegroundColor Cyan
Write-Host "   Select 'repo' scope and generate token`n" -ForegroundColor Cyan

# Push to GitHub
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "`n🌐 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/Ashu9594/python-portfolio/settings/pages" -ForegroundColor White
    Write-Host "2. Source: Branch 'main' → '/ (root)'" -ForegroundColor White
    Write-Host "3. Click 'Save'" -ForegroundColor White
    Write-Host "4. Your site will be live at: https://Ashu9594.github.io/python-portfolio/" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed. Make sure:" -ForegroundColor Red
    Write-Host "1. Repository exists at: https://github.com/Ashu9594/python-portfolio" -ForegroundColor Yellow
    Write-Host "2. You're using a Personal Access Token (not password)" -ForegroundColor Yellow
    Write-Host "3. Token has 'repo' permissions" -ForegroundColor Yellow
}

