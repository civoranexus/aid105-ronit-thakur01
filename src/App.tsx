import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserProfileForm } from '@/components/UserProfileForm';
import { RecommendationResults } from '@/components/RecommendationResults';
import { Stats } from '@/components/Stats';
import { HowItWorks } from '@/components/HowItWorks';
import { generateReport } from '@/utils/recommender';
import type { UserProfile, RecommendationReport } from '@/types';

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<RecommendationReport | null>(null);

  const handleSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    
    // Simulate AI processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = generateReport(profile);
    setReport(result);
    setIsLoading(false);
    
    // Scroll to results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setReport(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Only show when no results */}
        {!report && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">AI-Powered • 70+ Schemes • Instant Results</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Government Schemes
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Made For You
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your profile and let our AI recommend the best central and state government 
              welfare schemes based on your eligibility criteria.
            </p>
          </div>
        )}

        {/* Main Content */}
        {report ? (
          <RecommendationResults report={report} onReset={handleReset} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <UserProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
              
              {/* Quick Stats for Mobile */}
              <div className="lg:hidden mt-8">
                <Stats />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <HowItWorks />
              <div className="hidden lg:block">
                <Stats />
              </div>
              
              {/* Featured Categories */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Scheme Categories
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Agriculture', icon: '🌾', count: 12 },
                      { name: 'Education', icon: '📚', count: 18 },
                      { name: 'Health', icon: '🏥', count: 10 },
                      { name: 'Housing', icon: '🏠', count: 6 },
                      { name: 'Business', icon: '💼', count: 8 },
                      { name: 'Women Welfare', icon: '👩', count: 8 },
                      { name: 'Senior Citizen', icon: '👴', count: 4 },
                      { name: 'Skill Dev', icon: '🎯', count: 4 }
                    ].map(cat => (
                      <div key={cat.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-xl">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">{cat.name}</p>
                          <p className="text-xs text-gray-500">{cat.count} schemes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Please Note</h3>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      This system provides AI-based recommendations. For final eligibility verification, 
                      please visit official government portals or your nearest CSC center.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Schemes...</h3>
              <p className="text-gray-600 mb-4">Our AI is matching your profile against 70+ government schemes</p>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Calculating eligibility scores...</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
