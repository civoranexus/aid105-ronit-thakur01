import { getSchemeStats } from '@/utils/recommender';

export function Stats() {
  const stats = getSchemeStats();

  const topCategories = Object.entries(stats.categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Database Statistics
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{stats.totalSchemes}</p>
            <p className="text-sm text-blue-600">Total Active Schemes</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-700">{stats.newSchemes}</p>
            <p className="text-sm text-green-600">Newly Added</p>
          </div>
        </div>

        {/* Level Distribution */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Scheme Distribution</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-600">Central</div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(stats.levelCounts.Central / stats.totalSchemes) * 100}%` }}
                />
              </div>
              <div className="w-8 text-sm font-medium text-gray-700">{stats.levelCounts.Central}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 text-sm text-gray-600">State</div>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(stats.levelCounts.State / stats.totalSchemes) * 100}%` }}
                />
              </div>
              <div className="w-8 text-sm font-medium text-gray-700">{stats.levelCounts.State}</div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Categories</h3>
          <div className="space-y-2">
            {topCategories.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-700">{category}</span>
                <span className="text-sm font-semibold text-gray-900 bg-white px-2 py-0.5 rounded">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Dataset is updated periodically. {stats.schemesWithDeadlines} schemes have approaching deadlines.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
