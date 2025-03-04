@echo off
REM filepath: /c:/Users/codym/Desktop/MysticInsights/setup.bat
echo Setting up MysticInsights directory structure...

REM Create the main directories
mkdir "images" 2>nul
mkdir "images\cards" 2>nul
mkdir "data" 2>nul
mkdir "services" 2>nul
mkdir "utils" 2>nul
mkdir "scripts" 2>nul

echo Directory structure created successfully!
echo.
echo Next steps:
echo 1. Run: npm init -y
echo 2. Run: npm install dotenv
echo 3. Run: node utils\imageDownloader.js
echo.