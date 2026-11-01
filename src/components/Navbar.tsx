import React, { useState, useEffect } from 'react';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  ArrowRight,
  PenTool,
  Compass,
  GraduationCap,
  History,
  LogIn,
  LogOut,
} from 'lucide-react';
import { Language, Translations } from '../i18n/translations.ts';
import { GlobalSearchDropdown } from './GlobalSearchDropdown.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { UserButton } from '@clerk/clerk-react';
import { getClerkAppearance } from '../lib/clerkConfig.ts';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAbout: () => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  t: Translations;
  isLandingView?: boolean;
  isAboutView?: boolean;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'ja', label: '日本語 (JA)', flag: 'JA' },
  { code: 'hi', label: 'हिन्दी (HI)', flag: 'HI' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  darkMode,
  onToggleDarkMode,
  onOpenAbout,
  currentLang,
  onSelectLang,
  t,
  isLandingView = true,
  isAboutView = false,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.navOverview },
    { id: 'playground', label: t.navPlayground },
    { id: 'about', label: t.navAbout },
    { id: 'whiteboard', label: t.navWhiteboard || 'Whiteboard', icon: PenTool },
    { id: 'history', label: t.navHistory || 'History', icon: History },
    { id: 'platform', label: t.workspace },
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'home') {
      onSelectTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about') {
      onSelectTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'whiteboard') {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch {}
      onSelectTab('whiteboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'how-it-works') {
      const el = document.getElementById('how-it-works');
      if (el && isLandingView) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onSelectTab('home');
        setTimeout(() => {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      onSelectTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 transition-all">
      {/* Floating Translucent Bar with light/dark adaptive styling */}
      <div
        id="navbar-main-bar"
        className={`relative z-50 w-full min-w-0 backdrop-blur-xl border rounded-2xl px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-3 transition-all ${
          isAboutView
            ? scrolledPastHero
              ? 'bg-white/50 dark:bg-[#200D25]/60 backdrop-blur-md border border-white/50 dark:border-pink-900/30 text-[#200D25] dark:text-[#FFF9FD] shadow-[0_4px_24px_rgba(53,19,51,0.06)]'
              : 'bg-white/35 dark:bg-[#200D25]/40 backdrop-blur-md border border-white/40 dark:border-pink-900/20 shadow-none text-[#200D25] dark:text-[#FFF9FD]'
            : scrolledPastHero
            ? 'bg-white/95 dark:bg-[#0E101D]/90 border-slate-300/80 dark:border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-white/85 dark:bg-[#111321]/80 border-slate-200/90 dark:border-white/12 shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Brand with small mathematical symbol */}
        <button
          onClick={() => {
            onSelectTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 sm:gap-2.5 text-left group shrink-0 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7957F5] rounded-lg cursor-pointer"
          aria-label="CalcAura Home"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-gradient-to-br from-[#7957F5]/25 to-[#D94BCB]/20 border border-[#7957F5]/40 flex items-center justify-center text-[#7957F5] dark:text-white font-mono font-bold text-sm shadow-[0_0_12px_rgba(121,87,245,0.25)]">
            <span>∑</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB] group-hover:text-[#7957F5] dark:group-hover:text-white transition-colors"
              CalcAura
            </span>
          </div>
        </button>

        {/* Desktop Single-Line Navigation */}
        <nav className="hidden xl:flex items-center gap-0.5 text-xs font-medium text-slate-600 dark:text-[#A6A9B8]">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7957F5] ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-semibold bg-slate-100 dark:bg-white/[0.08]'
                    : 'hover:text-slate-900 dark:hover:text-[#F6F7FB] hover:bg-slate-100/60 dark:hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.icon && <item.icon className="w-3.5 h-3.5 text-[#7957F5] dark:text-[#D94BCB]" />}
                  <span>{item.label}</span>
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#7957F5] to-[#D94BCB] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Language + Search + Theme + Prominent CTA */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-[11px] font-mono font-semibold text-slate-700 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-[#F6F7FB] border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer"
              title="Select Language"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#7957F5]" />
              <span>{currentLang.toUpperCase()}</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#111321] rounded-xl border border-slate-200 dark:border-white/12 shadow-2xl py-1 z-50 text-xs animate-in fade-in"
                onClick={() => setLangMenuOpen(false)}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onSelectLang(l.code)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer ${
                      currentLang === l.code
                        ? 'font-bold text-[#7957F5] dark:text-[#D94BCB]'
                        : 'text-slate-700 dark:text-[#A6A9B8]'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-[#A6A9B8]/70">
                      {l.flag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Premium Floating Global Search */}
          <GlobalSearchDropdown
            onSelectTab={onSelectTab}
            darkMode={darkMode}
          />

          {/* Theme Toggle - Light / Dark Mode Icon */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 dark:text-[#A6A9B8] dark:hover:text-[#F6F7FB] bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 dark:text-[#A6A9B8]" />
            )}
          </button>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={getClerkAppearance(darkMode)}
              />
            </div>
          ) : (
            <button
              onClick={() => onSelectTab('sign-in')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7957F5]/15 to-[#D94BCB]/15 hover:from-[#7957F5]/25 hover:to-[#D94BCB]/25 text-[#7957F5] dark:text-[#D94BCB] border border-[#7957F5]/30 text-xs font-bold transition-all cursor-pointer shrink-0"
              title="Sign in to your account"
              aria-label="Sign In"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}


          {/* Mobile Menu Hamburger (for screens < xl) - 3 lines icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] transition-colors cursor-pointer shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#7957F5]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 xl:hidden animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden relative z-50 mt-2 p-3 bg-white/95 dark:bg-[#111321]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/12 rounded-2xl shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7957F5]/15 to-[#D94BCB]/15 text-[#7957F5] dark:text-[#D94BCB] font-bold border border-[#7957F5]/30'
                    : 'text-slate-700 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4 text-[#7957F5] dark:text-[#D94BCB]" />}
                  <span>{item.label}</span>
                </span>
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-[#7957F5] dark:bg-[#D94BCB]" />
                ) : (
                  <span className="text-[10px] text-slate-400">→</span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-2">
            
{/* Mobile User Session - Clerk Profile */}
{isAuthenticated && user ? (
  <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between gap-3 mb-1">

    <div className="flex items-center gap-3 min-w-0 flex-1">

      {/* Actual Clerk Profile Image */}
      {user.avatar &&
      /^https?:\/\//i.test(user.avatar) ? (
        <img
          src={user.avatar}
          alt={`${user.name}'s profile`}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10 shrink-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#7957F5]/10 flex items-center justify-center text-xl shrink-0">
          {user.avatar || '🎓'}
        </div>
      )}

      {/* User Information */}
      <div className="min-w-0 flex-1">

        <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">
          {user.name}
        </div>

        <div className="text-[10px] text-slate-400 font-mono leading-tight truncate mt-1">
          {user.email}
        </div>

      </div>

    </div>

    {/* Clerk Sign Out */}
    <button
      onClick={() => {
        logout();
        setMobileMenuOpen(false);
      }}
      className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer shrink-0"
    >
      Sign Out
    </button>

  </div>
) : (
  <button
    onClick={() => {
      setMobileMenuOpen(false);
      onSelectTab('sign-in');
    }}
    className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#7957F5]/20 to-[#D94BCB]/20 text-[#7957F5] dark:text-[#D94BCB] border border-[#7957F5]/30 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mb-1"
  >
    <LogIn className="w-4 h-4" />
    <span>Sign In to CALCAURA</span>
  </button>
)}

            {/* Quick Theme Switcher inside Mobile Drawer */}
            <button
              onClick={onToggleDarkMode}
              className="w-full py-2 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-[#A6A9B8] flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                {darkMode ? 'Dark' : 'Light'}
              </span>
            </button>

            <button
              onClick={() => {
                onSelectTab('calculators');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#7957F5] to-[#D94BCB] text-white text-xs font-semibold rounded-xl text-center shadow-[0_0_15px_rgba(121,87,245,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.exploreTools}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs text-slate-600 dark:text-[#A6A9B8] hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {t.aboutTitle} · HSBJK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
