
import { Star, Clock, Calendar, BookOpenText } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BookTagsProps {
  rating: number;
  duration: string;
  category?: string;
  releaseDate?: string;
  className?: string;
}

const BookTags = ({ rating, duration, category, releaseDate, className }: BookTagsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-4 my-4", className)}>
      <div className="flex items-center space-x-1 bg-hakim-medium/10 hover:bg-hakim-medium/20 transition-colors px-3 py-1.5 rounded-full" 
        title={`Rating: ${rating} out of 5`}
        aria-label={`Rating: ${rating} out of 5`}>
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
      
      <div className="flex items-center space-x-1 bg-hakim-medium/10 hover:bg-hakim-medium/20 transition-colors px-3 py-1.5 rounded-full"
        title={`Duration: ${duration}`}
        aria-label={`Duration: ${duration}`}>
        <Clock className="w-4 h-4 text-hakim-light" />
        <span className="text-sm">{duration}</span>
      </div>
      
      {category && (
        <div className="flex items-center space-x-1 bg-hakim-medium/10 hover:bg-hakim-medium/20 transition-colors px-3 py-1.5 rounded-full"
          title={`Category: ${category}`}
          aria-label={`Category: ${category}`}>
          <BookOpenText className="w-4 h-4 text-hakim-light" />
          <span className="text-sm">{category}</span>
        </div>
      )}
      
      {releaseDate && (
        <div className="flex items-center space-x-1 bg-hakim-medium/10 hover:bg-hakim-medium/20 transition-colors px-3 py-1.5 rounded-full"
          title={`Release date: ${releaseDate}`}
          aria-label={`Release date: ${releaseDate}`}>
          <Calendar className="w-4 h-4 text-hakim-light" />
          <span className="text-sm">{releaseDate}</span>
        </div>
      )}
    </div>
  );
};

export default BookTags;
