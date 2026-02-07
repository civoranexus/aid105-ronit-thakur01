#!/bin/bash
# SchemeAssist - Quick Start Script

echo "🚀 SchemeAssist - Government Schemes Recommendation System"
echo "=========================================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Install requirements
echo "📦 Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Start Flask backend
echo ""
echo "🔧 Starting Flask Backend..."
echo "Backend will run on: http://localhost:5000"
echo ""
echo "Opening frontend interface..."
echo "Frontend: Open 'static/index.html' in your web browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the Flask app
python backend/app.py
