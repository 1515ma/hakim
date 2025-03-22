
import { toast } from 'sonner';
import { translateWithDeepL } from './deeplTranslator';
import { Language, translations } from '@/translations/types';

// Translation function using predefined translations
export const getTranslation = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  return translations[key][language];
};

// Function to translate arbitrary text using DeepL API
export const translateText = async (text: string, language: Language): Promise<string> => {
  if (language === 'en' || !text) {
    return text;
  }
  
  try {
    const result = await translateWithDeepL(text, language);
    return result;
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Translation failed. Using original text.');
    return text;
  }
};
