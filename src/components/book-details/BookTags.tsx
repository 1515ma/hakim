import { Star, Clock, Tag, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface BookTagsProps {
  rating: number;
  duration: string;
  category: string;
  releaseDate: string;
}

const BookTags = ({ 
  rating, 
  duration, 
  category,
  releaseDate
}: BookTagsProps) => {
  const { t } = useLanguage();
  
  // Valores default para propriedades que podem estar faltando
  const safeRating = rating || 0;
  const safeDuration = duration || '0h 0m';
  const safeCategory = category || 'Unknown';
  const safeReleaseDate = releaseDate || 'Unknown';

  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-sm">
        <Star className="h-3.5 w-3.5 mr-1 text-amber-400 fill-amber-400" />
        <span>{safeRating.toFixed(1)}</span>
      </div>
      
      <div className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-sm">
        <Clock className="h-3.5 w-3.5 mr-1 text-hakim-light" />
        <span>{safeDuration}</span>
      </div>
      
      <div className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-sm">
        <Tag className="h-3.5 w-3.5 mr-1 text-hakim-light" />
        <span>{t(safeCategory.toLowerCase()) || safeCategory}</span>
      </div>
      
      <div className="flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-sm">
        <Calendar className="h-3.5 w-3.5 mr-1 text-hakim-light" />
        <span>{safeReleaseDate}</span>
      </div>
    </div>
  );
};

export default BookTags;