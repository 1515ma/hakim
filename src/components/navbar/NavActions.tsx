
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  BookMarked, 
  ThumbsUp,
  Settings,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/use-language';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import SearchBar from './SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Language } from '@/translations/types';

const NavActions = () => {
  const { t, language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const renderToast = () => {
    toast("Soon...", {
      description: "This feature is under development.",
    });
  };

  const loginClickHandler = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    const languageNames = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      pt: 'Portuguese'
    };
    toast(`Language changed to ${languageNames[newLanguage]}`);
  };

  // Language selector dropdown
  const LanguageSelector = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <Globe className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 text-xs font-bold bg-accent text-accent-foreground w-4 h-4 flex items-center justify-center rounded-full">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent/20' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('es')}
          className={language === 'es' ? 'bg-accent/20' : ''}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('fr')}
          className={language === 'fr' ? 'bg-accent/20' : ''}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('de')}
          className={language === 'de' ? 'bg-accent/20' : ''}
        >
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('pt')}
          className={language === 'pt' ? 'bg-accent/20' : ''}
        >
          Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // User is not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <SearchBar />
        <LanguageSelector />
        <Button variant="default" size="sm" onClick={loginClickHandler}>
          {t('login')}
        </Button>
      </div>
    );
  }

  // User is logged in
  return (
    <div className="flex items-center gap-2">
      <SearchBar />
      <LanguageSelector />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-accent/10 text-accent">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/library')}>
            <BookMarked className="mr-2 h-4 w-4" />
            <span>{t('myLibrary')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/rated-books')}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span>{t('ratedBooks')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('settings')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavActions;
