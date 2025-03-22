
import { Headphones } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import { useLanguage } from '@/hooks/use-language';
import { useEffect } from 'react';

interface ChapterType {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
}

interface AudioBookPlayerProps {
  activeChapter: ChapterType | null;
  bookTitle: string;
  bookAuthor: string;
  coverImage: string;
  bookId?: string;
}

const AudioBookPlayer = ({ activeChapter, bookTitle, bookAuthor, coverImage, bookId }: AudioBookPlayerProps) => {
  const { t } = useLanguage();
  
  // Save playback info to localStorage when a chapter is played
  useEffect(() => {
    if (activeChapter && bookId) {
      // Save to localStorage to persist the mini player
      localStorage.setItem('previewPlaying', JSON.stringify({
        isPlaying: true,
        bookId: bookId,
        title: activeChapter.title,
        author: bookAuthor,
        coverImage: coverImage
      }));
    }
  }, [activeChapter, bookTitle, bookAuthor, coverImage, bookId]);
  
  if (activeChapter) {
    return (
      <AudioPlayer 
        title={activeChapter.title}
        author={bookAuthor}
        coverImage={coverImage}
      />
    );
  }
  
  return (
    <div className="glass rounded-xl p-8 text-center animate-pulse">
      <Headphones className="w-12 h-12 mx-auto mb-4 text-accent/70" />
      <p className="text-lg font-medium">{t('selectChapter')}</p>
    </div>
  );
};

export default AudioBookPlayer;
