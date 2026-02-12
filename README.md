# SchemeAssist - Government Schemes Recommendation System

An AI-powered web application that recommends government welfare schemes based on user profiles. Built with a **Python Flask backend** and **vanilla HTML/CSS/JavaScript frontend**.

## 📋 Project Structure

```
aid105-ronit-thakur01/
├── backend/                 # Python Flask API
│   ├── app.py               # Main Flask application
│   └── requirements.txt      # Python dependencies
├── static/                  # Frontend files
│   └── index.html           # Complete HTML/CSS/JS frontend
├── data/                    # Data files
│   └── schemes.json         # Government schemes database
├── docs/                    # Documentation
├── resources/               # Additional resources
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Flask Backend

```bash
cd backend
python app.py
```

The backend will start at `http://localhost:5000`

### 3. Open the Frontend

Open the static HTML file in your browser:
```bash
# Navigate to: static/index.html and open in your browser
```

## 🎯 Features

- **70+ Government Schemes**: Comprehensive database of central and state schemes
- **AI-Powered Matching**: Intelligent eligibility calculation based on age, income, state, and category
- **Personalized Recommendations**: Get schemes ranked by eligibility score
- **Real-time Analysis**: Instant recommendations with detailed explanations
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices
- **No Installation Required**: Frontend is pure HTML/CSS/JavaScript

## 📊 Scheme Categories

Agriculture • Education • Health • Housing • Business • Women Welfare • Senior Citizen • Skill Development • Social Security • Food Security

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/recommend` | Get scheme recommendations |
| GET | `/api/categories` | Get all categories |
| GET | `/api/states` | Get all states |
| GET | `/api/schemes` | Get all schemes |
| GET | `/health` | Health check |

## 💡 How It Works

1. **User Input**: Enter your state, age, annual income, and preferred category
2. **AI Analysis**: Backend analyzes eligibility against 70+ schemes
3. **Scoring**: Each scheme gets a score (0-100) based on eligibility
4. **Recommendations**: Ranked schemes with eligibility reasons and alerts

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| Backend | Python Flask |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Data | JSON |
| Communication | REST API |

## 📝 Customization

### Adding New Schemes
Edit `data/schemes.json` and add new scheme objects.

### Modifying Eligibility Logic
Edit the `calculate_eligibility_score()` function in `backend/app.py`.

### Styling the Frontend
All CSS is embedded in `static/index.html` - modify the `<style>` tag.

## ⚠️ Important Notes

- This system provides **AI-based recommendations** only
- Always verify eligibility on official government portals
- Consult with CSC (Common Service Center) for final confirmations
- Schemes and eligibility criteria are subject to change

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Last Updated**: February 2024
**Database**: 70+ active schemes covering 25+ states


