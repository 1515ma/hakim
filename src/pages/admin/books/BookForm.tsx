import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import { adminAPI, booksAPI } from '@/services/api';
import { Book } from '@/types/book';
import { toast } from 'sonner';

const BookForm = () => {
  const { id } = useParams();
  const isNewBook = id === 'new';
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [bookData, setBookData] = useState<Partial<Book>>({
    title: '',
    author: '',
    coverImage: '',
    duration: '',
    rating: 0,
    category: '',
    description: '',
    releaseDate: '',
    narrator: '',
    additionalText: '',
    reviews: 0,
    audioFile: '',
    previewFile: '',
    isPublished: true
  });

  useEffect(() => {
    // Verificar se o usuário é admin
    if (!isLoading && (!isLoggedIn || !isAdmin)) {
      toast.error('Acesso restrito a administradores');
      navigate('/');
      return;
    }

    const loadBook = async () => {
      if (isNewBook) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const book = await booksAPI.getBookById(id!);
        setBookData(book);
      } catch (error) {
        console.error('Erro ao carregar livro:', error);
        toast.error('Erro ao carregar livro');
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [id, isNewBook, isLoggedIn, isAdmin, navigate, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setBookData(prev => ({ ...prev, isPublished: checked }));
  };

  const handleSelectChange = (value: string) => {
    setBookData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookData.title || !bookData.author || !bookData.description) {
      toast.error('Por favor, preencha os campos obrigatórios');
      return;
    }

    try {
      setIsSaving(true);

      if (isNewBook) {
        await adminAPI.createBook(bookData);
        toast.success('Audiolivro criado com sucesso');
      } else {
        await adminAPI.updateBook(id!, bookData);
        toast.success('Audiolivro atualizado com sucesso');
      }

      navigate('/admin');
    } catch (error) {
      console.error('Erro ao salvar audiolivro:', error);
      toast.error('Erro ao salvar audiolivro');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isNewBook && confirm('Tem certeza que deseja excluir este audiolivro?')) {
      try {
        setIsSaving(true);
        await adminAPI.deleteBook(id!);
        toast.success('Audiolivro excluído com sucesso');
        navigate('/admin');
      } catch (error) {
        console.error('Erro ao excluir audiolivro:', error);
        toast.error('Erro ao excluir audiolivro');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handlePreview = () => {
    if (isNewBook || !id) return;
    window.open(`/audiobook/${id}`, '_blank');
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold">
              {isNewBook ? 'Adicionar Audiolivro' : 'Editar Audiolivro'}
            </h1>
          </div>
          
          <div className="flex gap-2">
            {!isNewBook && (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePreview}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDelete}
                  disabled={isSaving}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="author">Autor *</Label>
                <Input
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="coverImage">URL da Imagem de Capa</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={bookData.coverImage}
                  onChange={handleChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div>
                <Label htmlFor="narrator">Narrador</Label>
                <Input
                  id="narrator"
                  name="narrator"
                  value={bookData.narrator || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={bookData.category || ''} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiction">Ficção</SelectItem>
                    <SelectItem value="Fantasy">Fantasia</SelectItem>
                    <SelectItem value="Sci-Fi">Ficção Científica</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Mystery">Mistério</SelectItem>
                    <SelectItem value="Thriller">Suspense</SelectItem>
                    <SelectItem value="Horror">Terror</SelectItem>
                    <SelectItem value="Self-Help">Autoajuda</SelectItem>
                    <SelectItem value="Biography">Biografia</SelectItem>
                    <SelectItem value="History">História</SelectItem>
                    <SelectItem value="Business">Negócios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="duration">Duração</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={bookData.duration || ''}
                  onChange={handleChange}
                  placeholder="10h 30m"
                />
              </div>
              
              <div>
                <Label htmlFor="rating">Avaliação (0-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={bookData.rating || 0}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="releaseDate">Data de Lançamento</Label>
                <Input
                  id="releaseDate"
                  name="releaseDate"
                  value={bookData.releaseDate || ''}
                  onChange={handleChange}
                  placeholder="2023" 
                />
              </div>
              
              <div>
                <Label htmlFor="reviews">Número de Avaliações</Label>
                <Input
                  id="reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={bookData.reviews || 0}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="isPublished">Publicado</Label>
                <Switch
                  id="isPublished"
                  checked={bookData.isPublished}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                name="description"
                value={bookData.description || ''}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            
            <div>
              <Label htmlFor="additionalText">Texto Adicional</Label>
              <Textarea
                id="additionalText"
                name="additionalText"
                value={bookData.additionalText || ''}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="audioFile">URL do Arquivo de Áudio</Label>
              <Input
                id="audioFile"
                name="audioFile"
                value={bookData.audioFile || ''}
                onChange={handleChange}
                placeholder="https://exemplo.com/audio.mp3"
              />
            </div>
            
            <div>
              <Label htmlFor="previewFile">URL do Arquivo de Preview</Label>
              <Input
                id="previewFile"
                name="previewFile"
                value={bookData.previewFile || ''}
                onChange={handleChange}
                placeholder="https://exemplo.com/preview.mp3"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSaving}
              className="w-full md:w-auto"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isNewBook ? 'Criar Audiolivro' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookForm;