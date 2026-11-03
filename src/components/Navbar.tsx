import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  ArrowRight,
  PenTool,
  LogIn,
  LogOut,
} from 'lucide-react';
import { Language, Translations } from '../i18n/translations.ts';
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
  { code: 'ja', label: '日本語', flag: 'JA' },
  { code: 'hi', label: 'हिन्दी', flag: 'HI' },
];

const BrandMark: React.FC = () => (
  <span className="brand__mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <rect x="1.5" y="1.5" width="29" height="29" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 25 L25 7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="5" fill="var(--accent)" />
    </svg>
  </span>
);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<'paper' | 'ink'>('paper');
  const langRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { id: 'home', label: t.navOverview || 'Overview' },
    { id: 'platform', label: t.workspace || 'Workspace' },
    { id: 'curriculum', label: t.navCurriculum || 'Curriculum' },
    { id: 'whiteboard', label: t.navWhiteboard || 'Whiteboard', icon: PenTool },
    { id: 'practice', label: 'Practice' },
    { id: 'about', label: t.navAbout || 'About' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);

      if (!isLandingView) {
        setNavTheme(darkMode || isAboutView ? 'ink' : 'paper');
        return;
      }

      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'));
      const marker = 68;
      let theme: 'paper' | 'ink' = 'paper';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          theme = section.dataset.navTheme === 'ink' ? 'ink' : 'paper';
        }
      }
      setNavTheme(theme);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isLandingView, darkMode, isAboutView]);

  useEffect(() => {
    if (!langMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) setLangMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [langMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  const go = (id: string) => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    if (id === 'about') {
      onOpenAbout();
    } else if (id === 'whiteboard') {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => undefined);
        }
      } catch {
        /* fullscreen is optional */
      }
      onSelectTab('whiteboard');
    } else {
      onSelectTab(id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initials = (user?.name || user?.email || 'C')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <header
      className={`site-nav${scrolled ? ' is-scrolled' : ''}`}
      data-theme={navTheme}
    >
      <div className="site-nav__bar">
        <button type="button" className="brand" onClick={() => go('home')} aria-label="CalcAura home">
          <BrandMark />
          <span className="brand__name">CalcAura</span>
        </button>

        <nav className="site-nav__links" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive =
              activeTab === link.id || (link.id === 'practice' && activeTab === 'platform');
            return (
              <button
                key={link.id}
                type="button"
                className="site-nav__link"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => go(link.id)}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="site-nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onOpenSearch}
            aria-label="Search CalcAura"
            title="Search"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <div className="nav-lang" ref={langRef}>
            <button
              type="button"
              className="icon-btn nav-lang__button"
              onClick={() => setLangMenuOpen((open) => !open)}
              aria-expanded={langMenuOpen}
              aria-label="Choose language"
              title="Language"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{currentLang.toUpperCase()}</span>
            </button>

            {langMenuOpen && (
              <div className="lang-menu" role="menu">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    role="menuitem"
                    aria-current={currentLang === language.code}
                    onClick={() => {
                      onSelectLang(language.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    <span>{language.label}</span>
                    <span>{language.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <UserButton afterSignOutUrl="/" appearance={getClerkAppearance(darkMode)} />
          ) : (
            <button
              type="button"
              className="icon-btn"
              onClick={() => go('sign-in')}
              aria-label="Sign in"
              title="Sign in"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            className="btn btn--sm site-nav__cta"
            onClick={() => go('platform')}
          >
            Open workspace
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="icon-btn site-nav__menu-btn"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mob-nav" id="site-mobile-nav">
          <nav className="mob-nav__links" aria-label="Mobile">
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => go(link.id)}>
                <span>{link.label}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="mob-nav__tools">
            <button type="button" onClick={onOpenSearch}>
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search</span>
            </button>
            <button type="button" onClick={onToggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>

          <div className="mob-nav__lang" role="group" aria-label="Language">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                aria-pressed={currentLang === language.code}
                onClick={() => onSelectLang(language.code)}
              >
                {language.flag}
              </button>
            ))}
          </div>

          {isAuthenticated && user ? (
            <div className="mob-nav__user">
              <span className="mob-nav__avatar" aria-hidden="true">{initials || 'C'}</span>
              <span className="mob-nav__identity">
                <strong>{user.name || 'Signed in'}</strong>
                <span>{user.email || ''}</span>
              </span>
              <button type="button" onClick={logout} aria-label="Sign out">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <button type="button" className="btn mob-nav__signin" onClick={() => go('sign-in')}>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign in to CalcAura
            </button>
          )}

          <button type="button" className="btn mob-nav__cta" onClick={() => go('platform')}>
            Open workspace
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </header>
  );
};
