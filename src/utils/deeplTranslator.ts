
interface DeepLResponse {
  translations: {
    text: string;
    detected_source_language: string;
  }[];
}

/**
 * Translates text using the DeepL API
 * @param text The text to translate
 * @param targetLang The target language code
 * @returns The translated text
 */
export const translateWithDeepL = async (text: string, targetLang: string): Promise<string> => {
  try {
    // Skip API call if text is empty
    if (!text) return '';
    
    const API_KEY = '502d6184-18ef-4ead-bf2d-1d46796809e6:fx';
    const API_URL = 'https://api-free.deepl.com/v2/translate';
    
    const formData = new URLSearchParams();
    formData.append('auth_key', API_KEY);
    formData.append('text', text);
    formData.append('target_lang', targetLang.toUpperCase());
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    
    if (!response.ok) {
      console.error('DeepL API error:', response.statusText);
      return text; // Return original text on error
    }
    
    const data: DeepLResponse = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error translating with DeepL:', error);
    return text; // Return original text on error
  }
};

/**
 * Batch translate multiple texts using the DeepL API
 * @param texts Array of texts to translate
 * @param targetLang The target language code
 * @returns Array of translated texts
 */
export const batchTranslateWithDeepL = async (
  texts: string[], 
  targetLang: string
): Promise<string[]> => {
  try {
    if (!texts.length) return [];
    
    const API_KEY = '502d6184-18ef-4ead-bf2d-1d46796809e6:fx';
    const API_URL = 'https://api-free.deepl.com/v2/translate';
    
    const formData = new URLSearchParams();
    formData.append('auth_key', API_KEY);
    texts.forEach(text => formData.append('text', text));
    formData.append('target_lang', targetLang.toUpperCase());
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    
    if (!response.ok) {
      console.error('DeepL API error:', response.statusText);
      return texts; // Return original texts on error
    }
    
    const data: DeepLResponse = await response.json();
    return data.translations.map(t => t.text);
  } catch (error) {
    console.error('Error batch translating with DeepL:', error);
    return texts; // Return original texts on error
  }
};
