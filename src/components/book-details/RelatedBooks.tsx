import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AudiobookCard from "@/components/AudiobookCard";
import { useLanguage } from "@/hooks/use-language";

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  duration: string;
  rating: number;
  category?: string;
}

interface RelatedBooksProps {
  books: RelatedBook[];
}

const RelatedBooks = ({ books }: RelatedBooksProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{t('youMightAlsoLike')}</h2>
          <p className="text-foreground/70 mt-1">{t('similarAudiobooks')}</p>
        </div>
        <Link to="/recommended" className="text-accent flex items-center text-sm font-medium hover:underline">
          {t('viewAll')} <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {books.map((book, index) => (
          <AudiobookCard 
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
            duration={book.duration}
            rating={book.rating}
            category={book.category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
