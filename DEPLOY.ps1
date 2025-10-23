# Learnify Deployment Script for PowerShell
# This script automates the deployment process to Vercel

Write-Host "🚀 Starting Learnify Deployment Process..." -ForegroundColor Green

# Navigate to project directory
Set-Location "C:\Users\Naveen Dubey\Videos\learnify"

# Check git status
Write-Host "🔍 Checking Git Status..." -ForegroundColor Yellow
git status

# Add all changes
Write-Host "➕ Adding all changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$gitStatus = git status --porcelain
if ($gitStatus) {
    # Commit changes
    Write-Host "📝 Committing changes..." -ForegroundColor Yellow
    git commit -m "Automated deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    
    # Push to GitHub
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "✅ Changes pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Cyan
}

# Instructions for Vercel deployment
Write-Host "`n📋 Deployment Instructions:" -ForegroundColor Yellow
Write-Host "1. Visit https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Your project should automatically deploy from GitHub" -ForegroundColor White
Write-Host "3. If not, click 'Import Project' and select your GitHub repository" -ForegroundColor White
Write-Host "4. Use these deployment settings:" -ForegroundColor White
Write-Host "   - Build Command: npm install" -ForegroundColor White
Write-Host "   - Output Directory: ." -ForegroundColor White
Write-Host "   - Framework Preset: Other" -ForegroundColor White
Write-Host "   - Root Directory: ." -ForegroundColor White

Write-Host "`n✅ Deployment process completed!" -ForegroundColor Green
Write-Host "🌐 Your site will be available at: https://learnifywithus.vercel.app/" -ForegroundColor Cyan