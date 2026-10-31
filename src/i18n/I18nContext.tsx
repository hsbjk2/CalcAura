import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, TRANSLATIONS } from './translations.ts';

interface I18nContextType {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = (localStorage.getItem('calcaura_lang') || localStorage.getItem('calclogic_lang')) as Language;
      return saved && TRANSLATIONS[saved] ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('calcaura_lang', lang);
    } catch {}
  };

  useEffect(() => {
    try {
      localStorage.setItem('calcaura_lang', currentLang);
    } catch {}
  }, [currentLang]);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <I18nContext.Provider value={{ currentLang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      currentLang: 'en',
      setLang: () => {},
      t: TRANSLATIONS.en,
    };
  }
  return context;
};
