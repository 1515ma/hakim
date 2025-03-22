import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpen, User, BarChart4 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { adminAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import BookList from './components/BookList';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalActiveSubscriptions: 0
  });

  useEffect(() => {
    // Verificar se o usuário é admin
    if (!isLoading && (!isLoggedIn || !isAdmin)) {
      toast.error('Acesso restrito a administradores');
      navigate('/');
      return;
    }

    // Carregar estatísticas iniciais
    loadStatistics();
  }, [isLoggedIn, isAdmin, isLoading, navigate]);

  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await adminAPI.getStatistics();
      setStatistics(data.statistics);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      toast.error('Erro ao carregar estatísticas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBook = () => {
    navigate('/admin/books/new');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 pt-28">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-foreground/70">
              Gerencie audiolivros, usuários e visualize estatísticas
            </p>
          </div>
          
          <Button
            className="mt-4 md:mt-0"
            onClick={handleCreateBook}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Audiolivro
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Audiolivros
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Usuários
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard 
              statistics={statistics} 
              onRefresh={loadStatistics} 
            />
          </TabsContent>
          
          <TabsContent value="books">
            <BookList onUpdate={loadStatistics} />
          </TabsContent>
          
          <TabsContent value="users">
            <UserList />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;