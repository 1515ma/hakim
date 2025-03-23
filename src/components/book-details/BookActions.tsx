import { useState } from "react";
import { Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { toast } from "sonner";

interface BookActionsProps {
  bookId: string;
  title: string;
  isLoggedIn: boolean;
}

const BookActions = ({ bookId, title, isLoggedIn }: BookActionsProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean | null>(null);
  
  const handleLike = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Toggle like/dislike
    if (liked === true) {
      setLiked(null);
      
      // Remover dos livros curtidos no localStorage
      const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
      localStorage.setItem(
        'likedBooks', 
        JSON.stringify(likedBooks.filter((id: string) => id !== bookId))
      );
      
      toast.success(`${t('removedFromLiked')} "${title}"`);
    } else {
      setLiked(true);
      
      // Se estava marcado como "não gostei", remover
      if (liked === false) {
        const dislikedBooks = JSON.parse(localStorage.getItem('dislikedBooks') || '[]');
        localStorage.setItem(
          'dislikedBooks', 
          JSON.stringify(dislikedBooks.filter((id: string) => id !== bookId))
        );
      }
      
      // Adicionar aos livros curtidos
      const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
      if (!likedBooks.includes(bookId)) {
        likedBooks.push(bookId);
        localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
      }
      
      toast.success(`${t('addedToLiked')} "${title}"`);
    }
  };
  
  const handleDislike = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Toggle dislike
    if (liked === false) {
      setLiked(null);
      
      // Remover dos livros não curtidos
      const dislikedBooks = JSON.parse(localStorage.getItem('dislikedBooks') || '[]');
      localStorage.setItem(
        'dislikedBooks', 
        JSON.stringify(dislikedBooks.filter((id: string) => id !== bookId))
      );
      
      toast.success(`${t('removedFromDisliked')} "${title}"`);
    } else {
      setLiked(false);
      
      // Se estava marcado como "gostei", remover
      if (liked === true) {
        const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
        localStorage.setItem(
          'likedBooks', 
          JSON.stringify(likedBooks.filter((id: string) => id !== bookId))
        );
      }
      
      // Adicionar aos livros não curtidos
      const dislikedBooks = JSON.parse(localStorage.getItem('dislikedBooks') || '[]');
      if (!dislikedBooks.includes(bookId)) {
        dislikedBooks.push(bookId);
        localStorage.setItem('dislikedBooks', JSON.stringify(dislikedBooks));
      }
      
      toast.success(`${t('addedToDisliked')} "${title}"`);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copiar URL para a área de transferência
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success(t('linkCopied') || "Link copied to clipboard");
      }).catch(console.error);
    }
  };
  
  // Buscar estado de like/dislike do localStorage ao montar
  useState(() => {
    if (!bookId) return;
    
    const likedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    const dislikedBooks = JSON.parse(localStorage.getItem('dislikedBooks') || '[]');
    
    if (likedBooks.includes(bookId)) {
      setLiked(true);
    } else if (dislikedBooks.includes(bookId)) {
      setLiked(false);
    }
  });

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-full ${liked === true ? 'bg-green-800/20 text-green-400' : ''}`}
        onClick={handleLike}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 rounded-full ${liked === false ? 'bg-red-800/20 text-red-400' : ''}`}
        onClick={handleDislike}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BookActions;