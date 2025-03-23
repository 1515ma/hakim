interface Translations {
  [key: string]: string;
}

// Verificar se estamos em ambiente de desenvolvimento
const isDevelopment = process.env.NODE_ENV === 'development';

// Obtém a tradução de uma chave no objeto de traduções
export const getTranslation = (translations: Translations, key: string): string => {
  if (!key) return '';
  
  // Verifica se a chave existe no objeto de traduções
  if (translations[key]) {
    return translations[key];
  }
  
  // Converter chaves do formato kebab-case para camelCase
  const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  if (translations[camelCaseKey]) {
    return translations[camelCaseKey];
  }
  
  // Se não existir, retornar a chave e registrar para ajudar no desenvolvimento
  // Mostra o aviso apenas em desenvolvimento
  if (isDevelopment) {
    console.warn(`Translation key not found: ${key}`);
  }
  return key;
};