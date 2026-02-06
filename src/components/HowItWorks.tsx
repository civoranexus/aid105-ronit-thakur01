export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Enter Your Profile",
      description: "Provide your state, age, annual income, and category of interest",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600"
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our engine analyzes 70+ schemes against your eligibility criteria",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-600"
    },
    {
      number: 3,
      title: "Score & Rank",
      description: "Each scheme receives an eligibility score based on multiple factors",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-600"
    },
    {
      number: 4,
      title: "Get Recommendations",
      description: "View personalized scheme recommendations with detailed explanations",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          How It Works
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-start gap-4">
              {/* Step Number */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                {step.icon}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  <span className="text-gray-400 text-sm mr-2">Step {step.number}</span>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-5 mt-10 w-0.5 h-12 bg-gray-200 hidden"></div>
              )}
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Features</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Data-Driven Logic
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              70+ Schemes
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Explainable AI
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Smart Alerts
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Report Export
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              Mobile Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
