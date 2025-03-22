
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Book } from "@/types/book";
import { useWelcomeMessage } from "@/hooks/use-welcome-message";

interface LoginCarouselProps {
  books: Book[];
}

const LoginCarousel = ({ books }: LoginCarouselProps) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t, language } = useLanguage();
  const welcomeMessage = useWelcomeMessage();

  // Auto switching books in carousel
  useEffect(() => {
    const interval = setInterval(() => {
      changeBook((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000); // Switch books every 5 seconds
    
    return () => clearInterval(interval);
  }, [books.length]);

  const changeBook = (indexFunction: (prevIndex: number) => number) => {
    // Start transition
    setIsTransitioning(true);
    
    // Delay the actual change to allow animation to complete
    setTimeout(() => {
      setCurrentBookIndex(indexFunction);
      
      // End transition after a short delay to trigger fade-in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const nextBook = () => {
    changeBook((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevBook = () => {
    changeBook((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  // Calculate previous and next book indices
  const prevIndex = (currentBookIndex - 1 + books.length) % books.length;
  const nextIndex = (currentBookIndex + 1) % books.length;

  // Function to get login description based on language
  const getLoginDescription = () => {
    if (language === 'en') {
      return "Dive into thousands of audiobooks from bestselling authors and emerging talents. Pick up where you left off on any device.";
    } else if (language === 'es') {
      return "Sumérgete en miles de audiolibros de autores superventas y talentos emergentes. Continúa donde lo dejaste en cualquier dispositivo.";
    } else if (language === 'fr') {
      return "Plongez dans des milliers de livres audio d'auteurs à succès et de talents émergents. Reprenez où vous vous êtes arrêté sur n'importe quel appareil.";
    } else if (language === 'de') {
      return "Tauchen Sie ein in Tausende von Hörbüchern von Bestsellerautoren und aufstrebenden Talenten. Machen Sie auf jedem Gerät dort weiter, wo Sie aufgehört haben.";
    } else {
      return "Mergulhe em milhares de audiolivros de autores best-sellers e talentos emergentes. Continue de onde parou em qualquer dispositivo.";
    }
  };

  return (
    <div className="relative hidden h-full flex-col p-8 text-muted-foreground antialiased lg:flex">
      <div className="absolute inset-0 bg-hakim-dark/30 z-0 rounded-r-full" />
      <Link to="/" className="mb-6 font-semibold">
        Hakim
      </Link>
      <div className="relative z-10 mt-10">
        <h2 className="text-3xl font-bold text-white mb-1">
          {welcomeMessage} <span className="text-hakim-light">{t('welcomeBack')}</span>
        </h2>
        <p className="mt-3 text-lg text-hakim-gray mb-10">
          {getLoginDescription()}
        </p>
        
        {/* Updated Carousel Design with Smooth Transitions */}
        {books.length > 0 && (
          <div className="mt-6 w-full max-w-md mx-auto">
            <div className="relative h-80 mt-8 mb-10">
              {/* Left (Previous) Book */}
              {books[prevIndex] && (
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10 transition-all duration-500 opacity-70 scale-75 hover:opacity-90 hover:scale-80 ${isTransitioning ? 'animate-fade-out' : 'animate-fade-in'}`}>
                  <div className="transform transition-all duration-300">
                    <img 
                      src={books[prevIndex].coverImage} 
                      alt={books[prevIndex].title} 
                      className="h-44 w-32 rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Center (Current) Book */}
              {books[currentBookIndex] && (
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-90' : 'opacity-100 scale-110'}`}>
                  <div className="transform transition-all duration-300 hover:scale-115">
                    <img 
                      src={books[currentBookIndex].coverImage} 
                      alt={books[currentBookIndex].title} 
                      className="h-64 w-44 rounded-lg shadow-xl object-cover transition-smooth"
                    />
                    <p className={`text-center text-white font-medium mt-3 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                      {books[currentBookIndex].title}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Right (Next) Book */}
              {books[nextIndex] && (
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 z-10 transition-all duration-500 opacity-70 scale-75 hover:opacity-90 hover:scale-80 ${isTransitioning ? 'animate-fade-out' : 'animate-fade-in'}`}>
                  <div className="transform transition-all duration-300">
                    <img 
                      src={books[nextIndex].coverImage} 
                      alt={books[nextIndex].title} 
                      className="h-44 w-32 rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Carousel Navigation */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
                <Button 
                  onClick={prevBook} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={nextBook} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Indicator Dots with Animation */}
            <div className="mt-4 flex justify-center">
              {books.map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 h-2 rounded-full transition-all duration-300 ${
                    index === currentBookIndex 
                      ? "bg-white w-4" 
                      : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                  onClick={() => {
                    if (index !== currentBookIndex) {
                      changeBook(() => index);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginCarousel;
