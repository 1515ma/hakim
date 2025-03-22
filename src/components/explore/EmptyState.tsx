
import { useLanguage } from "@/hooks/use-language";

const EmptyState = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full py-10 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-foreground/70">{t('loading')}</p>
    </div>
  );
};

export default EmptyState;
