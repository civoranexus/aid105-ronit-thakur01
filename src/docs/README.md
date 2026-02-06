# SchemeAssist AI - Government Scheme Recommendation System

## Civora Nexus AID105 Internship Project

### Project Overview

SchemeAssist AI is an intelligent government scheme recommendation system designed to help Indian citizens discover welfare programs they may be eligible for. The system uses data-driven AI logic to match user profiles against a comprehensive database of Central and State government schemes.

---

## Features

### 1. User Profile Module
- Collects essential user information:
  - State/Union Territory
  - Age
  - Annual Income
  - Category of Interest (Agriculture, Education, Health, etc.)
- Input validation with clear error messages
- Secure, client-side processing

### 2. Scheme Dataset Module
- 70+ government schemes covering:
  - Central Government Schemes
  - State-Specific Schemes (20+ states)
- Categories include:
  - Agriculture
  - Education
  - Health
  - Housing
  - Business
  - Women Welfare
  - Senior Citizen
  - Disability
  - Skill Development
  - Social Security
  - Food Security
- Each scheme contains:
  - Scheme ID
  - Name
  - Level (Central/State)
  - Eligibility criteria (age, income, state)
  - Target group
  - Benefits description
  - Last updated date
  - Deadline (if applicable)

### 3. AI Recommendation Engine
- **Eligibility Scoring Algorithm:**
  - Age Match: 25 points base + 5 bonus for optimal range
  - Income Match: 30 points base + 10 bonus for lower income
  - State Match: 20 points + 5 bonus for state-specific schemes
  - Category Match: 25 points for exact match, 10 for related categories
  - Total: Normalized to 0-100 scale

- **Ranking System:**
  - Schemes sorted by eligibility score (highest first)
  - Minimum threshold: 50% score
  - Perfect Match: 90%+
  - Highly Eligible: 75-89%
  - Eligible: 60-74%
  - Partial Match: 50-59%

### 4. Alert & Update Module
- Smart alerts for:
  - Perfect match schemes
  - High eligibility opportunities
  - Approaching deadlines
  - Newly launched schemes
- Priority levels: High, Medium, Low

### 5. Report Generation
- Comprehensive recommendation report
- Exportable as Markdown
- Includes:
  - User profile summary
  - Analysis statistics
  - Ranked recommendations
  - Eligibility explanations
  - Scheme details
  - Disclaimer

---

## AI Logic Explanation

### Eligibility Score Calculation

```
Total Score = Age Score + Income Score + State Score + Category Score
```

**Age Score (max 30 points):**
- Base: 25 points if age within min_age to max_age range
- Bonus: Up to 5 points for being in the middle of the age range

**Income Score (max 40 points):**
- Base: 30 points if income within min_income to max_income range
- Bonus: Up to 10 points proportional to how far below max income

**State Score (max 25 points):**
- Base: 20 points if scheme is Central (All) or matches user's state
- Bonus: 5 points for state-specific schemes matching user's state

**Category Score (max 25 points):**
- Exact match: 25 points
- Related category: 10 points

### Related Categories Map
- Agriculture ↔ Business, Skill Development
- Education ↔ Skill Development, Women Welfare
- Health ↔ Women Welfare, Senior Citizen, Disability
- Housing ↔ Social Security
- Business ↔ Agriculture, Skill Development
- Women Welfare ↔ Education, Health, Housing

---

## Technology Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite
- **Architecture:** Component-based, modular design

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx            # Main header with branding
│   ├── Footer.tsx            # Footer with disclaimer
│   ├── UserProfileForm.tsx   # User input form
│   ├── SchemeCard.tsx        # Individual scheme card
│   ├── RecommendationResults.tsx # Results display
│   ├── Stats.tsx             # Database statistics
│   └── HowItWorks.tsx        # Feature explanation
├── data/
│   └── schemes.ts            # Government schemes dataset
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   ├── recommender.ts        # AI recommendation engine
│   └── cn.ts                 # Utility functions
├── App.tsx                   # Main application component
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

---

## How to Run

1. The project is pre-built and runs in the browser
2. Enter your profile information in the form
3. Click "Get AI Recommendations"
4. View personalized scheme recommendations
5. Download report as Markdown if needed

---

## Dataset Updates

The scheme dataset (`src/data/schemes.ts`) can be easily updated:

1. Add new schemes following the existing schema
2. Update existing scheme details (benefits, dates, etc.)
3. Mark inactive schemes by setting `is_active: false`
4. Add `is_new: true` for recently launched schemes
5. Add `deadline` field for time-sensitive schemes

---

## Disclaimer

⚠️ **Important Notice:**

This is an AI-powered recommendation system developed for educational and demonstration purposes as part of the Civora Nexus AID105 internship project.

- Recommendations are based on publicly available scheme information
- Actual eligibility may vary based on additional requirements
- For official information, visit respective government portals
- The creators are not liable for decisions based on these recommendations

---

## Author

**Civora Nexus AID105 Internship Project**

Built with ❤️ for Indian citizens

---

## License

This project is for educational and demonstration purposes only.
