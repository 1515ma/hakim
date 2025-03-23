import { Button } from "@/components/ui/button";
import { useHakimAuth } from "@/context/HakimAuthContext";
import { useLanguage } from "@/hooks/use-language";
import { Play, Pause, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  onLibraryUpdate,
}: BookButtonsProps) => {
  const { t } = useLanguage();
  const [inLibrary, setInLibrary] = useState(false);
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const { addToLibrary, checkBookInLibrary } = useHakimAuth();

  // Verificar se o livro está na biblioteca quando o componente montar
  useEffect(() => {
    const checkLibrary = async () => {
      if (!isLoggedIn || !bookId) return;
      
      try {
        // Usar a função checkBookInLibrary do contexto de autenticação
        const isInLibrary = await checkBookInLibrary(bookId);
        setInLibrary(isInLibrary);
      } catch (error) {
        console.error("Erro ao verificar biblioteca:", error);
        setInLibrary(false);
      }
    };

    checkLibrary();
  }, [isLoggedIn, bookId, checkBookInLibrary]);

  const handleAddToLibrary = async () => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    if (!bookId) {
      toast.error("ID do livro não disponível");
      return;
    }
    
    try {
      setIsAddingToLibrary(true);
      
      // Usar a função addToLibrary do contexto de autenticação
      await addToLibrary(bookId);
      
      setInLibrary(true);
      toast.success(t('addedToLibrary') || "Added to library");
      
      if (onLibraryUpdate) {
        onLibraryUpdate();
      }
    } catch (error) {
      console.error("Erro ao adicionar à biblioteca:", error);
      toast.error(t('errorAddingToLibrary') || "Error adding to library");
    } finally {
      setIsAddingToLibrary(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        onClick={togglePreview}
        className="w-full relative overflow-hidden group"
        variant={isPreviewPlaying ? "outline" : "default"}
      >
        {isPreviewPlaying ? (
          <>
            <Pause className="mr-2 h-4 w-4" />
            {t('stopPreview') || "Stop Preview"}
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4 fill-current" />
            {t('playPreview') || "Play Preview"}
          </>
        )}
        
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
      </Button>
      
      <Button
        onClick={handleAddToLibrary}
        variant="outline"
        className="w-full"
        disabled={inLibrary || isAddingToLibrary}
      >
        {isAddingToLibrary ? (
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-accent border-t-transparent rounded-full"></span>
        ) : inLibrary ? (
          <BookmarkCheck className="mr-2 h-4 w-4 text-accent" />
        ) : (
          <Bookmark className="mr-2 h-4 w-4" />
        )}
        
        {inLibrary
          ? t('inLibrary') || "In Library"
          : t('addToLibrary') || "Add to Library"}
      </Button>
    </div>
  );
};

export default BookButtons;