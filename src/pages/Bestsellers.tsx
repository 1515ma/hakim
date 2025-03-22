
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import BookList from "@/components/BookList";
import { getAudiobooks, bestsellers } from "@/data/books";
import { Book } from "@/types/book";

const Bestsellers = () => {
  const { t } = useLanguage();
  
  // Use the bestsellers export which is already available in the books.ts file
  const bestsellerBooks = bestsellers || [];
  
  // Add state to track the selected book with null-safety
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(
    bestsellerBooks.length > 0 ? bestsellerBooks[0] : undefined
  );

  // Handle book selection
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  // Make sure we have books before rendering
  if (bestsellerBooks.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-3xl font-semibold text-hakim-light mb-8">
            {t('bestsellers')}
          </h1>
          <p className="text-hakim-light">Loading bestsellers...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">
          {t('bestsellers')}
        </h1>
        <BookList 
          books={bestsellerBooks} 
          selectedBook={selectedBook}
          onSelectBook={handleSelectBook}
        />
      </div>
      <Footer />
    </>
  );
};

export default Bestsellers;
