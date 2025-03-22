
import { Play, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                Featured Audiobook
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Project <br className="hidden md:block" />
              <span className="text-accent">Hail Mary</span>
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-md leading-relaxed">
              From the author of The Martian, a lone astronaut must save the earth from disaster in this incredible adventure.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="ml-2 text-sm font-medium">4.9 (2.8k reviews)</span>
              </div>
              
              <div className="flex items-center text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                16 hours 10 minutes
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="bg-accent hover:bg-accent/90 gap-2"
                size="lg"
              >
                <Play className="w-4 h-4" /> 
                Listen Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                View Details
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isLoaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/30 to-accent/5 rounded-2xl blur-2xl opacity-50"></div>
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover-lift cursor-pointer">
                    <Play className="w-8 h-8 text-accent fill-accent ml-1" />
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1633988354540-d3218bf96403?q=80&w=1974&auto=format&fit=crop" 
                alt="Project Hail Mary Book Cover" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
