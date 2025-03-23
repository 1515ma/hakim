import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface BookDescriptionProps {
  description: string;
  additionalText?: string;
}

const BookDescription = ({ description, additionalText = '' }: BookDescriptionProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Não mostrar botão "Read more" se não houver texto adicional
  const hasAdditionalText = additionalText && additionalText.trim().length > 0;
  const hasMoreContent = hasAdditionalText;
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${isExpanded ? '' : 'line-clamp-4'} text-hakim-light leading-relaxed`}>
        <p>{description || t('noDescription')}</p>
        
        {isExpanded && hasAdditionalText && (
          <div className="mt-4">
            <p>{additionalText}</p>
          </div>
        )}
      </div>
      
      {hasMoreContent && (
        <button
          className="mt-2 text-accent flex items-center text-sm hover:underline focus:outline-none"
          onClick={toggleExpanded}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              {t('readLess') || "Read Less"}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              {t('readMore') || "Read More"}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default BookDescription;