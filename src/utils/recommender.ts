// AI Recommendation Engine
// This module implements data-driven eligibility matching and scoring

import { schemes as schemeData } from '@/data/schemes';
import type { UserProfile, Scheme, RecommendationResult, Alert, RecommendationReport } from '@/types';

/**
 * Calculate eligibility score for a scheme based on user profile
 * Score ranges from 0 to 100
 */
function calculateEligibilityScore(scheme: Scheme, profile: UserProfile): number {
  let score = 0;
  let maxPossibleScore = 0;

  // Age eligibility (25 points)
  maxPossibleScore += 25;
  if (profile.age >= scheme.min_age && profile.age <= scheme.max_age) {
    score += 25;
    // Bonus for being in middle of age range
    const ageRange = scheme.max_age - scheme.min_age;
    const agePosition = profile.age - scheme.min_age;
    if (ageRange > 0) {
      const ageMiddleness = 1 - Math.abs((agePosition / ageRange) - 0.5) * 2;
      score += ageMiddleness * 5; // Up to 5 bonus points
    }
  }

  // Income eligibility (30 points)
  maxPossibleScore += 30;
  if (profile.annualIncome >= scheme.min_income && profile.annualIncome <= scheme.max_income) {
    score += 30;
    // Bonus for being well within income range
    const incomeRange = scheme.max_income - scheme.min_income;
    if (incomeRange > 0) {
      const incomeBuffer = (scheme.max_income - profile.annualIncome) / incomeRange;
      score += incomeBuffer * 10; // Up to 10 bonus points for lower income
    }
  }

  // State eligibility (20 points)
  maxPossibleScore += 20;
  if (scheme.state === 'All' || scheme.state === profile.state || profile.state === 'All India') {
    score += 20;
    // Bonus for state-specific scheme matching user's state
    if (scheme.state === profile.state && scheme.level === 'State') {
      score += 5;
    }
  }

  // Category match (25 points)
  maxPossibleScore += 25;
  if (scheme.category === profile.category) {
    score += 25;
  } else {
    // Partial score for related categories
    const relatedCategories: { [key: string]: string[] } = {
      'Agriculture': ['Business', 'Skill Development'],
      'Education': ['Skill Development', 'Women Welfare'],
      'Health': ['Women Welfare', 'Senior Citizen', 'Disability'],
      'Housing': ['Social Security'],
      'Business': ['Agriculture', 'Skill Development'],
      'Women Welfare': ['Education', 'Health', 'Housing'],
      'Senior Citizen': ['Health', 'Social Security'],
      'Disability': ['Health', 'Education'],
      'Skill Development': ['Education', 'Business'],
      'Social Security': ['Senior Citizen', 'Housing'],
      'Food Security': ['Health', 'Social Security']
    };

    if (relatedCategories[profile.category]?.includes(scheme.category)) {
      score += 10;
    }
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(100, Math.round((score / maxPossibleScore) * 100));
  return normalizedScore;
}

/**
 * Generate eligibility reasons based on matching criteria
 */
function generateReasons(scheme: Scheme, profile: UserProfile, score: number): string[] {
  const reasons: string[] = [];

  // Age-based reasons
  if (profile.age >= scheme.min_age && profile.age <= scheme.max_age) {
    reasons.push(`Your age (${profile.age}) meets the eligibility criteria (${scheme.min_age}-${scheme.max_age} years)`);
  }

  // Income-based reasons
  if (profile.annualIncome >= scheme.min_income && profile.annualIncome <= scheme.max_income) {
    const incomeInLakhs = (profile.annualIncome / 100000).toFixed(1);
    const maxIncomeInLakhs = (scheme.max_income / 100000).toFixed(1);
    reasons.push(`Your annual income (₹${incomeInLakhs}L) is within the limit (up to ₹${maxIncomeInLakhs}L)`);
  }

  // State-based reasons
  if (scheme.state === 'All') {
    reasons.push('This Central Government scheme is available across all states');
  } else if (scheme.state === profile.state) {
    reasons.push(`This scheme is specifically designed for residents of ${profile.state}`);
  }

  // Category-based reasons
  if (scheme.category === profile.category) {
    reasons.push(`Scheme category (${scheme.category}) matches your area of interest`);
  }

  // Target group relevance
  reasons.push(`Target beneficiaries: ${scheme.target_group}`);

  // Score-based summary
  if (score >= 90) {
    reasons.unshift('⭐ Perfect Match: You meet all eligibility criteria');
  } else if (score >= 75) {
    reasons.unshift('✅ Highly Eligible: You meet most eligibility criteria');
  } else if (score >= 60) {
    reasons.unshift('📋 Eligible: You meet basic eligibility requirements');
  }

  return reasons;
}

/**
 * Generate alerts based on scheme properties and user eligibility
 */
function generateAlerts(scheme: Scheme, score: number): Alert[] {
  const alerts: Alert[] = [];

  // High eligibility alert
  if (score >= 90) {
    alerts.push({
      type: 'perfect_match',
      message: 'Perfect Match! You meet all eligibility criteria for this scheme.',
      priority: 'high'
    });
  } else if (score >= 80) {
    alerts.push({
      type: 'high_eligibility',
      message: 'You are highly eligible for this scheme. Apply soon!',
      priority: 'high'
    });
  }

  // Deadline approaching alert
  if (scheme.deadline) {
    const deadlineDate = new Date(scheme.deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilDeadline > 0 && daysUntilDeadline <= 30) {
      alerts.push({
        type: 'deadline_approaching',
        message: `Application deadline in ${daysUntilDeadline} days (${scheme.deadline})`,
        priority: daysUntilDeadline <= 7 ? 'high' : 'medium'
      });
    } else if (daysUntilDeadline > 30 && daysUntilDeadline <= 90) {
      alerts.push({
        type: 'deadline_approaching',
        message: `Application deadline: ${scheme.deadline}`,
        priority: 'low'
      });
    }
  }

  // New scheme alert
  if (scheme.is_new) {
    alerts.push({
      type: 'new_scheme',
      message: 'This is a newly launched scheme - be among the first applicants!',
      priority: 'medium'
    });
  }

  return alerts;
}

/**
 * Main recommendation engine function
 * Returns ranked list of eligible schemes with explanations
 */
export function getRecommendations(profile: UserProfile): RecommendationResult[] {
  const recommendations: RecommendationResult[] = [];

  for (const scheme of schemeData) {
    // Skip inactive schemes
    if (!scheme.is_active) continue;

    // Check basic eligibility (state match)
    const stateMatch = scheme.state === 'All' || 
                       scheme.state === profile.state || 
                       profile.state === 'All India';
    
    if (!stateMatch) continue;

    // Calculate eligibility score
    const score = calculateEligibilityScore(scheme, profile);

    // Only include schemes with score >= 50
    if (score >= 50) {
      const reasons = generateReasons(scheme, profile, score);
      const alerts = generateAlerts(scheme, score);

      recommendations.push({
        scheme,
        eligibilityScore: score,
        reasons,
        alerts
      });
    }
  }

  // Sort by eligibility score (descending)
  recommendations.sort((a, b) => b.eligibilityScore - a.eligibilityScore);

  return recommendations;
}

/**
 * Generate a complete recommendation report
 */
export function generateReport(profile: UserProfile): RecommendationReport {
  const recommendations = getRecommendations(profile);
  const totalSchemes = schemeData.filter(s => s.is_active).length;

  let summary = '';
  if (recommendations.length === 0) {
    summary = 'No schemes match your current profile. Try adjusting your criteria or explore different categories.';
  } else if (recommendations.length <= 5) {
    summary = `Found ${recommendations.length} scheme(s) matching your profile. Review each recommendation carefully.`;
  } else if (recommendations.length <= 15) {
    summary = `Great news! You are eligible for ${recommendations.length} government schemes. Top recommendations are shown first.`;
  } else {
    summary = `Excellent! You are eligible for ${recommendations.length} schemes across multiple categories. Focus on high-scoring schemes first.`;
  }

  const highScoreCount = recommendations.filter(r => r.eligibilityScore >= 80).length;
  if (highScoreCount > 0) {
    summary += ` ${highScoreCount} scheme(s) show high eligibility (80%+).`;
  }

  return {
    generatedAt: new Date().toISOString(),
    userProfile: profile,
    totalSchemesAnalyzed: totalSchemes,
    eligibleSchemesCount: recommendations.length,
    recommendations,
    summary
  };
}

/**
 * Get scheme statistics
 */
export function getSchemeStats() {
  const activeSchemes = schemeData.filter(s => s.is_active);
  const categoryCounts: { [key: string]: number } = {};
  const levelCounts = { Central: 0, State: 0 };

  for (const scheme of activeSchemes) {
    categoryCounts[scheme.category] = (categoryCounts[scheme.category] || 0) + 1;
    levelCounts[scheme.level]++;
  }

  return {
    totalSchemes: activeSchemes.length,
    categoryCounts,
    levelCounts,
    newSchemes: activeSchemes.filter(s => s.is_new).length,
    schemesWithDeadlines: activeSchemes.filter(s => s.deadline).length
  };
}

/**
 * Validate user profile inputs
 */
export function validateProfile(profile: Partial<UserProfile>): { isValid: boolean; errors: { field: string; message: string }[] } {
  const errors: { field: string; message: string }[] = [];

  if (!profile.state || profile.state.trim() === '') {
    errors.push({ field: 'state', message: 'Please select your state' });
  }

  if (profile.age === undefined || profile.age === null) {
    errors.push({ field: 'age', message: 'Please enter your age' });
  } else if (profile.age < 0 || profile.age > 120) {
    errors.push({ field: 'age', message: 'Please enter a valid age (0-120)' });
  }

  if (profile.annualIncome === undefined || profile.annualIncome === null) {
    errors.push({ field: 'annualIncome', message: 'Please enter your annual income' });
  } else if (profile.annualIncome < 0) {
    errors.push({ field: 'annualIncome', message: 'Income cannot be negative' });
  }

  if (!profile.category || profile.category.trim() === '') {
    errors.push({ field: 'category', message: 'Please select a category' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Export report as markdown format
 */
export function exportReportAsMarkdown(report: RecommendationReport): string {
  const lines: string[] = [];
  
  lines.push('# SchemeAssist AI - Recommendation Report');
  lines.push('');
  lines.push(`**Generated:** ${new Date(report.generatedAt).toLocaleString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## User Profile Summary');
  lines.push('');
  lines.push(`| Field | Value |`);
  lines.push(`|-------|-------|`);
  lines.push(`| State | ${report.userProfile.state} |`);
  lines.push(`| Age | ${report.userProfile.age} years |`);
  lines.push(`| Annual Income | ₹${report.userProfile.annualIncome.toLocaleString()} |`);
  lines.push(`| Category of Interest | ${report.userProfile.category} |`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Analysis Summary');
  lines.push('');
  lines.push(`- **Total Schemes Analyzed:** ${report.totalSchemesAnalyzed}`);
  lines.push(`- **Eligible Schemes Found:** ${report.eligibleSchemesCount}`);
  lines.push('');
  lines.push(`> ${report.summary}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Recommended Schemes');
  lines.push('');

  for (let i = 0; i < Math.min(report.recommendations.length, 20); i++) {
    const rec = report.recommendations[i];
    lines.push(`### ${i + 1}. ${rec.scheme.scheme_name}`);
    lines.push('');
    lines.push(`**Eligibility Score:** ${rec.eligibilityScore}%`);
    lines.push('');
    lines.push(`| Detail | Information |`);
    lines.push(`|--------|-------------|`);
    lines.push(`| Scheme ID | ${rec.scheme.scheme_id} |`);
    lines.push(`| Level | ${rec.scheme.level} |`);
    lines.push(`| Category | ${rec.scheme.category} |`);
    lines.push(`| Target Group | ${rec.scheme.target_group} |`);
    lines.push(`| Benefits | ${rec.scheme.benefits} |`);
    lines.push(`| Last Updated | ${rec.scheme.last_updated} |`);
    if (rec.scheme.deadline) {
      lines.push(`| Deadline | ${rec.scheme.deadline} |`);
    }
    lines.push('');
    lines.push('**Why You Are Eligible:**');
    for (const reason of rec.reasons) {
      lines.push(`- ${reason}`);
    }
    lines.push('');
    if (rec.alerts.length > 0) {
      lines.push('**Alerts:**');
      for (const alert of rec.alerts) {
        const icon = alert.priority === 'high' ? '🔴' : alert.priority === 'medium' ? '🟡' : '🟢';
        lines.push(`- ${icon} ${alert.message}`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  lines.push('## Disclaimer');
  lines.push('');
  lines.push('> This recommendation is generated by an AI system based on the provided data and eligibility criteria.');
  lines.push('> Actual eligibility may vary based on additional documentation and verification requirements.');
  lines.push('> Please visit the official scheme portals or nearest government office for final confirmation.');
  lines.push('> The dataset is updated periodically and may not reflect the most recent changes.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('*Powered by SchemeAssist AI | Civora Nexus AID105 Project*');

  return lines.join('\n');
}
