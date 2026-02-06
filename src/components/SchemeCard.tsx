import { cn } from '@/utils/cn';
import type { RecommendationResult } from '@/types';

interface SchemeCardProps {
  recommendation: RecommendationResult;
  rank: number;
}

export function SchemeCard({ recommendation, rank }: SchemeCardProps) {
  const { scheme, eligibilityScore, reasons, alerts } = recommendation;

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 75) return 'from-blue-500 to-indigo-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Perfect Match';
    if (score >= 75) return 'Highly Eligible';
    if (score >= 60) return 'Eligible';
    return 'Partial Match';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Agriculture': '🌾',
      'Education': '📚',
      'Health': '🏥',
      'Housing': '🏠',
      'Business': '💼',
      'Women Welfare': '👩',
      'Senior Citizen': '👴',
      'Disability': '♿',
      'Skill Development': '🎯',
      'Social Security': '🛡️',
      'Food Security': '🍚'
    };
    return icons[category] || '📋';
  };

  const getLevelBadge = (level: string) => {
    if (level === 'Central') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Central Govt
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
        State Govt
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header */}
      <div className="relative">
        {/* Rank Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg",
            rank === 1 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" :
            rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-500" :
            rank === 3 ? "bg-gradient-to-br from-orange-400 to-orange-600" :
            "bg-gradient-to-br from-blue-400 to-blue-600"
          )}>
            #{rank}
          </div>
        </div>

        {/* Score Circle */}
        <div className="absolute top-4 right-4 z-10">
          <div className={cn(
            "w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg bg-gradient-to-br",
            getScoreColor(eligibilityScore)
          )}>
            <span className="text-lg font-bold">{eligibilityScore}%</span>
            <span className="text-[10px] opacity-90">Score</span>
          </div>
        </div>

        {/* Header Background */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 pt-6 pb-4">
          <div className="flex items-start gap-3 pr-20">
            <span className="text-3xl">{getCategoryIcon(scheme.category)}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                {scheme.scheme_name}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {getLevelBadge(scheme.level)}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                  {scheme.category}
                </span>
                {scheme.is_new && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                    ✨ New
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
          <div className="space-y-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  alert.priority === 'high' ? 'text-red-700' :
                  alert.priority === 'medium' ? 'text-orange-700' :
                  'text-green-700'
                )}
              >
                <span className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                  alert.priority === 'high' ? 'bg-red-100' :
                  alert.priority === 'medium' ? 'bg-orange-100' :
                  'bg-green-100'
                )}>
                  {alert.type === 'deadline_approaching' ? '⏰' :
                   alert.type === 'new_scheme' ? '🆕' :
                   alert.type === 'perfect_match' ? '⭐' : '✓'}
                </span>
                <span className="font-medium">{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="px-6 py-4 space-y-4">
        {/* Eligibility Label */}
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold",
            eligibilityScore >= 90 ? 'bg-green-100 text-green-800' :
            eligibilityScore >= 75 ? 'bg-blue-100 text-blue-800' :
            eligibilityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          )}>
            {getScoreLabel(eligibilityScore)}
          </span>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Benefits
          </h4>
          <p className="text-gray-600 text-sm bg-green-50 rounded-lg p-3 border border-green-100">
            {scheme.benefits}
          </p>
        </div>

        {/* Target Group */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Target Group
          </h4>
          <p className="text-gray-600 text-sm">{scheme.target_group}</p>
        </div>

        {/* Eligibility Reasons */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Why You Are Eligible
          </h4>
          <ul className="space-y-1">
            {reasons.slice(0, 4).map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scheme Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Age Range</p>
            <p className="text-sm font-semibold text-gray-800">{scheme.min_age} - {scheme.max_age} years</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Income Limit</p>
            <p className="text-sm font-semibold text-gray-800">Up to ₹{(scheme.max_income / 100000).toFixed(1)}L</p>
          </div>
          {scheme.state !== 'All' && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">State</p>
              <p className="text-sm font-semibold text-gray-800">{scheme.state}</p>
            </div>
          )}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Last Updated</p>
            <p className="text-sm font-semibold text-gray-800">{scheme.last_updated}</p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
        <span className="text-xs text-gray-500">ID: {scheme.scheme_id}</span>
        <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          Learn More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
