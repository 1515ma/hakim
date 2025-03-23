import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import LibraryCard from './LibraryCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { toast } from 'sonner';
import { useHakimAuth } from '@/context/HakimAuthContext';
interface LibraryGridProps {
  books: Book[];
}

const LibraryGrid = ({ books }: LibraryGridProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  
  // Atualiza os livros filtrados quando os livros ou a busca mudam
  useEffect(() => {
    if (!books) {
      setFilteredBooks([]);
      return;
    }
    
    // Filtra os livros baseado na busca
    const filtered = books.filter(book => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      const title = book.title?.toLowerCase() || '';
      const author = book.author?.toLowerCase() || '';
      const category = book.category?.toLowerCase() || '';
      
      return title.includes(query) || author.includes(query) || category.includes(query);
    });
    
    setFilteredBooks(filtered);
  }, [books, searchQuery]);
  
  // Handle removal from library
  // Handle removal from library
  const handleRemoveFromLibrary = (bookId: string) => {
    try {
      // Use the useHakimAuth hook for consistent user-specific library management
      const { user, removeFromLibrary } = useHakimAuth();
      
      if (!user?.id) {
        toast.error("User not logged in");
        return;
      }
      
      // Remove from localStorage using the user-specific key
      const libraryKey = `userLibrary_${user.id}`;
      const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      const updatedItems = libraryItems.filter((id: string) => id !== bookId);
      localStorage.setItem(libraryKey, JSON.stringify(updatedItems));
      
      // Also call the removeFromLibrary function from the context
      removeFromLibrary(bookId);
      
      // Update UI by filtering out the removed book
      setFilteredBooks(filteredBooks.filter(book => book.id !== bookId));
      
      toast.success(t('removeFromLibrary') || "Book removed from library");
    } catch (error) {
      console.error('Error removing book:', error);
      toast.error(t('errorRemovingFromLibrary') || "Failed to remove book");
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" />
        <Input
          className="pl-10 bg-background"
          placeholder={t('searchYourLibrary') || "Search your library..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <LibraryCard
              key={book.id}
              book={book}
              onRemove={() => handleRemoveFromLibrary(book.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-foreground/70">
            {searchQuery
              ? t('noResultsFound') || "No results found for your search"
              : t('noBookInLibrary') || "No books in your library yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LibraryGrid;