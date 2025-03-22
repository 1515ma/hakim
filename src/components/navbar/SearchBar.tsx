
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import type { Book } from '@/types/book';
import { getAudiobooks } from '@/data/books';

const SearchBar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allBooks = getAudiobooks();
    const filteredBooks = allBooks.filter(
      book => book.title.toLowerCase().includes(query) || 
              book.author.toLowerCase().includes(query)
    );
    
    setSearchResults(filteredBooks.slice(0, 5));
  }, [searchQuery]);

  const handleBookClick = (bookId: string) => {
    navigate(`/audiobook/${bookId}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="relative">
      {!isSearchOpen ? (
        <Button 
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="text-hakim-gray hover:text-hakim-light"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        <div className="absolute right-0 top-0 flex items-center">
          <div className="relative">
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchBooks')}
              className="w-[250px] pr-8"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={toggleSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute right-0 mt-2 w-[300px] max-h-[400px] overflow-y-auto bg-background border border-border rounded-md shadow-lg z-50">
          <div className="p-2">
            {searchResults.map((book) => (
              <div 
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className="flex items-center gap-3 p-2 hover:bg-accent/10 rounded-md cursor-pointer"
              >
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="h-12 w-8 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
