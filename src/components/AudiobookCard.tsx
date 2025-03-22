
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Star, Headphones } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface AudiobookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  duration: string;
  rating: number;
  category: string;
  index?: number;
}

const AudiobookCard = ({ 
  id, 
  title, 
  author, 
  coverImage, 
  duration, 
  rating, 
  category,
  index = 0 
}: AudiobookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();

  const categoryKey = category.toLowerCase();

  return (
    <Link 
      to={`/audiobook/${id}`} 
      className={`group block animate-fade-in`} 
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl hover-lift">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse flex items-center justify-center">
              <Headphones className="w-12 h-12 text-foreground/20" />
            </div>
          )}
          
          <img 
            src={coverImage} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play className="w-6 h-6 text-accent fill-accent ml-0.5" />
            </div>
          </div>
          
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-black/40 backdrop-blur-sm text-white rounded-full">
              {t(categoryKey)}
            </span>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <h3 className="font-medium line-clamp-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/70">
            {t('by')} {author}
          </p>
          <div className="flex items-center justify-between text-sm pt-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center text-foreground/70">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AudiobookCard;
