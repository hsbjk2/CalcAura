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
 * CalcAura theme for Clerk prebuilt components (SignIn, SignUp, UserButton).
 * Ink, stone paper and the one chartreuse signal — no gradients.
 */
export function getClerkAppearance(darkMode = false) {
  return {
    layout: {
      socialButtonsPlacement: 'top' as const,
      socialButtonsVariant: 'blockButton' as const,
      logoPlacement: 'inside' as const,
    },
    variables: {
      colorPrimary: darkMode ? '#c9f04e' : '#0a0c09',
      colorPrimaryText: darkMode ? '#0a0c09' : '#e8e9e2',
      colorText: darkMode ? '#e8e9e2' : '#0a0c09',
      colorTextSecondary: darkMode ? '#a6ac9c' : '#555b4e',
      colorBackground: darkMode ? '#11140f' : '#e8e9e2',
      colorInputBackground: darkMode ? '#191d16' : '#dde0d5',
      colorInputText: darkMode ? '#e8e9e2' : '#0a0c09',
      colorNeutral: darkMode ? '#e8e9e2' : '#0a0c09',
      borderRadius: '0.5rem',
      fontFamily: 'Jost, Noto Sans Devanagari, Noto Sans JP, system-ui, sans-serif',
      fontSize: '0.94rem',
    },
    elements: {
      card: darkMode
        ? 'bg-[#11140f] border border-[#e8e9e2]/15 rounded-lg'
        : 'bg-[#e8e9e2] border border-[#0a0c09]/15 rounded-lg',
      headerTitle: 'font-normal text-xl tracking-tight',
      headerSubtitle: 'text-sm text-[#555b4e]',
      formButtonPrimary:
        'bg-[#c9f04e] hover:bg-[#b6e22f] active:scale-[0.99] text-[#0a0c09] font-semibold py-2.5 rounded-full transition-colors',
      socialButtonsBlockButton: darkMode
        ? 'bg-transparent hover:bg-[#e8e9e2]/[0.08] border border-[#e8e9e2]/15 text-[#e8e9e2] rounded-full py-2.5'
        : 'bg-transparent hover:bg-[#0a0c09]/[0.05] border border-[#0a0c09]/15 text-[#0a0c09] rounded-full py-2.5',
      formFieldInput: darkMode
        ? 'bg-[#191d16] border-[#e8e9e2]/15 text-[#e8e9e2] focus:border-[#c9f04e] rounded-md'
        : 'bg-[#dde0d5] border-[#0a0c09]/15 text-[#0a0c09] focus:border-[#0a0c09] rounded-md',
      footerActionLink: darkMode
        ? 'text-[#c9f04e] hover:text-[#b6e22f] font-medium'
        : 'text-[#4f6900] hover:text-[#0a0c09] font-medium',
      userButtonPopoverCard: darkMode
        ? 'bg-[#11140f] border border-[#e8e9e2]/15'
        : 'bg-[#e8e9e2] border border-[#0a0c09]/15',
    },
  };
}
