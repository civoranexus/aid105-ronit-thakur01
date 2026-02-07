"""
SchemeAssist AI - Recommendation Engine
A Flask-based API for government schemes recommendation
"""

import json
import math
from datetime import datetime
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load schemes data
DATA_PATH = Path(__file__).parent.parent / "data" / "schemes.json"

def load_schemes():
    """Load schemes from JSON file"""
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def calculate_eligibility_score(scheme, profile):
    """
    Calculate eligibility score for a scheme based on user profile
    Score ranges from 0 to 100
    """
    score = 0
    max_possible_score = 0

    # Age eligibility (25 points)
    max_possible_score += 25
    if profile['age'] >= scheme['min_age'] and profile['age'] <= scheme['max_age']:
        score += 25
        # Bonus for being in middle of age range
        age_range = scheme['max_age'] - scheme['min_age']
        age_position = profile['age'] - scheme['min_age']
        if age_range > 0:
            age_middleness = 1 - abs((age_position / age_range) - 0.5) * 2
            score += age_middleness * 5  # Up to 5 bonus points

    # Income eligibility (30 points)
    max_possible_score += 30
    if profile['annualIncome'] >= scheme['min_income'] and profile['annualIncome'] <= scheme['max_income']:
        score += 30
        # Bonus for being well within income range
        income_range = scheme['max_income'] - scheme['min_income']
        if income_range > 0:
            income_buffer = (scheme['max_income'] - profile['annualIncome']) / income_range
            score += income_buffer * 10  # Up to 10 bonus points

    # State eligibility (20 points)
    max_possible_score += 20
    if scheme['state'] == 'All' or scheme['state'] == profile['state'] or profile['state'] == 'All India':
        score += 20
        # Bonus for state-specific scheme
        if scheme['state'] == profile['state'] and scheme['level'] == 'State':
            score += 5

    # Category match (25 points)
    max_possible_score += 25
    if scheme['category'] == profile['category']:
        score += 25
    else:
        # Partial score for related categories
        related_categories = {
            'Agriculture': ['Business', 'Skill Development'],
            'Education': ['Skill Development', 'Women Welfare'],
            'Health': ['Women Welfare', 'Senior Citizen'],
            'Housing': ['Social Security'],
            'Business': ['Agriculture', 'Skill Development'],
            'Women Welfare': ['Education', 'Health', 'Housing'],
            'Senior Citizen': ['Health', 'Social Security'],
            'Skill Development': ['Education', 'Business'],
            'Social Security': ['Senior Citizen', 'Housing'],
            'Food Security': ['Health', 'Social Security']
        }
        if profile['category'] in related_categories:
            if scheme['category'] in related_categories[profile['category']]:
                score += 10

    # Normalize score to 0-100
    normalized_score = min(100, math.floor((score / max_possible_score) * 100))
    return normalized_score

def generate_reasons(scheme, profile, score):
    """Generate eligibility reasons"""
    reasons = []

    # Age-based reasons
    if profile['age'] >= scheme['min_age'] and profile['age'] <= scheme['max_age']:
        reasons.append(f"Your age ({profile['age']}) meets the eligibility criteria ({scheme['min_age']}-{scheme['max_age']} years)")

    # Income-based reasons
    if profile['annualIncome'] >= scheme['min_income'] and profile['annualIncome'] <= scheme['max_income']:
        income_in_lakhs = profile['annualIncome'] / 100000
        max_income_in_lakhs = scheme['max_income'] / 100000
        reasons.append(f"Your annual income (₹{income_in_lakhs:.1f}L) is within the limit (up to ₹{max_income_in_lakhs:.1f}L)")

    # State-based reasons
    if scheme['state'] == 'All':
        reasons.append("This Central Government scheme is available across all states")
    elif scheme['state'] == profile['state']:
        reasons.append(f"This scheme is specifically available in {profile['state']}")

    # Category-based reasons
    if scheme['category'] == profile['category']:
        reasons.append(f"This scheme is specifically designed for {profile['category']}")

    return reasons

def generate_report(profile):
    """Generate recommendation report for user profile"""
    data = load_schemes()
    schemes = data['schemes']
    
    recommendations = []
    
    for scheme in schemes:
        if not scheme['is_active']:
            continue
            
        score = calculate_eligibility_score(scheme, profile)
        
        # Only include schemes with minimum score
        if score >= 30:
            reasons = generate_reasons(scheme, profile, score)
            alerts = []
            
            # Generate alerts
            if score >= 90:
                alerts.append({
                    'type': 'perfect_match',
                    'message': 'You are highly eligible for this scheme',
                    'priority': 'high'
                })
            
            if scheme.get('is_new'):
                alerts.append({
                    'type': 'new_scheme',
                    'message': 'This is a newly launched scheme',
                    'priority': 'medium'
                })
            
            if scheme.get('deadline'):
                alerts.append({
                    'type': 'deadline_approaching',
                    'message': f"Deadline: {scheme['deadline']}",
                    'priority': 'high'
                })
            
            recommendations.append({
                'scheme': scheme,
                'eligibilityScore': score,
                'reasons': reasons,
                'alerts': alerts
            })
    
    # Sort by eligibility score
    recommendations.sort(key=lambda x: x['eligibilityScore'], reverse=True)
    
    return {
        'generatedAt': datetime.now().isoformat(),
        'userProfile': profile,
        'totalSchemesAnalyzed': len(schemes),
        'eligibleSchemesCount': len(recommendations),
        'recommendations': recommendations,
        'summary': f"Found {len(recommendations)} government schemes matching your profile"
    }

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    """API endpoint for recommendations"""
    try:
        profile = request.json
        report = generate_report(profile)
        return jsonify(report)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get all available categories"""
    data = load_schemes()
    return jsonify({'categories': data['categories']})

@app.route('/api/states', methods=['GET'])
def get_states():
    """Get all available states"""
    data = load_schemes()
    return jsonify({'states': data['states']})

@app.route('/api/schemes', methods=['GET'])
def get_all_schemes():
    """Get all schemes"""
    data = load_schemes()
    return jsonify(data)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
