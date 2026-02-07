@echo off
REM SchemeAssist - Quick Start Script for Windows

echo.
echo 🚀 SchemeAssist - Government Schemes Recommendation System
echo ===========================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✅ %PYTHON_VERSION%
echo.

REM Install requirements
echo 📦 Installing Python dependencies...
cd backend
pip install -r requirements.txt
cd ..

REM Start Flask backend
echo.
echo 🔧 Starting Flask Backend on http://localhost:5000
echo.
echo 📖 Open 'static/index.html' in your web browser to use the application
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Flask app
python backend/app.py

pause
