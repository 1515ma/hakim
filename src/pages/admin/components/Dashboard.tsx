import { useState, useEffect } from 'react';
import { BookOpen, Users, CreditCard, RefreshCw } from 'lucide-react';
import { adminAPI } from '@/services/api';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface DashboardProps {
  statistics: {
    totalBooks: number;
    totalUsers: number;
    totalActiveSubscriptions: number;
  };
  onRefresh: () => void;
}

const Dashboard = ({ statistics, onRefresh }: DashboardProps) => {
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  useEffect(() => {
    loadRecentBooks();
  }, []);

  const loadRecentBooks = async () => {
    try {
      setIsLoadingBooks(true);
      const data = await adminAPI.getStatistics();
      setRecentBooks(data.recentBooks);
    } catch (error) {
      console.error('Erro ao carregar livros recentes:', error);
      toast.error('Erro ao carregar livros recentes');
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const handleRefresh = () => {
    onRefresh();
    loadRecentBooks();
    toast.success('Estatísticas atualizadas');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar Estatísticas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total de Audiolivros</CardTitle>
              <CardDescription>Audiolivros na plataforma</CardDescription>
            </div>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalBooks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <CardDescription>Usuários registrados</CardDescription>
            </div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Assinaturas Ativas</CardTitle>
              <CardDescription>Assinantes atuais</CardDescription>
            </div>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalActiveSubscriptions}</div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Audiolivros Adicionados Recentemente</h3>
        
        {isLoadingBooks ? (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : recentBooks.length > 0 ? (
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Título</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Autor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Categoria</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-popover divide-y divide-border">
                  {recentBooks.map((book) => (
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
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {book.isPublished ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Rascunho
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Nenhum audiolivro recente encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;