# AI Logic Documentation

## SchemeAssist AI - Recommendation Engine

### Overview

The SchemeAssist AI recommendation engine uses a rule-based, data-driven approach to match citizen profiles with eligible government schemes. This document explains the AI logic in detail.

---

## 1. Eligibility Matching Algorithm

### 1.1 Input Parameters

The system takes four primary inputs from the user:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| state | string | User's state/UT | "Maharashtra" |
| age | number | User's age in years | 35 |
| annualIncome | number | Annual household income | 200000 |
| category | string | Area of interest | "Agriculture" |

### 1.2 Scheme Dataset Fields

Each scheme in the dataset contains:

```typescript
interface Scheme {
  scheme_id: string;
  scheme_name: string;
  level: 'Central' | 'State';
  state: string;          // 'All' for Central schemes
  category: string;
  min_age: number;
  max_age: number;
  min_income: number;
  max_income: number;
  target_group: string;
  benefits: string;
  is_active: boolean;
  last_updated: string;
  deadline?: string;
  is_new?: boolean;
}
```

---

## 2. Eligibility Score Calculation

### 2.1 Scoring Components

The eligibility score is calculated using four weighted components:

#### Component 1: Age Eligibility (Max 30 points)

```javascript
// Base score: 25 points if age is within range
if (age >= min_age && age <= max_age) {
  score += 25;
  
  // Bonus: Up to 5 points for being in middle of age range
  const ageRange = max_age - min_age;
  const agePosition = age - min_age;
  const middleness = 1 - Math.abs((agePosition / ageRange) - 0.5) * 2;
  score += middleness * 5;
}
```

**Rationale:** Schemes often target specific age groups. Being in the middle of the range indicates a better fit.

#### Component 2: Income Eligibility (Max 40 points)

```javascript
// Base score: 30 points if income is within range
if (income >= min_income && income <= max_income) {
  score += 30;
  
  // Bonus: Up to 10 points for lower income (more in need)
  const incomeRange = max_income - min_income;
  const incomeBuffer = (max_income - income) / incomeRange;
  score += incomeBuffer * 10;
}
```

**Rationale:** Many government schemes prioritize economically weaker sections. Lower income within the eligible range receives higher priority.

#### Component 3: State Match (Max 25 points)

```javascript
// Base score: 20 points if state matches or scheme is Central
if (scheme.state === 'All' || scheme.state === user.state) {
  score += 20;
  
  // Bonus: 5 points for state-specific scheme matching user's state
  if (scheme.state === user.state && scheme.level === 'State') {
    score += 5;
  }
}
```

**Rationale:** State-specific schemes are designed for residents of that state and may offer additional benefits.

#### Component 4: Category Match (Max 25 points)

```javascript
// Exact match: 25 points
if (scheme.category === user.category) {
  score += 25;
}
// Related category: 10 points
else if (relatedCategories[user.category]?.includes(scheme.category)) {
  score += 10;
}
```

**Related Categories Matrix:**

| User Category | Related Categories |
|--------------|-------------------|
| Agriculture | Business, Skill Development |
| Education | Skill Development, Women Welfare |
| Health | Women Welfare, Senior Citizen, Disability |
| Housing | Social Security |
| Business | Agriculture, Skill Development |
| Women Welfare | Education, Health, Housing |
| Senior Citizen | Health, Social Security |
| Disability | Health, Education |
| Skill Development | Education, Business |
| Social Security | Senior Citizen, Housing |
| Food Security | Health, Social Security |

---

## 3. Score Normalization

The raw score is normalized to a 0-100 scale:

```javascript
const maxPossibleScore = 25 + 40 + 25 + 25; // = 115 with all bonuses
const normalizedScore = Math.min(100, Math.round((rawScore / maxPossibleScore) * 100));
```

### Score Categories:

| Score Range | Label | Meaning |
|-------------|-------|---------|
| 90-100 | Perfect Match | Meets all eligibility criteria with optimal fit |
| 75-89 | Highly Eligible | Meets most criteria, strong candidate |
| 60-74 | Eligible | Meets basic requirements |
| 50-59 | Partial Match | Meets some criteria, worth exploring |
| < 50 | Not Shown | Does not meet minimum requirements |

---

## 4. Reason Generation

For each matched scheme, the system generates human-readable explanations:

```javascript
function generateReasons(scheme, profile, score) {
  const reasons = [];
  
  // Age-based reason
  if (ageMatch) {
    reasons.push(`Your age (${age}) meets the eligibility (${min_age}-${max_age} years)`);
  }
  
  // Income-based reason
  if (incomeMatch) {
    reasons.push(`Your income (₹${income}) is within the limit (up to ₹${max_income})`);
  }
  
  // State-based reason
  if (stateMatch) {
    reasons.push(`This scheme is available in ${state}`);
  }
  
  // Category-based reason
  if (categoryMatch) {
    reasons.push(`Scheme category matches your area of interest`);
  }
  
  return reasons;
}
```

---

## 5. Alert Generation

The system generates contextual alerts:

### Alert Types:

| Type | Condition | Priority |
|------|-----------|----------|
| perfect_match | Score >= 90 | High |
| high_eligibility | Score >= 80 | High |
| deadline_approaching | Days <= 30 | High/Medium |
| new_scheme | is_new === true | Medium |

### Deadline Alert Logic:

```javascript
if (scheme.deadline) {
  const daysUntilDeadline = calculateDays(deadline, today);
  
  if (daysUntilDeadline <= 7) {
    priority = 'high';
    message = `Deadline in ${daysUntilDeadline} days!`;
  } else if (daysUntilDeadline <= 30) {
    priority = 'medium';
    message = `Deadline approaching: ${deadline}`;
  }
}
```

---

## 6. Ranking Algorithm

Schemes are ranked by:

1. **Primary:** Eligibility Score (descending)
2. **Secondary:** Alert priority (high > medium > low)
3. **Tertiary:** Last updated date (newer first)

```javascript
recommendations.sort((a, b) => {
  // Primary: Score
  if (b.eligibilityScore !== a.eligibilityScore) {
    return b.eligibilityScore - a.eligibilityScore;
  }
  // Secondary: Has high priority alerts
  const aHighAlerts = a.alerts.filter(al => al.priority === 'high').length;
  const bHighAlerts = b.alerts.filter(al => al.priority === 'high').length;
  return bHighAlerts - aHighAlerts;
});
```

---

## 7. Filtering Logic

### Pre-filtering:
- Only active schemes (`is_active === true`)
- State match required (Central schemes match all)

### Post-filtering:
- Minimum score threshold: 50%
- User can filter by category

---

## 8. Explainability

Every recommendation includes:

1. **Eligibility Score:** Quantified match percentage
2. **Reasons:** List of why the user qualifies
3. **Alerts:** Important notifications
4. **Scheme Details:** Full information for verification

This ensures transparency and helps users understand why each scheme was recommended.

---

## 9. Limitations

- Rule-based, not ML-based (deterministic results)
- Does not account for:
  - Documentation requirements
  - Application quotas
  - Scheme fund availability
  - Complex eligibility conditions
- Dataset requires manual updates

---

## 10. Future Enhancements

Potential improvements:
- Machine learning for better matching
- Natural language eligibility parsing
- Real-time scheme data integration
- User feedback learning loop
- Multi-language support
