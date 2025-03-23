import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../translations/en';
import ptTranslations from '../translations/pt';
import { getTranslation } from '../utils/translationUtils';

type Language = 'en' | 'pt';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: {
    en: Translations;
    pt: Translations;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Define as traduções disponíveis
  const translations = {
    en: enTranslations,
    pt: ptTranslations
  };

  // Inicializa o idioma com a preferência do usuário ou do navegador
  useEffect(() => {
    const savedLanguage = localStorage.getItem('hakim-language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    } else {
      // Verifica o idioma do navegador
      const browserLanguage = navigator.language.split('-')[0];
      setLanguage(browserLanguage === 'pt' ? 'pt' : 'en');
    }
  }, []);

  // Salva a preferência do usuário quando o idioma muda
  useEffect(() => {
    localStorage.setItem('hakim-language', language);
  }, [language]);

  // Função para obter a tradução de uma chave
  const t = (key: string): string => {
    return getTranslation(translations[language], key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};