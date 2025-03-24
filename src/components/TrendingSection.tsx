import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AudiobookCard from './AudiobookCard';
import { booksAPI } from '@/services/api/api';
import { Book } from '@/types/book';
import { useLanguage } from '@/hooks/use-language';

const TrendingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [trendingBooks, setTrendingBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        setIsLoading(true);
        const data = await booksAPI.getTrendingBooks(5);
        setTrendingBooks(Array.isArray(data) ? data : data.books || []);
      } catch (error) {
        console.error('Erro ao buscar livros em destaque:', error);
        // Se falhar, usar um array vazio
        setTrendingBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trending-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Mostrar esqueleto de carregamento quando estiver carregando
  if (isLoading) {
    return (
      <section id="trending-section" className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t('trendingNow')}</h2>
              <p className="text-foreground/70 mt-1">{t('popularThisWeek')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-secondary aspect-[2/3] rounded-xl mb-4"></div>
                <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-secondary rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Se não houver livros em destaque, não mostrar a seção
  if (trendingBooks.length === 0) {
    return null;
  }

  return (
    <section id="trending-section" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-end justify-between mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t('trendingNow')}</h2>
            <p className="text-foreground/70 mt-1">{t('popularThisWeek')}</p>
          </div>
          <Link to="/trending" className="text-accent flex items-center text-sm font-medium hover:underline">
            {t('viewAll')} <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {trendingBooks.map((book, index) => (
            <AudiobookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              duration={book.duration}
              rating={book.rating}
              category={book.category || ''}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;