import { useNavigate } from 'react-router-dom';
import { BookOpenText, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

const EmptyLibrary = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleExplore = () => {
    navigate('/explore');
  };

  return (
    <div className="py-16 flex flex-col items-center text-center max-w-md mx-auto">
      <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Bookmark className="h-10 w-10 text-accent" />
      </div>
      
      <h2 className="text-2xl font-bold mb-3">
        {t('yourLibraryIsEmpty') || "Your library is empty"}
      </h2>
      
      <p className="text-foreground/70 mb-8">
        {t('libraryEmptyDescription') || 
          "Start building your personal collection by adding audiobooks you want to listen to."}
      </p>
      
      <Button 
        className="flex items-center"
        onClick={handleExplore}
      >
        <BookOpenText className="mr-2 h-4 w-4" />
        {t('exploreCatalog') || "Explore Catalog"}
      </Button>
    </div>
  );
};

export default EmptyLibrary;