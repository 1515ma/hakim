
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/use-language";
import { getBooksByCategory } from "@/data/books";
import { Book } from "@/types/book";
import AudiobookCard from "@/components/AudiobookCard";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch books asynchronously to avoid UI freezing
    setLoading(true);
    
    setTimeout(() => {
      const categoryBooks = getBooksByCategory(category);
      setBooks(categoryBooks);
      setLoading(false);
    }, 0);
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">
          {category}
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-hakim-dark/30 aspect-[2/3] rounded-xl mb-3"></div>
                <div className="bg-hakim-dark/30 h-4 rounded w-2/3 mb-2"></div>
                <div className="bg-hakim-dark/30 h-3 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book, index) => (
              <Link key={book.id} to={`/book/${book.id}`}>
                <AudiobookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  coverImage={book.coverImage}
                  duration={book.duration}
                  rating={book.rating}
                  category={book.category}
                  index={index}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-hakim-light">No books found in this category.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
