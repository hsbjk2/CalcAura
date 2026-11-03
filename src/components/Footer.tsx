import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Translations } from '../i18n/translations.ts';

interface FooterProps {
  t: Translations;
  onSelectTab: (tabId: string) => void;
  onOpenAbout: () => void;
}

const PRODUCT_LINKS = [
  { label: 'Calculators', tab: 'basic-calculator' },
  { label: 'Graphing', tab: 'stage-02' },
  { label: 'Geometry', tab: 'stage-03' },
  { label: 'Whiteboard', tab: 'whiteboard' },
  { label: 'Practice', tab: 'stage-08' },
];

const STUDY_LINKS = [
  { label: 'Classes 1–5', tab: 'classes1-5' },
  { label: 'Classes 6–9', tab: 'classes6-9' },
  { label: 'Class 10', tab: 'class10' },
  { label: 'Classes 11–12', tab: 'class12' },
  { label: 'Engineering', tab: 'engineering' },
  { label: 'Graduation', tab: 'graduation' },
];

const IMAGE_CREDITS = [
  {
    label: 'Bakhshali manuscript',
    href: 'https://commons.wikimedia.org/wiki/File:Bakhshali_manuscript.jpg',
  },
  {
    label: 'Qajar astrolabe',
    href: 'https://www.artic.edu/artworks/90589',
  },
  {
    label: 'Euclid’s Elements, 1570',
    href: 'https://commons.wikimedia.org/wiki/File:Title_page_of_Sir_Henry_Billingsley%27s_first_English_version_of_Euclid%27s_Elements,_1570_(560x900).jpg',
  },
  {
    label: 'Lilavati, 16th century',
    href: 'https://commons.wikimedia.org/wiki/File:Lilavati_of_Bhaskaracharya_II,_Sanskrit_language,_Newar_script.jpg',
  },
];

const FooterMark: React.FC = () => (
  <span className="site-footer__mark" aria-hidden="true">
    <svg viewBox="0 0 32 32" role="presentation" focusable="false">
      <rect x="1.5" y="1.5" width="29" height="29" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 25 L25 7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="5" fill="var(--accent)" />
    </svg>
  </span>
);

export const Footer: React.FC<FooterProps> = ({ t, onSelectTab, onOpenAbout }) => {
  const go = (tab: string) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="shell">
        <p className="site-footer__word" aria-hidden="true">
          CalcAura
        </p>

        <div className="site-footer__grid">
          <div className="site-footer__about">
            <div className="site-footer__brand">
              <FooterMark />
              <span>CalcAura</span>
            </div>
            <p>{t.footerDesc}</p>
            <button type="button" className="text-link" onClick={() => go('platform')}>
              {t.workspace}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <nav className="site-footer__col" aria-label="Product">
            <h3>Product</h3>
            <ul>
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <button type="button" onClick={() => go(link.tab)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Study">
            <h3>Study</h3>
            <ul>
              {STUDY_LINKS.map((link) => (
                <li key={link.label}>
                  <button type="button" onClick={() => go(link.tab)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="CalcAura">
            <h3>CalcAura</h3>
            <ul>
              <li>
                <button type="button" onClick={() => go('home')}>
                  {t.navOverview}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('curriculum')}>
                  {t.navCurriculum}
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAbout}>
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenAbout}>
                  {t.privacyTerms}
                </button>
              </li>
              <li>
                <a href="mailto:support.hsbjk@gmail.com" title="Contact support">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>support.hsbjk@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__meta">
            <span>
              © {new Date().getFullYear()} CalcAura. {t.footerRights}
            </span>
            <span>{t.builtBy.includes('HSBJK') ? t.builtBy : 'Built by HSBJK'}</span>
          </div>

          <div className="site-footer__credits">
            <span>Archival images, all public domain: </span>
            {IMAGE_CREDITS.map((credit, index) => (
              <React.Fragment key={credit.label}>
                <a href={credit.href} target="_blank" rel="noreferrer noopener">
                  {credit.label}
                </a>
                {index < IMAGE_CREDITS.length - 1 ? <span aria-hidden="true"> · </span> : null}
              </React.Fragment>
            ))}
            <span>. Sources: Wikimedia Commons, Art Institute of Chicago.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
