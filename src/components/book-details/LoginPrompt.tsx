import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { LogIn } from "lucide-react";

const LoginPrompt = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="mt-6 p-4 rounded-lg border border-accent/20 bg-accent/5 animate-fade-in">
      <div className="flex items-center">
        <div className="flex-1">
          <h4 className="font-medium text-accent mb-1">
            {t('loginForMoreFeatures') || "Login for more features"}
          </h4>
          <p className="text-sm text-foreground/70">
            {t('loginPromptDescription') || "Sign in to add this book to your library, rate it, and access your personalized collection."}
          </p>
        </div>
        
        <div className="ml-4">
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => navigate('/login')}
          >
            <LogIn className="h-4 w-4 mr-1" />
            {t('signIn') || "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;