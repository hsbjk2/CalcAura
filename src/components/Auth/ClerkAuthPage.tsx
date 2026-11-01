import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { ArrowLeft, ShieldCheck, KeyRound, ExternalLink } from 'lucide-react';
import { isClerkConfigured, getClerkAppearance } from '../../lib/clerkConfig.ts';

interface ClerkAuthPageProps {
  mode: 'sign-in' | 'sign-up';
  onNavigateHome: () => void;
  onSwitchMode: (mode: 'sign-in' | 'sign-up') => void;
  darkMode?: boolean;
}

export const ClerkAuthPage: React.FC<ClerkAuthPageProps> = ({
  mode,
  onNavigateHome,
  onSwitchMode,
  darkMode = true,
}) => {
  const clerkConfigured = isClerkConfigured();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative animate-in fade-in duration-300">
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-xs font-semibold text-slate-700 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to CALCAURA</span>
        </button>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secure Clerk Account</span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        {clerkConfigured ? (
          <div className="w-full flex justify-center shadow-2xl rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E101D]">
            {mode === 'sign-in' ? (
              <SignIn
  routing="path"
  path="/sign-in"
  appearance={getClerkAppearance(darkMode)}
  forceRedirectUrl="/history"
  fallbackRedirectUrl="/history"
  signUpUrl="/sign-up"
/>
            ) : (
              <SignUp
  routing="path"
  path="/sign-up"
  appearance={getClerkAppearance(darkMode)}
  forceRedirectUrl="/history"
  fallbackRedirectUrl="/history"
  signInUrl="/sign-in"
/>
            )}
          </div>
        ) : (
          <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0E101D] border border-amber-300/60 dark:border-amber-400/20 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Clerk authentication is not configured
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                CALCAURA does not provide demo or local-only sign-in. Add your real Clerk publishable key to the environment before using account features.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-100">Required environment variable</div>
              <code className="block break-all text-[#7957F5]">VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code>
              <p className="text-slate-500 dark:text-slate-400">Set it in your local `.env.local` file and in Vercel → Project → Settings → Environment Variables, then restart or redeploy.</p>
            </div>
            <a
              href="https://dashboard.clerk.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7957F5] hover:text-[#D94BCB]"
            >
              Open Clerk Dashboard <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        <div className="mt-5 text-center text-xs text-slate-500 dark:text-[#A6A9B8]">
          {mode === 'sign-in' ? (
            <span>
              Don&apos;t have an account?{' '}
              <button onClick={() => onSwitchMode('sign-up')} className="font-bold text-[#7957F5] dark:text-[#D94BCB] hover:underline cursor-pointer">
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button onClick={() => onSwitchMode('sign-in')} className="font-bold text-[#7957F5] dark:text-[#D94BCB] hover:underline cursor-pointer">
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
