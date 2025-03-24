import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrendingSection from '@/components/TrendingSection';
import Footer from '@/components/Footer';
import { BookOpen, Bookmark, BookAudio, Volume2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <BookAudio className="w-10 h-10 text-accent" />,
      title: t('curatedCollection'),
      description: t('curatedCollectionDesc')
    },
    {
      icon: <Volume2 className="w-10 h-10 text-accent" />,
      title: t('studioQuality'),
      description: t('studioQualityDesc')
    },
    {
      icon: <Bookmark className="w-10 h-10 text-accent" />,
      title: t('smartBookmarks'),
      description: t('smartBookmarksDesc')
    },
    {
      icon: <BookOpen className="w-10 h-10 text-accent" />,
      title: t('exclusiveTitles'),
      description: t('exclusiveTitlesDesc')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className={`text-center max-w-3xl mx-auto mb-12 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('immerseYourself')}</h2>
              <p className="text-lg text-foreground/70">
                {t('immerseDesc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`glass p-6 rounded-xl ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Esta seção agora busca dados reais do banco */}
        <TrendingSection />
        
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 z-0"></div>
          <div 
            className="container mx-auto px-4 md:px-6 relative z-10" 
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className={`bg-gradient-to-r from-gray-900 to-black p-8 md:p-12 rounded-2xl shadow-xl ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t('startJourney')}</h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  {t('startJourneyDesc')}
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-white border border-white/20">
                    <h3 className="text-xl font-bold mb-2">{t('monthly')}</h3>
                    <p className="text-white/70 mb-4">{t('accessToAll')}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">$14.99</span>
                      <span className="text-white/70"> /{t('month')}</span>
                    </div>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('oneCredit')}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('discount30')}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('unlimitedFeatured')}
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
                      {t('startFreeTrial')}
                    </button>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-white border border-white/20 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                      {t('popularChoice')}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t('annual')}</h3>
                    <p className="text-white/70 mb-4">{t('save25')}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">$149.99</span>
                      <span className="text-white/70"> /{t('year')}</span>
                    </div>
                    <ul className="text-sm space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('twelveCredits')}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('discount40')}
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {t('unlimitedAll')}
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-white hover:bg-white/90 text-accent rounded-lg font-medium transition-colors">
                      {t('startFreeTrial')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;