
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

export const useWelcomeMessage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour >= 5 && hour < 12) {
      greeting = language === 'en' ? 'Good morning!' : 
                language === 'es' ? '¡Buenos días!' : 
                language === 'fr' ? 'Bonjour!' : 
                language === 'de' ? 'Guten Morgen!' : 'Bom dia!';
    } else if (hour >= 12 && hour < 18) {
      greeting = language === 'en' ? 'Good afternoon!' : 
                language === 'es' ? '¡Buenas tardes!' : 
                language === 'fr' ? 'Bon après-midi!' : 
                language === 'de' ? 'Guten Tag!' : 'Boa tarde!';
    } else {
      greeting = language === 'en' ? 'Good evening!' : 
                language === 'es' ? '¡Buenas noches!' : 
                language === 'fr' ? 'Bonsoir!' : 
                language === 'de' ? 'Guten Abend!' : 'Boa noite!';
    }
    
    setWelcomeMessage(greeting);
  }, [language]);

  return welcomeMessage;
};
