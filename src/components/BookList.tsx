import { ScrollArea } from "@/components/ui/scroll-area";
import BookListItem from "@/components/BookListItem";
import { Book } from "@/types/book";
import { useHakimAuth } from "@/context/HakimAuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

interface BookListProps {
  books: Book[];
  selectedBook: Book | undefined;
  onSelectBook: (book: Book) => void;
  onLibraryUpdate?: () => void;
}

const BookList = ({ books, selectedBook, onSelectBook, onLibraryUpdate }: BookListProps) => {
  const { isLoggedIn } = useHakimAuth();
  const navigate = useNavigate();
  
  // Verificação defensiva para garantir que books é um array
  if (!books || !Array.isArray(books) || books.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-foreground/70">No books available</p>
      </div>
    );
  }

  // Para não-logados, mostrar apenas uma prévia
  const displayBooks = isLoggedIn ? books : books.slice(0, 3);
  
  return (
    <div className="h-[60vh] md:h-[65vh] rounded-lg border border-hakim-medium/10 overflow-hidden flex flex-col">
      <ScrollArea className="flex-1 p-1">
        <div className="space-y-1 pr-3">
          {displayBooks.map((book, index) => {
            // Garantir que o book é válido antes de renderizar
            if (!book || !book.id) return null;
            
            return (
              <BookListItem
                key={book.id}
                book={book}
                isSelected={selectedBook ? selectedBook.id === book.id : false}
                isLast={index === displayBooks.length - 1}
                onSelect={onSelectBook}
                onLibraryUpdate={onLibraryUpdate}
              />
            );
          })}
        </div>
      </ScrollArea>
      
      {!isLoggedIn && books.length > 3 && (
        <div className="p-3 border-t border-hakim-medium/10 bg-hakim-dark/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-foreground/70 flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              <span>{books.length - 3} more books</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-xs h-8"
            >
              Login to see all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;