import { useState } from 'react';
import { cn } from '@/utils/cn';
import { SchemeCard } from './SchemeCard';
import { exportReportAsMarkdown } from '@/utils/recommender';
import type { RecommendationReport } from '@/types';

interface RecommendationResultsProps {
  report: RecommendationReport;
  onReset: () => void;
}

export function RecommendationResults({ report, onReset }: RecommendationResultsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [showReport, setShowReport] = useState(false);

  // Get unique categories from recommendations
  const categories = Array.from(new Set(report.recommendations.map(r => r.scheme.category)));

  // Filter recommendations
  const filteredRecommendations = filter === 'all'
    ? report.recommendations
    : report.recommendations.filter(r => r.scheme.category === filter);

  // Count high-scoring recommendations
  const highScoreCount = report.recommendations.filter(r => r.eligibilityScore >= 80).length;
  const newSchemesCount = report.recommendations.filter(r => r.scheme.is_new).length;

  // Download report as markdown
  const handleDownloadReport = () => {
    const markdown = exportReportAsMarkdown(report);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SchemeAssist_Report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Recommendations Ready!</h2>
                <p className="text-green-100">Based on your profile analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Search
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{report.totalSchemesAnalyzed}</p>
                  <p className="text-xs text-blue-600">Schemes Analyzed</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">{report.eligibleSchemesCount}</p>
                  <p className="text-xs text-green-600">Eligible Schemes</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-700">{highScoreCount}</p>
                  <p className="text-xs text-amber-600">High Match (80%+)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">{newSchemesCount}</p>
                  <p className="text-xs text-purple-600">New Schemes</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Profile Summary
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm border border-gray-200">
                <span className="text-gray-500">State:</span>
                <span className="font-medium text-gray-800">{report.userProfile.state}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm border border-gray-200">
                <span className="text-gray-500">Age:</span>
                <span className="font-medium text-gray-800">{report.userProfile.age} years</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm border border-gray-200">
                <span className="text-gray-500">Income:</span>
                <span className="font-medium text-gray-800">₹{report.userProfile.annualIncome.toLocaleString()}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm border border-gray-200">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium text-gray-800">{report.userProfile.category}</span>
              </span>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">AI Analysis</h3>
                <p className="text-blue-700 text-sm">{report.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      {report.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600 mr-2">Filter by:</span>
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                filter === 'all'
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              All ({report.recommendations.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat} ({report.recommendations.filter(r => r.scheme.category === cat).length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation Cards */}
      {filteredRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((rec, idx) => (
            <SchemeCard
              key={rec.scheme.scheme_id}
              recommendation={rec}
              rank={filter === 'all' ? idx + 1 : idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Matching Schemes</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            No schemes found matching your current profile. Try adjusting your criteria or explore different categories.
          </p>
        </div>
      )}

      {/* View Full Report Button */}
      {report.recommendations.length > 0 && (
        <div className="text-center">
          <button
            onClick={() => setShowReport(!showReport)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {showReport ? 'Hide Full Report' : 'View Full Report'}
          </button>
        </div>
      )}

      {/* Full Report Modal */}
      {showReport && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Full Recommendation Report</h3>
            <button
              onClick={() => setShowReport(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg">
              {exportReportAsMarkdown(report)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
