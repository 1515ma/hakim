import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/use-language';
import { useHakimAuth } from '@/context/HakimAuthContext';
import { Book as BookType } from '@/types/book';
import LibraryGrid from '@/components/library/LibraryGrid';
import EmptyLibrary from '@/components/library/LibraryEmptyState';
import { getAudiobooks } from '@/data/books';

const Library = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useHakimAuth(); // Adicionamos user aqui
  const [libraryBooks, setLibraryBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redireciona para login se não estiver logado
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Carrega os livros da biblioteca (simulado por enquanto)
    const loadLibrary = async () => {
      try {
        setIsLoading(true);
        
        // Se não estiver logado, não carrega nada
        if (!isLoggedIn || !user?.id) {
          setLibraryBooks([]);
          setIsLoading(false);
          return;
        }
        
        // Obter IDs dos livros na biblioteca do usuário no localStorage
        const libraryKey = `userLibrary_${user.id}`;
        const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
        
        if (libraryItems.length === 0) {
          // Se a biblioteca estiver vazia, não carregar nenhum livro
          setLibraryBooks([]);
          setIsLoading(false);
          return;
        }
        
        // Obter todos os livros disponíveis
        const allBooks = getAudiobooks();
        
        // Filtrar apenas os livros que estão na biblioteca do usuário
        const userLibraryBooks = allBooks.filter(book => 
          libraryItems.includes(book.id)
        );
        
        // Simulando um pequeno atraso de carregamento
        setTimeout(() => {
          setLibraryBooks(userLibraryBooks);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Erro ao carregar biblioteca:', error);
        setIsLoading(false);
      }
    };

    loadLibrary();
  }, [isLoggedIn, navigate, user]); // Adicionamos user como dependência

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Book className="mr-3 h-6 w-6 text-accent" />
            {t('yourLibrary')}
          </h1>
          <p className="text-foreground/70">
            {t('yourLibraryDescription') || "Books you've added to your personal collection."}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : libraryBooks.length > 0 ? (
          <LibraryGrid books={libraryBooks} />
        ) : (
          <EmptyLibrary />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;