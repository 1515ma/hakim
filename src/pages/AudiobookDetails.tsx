import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Book, 
  BookOpen, 
  ArrowLeft,
  Heart,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';
import { getBookById } from '@/data/books';
import { Book as BookType } from '@/types/book';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import AudioBookPlayer from '@/components/book-detail-page/AudioBookPlayer';
import BookDetailTabs from '@/components/book-detail-page/BookDetailTabs';
import { Button } from '@/components/ui/button';
import BookPreview from '@/components/book-details/BookPreview';
import MiniPlayer from '@/components/book-detail-page/MiniPlayer';

interface ChapterType {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
}

const AudiobookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoggedIn, addToLibrary, isInLibrary, removeFromLibrary } = useAuth();
  const [book, setBook] = useState<BookType | null>(null);
  const [isInUserLibrary, setIsInUserLibrary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<ChapterType | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const mockChapters: ChapterType[] = [
    { id: 'ch1', title: 'Chapter 1: Introduction', duration: '12m', isFree: true },
    { id: 'ch2', title: 'Chapter 2: The Beginning', duration: '24m', isFree: true },
    { id: 'ch3', title: 'Chapter 3: The Challenge', duration: '18m', isFree: false },
    { id: 'ch4', title: 'Chapter 4: The Journey', duration: '22m', isFree: false },
    { id: 'ch5', title: 'Chapter 5: The Discovery', duration: '19m', isFree: false },
    { id: 'ch6', title: 'Chapter 6: The Revelation', duration: '26m', isFree: false },
    { id: 'ch7', title: 'Chapter 7: The Conclusion', duration: '15m', isFree: false },
  ];

  const reviews = [
    {
      user: "John Doe",
      rating: 5,
      date: "2 months ago",
      text: "This audiobook is amazing! The narrator's voice is perfect for the story."
    },
    {
      user: "Jane Smith",
      rating: 4,
      date: "1 month ago",
      text: "Really enjoyed this book. Good pacing and engaging story."
    }
  ];

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        const foundBook = getBookById(id);
        setBook(foundBook || null);
        
        if (foundBook && isLoggedIn) {
          setIsInUserLibrary(isInLibrary(foundBook.id));
        }
      }
      setLoading(false);
    };
    
    loadBook();
    
    localStorage.setItem('onBookPage', 'true');
    
    return () => {
      localStorage.removeItem('onBookPage');
    };
  }, [id, isLoggedIn, isInLibrary]);

  useEffect(() => {
    if (book && mockChapters.length > 0) {
      setActiveChapter(mockChapters[0]);
    }
  }, [book]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28 flex flex-col items-center justify-center">
          <BookOpen className="h-16 w-16 text-accent/50 mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('bookNotFound')}</h1>
          <p className="text-foreground/70 mb-6">{t('bookNotFoundDesc')}</p>
          <Button onClick={() => navigate('/explore')}>{t('browseBooks')}</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePlayChapter = (chapter: ChapterType) => {
    setActiveChapter(chapter);
    
    localStorage.setItem('previewPlaying', JSON.stringify({
      isPlaying: true,
      bookId: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage
    }));
    
    setIsPreviewPlaying(true);
    toast.info(`Playing ${chapter.title}`);
  };

  const handleLibraryToggle = () => {
    if (isInUserLibrary) {
      removeFromLibrary(book.id);
      setIsInUserLibrary(false);
      toast.success(t('removeFromLibrarySuccess') || "Book removed from library");
    } else {
      addToLibrary(book.id);
      setIsInUserLibrary(true);
      toast.success(t('addToLibrarySuccess') || "Book added to library");
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      toast.error("Please login to rate books");
      navigate('/login');
      return;
    }
    
    if (liked === true) {
      setLiked(null);
      toast.info(`Removed like from "${book.title}"`);
    } else {
      setLiked(true);
      toast.success(`You liked "${book.title}"`);
    }
  };

  const handleDislike = () => {
    if (!isLoggedIn) {
      toast.error("Please login to rate books");
      navigate('/login');
      return;
    }
    
    if (liked === false) {
      setLiked(null);
      toast.info(`Removed dislike from "${book.title}"`);
    } else {
      setLiked(false);
      toast.error(`You disliked "${book.title}"`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-foreground/70" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back')}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="flex flex-col items-center">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full max-w-[300px] rounded-lg shadow-lg mb-6 object-cover"
                />
                
                <div className="flex space-x-2 mb-4 w-full max-w-[300px]">
                  <Button 
                    variant={isInUserLibrary ? "default" : "outline"}
                    className="flex-1"
                    onClick={handleLibraryToggle}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {isInUserLibrary ? t('inLibrary') : t('addToLibrary')}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`${liked === true ? 'bg-green-500/20 text-green-500' : ''}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className={`h-5 w-5 ${liked === true ? 'fill-green-500' : ''}`} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`${liked === false ? 'bg-red-500/20 text-red-500' : ''}`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown className={`h-5 w-5 ${liked === false ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
                
                <div className="w-full max-w-[300px] space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t('author')}:</span>
                    <span className="font-medium">{book.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t('narrator')}:</span>
                    <span className="font-medium">{book.narrator || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t('duration')}:</span>
                    <span className="font-medium">{book.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t('category')}:</span>
                    <span className="font-medium">{book.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">{t('language')}:</span>
                    <span className="font-medium">English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-foreground/70">{t('by')} {book.author}</p>
            </div>
            
            <AudioBookPlayer 
              activeChapter={activeChapter}
              bookTitle={book.title}
              bookAuthor={book.author}
              coverImage={book.coverImage}
              bookId={book.id}
            />
            
            <div className="mt-8">
              <BookDetailTabs 
                chapters={mockChapters}
                activeChapter={activeChapter}
                onPlayChapter={handlePlayChapter}
                fullDescription={book.description || "No description available."}
                additionalText={book.additionalText}
                totalReviews={book.reviews || 0}
                rating={book.rating}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AudiobookDetails;
