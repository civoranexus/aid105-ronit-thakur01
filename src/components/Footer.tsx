export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">About SchemeAssist AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              SchemeAssist AI is an intelligent government scheme recommendation system designed to help citizens
              discover eligible welfare programs based on their profile. Powered by data-driven AI logic.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">v1.0.0</span>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">AID105 Project</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Scheme Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  AI Logic Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Important Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Important Information</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-3">
                <strong className="text-orange-400">Dataset:</strong> Contains 70+ central and state government schemes
              </p>
              <p className="text-gray-400 text-sm mb-3">
                <strong className="text-orange-400">Coverage:</strong> 11 categories across 20+ states
              </p>
              <p className="text-gray-400 text-sm">
                <strong className="text-orange-400">Last Updated:</strong> March 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-orange-400 font-semibold mb-1">Important Disclaimer</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This is an AI-powered recommendation system developed for educational and demonstration purposes as part of the 
                  <strong className="text-white"> Civora Nexus AID105</strong> internship project. The recommendations are based on 
                  publicly available scheme information and eligibility criteria. <strong className="text-white">Actual eligibility may vary</strong> based 
                  on additional documentation requirements and verification processes. For official and up-to-date information, 
                  please visit the respective government portals or contact the nearest government office. The creators of this 
                  system are not liable for any decisions made based on these recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-blue-900"></div>
                </div>
                <span className="text-sm font-medium">SchemeAssist AI</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-sm text-gray-500">Civora Nexus AID105 Project</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                © {new Date().getFullYear()} SchemeAssist AI. For demonstration purposes only.
              </span>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Built with React • TypeScript • Tailwind CSS • Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
