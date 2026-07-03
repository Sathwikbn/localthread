@echo off
cd /d "%~dp0"
echo ===================================================
echo   LocalThread GitHub Push Helper
echo ===================================================
echo.
echo Current Git Status:
git status
echo.
echo 1. Staging all changes...
git add -A
echo.
echo 2. Committing changes...
set /p commit_msg="Enter commit message (press Enter for 'Sync local changes'): "
if "%commit_msg%"=="" set commit_msg=Sync local changes
git commit -m "%commit_msg%"
echo.
echo 3. Pushing to GitHub (main branch)...
git push -u origin main
echo.
echo ===================================================
echo   Finished!
echo ===================================================
pause
