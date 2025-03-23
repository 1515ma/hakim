import { useState } from 'react';
import { Book } from '@/types/book';
import { Check, Plus } from 'lucide-react';
import { useHakimAuth } from '@/context/HakimAuthContext';
import { toast } from 'sonner';

interface BookListItemProps {
  book: Book;
  isSelected: boolean;
  isLast?: boolean;
  onSelect: (book: Book) => void;
  onLibraryUpdate?: () => void;
}

const BookListItem = ({ 
  book, 
  isSelected, 
  isLast = false, 
  onSelect,
  onLibraryUpdate 
}: BookListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const { isLoggedIn, addToLibrary } = useHakimAuth();

  const handleAddToLibrary = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent onClick
    
    if (!isLoggedIn) {
      toast("Please log in to add books to your library");
      return;
    }
    
    try {
      setIsAdding(true);
      await addToLibrary(book.id);
      setInLibrary(true);
      toast.success("Added to library");
      
      if (onLibraryUpdate) {
        onLibraryUpdate();
      }
    } catch (error) {
      toast.error("Failed to add to library");
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  // Verificar se todas as propriedades necessárias estão definidas
  if (!book || !book.id || !book.title) {
    return null; // Não renderizar se as propriedades necessárias não existirem
  }

  return (
    <div 
      className={`p-3 rounded-lg transition-colors cursor-pointer ${
        isSelected 
          ? 'bg-accent/15'
          : isHovered 
            ? 'bg-accent/5 hover:bg-accent/10'
            : 'hover:bg-accent/5'
      } ${!isLast ? 'mb-1' : ''}`}
      onClick={() => onSelect(book)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">
          <img 
            src={book.coverImage || 'https://via.placeholder.com/40x60'} 
            alt={book.title} 
            className="w-10 h-14 object-cover rounded"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium line-clamp-1">{book.title}</h4>
          <p className="text-sm text-foreground/70 line-clamp-1">{book.author || 'Unknown Author'}</p>
          
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-foreground/60">{book.duration || '0h 0m'}</span>
            
            {!inLibrary ? (
              <button
                onClick={handleAddToLibrary}
                className={`flex items-center justify-center h-6 w-6 rounded-full ${
                  isAdding ? 'bg-accent/30' : 'bg-accent/15 hover:bg-accent/30'
                } transition-colors`}
                disabled={isAdding}
              >
                {isAdding ? (
                  <span className="animate-spin h-3 w-3 border-2 border-foreground/30 border-t-accent rounded-full"></span>
                ) : (
                  <Plus className="h-3 w-3 text-accent" />
                )}
              </button>
            ) : (
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;