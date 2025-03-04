@echo off
REM filepath: /c:/Users/codym/Desktop/MysticInsights/run.bat
echo MysticInsights Utilities

if "%1"=="" (
  echo Usage: run.bat [validate^|download^|check^|reading]
  echo   validate - Check if all card images exist
  echo   download - Download missing card images
  echo   check    - Run the full link checker
  echo   reading  - Generate a tarot card reading
  exit /b 1
)

if "%1"=="validate" (
  echo Running image validator...
  node utils\linkValidator.js
) else if "%1"=="download" (
  echo Downloading missing card images...
  node utils\imageDownloader.js
) else if "%1"=="check" (
  echo Running full link checker...
  node scripts\checkLinks.js
) else if "%1"=="reading" (
  echo Generating tarot card reading...
  node index.js
) else (
  echo Unknown command: %1
  echo Usage: run.bat [validate^|download^|check^|reading]
  exit /b 1
)