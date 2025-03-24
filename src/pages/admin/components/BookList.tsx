import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { adminAPI } from '@/services/api/api';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BookListProps {
  onUpdate?: () => void;
}

const BookList = ({ onUpdate }: BookListProps) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterPublished, setFilterPublished] = useState<boolean | null>(null);

  useEffect(() => {
    loadBooks();
  }, [page, filterPublished]);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const response = await adminAPI.getAllBooks(page);
      
      // Filtrar por estado de publicação se necessário
      let filteredBooks = response.books;
      if (filterPublished !== null) {
        filteredBooks = filteredBooks.filter(book => book.isPublished === filterPublished);
      }
      
      setBooks(filteredBooks);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      toast.error('Erro ao carregar livros');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/books/${id}`);
  };

  const handleView = (id: string) => {
    window.open(`/audiobook/${id}`, '_blank');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este audiolivro?')) {
      try {
        await adminAPI.deleteBook(id);
        toast.success('Audiolivro excluído com sucesso');
        loadBooks();
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error('Erro ao excluir audiolivro:', error);
        toast.error('Erro ao excluir audiolivro');
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadBooks();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFilterChange = (value: boolean | null) => {
    setFilterPublished(value);
    setPage(1);
  };

  const filteredBooks = searchQuery
    ? books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input
            placeholder="Buscar por título, autor ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit" size="sm">
            <Search className="h-4 w-4 mr-1" />
            Buscar
          </Button>
        </form>
        
        <div className="flex gap-2">
          <Button 
            variant={filterPublished === null ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilterChange(null)}
          >
            Todos
          </Button>
          <Button 
            variant={filterPublished === true ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilterChange(true)}
          >
            Publicados
          </Button>
          <Button 
            variant={filterPublished === false ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilterChange(false)}
          >
            Não Publicados
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Título</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Autor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Categoria</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avaliação</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-popover divide-y divide-border">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={book.coverImage} 
                          alt={book.title}
                          className="h-10 w-7 object-cover rounded mr-3" 
                        />
                        <div className="truncate max-w-[200px]">{book.title}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{book.author}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{book.category || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{book.rating.toFixed(1)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {book.isPublished ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rascunho
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(book.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(book.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(book.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="py-3 px-4 flex items-center justify-between border-t">
            <div className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Próxima
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">Nenhum audiolivro encontrado</p>
          <Button onClick={() => navigate('/admin/books/new')}>
            Adicionar Audiolivro
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookList;