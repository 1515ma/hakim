
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from '@/hooks/use-auth';
import { Book } from "@/types/book";
import BookTags from './book-details/BookTags';
import BookActions from './book-details/BookActions';
import BookButtons from './book-details/BookButtons';
import LoginPrompt from './book-details/LoginPrompt';
import BookDescription from './book-details/BookDescription';

interface BookDetailsProps {
  book: Book;
  onLibraryUpdate?: () => void;
}

const BookDetails = ({ book, onLibraryUpdate }: BookDetailsProps) => {
  const { t } = useLanguage();
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const { isLoggedIn, addToLibrary } = useAuth();
  const navigate = useNavigate();
  
  const togglePreview = () => {
    // Immediately update the state for faster UI response
    setIsPreviewPlaying(!isPreviewPlaying);
    
    // Store the state in localStorage to persist across page navigation
    if (!isPreviewPlaying) {
      localStorage.setItem('previewPlaying', JSON.stringify({
        isPlaying: true,
        bookId: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage
      }));
    } else {
      // Remove from localStorage immediately
      localStorage.removeItem('previewPlaying');
    }
  };

  // Check for active preview on component mount
  useEffect(() => {
    const storedPreview = localStorage.getItem('previewPlaying');
    if (storedPreview) {
      const previewData = JSON.parse(storedPreview);
      if (previewData.bookId === book.id) {
        setIsPreviewPlaying(true);
      }
    }
  }, [book.id]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAddToLibrary = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    addToLibrary(book.id);
    
    if (onLibraryUpdate) {
      onLibraryUpdate();
    }
  };

  return (
    <div className="md:col-span-2 h-full p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex flex-col gap-4">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-40 h-60 object-cover rounded-xl shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300" 
          />
          
          <BookButtons 
            bookId={book.id}
            isLoggedIn={isLoggedIn}
            isPreviewPlaying={isPreviewPlaying}
            togglePreview={togglePreview}
            handleLogin={handleLogin}
            onLibraryUpdate={onLibraryUpdate}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white text-gradient">{book.title}</h2>
              <p className="text-hakim-light mb-3 text-opacity-90">{t('by')} {book.author}</p>
            </div>
            
            <BookActions 
              bookId={book.id}
              title={book.title}
              isLoggedIn={isLoggedIn}
            />
          </div>
          
          <BookTags 
            rating={book.rating}
            duration={book.duration}
            category={book.category}
            releaseDate={book.releaseDate}
          />
          
          <div className="my-4 glass-dark p-5 rounded-lg backdrop-blur-md shadow-inner animate-fade-in">
            <BookDescription 
              description={book.description}
              additionalText={book.additionalText}
            />
          </div>
        </div>
      </div>
      
      {!isLoggedIn && <LoginPrompt />}
    </div>
  );
};

export default BookDetails;
