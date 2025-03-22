
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface CategoriesDropdownProps {
  categories: { name: string; path: string }[];
}

const CategoriesDropdown = ({ categories }: CategoriesDropdownProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-hakim-gray hover:text-hakim-light"
        >
          <span>{t('categories')}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start"
        className="bg-hakim-darkest border border-hakim-medium/20 rounded-md shadow-lg z-50 animate-fade-in py-1 w-56"
      >
        {categories.map((category) => (
          <DropdownMenuItem key={category.name} asChild>
            <Link
              to={category.path}
              className="block px-4 py-2 text-hakim-light hover:bg-hakim-dark text-sm"
              onClick={() => setOpen(false)}
            >
              {category.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;
