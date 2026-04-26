import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: (en: string, zh: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'resilienceos:lang';
const THEME_STORAGE_KEY = 'resilienceos:theme';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored === 'en' || stored === 'zh' ? stored : 'zh';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', language);
  }, [language]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LANGUAGE_STORAGE_KEY) {
        const next = e.newValue;
        if (next === 'en' || next === 'zh') setLanguage(next);
      }
      if (e.key === THEME_STORAGE_KEY) {
        const next = e.newValue;
        if (next === 'dark' || next === 'light') setTheme(next);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleLanguage = () => setLanguage(l => (l === 'en' ? 'zh' : 'en'));
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const t = (en: string, zh: string) => language === 'en' ? en : zh;

  return (
    <AppContext.Provider value={{ language, theme, toggleLanguage, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
