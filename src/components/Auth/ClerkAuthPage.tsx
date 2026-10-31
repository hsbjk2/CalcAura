
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

import {
  isClerkConfigured,
  getClerkAppearance,
} from '../../lib/clerkConfig.ts';

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
  darkMode = true,
}) => {
  const clerkConfigured = isClerkConfigured();

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 relative animate-in fade-in duration-300">

      {/* Header */}
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
          <span>Secure Authentication</span>
        </div>

      </div>

      {/* Authentication Container */}
      <div className="w-full max-w-md flex flex-col items-center">

        {clerkConfigured ? (

          <div className="w-full flex justify-center shadow-2xl rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E101D]">

            {mode === 'sign-in' ? (

              <SignIn
  routing="hash"
  appearance={getClerkAppearance(darkMode)}
  forceRedirectUrl="/#/history"
  fallbackRedirectUrl="/#/history"
  signUpUrl="#/sign-up"
/>

            ) : (

              <SignUp
  routing="hash"
  appearance={getClerkAppearance(darkMode)}
  forceRedirectUrl="/#/history"
  fallbackRedirectUrl="/#/history"
  signInUrl="#/sign-in"
/>

            )}

          </div>

        ) : (

          /* Clerk Configuration Required */

          <div className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0E101D] border border-amber-300 dark:border-amber-500/30 shadow-2xl space-y-5">

            <div className="text-center space-y-3">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-amber-500" />
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Authentication Not Configured
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                CALCAURA uses Clerk for secure user authentication.
                Configure your Clerk Publishable Key to enable
                account creation and sign in.
              </p>

            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2">

              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Required environment variable
              </p>

              <code className="block text-xs text-[#7957F5] dark:text-[#D94BCB] break-all">
                VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
              </code>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add this variable to your .env.local file and
                configure the same key in your Vercel project settings.
                Restart or redeploy your application afterward.
              </p>

            </div>

            <button
              onClick={onNavigateHome}
              className="w-full py-3 rounded-xl bg-[#7957F5] hover:bg-[#6844E8] text-white text-sm font-semibold transition-colors"
            >
              Return to Home
            </button>

          </div>

        )}

      </div>

      {/* Footer */}
      <div className="mt-8 text-center space-y-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your account is protected by Clerk authentication.
        </p>

        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          CALCAURA · Built by HSBJK
        </p>
      </div>

    </div>
  );
};
