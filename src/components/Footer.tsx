import React from 'react';
import calcauraLogo from '../../Logo.png';
import { Mail, ShieldCheck } from 'lucide-react';
import { Translations } from '../i18n/translations.ts';

interface FooterProps {
  t: Translations;
  onSelectTab: (tabId: string) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onSelectTab, onOpenAbout }) => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-[#0B0D16] border-t border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-[#A6A9B8] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200/80 dark:border-white/[0.06]">
          {/* Brand & One-line description */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-2.5">
              <img
                src="/Logo1.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                draggable={false}
                className="h-8 w-10 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(121,87,245,0.22)]"
              />
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-[#F6F7FB]">
                CalcAura
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#A6A9B8] leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Minimal Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => {
                onSelectTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.navOverview}
            </button>

            <button
              onClick={() => {
                onSelectTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.navCurriculum}
            </button>

            <button
              onClick={onOpenAbout}
              className="text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.navAbout}
            </button>

            <button
              onClick={() => onSelectTab('platform')}
              className="text-[#7957F5] hover:text-purple-700 dark:hover:text-white font-semibold transition-colors cursor-pointer"
            >
              {t.workspace}
            </button>

            <button
              onClick={onOpenAbout}
              className="text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.privacyTerms}
            </button>

            <a
              href="mailto:support.hsbjk@gmail.com"
              className="text-slate-600 dark:text-[#A6A9B8] hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
              title="Contact Support"
            >
              <Mail className="w-3.5 h-3.5 text-[#7957F5]" />
              <span>support.hsbjk@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Attribution Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-[#A6A9B8]/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              © {new Date().getFullYear()} CalcAura. {t.footerRights}
            </span>
          </div>

          <div className="font-mono text-slate-600 dark:text-[#A6A9B8]">
            {t.builtBy.includes('HSBJK') ? (
              t.builtBy
            ) : (
              <>
                Built by <strong className="text-slate-900 dark:text-white font-semibold">HSBJK</strong>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
