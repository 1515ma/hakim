
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

interface BookActionsProps {
  bookId: string;
  title: string;
  isLoggedIn: boolean;
}

const BookActions = ({ bookId, title, isLoggedIn }: BookActionsProps) => {
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.error("Please login to like books");
      return;
    }
    
    if (liked === true) {
      setLiked(null);
      toast.info(`Removed like from "${title}"`);
    } else {
      setLiked(true);
      toast.success(`You liked "${title}"`);
    }
  };

  const handleDislike = () => {
    if (!isLoggedIn) {
      toast.error("Please login to rate books");
      return;
    }
    
    if (liked === false) {
      setLiked(null);
      toast.info(`Removed dislike from "${title}"`);
    } else {
      setLiked(false);
      toast.error(`You disliked "${title}"`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={`flex items-center justify-center p-2 rounded-full h-9 w-9 transition-colors ${
          liked === true 
            ? 'bg-green-500/20 text-green-500' 
            : 'bg-hakim-medium/10 hover:bg-hakim-medium/20'
        }`}
      >
        <ThumbsUp className={`w-5 h-5 ${liked === true ? 'fill-green-500' : ''}`} />
      </Button>
      <Button 
        variant="ghost"
        size="sm"
        onClick={handleDislike}
        className={`flex items-center justify-center p-2 rounded-full h-9 w-9 transition-colors ${
          liked === false 
            ? 'bg-red-500/20 text-red-500' 
            : 'bg-hakim-medium/10 hover:bg-hakim-medium/20'
        }`}
      >
        <ThumbsDown className={`w-5 h-5 ${liked === false ? 'fill-red-500' : ''}`} />
      </Button>
    </div>
  );
};

export default BookActions;
