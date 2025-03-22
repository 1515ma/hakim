
import { useState, useEffect } from "react";
import { BookOpenText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { getBookById } from "@/data/books";
import { Book } from "@/types/book";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import LibraryEmptyState from "@/components/library/LibraryEmptyState";
import LibraryHeader from "@/components/library/LibraryHeader";
import RemovableAudiobookCard from "@/components/RemovableAudiobookCard";
import { toast } from "sonner";

const Library = () => {
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, library, removeFromLibrary } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchBooks = () => {
      const books: Book[] = [];
      library.forEach((bookId) => {
        const book = getBookById(bookId);
        if (book) books.push(book);
      });
      setLibraryBooks(books);
      setLoading(false);
    };

    fetchBooks();
  }, [library]);

  const handleRemoveFromLibrary = (bookId: string) => {
    removeFromLibrary(bookId);
    toast.success(t('removeFromLibrarySuccess') || "Book removed from your library");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        <LibraryHeader />
        
        {loading ? (
          <div className="w-full py-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">{t('loading')}</p>
          </div>
        ) : libraryBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {libraryBooks.map((book, index) => (
              <RemovableAudiobookCard 
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                coverImage={book.coverImage}
                duration={book.duration || "Unknown"}
                rating={book.rating}
                category={book.category || "Unknown"}
                index={index}
                onRemove={handleRemoveFromLibrary}
                removeLabel={t('removeFromLibrary') || "Remove from Library"}
              />
            ))}
          </div>
        ) : (
          <LibraryEmptyState />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
