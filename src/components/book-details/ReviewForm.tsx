
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { toast } from 'sonner';

interface ReviewFormProps {
  onCancel: () => void;
  onSubmit: (review: { rating: number; text: string }) => void;
}

const ReviewForm = ({ onCancel, onSubmit }: ReviewFormProps) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error(t('pleaseSelectRating'));
      return;
    }
    
    if (!text.trim()) {
      toast.error(t('pleaseWriteReview'));
      return;
    }
    
    onSubmit({ rating, text });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-foreground/10 rounded-lg p-6 bg-foreground/5 animate-fade-in">
      <h3 className="text-lg font-medium mb-2">{t('writeYourReview')}</h3>
      
      <div className="space-y-2">
        <label className="block text-sm">{t('rating')}</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-colors"
            >
              <Star 
                className={`w-6 h-6 cursor-pointer ${
                  star <= (hoveredRating || rating) 
                    ? 'text-amber-400 fill-amber-400' 
                    : 'text-gray-300'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="review-text" className="block text-sm">{t('review')}</label>
        <Textarea 
          id="review-text"
          placeholder={t('shareYourThoughts')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          variant="outline" 
          type="button"
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>
        <Button type="submit">
          {t('submitReview')}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
