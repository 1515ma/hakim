
import { BookX } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

interface RemoveButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

const RemoveButton = ({ onClick, label, className = "" }: RemoveButtonProps) => {
  const { t } = useLanguage();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute top-2 right-2 bg-black/70 hover:bg-black/90 rounded-full p-1.5 
                 opacity-0 group-hover:opacity-100 transition-opacity z-10 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      title={label || t('removeFromCategory') || "Remove"}
      aria-label={label || t('removeFromCategory') || "Remove"}
    >
      <BookX className="h-3.5 w-3.5 text-white" />
    </Button>
  );
};

export default RemoveButton;
