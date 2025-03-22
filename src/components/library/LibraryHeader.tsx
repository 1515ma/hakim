
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";

const LibraryHeader = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('library')}</h1>
      <p className="text-foreground/70">{t('yourSavedAudiobooks')}</p>
    </motion.div>
  );
};

export default LibraryHeader;
