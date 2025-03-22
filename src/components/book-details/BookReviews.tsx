
import { useState } from 'react';
import { Star, User, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import ReviewForm from './ReviewForm';

interface Review {
  user: string;
  rating: number;
  date: string;
  text: string;
}

interface BookReviewsProps {
  totalReviews: number;
  rating: number;
  reviews: Review[];
}

const BookReviews = ({ totalReviews, rating, reviews: initialReviews }: BookReviewsProps) => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      toast.error(t('loginToReview'));
      return;
    }
    
    setShowReviewForm(true);
  };
  
  const handleSubmitReview = (review: { rating: number; text: string }) => {
    const newReview = {
      user: "You", // In a real app, this would come from user context
      rating: review.rating,
      date: t('justNow'),
      text: review.text
    };
    
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    toast.success(t('reviewSubmitted'));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-xl">{reviews.length} {t('reviews')}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 font-medium">{rating} {t('outOf5')}</span>
          </div>
        </div>
        <Button onClick={handleWriteReview}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {t('writeReview')}
        </Button>
      </div>
      
      {showReviewForm && (
        <ReviewForm 
          onCancel={() => setShowReviewForm(false)} 
          onSubmit={handleSubmitReview}
        />
      )}
      
      <div className="space-y-6">
        {reviews.length > 0 ? (
          <>
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-foreground/10 pb-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.user}</h4>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-foreground/70 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80">{review.text}</p>
              </div>
            ))}
            
            {reviews.length > 2 && (
              <Button variant="outline" className="w-full">{t('loadMoreReviews')}</Button>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-10 w-10 text-foreground/30 mb-4" />
            <p className="text-foreground/50">{t('noReviewsYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReviews;
