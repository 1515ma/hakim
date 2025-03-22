
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/use-language';
import ChaptersList from '@/components/book-details/ChaptersList';
import BookDescription from '@/components/book-details/BookDescription';
import BookReviews from '@/components/book-details/BookReviews';

interface ChapterType {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
}

interface Review {
  user: string;
  rating: number;
  date: string;
  text: string;
}

interface BookDetailTabsProps {
  chapters: ChapterType[];
  activeChapter: ChapterType | null;
  onPlayChapter: (chapter: ChapterType) => void;
  fullDescription: string;
  additionalText?: string;
  totalReviews: number;
  rating: number;
  reviews: Review[];
}

const BookDetailTabs = ({
  chapters,
  activeChapter,
  onPlayChapter,
  fullDescription,
  additionalText,
  totalReviews,
  rating,
  reviews
}: BookDetailTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="chapters" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="chapters">{t('chapters')}</TabsTrigger>
        <TabsTrigger value="description">{t('description')}</TabsTrigger>
        <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="chapters">
        <ChaptersList 
          chapters={chapters}
          activeChapter={activeChapter}
          onPlayChapter={onPlayChapter}
        />
      </TabsContent>
      
      <TabsContent value="description">
        <BookDescription 
          description={fullDescription}
          additionalText={additionalText}
        />
      </TabsContent>
      
      <TabsContent value="reviews">
        <BookReviews 
          totalReviews={totalReviews}
          rating={rating}
          reviews={reviews}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BookDetailTabs;
