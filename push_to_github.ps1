Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  LocalThread GitHub Push Helper (PowerShell)      " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Check status
Write-Host "Current Git Status:" -ForegroundColor Yellow
git status
Write-Host ""

# Stage
Write-Host "1. Staging all changes..." -ForegroundColor Yellow
git add -A
Write-Host ""

# Commit
Write-Host "2. Committing changes..." -ForegroundColor Yellow
$commit_msg = Read-Host "Enter commit message (press Enter for 'Sync local changes')"
if ([string]::IsNullOrWhiteSpace($commit_msg)) {
    $commit_msg = "Sync local changes"
}
git commit -m $commit_msg
Write-Host ""

# Push
Write-Host "3. Pushing to GitHub (main branch)..." -ForegroundColor Yellow
git push -u origin main
Write-Host ""

Write-Host "===================================================" -ForegroundColor Green
Write-Host "  Finished!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
Read-Host "Press Enter to exit"
