
import { Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from "react";

interface BookButtonsProps {
  bookId: string;
  isLoggedIn: boolean;
  isPreviewPlaying: boolean;
  togglePreview: () => void;
  handleLogin: () => void;
  onLibraryUpdate?: () => void;
}

const BookButtons = ({ 
  bookId, 
  isLoggedIn, 
  isPreviewPlaying, 
  togglePreview, 
  handleLogin,
  onLibraryUpdate
}: BookButtonsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isInLibrary, addToLibrary, removeFromLibrary, library } = useAuth();
  
  // Track library state locally to ensure UI updates
  const [isBookInLibrary, setIsBookInLibrary] = useState(isLoggedIn && isInLibrary(bookId));
  
  // Update state when library changes or component mounts
  useEffect(() => {
    setIsBookInLibrary(isLoggedIn && isInLibrary(bookId));
  }, [isLoggedIn, bookId, library, isInLibrary]);

  const handleListenClick = () => {
    navigate(`/audiobook/${bookId}`);
  };

  const handleLibraryToggle = () => {
    if (isBookInLibrary) {
      removeFromLibrary(bookId);
    } else {
      addToLibrary(bookId);
    }
    
    // Update local state immediately for responsive UI
    setIsBookInLibrary(!isBookInLibrary);
    
    // Trigger parent component updates if provided
    if (onLibraryUpdate) {
      onLibraryUpdate();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Button 
          variant="default" 
          className="w-full justify-center"
          onClick={handleListenClick}
        >
          {t('listen')}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-center"
          onClick={handleLogin}
        >
          {t('addToLibrary')}
        </Button>
        <Button 
          variant="secondary" 
          className="w-full justify-center gap-2"
          onClick={togglePreview}
        >
          <Headphones className="h-4 w-4" />
          {isPreviewPlaying ? t('stopPreview') : t('preview')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button 
        variant="default" 
        className="w-full justify-center"
        onClick={handleListenClick}
      >
        {t('listen')}
      </Button>
      <Button 
        variant={isBookInLibrary ? "secondary" : "outline"} 
        className="w-full justify-center"
        onClick={handleLibraryToggle}
      >
        {isBookInLibrary ? t('removeFromLibrary') : t('addToLibrary')}
      </Button>
      <Button 
        variant={isPreviewPlaying ? "default" : "secondary"}
        className="w-full justify-center gap-2"
        onClick={togglePreview}
      >
        <Headphones className="h-4 w-4" />
        {isPreviewPlaying ? t('stopPreview') : t('preview')}
      </Button>
    </div>
  );
};

export default BookButtons;
