import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type Lang, type TranslationDict } from '@/i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lrp-lang');
      if (stored === 'es' || stored === 'en') return stored;
      const browser = navigator.language.toLowerCase();
      if (browser.startsWith('en')) return 'en';
    }
    return 'es';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('lrp-lang', newLang);
  };

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
