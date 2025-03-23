// Este arquivo apenas re-exporta o hook do contexto
// para manter a compatibilidade com importações existentes

import { useLanguage as useLanguageFromContext } from '../context/LanguageContext';

export const useLanguage = useLanguageFromContext;
