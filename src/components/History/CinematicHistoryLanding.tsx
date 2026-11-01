import React from 'react';
import {
  Lock,
  ArrowRight,
  BookOpen,
  Layout,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface CinematicHistoryLandingProps {
  onSignIn: () => void;
  onRegister: () => void;
}

export const CinematicHistoryLanding: React.FC<CinematicHistoryLandingProps> = ({
  onSignIn,
  onRegister,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#07080D] text-white overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Background Lighting & Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-b from-[#7957F5]/20 via-[#D94BCB]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#7957F5]/10 blur-[130px] rounded-full" />
        {/* Fine mathematical grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Top Eyebrow Pill */}
        <div className="flex justify-center mb-6 sm:mb-8 animate-in fade-in duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-[11px] font-mono tracking-wider text-slate-300 shadow-[0_0_20px_rgba(121,87,245,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Lock className="w-3.5 h-3.5 text-[#D94BCB]" />
            <span className="uppercase font-semibold">CalcAura Private Vault · Login Required</span>
          </div>
        </div>

        {/* Hero Title & Kinetic Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-[1.12]">
            <span className="block text-slate-100">Your Work.</span>
            <span className="block bg-gradient-to-r from-[#7957F5] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
              Always Within Reach.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Keep your learning progress and saved whiteboards together in one personal workspace.
            Sign in to revisit your submitted solutions, proofs, and creative boards whenever you need them.
          </p>

          {/* Action Button Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-[0_0_30px_rgba(121,87,245,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRegister}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/12 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Free Account</span>
            </button>


          </div>
        </div>

        {/* ================= 3D LAYERED PREVIEWS COMPOSITION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          {/* COMPOSITION 1: Interactive Practice Sheets Preview */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-1 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[#7957F5]/40 hover:shadow-[0_15px_50px_rgba(121,87,245,0.2)]">
            <div className="h-full rounded-[22px] bg-[#0E101D]/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative">
              {/* Sample Watermark Seal */}
              <div className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Sample Report
              </div>

              <div>
                {/* Header info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#7957F5]/20 border border-[#7957F5]/30 flex items-center justify-center text-[#7957F5]">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold block">
                      Category 1 · Interactive Practice
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Class 10th · Quadratic Equations
                    </h3>
                  </div>
                </div>

                {/* Score & Timing Card */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/8 mb-4">
                  <div className="text-center p-1.5 rounded-xl bg-white/[0.02]">
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-400">18 / 20</div>
                    <div className="text-[10px] text-slate-400">Score (90%)</div>
                  </div>
                  <div className="text-center p-1.5 rounded-xl bg-white/[0.02]">
                    <div className="text-xs sm:text-sm font-extrabold text-white">18 Correct</div>
                    <div className="text-[10px] text-emerald-400/80">2 Wrong</div>
                  </div>
                  <div className="text-center p-1.5 rounded-xl bg-white/[0.02]">
                    <div className="text-xs sm:text-sm font-extrabold text-purple-300">12m 45s</div>
                    <div className="text-[10px] text-slate-400">Time Taken</div>
                  </div>
                </div>

                {/* Question Preview Simulation */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/6 space-y-2 mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-400 font-bold">Q1 Review Preview</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> Correct Choice
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    Find the roots of the quadratic equation: 2x² - 7x + 3 = 0
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                    <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 font-semibold flex items-center justify-between">
                      <span>A. x = 3, x = 1/2</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400">
                      <span>B. x = -3, x = -1/2</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#7957F5]/10 border border-[#7957F5]/20 text-[10px] text-purple-200">
                    <span className="font-bold text-[#C084FC]">Explanation:</span> Factorize 2x² - 6x - x + 3 = 0 → (2x - 1)(x - 3) = 0.
                  </div>
                </div>
              </div>

              {/* Bottom Feature Caption */}
              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Submitted after full test completion</span>
                </span>
                <span className="text-purple-300 font-semibold flex items-center gap-0.5">
                  <span>Sign in to unlock</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* COMPOSITION 2: Saved Whiteboards Preview */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-1 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[#D94BCB]/40 hover:shadow-[0_15px_50px_rgba(217,75,203,0.2)]">
            <div className="h-full rounded-[22px] bg-[#0E101D]/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative">
              {/* Sample Watermark Seal */}
              <div className="absolute top-4 right-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Sample Board
              </div>

              <div>
                {/* Header info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D94BCB]/20 border border-[#D94BCB]/30 flex items-center justify-center text-[#D94BCB]">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-semibold block">
                      Category 2 · Saved Whiteboards
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Calculus, Vectors & Coordinate Proofs
                    </h3>
                  </div>
                </div>

                {/* Whiteboard Canvas Visual Simulation */}
                <div className="p-3.5 rounded-2xl bg-[#090A12] border border-white/8 space-y-3 mb-4 relative overflow-hidden">
                  {/* Fake sheet tabs */}
                  <div className="flex items-center gap-1.5 pb-2 border-b border-white/6 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-[#7957F5]/30 text-white font-bold border border-[#7957F5]/40">
                      Sheet 1: Vector Field
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400">
                      Sheet 2: Trigonometry
                    </span>
                    <span className="text-slate-500">+1 more</span>
                  </div>

                  {/* Visual canvas art with vector formulas & coordinate grid */}
                  <div className="h-32 rounded-xl bg-gradient-to-br from-[#121424] to-[#0A0C16] border border-white/5 p-3 flex flex-col justify-between relative overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 300 120">
                      <line x1="20" y1="90" x2="280" y2="90" stroke="#7957F5" strokeWidth="1" />
                      <line x1="60" y1="10" x2="60" y2="110" stroke="#7957F5" strokeWidth="1" />
                      <path
                        d="M 60 90 Q 140 10 220 90 T 280 40"
                        fill="none"
                        stroke="#D94BCB"
                        strokeWidth="2.5"
                      />
                      <circle cx="140" cy="50" r="4" fill="#10B981" />
                      <text x="150" y="45" fill="#10B981" fontSize="10" fontFamily="monospace">
                        Tangent (x₀, y₀)
                      </text>
                    </svg>

                    <div className="relative z-10 flex items-start justify-between">
                      <span className="text-[11px] font-mono font-bold text-purple-300 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        e^(iπ) + 1 = 0
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-black/40 px-2 py-0.5 rounded-md">
                        3 Sheets · 28 Layer Objects
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span>Manual Save Required</span>
                      <span className="text-slate-400">Today, 10:15 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Caption */}
              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-pink-400" />
                  <span>Manual Save Only · No Draft Clutter</span>
                </span>
                <span className="text-pink-300 font-semibold flex items-center gap-0.5">
                  <span>Sign in to restore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Isolation Assurance Footer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Private By Default & Client Isolated</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Your history is strictly associated with your user session. Zero unauthorized access.
              </p>
            </div>
          </div>

          <button
            onClick={onSignIn}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            Authenticate Now
          </button>
        </div>
      </div>
    </div>
  );
};
