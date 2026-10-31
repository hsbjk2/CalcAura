/**
 * Clerk Authentication Configuration for CalcAura
 */

export const CLERK_PUBLISHABLE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY) ||
  '';

/**
 * Checks if a real, valid Clerk publishable key is configured.
 * Must start with 'pk_test_' or 'pk_live_' and not be a placeholder.
 */
export function isClerkConfigured(): boolean {
  if (!CLERK_PUBLISHABLE_KEY) return false;
  const key = CLERK_PUBLISHABLE_KEY.trim();
  if (
    key === 'pk_test_your_clerk_publishable_key_here' ||
    key === 'MY_CLERK_PUBLISHABLE_KEY' ||
    key.length < 20
  ) {
    return false;
  }
  return key.startsWith('pk_test_') || key.startsWith('pk_live_');
}

/**
 * CalcAura Theme for Clerk Prebuilt Components (SignIn, SignUp, UserButton)
 */
export function getClerkAppearance(darkMode = true) {
  return {
    layout: {
      socialButtonsPlacement: 'top' as const,
      socialButtonsVariant: 'blockButton' as const,
      logoPlacement: 'inside' as const,
    },
    variables: {
      colorPrimary: '#7957F5',
      colorText: darkMode ? '#F6F7FB' : '#0F172A',
      colorTextSecondary: darkMode ? '#A6A9B8' : '#64748B',
      colorBackground: darkMode ? '#0E101D' : '#FFFFFF',
      colorInputBackground: darkMode ? '#181A2A' : '#F8FAFC',
      colorInputText: darkMode ? '#FFFFFF' : '#0F172A',
      colorNeutral: darkMode ? '#F6F7FB' : '#0F172A',
      borderRadius: '0.75rem',
      fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
      fontSize: '0.875rem',
    },
    elements: {
      card: darkMode
        ? 'bg-[#0E101D] border border-white/10 shadow-2xl rounded-2xl'
        : 'bg-white border border-slate-200 shadow-xl rounded-2xl',
      headerTitle: 'font-bold text-lg tracking-tight',
      headerSubtitle: 'text-xs text-slate-400',
      formButtonPrimary:
        'bg-gradient-to-r from-[#7957F5] to-[#D94BCB] hover:brightness-110 active:scale-[0.98] text-white font-semibold shadow-md py-2.5 rounded-xl transition-all',
      socialButtonsBlockButton: darkMode
        ? 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl py-2.5'
        : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-xl py-2.5',
      formFieldInput: darkMode
        ? 'bg-[#181A2A] border-white/12 text-white focus:border-[#7957F5] rounded-xl'
        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#7957F5] rounded-xl',
      footerActionLink: 'text-[#7957F5] hover:text-[#D94BCB] font-semibold',
      userButtonPopoverCard: darkMode
        ? 'bg-[#0E101D] border border-white/12 shadow-2xl'
        : 'bg-white border border-slate-200 shadow-2xl',
    },
  };
}
