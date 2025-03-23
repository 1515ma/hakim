import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '@/types/book';
import { Play, Clock, Star, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

interface LibraryCardProps {
  book: Book;
  onRemove: () => void;
}

const LibraryCard = ({ book, onRemove }: LibraryCardProps) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Verificação defensiva para propriedades obrigatórias
  if (!book || !book.id) {
    return null;
  }
  
  const handleClick = () => {
    navigate(`/audiobook/${book.id}`);
  };
  
  // Função para lidar com o clique no botão de play sem navegar para a página de detalhes
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implementar a lógica para iniciar o playback
    console.log(`Playing book ${book.id}`);
    
    // Simular preview playing state no localStorage
    localStorage.setItem('previewPlaying', JSON.stringify({
      isPlaying: true,
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage
    }));
    
    // Forçar atualização da UI
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div 
      className="group animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative rounded-xl overflow-hidden cursor-pointer hover-lift"
        onClick={handleClick}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse"></div>
          )}
          
          <img 
            src={book.coverImage || 'https://via.placeholder.com/300x450'} 
            alt={book.title} 
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
            <Button 
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              onClick={handlePlayClick}
            >
              <Play className="w-6 h-6 text-accent fill-accent ml-0.5" />
            </Button>
          </div>
          
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onRemove}>
                  {t('removeFromLibrary') || "Remove from Library"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <h3 className="font-medium line-clamp-1">{book.title}</h3>
        <p className="text-sm text-foreground/70 line-clamp-1">{book.author}</p>
        
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{book.rating?.toFixed(1) || '0.0'}</span>
          </div>
          <div className="flex items-center text-foreground/70">
            <Clock className="w-3 h-3 mr-1" />
            <span>{book.duration || '0h 0m'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;