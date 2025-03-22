
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, translateText as translate } from '@/utils/translationUtils';
import { Language } from '@/translations/types';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });
  const [isTranslating, setIsTranslating] = useState(false);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function using predefined translations
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  // Function to translate arbitrary text using DeepL API
  const translateText = async (text: string): Promise<string> => {
    setIsTranslating(true);
    const result = await translate(text, language);
    setIsTranslating(false);
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateText, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};
