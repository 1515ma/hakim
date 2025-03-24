import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiobookCard from '@/components/AudiobookCard';
import { Button } from '@/components/ui/button';
import { booksAPI } from '@/services/api/api';
import { Book } from "@/types/book";
import { useLanguage } from "@/hooks/use-language";

const ITEMS_PER_PAGE = 20;

const AllAudiobooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    // Resetar estado quando a categoria mudar
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadBooks(1);
  }, [category]);

  const loadBooks = async (pageToLoad: number) => {
    if (loading) return;

    setLoading(true);
    try {
      // Fazer requisição para a API baseado na categoria
      const response = category 
        ? await booksAPI.getBooksByCategory(category, pageToLoad, ITEMS_PER_PAGE)
        : await booksAPI.getAllBooks(pageToLoad, ITEMS_PER_PAGE);
      
      const newBooks = response.books || [];
      
      // Atualizar o estado baseado na página
      if (pageToLoad === 1) {
        setBooks(newBooks);
      } else {
        setBooks(prev => [...prev, ...newBooks]);
      }
      
      // Verificar se há mais páginas
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages || 1);
        setHasMore(pageToLoad < response.pagination.totalPages);
      } else {
        setHasMore(newBooks.length === ITEMS_PER_PAGE);
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadBooks(nextPage);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-3xl font-semibold text-hakim-light mb-8">
          {category ? t(category.toLowerCase()) : t('allAudiobooks')}
        </h1>
        
        {books.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-foreground/70">
            {category 
                  ? t('noBooksInCategory') + ' ' + t(category.toLowerCase()) 
                  : t('noAudiobooksFound')}
            </p>
          </div>
        ) : (
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
                category={book.category || ''}
                index={index}
              />
            ))}
          </div>
        )}
        
        {loading && (
          <div className="w-full py-10 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-foreground/70">{t('loading')}</p>
          </div>
        )}
        
        {!hasMore && books.length > 0 && (
          <div className="w-full py-10 text-center text-foreground/70">
            {t('noMoreAudiobooks')}
          </div>
        )}
        
        {hasMore && !loading && (
          <div className="w-full py-10 text-center">
            <Button onClick={loadMore}>{t('loadMore')}</Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllAudiobooks;