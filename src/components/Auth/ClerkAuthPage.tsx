import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { ArrowLeft, ShieldCheck, Sparkles, KeyRound, Info, ExternalLink } from 'lucide-react';
import { isClerkConfigured, getClerkAppearance } from '../../lib/clerkConfig.ts';
import { useAuth, PRESET_DEMO_USERS } from '../../context/AuthContext.tsx';

interface ClerkAuthPageProps {
  mode: 'sign-in' | 'sign-up';
  onNavigateHome: () => void;
  onNavigateHistory: () => void;
  onSwitchMode: (mode: 'sign-in' | 'sign-up') => void;
  darkMode?: boolean;
}

export const ClerkAuthPage: React.FC<ClerkAuthPageProps> = ({
  mode,
  onNavigateHome,
  onNavigateHistory,
  onSwitchMode,
  darkMode = true,
}) => {
  const { isClerkActive, loginAsDemo } = useAuth();
  const clerkConfigured = isClerkConfigured();

  const handleDemoLogin = async (id: string) => {
    await loginAsDemo(id);
    onNavigateHistory();
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative animate-in fade-in duration-300">
      {/* Return to home button */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-semibold text-slate-700 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to CalcAura</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Clerk + Supabase Vault</span>
        </div>
      </div>

      {/* Main Auth Container */}
      <div className="w-full max-w-md flex flex-col items-center">
        {clerkConfigured ? (
          <div className="w-full flex justify-center shadow-2xl rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E101D]">
            {mode === 'sign-in' ? (
              <SignIn
                routing="hash"
                appearance={getClerkAppearance(darkMode)}
                fallbackRedirectUrl="/history"
                signUpUrl="#/sign-up"
              />
            ) : (
              <SignUp
                routing="hash"
                appearance={getClerkAppearance(darkMode)}
                fallbackRedirectUrl="/history"
                signInUrl="#/sign-in"
              />
            )}
          </div>
        ) : (
          /* Live Clerk Setup Banner with 1-click Demo Profiles */
          <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0E101D] border border-slate-200 dark:border-white/12 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#7957F5] to-[#D94BCB] p-0.5 flex items-center justify-center shadow-[0_0_24px_rgba(121,87,245,0.4)]">
                <div className="w-full h-full bg-white dark:bg-[#0E101D] rounded-[14px] flex items-center justify-center font-mono font-bold text-lg text-[#7957F5] dark:text-white">
                  ∑
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {mode === 'sign-in' ? 'Sign In to CalcAura' : 'Create CalcAura Account'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-[#A6A9B8] max-w-sm mx-auto leading-relaxed">
                Single sign-on powered by Clerk identity with encrypted Supabase data isolation.
              </p>
            </div>

            {/* Quick Demo Access */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Demo Sign In</span>
                </span>
                <span className="text-[10px] text-slate-400">1-Click</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {PRESET_DEMO_USERS.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoLogin(demo.id)}
                    className="p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-[#7957F5]/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{demo.avatar}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#7957F5] dark:group-hover:text-[#D94BCB] transition-colors">
                          {demo.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{demo.email}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      {demo.grade?.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clerk Keys Setup Notice */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-[#7957F5]/10 border border-[#7957F5]/30 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#7957F5] dark:text-[#D94BCB]">
                <KeyRound className="w-4 h-4" />
                <span>Live Clerk Authentication Ready</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                CalcAura is integrated with official Clerk React SDK. Set{' '}
                <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/30 font-mono text-[10px] text-[#7957F5] dark:text-[#D94BCB]">
                  VITE_CLERK_PUBLISHABLE_KEY
                </code>{' '}
                in your environment to replace this preview with Clerk&apos;s live Google OAuth, Email verification & User management.
              </p>
            </div>

            {/* Switch between sign-in and sign-up */}
            <div className="text-center text-xs text-slate-500 dark:text-[#A6A9B8]">
              {mode === 'sign-in' ? (
                <span>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => onSwitchMode('sign-up')}
                    className="font-bold text-[#7957F5] dark:text-[#D94BCB] hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => onSwitchMode('sign-in')}
                    className="font-bold text-[#7957F5] dark:text-[#D94BCB] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
