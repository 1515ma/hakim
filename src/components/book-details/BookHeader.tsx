import { Star } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";

interface BookHeaderProps {
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviews: number;
}

const BookHeader = ({ title, author, genre, rating, reviews }: BookHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6 animate-fade-in">
      <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-3 inline-block">
        {t(genre.toLowerCase())}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-foreground/70 mb-3">{t('by')} {author}</p>
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="font-medium">{rating}</span>
        <span className="text-foreground/70">({reviews} {t('reviews')})</span>
      </div>
    </div>
  );
};

export default BookHeader;
