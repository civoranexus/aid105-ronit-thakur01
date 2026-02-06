import { useState } from 'react';
import { cn } from '@/utils/cn';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'dataset'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">About SchemeAssist AI</h2>
              <p className="text-blue-200 text-sm">Documentation & AI Logic</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'ai', label: 'AI Logic', icon: '🤖' },
              { id: 'dataset', label: 'Dataset Info', icon: '📊' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Project Overview</h3>
                <p className="text-gray-600 leading-relaxed">
                  SchemeAssist AI is an intelligent government scheme recommendation system developed as part of 
                  the <strong>Civora Nexus AID105 Internship Project</strong>. It helps Indian citizens discover 
                  welfare programs they may be eligible for based on their profile.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'User Profile Module', desc: 'Collect state, age, income, and category preferences' },
                    { title: 'AI Recommendation Engine', desc: 'Data-driven eligibility matching with scoring' },
                    { title: 'Smart Alerts', desc: 'Deadline warnings, new schemes, high eligibility alerts' },
                    { title: 'Report Generation', desc: 'Downloadable recommendation reports in Markdown' },
                    { title: '70+ Schemes', desc: 'Central and State government schemes database' },
                    { title: 'Explainable Results', desc: 'Clear reasons for each recommendation' }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Categories Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    '🌾 Agriculture', '📚 Education', '🏥 Health', '🏠 Housing',
                    '💼 Business', '👩 Women Welfare', '👴 Senior Citizen',
                    '♿ Disability', '🎯 Skill Development', '🛡️ Social Security', '🍚 Food Security'
                  ].map(cat => (
                    <span key={cat} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {cat}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Eligibility Score Algorithm</h3>
                <p className="text-gray-600 mb-4">
                  The AI engine calculates an eligibility score (0-100) based on four weighted components:
                </p>
                <div className="space-y-4">
                  {[
                    { 
                      name: 'Age Match', 
                      points: '30 points max',
                      desc: 'Base 25 points if within age range, +5 bonus for optimal age position'
                    },
                    { 
                      name: 'Income Match', 
                      points: '40 points max',
                      desc: 'Base 30 points if within income range, +10 bonus for lower income (higher need)'
                    },
                    { 
                      name: 'State Match', 
                      points: '25 points max',
                      desc: 'Base 20 points for Central or matching state, +5 for state-specific schemes'
                    },
                    { 
                      name: 'Category Match', 
                      points: '25 points max',
                      desc: 'Full 25 points for exact match, 10 points for related categories'
                    }
                  ].map((component, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{component.name}</h4>
                        <span className="text-sm font-medium text-blue-600 bg-white px-2 py-1 rounded">
                          {component.points}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{component.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Score Categories</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Score Range</th>
                        <th className="px-4 py-2 text-left">Label</th>
                        <th className="px-4 py-2 text-left">Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t"><td className="px-4 py-2 font-medium text-green-600">90-100%</td><td>Perfect Match</td><td>Meets all criteria optimally</td></tr>
                      <tr className="border-t"><td className="px-4 py-2 font-medium text-blue-600">75-89%</td><td>Highly Eligible</td><td>Strong candidate</td></tr>
                      <tr className="border-t"><td className="px-4 py-2 font-medium text-yellow-600">60-74%</td><td>Eligible</td><td>Meets basic requirements</td></tr>
                      <tr className="border-t"><td className="px-4 py-2 font-medium text-gray-600">50-59%</td><td>Partial Match</td><td>Worth exploring</td></tr>
                      <tr className="border-t"><td className="px-4 py-2 font-medium text-red-600">&lt;50%</td><td>Not Shown</td><td>Below threshold</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Explainability</h3>
                <p className="text-gray-600">
                  Every recommendation includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Quantified eligibility score</li>
                  <li>Human-readable reasons for eligibility</li>
                  <li>Contextual alerts (deadlines, new schemes)</li>
                  <li>Full scheme details for verification</li>
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'dataset' && (
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Dataset Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-700">70+</p>
                    <p className="text-sm text-blue-600">Total Schemes</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">11</p>
                    <p className="text-sm text-green-600">Categories</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-700">20+</p>
                    <p className="text-sm text-purple-600">States Covered</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-amber-700">2024</p>
                    <p className="text-sm text-amber-600">Last Updated</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Scheme Data Structure</h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm"><code>{`{
  scheme_id: "AGR001",
  scheme_name: "PM-KISAN Samman Nidhi",
  level: "Central",
  state: "All",
  category: "Agriculture",
  min_age: 18,
  max_age: 80,
  min_income: 0,
  max_income: 200000,
  target_group: "Small and Marginal Farmers",
  benefits: "₹6,000 per year in three installments",
  is_active: true,
  last_updated: "2024-01-15",
  deadline: "2024-07-31",  // Optional
  is_new: false            // Optional
}`}</code></pre>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Updating the Dataset</h3>
                <p className="text-gray-600 mb-4">
                  The dataset is stored in <code className="bg-gray-100 px-2 py-0.5 rounded">src/data/schemes.ts</code> and can be updated without code changes:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Add new schemes following the existing schema</li>
                  <li>Update benefits, dates, and eligibility criteria</li>
                  <li>Set <code>is_active: false</code> for discontinued schemes</li>
                  <li>Add <code>is_new: true</code> for newly launched schemes</li>
                  <li>Add <code>deadline</code> for time-sensitive applications</li>
                </ul>
              </section>

              <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2">⚠️ Data Disclaimer</h3>
                <p className="text-sm text-amber-700">
                  The scheme data is for demonstration purposes and may not reflect the most current information. 
                  Always verify eligibility and details through official government portals before applying.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <span className="text-sm text-gray-500">Civora Nexus AID105 Project</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
