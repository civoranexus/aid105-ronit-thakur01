// Type definitions for SchemeAssist AI

export interface UserProfile {
  state: string;
  age: number;
  annualIncome: number;
  category: string;
  gender?: 'Male' | 'Female' | 'Other';
}

export interface Scheme {
  scheme_id: string;
  scheme_name: string;
  level: 'Central' | 'State';
  state: string;
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

export interface RecommendationResult {
  scheme: Scheme;
  eligibilityScore: number;
  reasons: string[];
  alerts: Alert[];
}

export interface Alert {
  type: 'high_eligibility' | 'deadline_approaching' | 'new_scheme' | 'perfect_match';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RecommendationReport {
  generatedAt: string;
  userProfile: UserProfile;
  totalSchemesAnalyzed: number;
  eligibleSchemesCount: number;
  recommendations: RecommendationResult[];
  summary: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
