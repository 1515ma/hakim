
import { useLanguage } from "@/hooks/use-language";

const ExploreHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('explore')}</h1>
      <p className="text-foreground/70">{t('popularAudiobooks')}</p>
    </div>
  );
};

export default ExploreHeader;
