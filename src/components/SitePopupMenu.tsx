
import React, { useState } from 'react';
import { Info, Mail, BookOpen } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import AboutDialog from './dialogs/AboutDialog';
import ContactDialog from './dialogs/ContactDialog';
import BlogDialog from './dialogs/BlogDialog';

const SitePopupMenu = () => {
  const { t } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState({
    about: false,
    contact: false,
    blog: false
  });
  
  const openDialog = (dialog: 'about' | 'contact' | 'blog') => {
    setDialogOpen({ ...dialogOpen, [dialog]: true });
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-hakim-gray hover:text-hakim-light">
            {t('company')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="bg-hakim-darkest border border-hakim-medium/20 rounded-md shadow-lg z-50 animate-fade-in py-1 w-48"
        >
          <DropdownMenuItem onSelect={() => openDialog('about')} className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 text-hakim-light hover:bg-hakim-dark text-sm w-full">
              <Info className="h-4 w-4" />
              <span>{t('aboutUs')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openDialog('contact')} className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 text-hakim-light hover:bg-hakim-dark text-sm w-full">
              <Mail className="h-4 w-4" />
              <span>{t('contact')}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => openDialog('blog')} className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 text-hakim-light hover:bg-hakim-dark text-sm w-full">
              <BookOpen className="h-4 w-4" />
              <span>{t('blog')}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AboutDialog 
        open={dialogOpen.about} 
        onOpenChange={(open) => setDialogOpen(prev => ({ ...prev, about: open }))} 
      />
      <ContactDialog 
        open={dialogOpen.contact} 
        onOpenChange={(open) => setDialogOpen(prev => ({ ...prev, contact: open }))} 
      />
      <BlogDialog 
        open={dialogOpen.blog} 
        onOpenChange={(open) => setDialogOpen(prev => ({ ...prev, blog: open }))} 
      />
    </>
  );
};

export default SitePopupMenu;
