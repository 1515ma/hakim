import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiobookCard from '@/components/AudiobookCard';
import { Button } from '@/components/ui/button';
import { getAudiobooks } from '@/data/books';
import { Book } from "@/types/book";
import { useLanguage } from "@/hooks/use-language";

const ITEMS_PER_PAGE = 20;

const AllAudiobooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newBooks = getAudiobooks(page, ITEMS_PER_PAGE);

    if (newBooks.length < ITEMS_PER_PAGE) {
      setHasMore(false);
    }

    setBooks(prev => [...prev, ...newBooks]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">
          {t('allAudiobooks')}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book, index) => (
            <AudiobookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              duration={book.duration}
              rating={book.rating}
              category={book.category}
              index={index}
            />
          ))}
        </div>
        {loading && (
          <div className="w-full py-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">{t('loading')}</p>
          </div>
        )}
        {!hasMore && (
          <div className="w-full py-10 text-center text-foreground/70">
            {t('noMoreAudiobooks')}
          </div>
        )}
        {hasMore && !loading && (
          <Button onClick={loadMore}>{t('loadMore')}</Button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllAudiobooks;
