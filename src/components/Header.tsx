import { cn } from '@/utils/cn';

interface HeaderProps {
  className?: string;
  onAboutClick?: () => void;
}

export function Header({ className, onAboutClick }: HeaderProps) {
  return (
    <header className={cn("bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg", className)}>
      {/* Top Government Banner */}
      <div className="bg-orange-500 py-1">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs font-medium">
          <span>🇮🇳 Government of India Initiative</span>
          <span>Civora Nexus AID105 Project</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Ashoka Chakra Inspired Logo */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-900" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                      <line
                        key={i}
                        x1="12"
                        y1="12"
                        x2={12 + 7 * Math.cos((angle * Math.PI) / 180)}
                        y2={12 + 7 * Math.sin((angle * Math.PI) / 180)}
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                SchemeAssist AI
              </h1>
              <p className="text-blue-200 text-sm md:text-base">
                Government Scheme Recommendation System
              </p>
            </div>
          </div>

          {/* Status Badge and About Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-100">AI Engine Active</span>
            </div>
            {onAboutClick && (
              <button
                onClick={onAboutClick}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 py-1.5 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">About</span>
              </button>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-4 text-center md:text-left">
          <p className="text-blue-100 text-sm md:text-base italic">
            "Empowering citizens with data-driven scheme recommendations"
          </p>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
    </header>
  );
}
