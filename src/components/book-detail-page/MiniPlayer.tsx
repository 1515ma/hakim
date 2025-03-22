
import AudioPlayer from '@/components/AudioPlayer';

interface MiniPlayerProps {
  show: boolean;
  chapterTitle: string;
  bookAuthor: string;
  coverImage: string;
}

const MiniPlayer = ({ show, chapterTitle, bookAuthor, coverImage }: MiniPlayerProps) => {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl">
      <div className="glass-effect border-t border-white/10">
        <AudioPlayer 
          title={chapterTitle}
          author={bookAuthor}
          coverImage={coverImage}
          miniPlayer={true}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
