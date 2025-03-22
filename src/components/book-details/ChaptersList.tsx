import { Play, Pause, Music, Clock, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useLanguage } from "@/hooks/use-language";

interface Chapter {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
}

interface ChaptersListProps {
  chapters: Chapter[];
  activeChapter: Chapter | null;
  onPlayChapter: (chapter: Chapter) => void;
}

const ChaptersList = ({ chapters, activeChapter, onPlayChapter }: ChaptersListProps) => {
  const [expandedChapters, setExpandedChapters] = useState(false);
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{t('allChapters')}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpandedChapters(!expandedChapters)}
          className="text-sm"
        >
          {expandedChapters ? t('collapse') : t('expand')}
          {expandedChapters ? <ChevronDown className="ml-1 w-4 h-4" /> : <ChevronRight className="ml-1 w-4 h-4" />}
        </Button>
      </div>
      
      <div className="space-y-3">
        {chapters.slice(0, expandedChapters ? undefined : 5).map((chapter) => (
          <div 
            key={chapter.id} 
            className={`rounded-lg p-4 flex items-center justify-between hover:bg-foreground/5 transition-colors cursor-pointer ${
              activeChapter?.id === chapter.id ? 'bg-accent/10 border border-accent/20' : 'border border-transparent'
            }`}
            onClick={() => onPlayChapter(chapter)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                {activeChapter?.id === chapter.id ? (
                  <Music className="w-5 h-5 text-accent" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-sm">{chapter.title}</h4>
                <div className="flex items-center text-xs text-foreground/70 space-x-3">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {chapter.duration}
                  </span>
                  {chapter.isFree && (
                    <span className="flex items-center text-green-600">
                      <Check className="w-3 h-3 mr-1" />
                      {t('freePreview')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-foreground/70">
              {activeChapter?.id === chapter.id ? (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Play className="h-4 w-4 ml-0.5" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        {!expandedChapters && chapters.length > 5 && (
          <Button 
            variant="outline" 
            className="w-full mt-2"
            onClick={() => setExpandedChapters(true)}
          >
            {t('showAllChapters')} ({chapters.length})
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChaptersList;
