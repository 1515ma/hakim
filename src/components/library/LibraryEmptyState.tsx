
import { useLanguage } from "@/hooks/use-language";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import { motion } from "framer-motion";

const LibraryEmptyState = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 bg-hakim-dark/10 rounded-xl"
    >
      <BookOpenText className="h-16 w-16 mx-auto mb-4 text-hakim-light/50" />
      <h2 className="text-xl font-semibold mb-2">{t('yourLibraryIsEmpty')}</h2>
      <p className="max-w-md mx-auto mb-6 text-foreground/70">
        {t('browseAudiobooksToAddToLibrary')}
      </p>
      <Button 
        onClick={() => navigate('/explore')}
        variant="default"
      >
        {t('exploreAudiobooks')}
      </Button>
    </motion.div>
  );
};

export default LibraryEmptyState;
