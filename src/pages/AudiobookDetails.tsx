import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookDetails from '@/components/BookDetails';
import { Book } from '@/types/book';
import { booksAPI } from '@/services/api/api';
import { useHakimAuth } from '@/context/HakimAuthContext';

const AudiobookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useHakimAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [libraryUpdated, setLibraryUpdated] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      if (!id) {
        navigate('/not-found');
        return;
      }

      try {
        setIsLoading(true);
        
        // Buscar detalhes do livro do backend
        const foundBook = await booksAPI.getBookById(id);
        
        if (!foundBook) {
          navigate('/not-found');
          return;
        }
        
        setBook(foundBook);
      } catch (error) {
        console.error('Erro ao carregar livro:', error);
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id, navigate]);

  // Função para notificar que a biblioteca foi atualizada
  const handleLibraryUpdate = () => {
    setLibraryUpdated(!libraryUpdated);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : book ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BookDetails 
              book={book} 
              onLibraryUpdate={handleLibraryUpdate}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/70">Audiolivro não encontrado</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default AudiobookDetails;