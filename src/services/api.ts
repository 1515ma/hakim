import axios from 'axios';
import { Book } from '@/types/book';
// Importar as funções de dados mockados para usar temporariamente
import { getAudiobooks, getBooksByCategory, getBookById, getTotalBooks, getTotalBooksByCategory } from '@/data/books';

// Verificar se estamos usando backend real ou dados mockados
const USE_MOCK_DATA = true; // Mude para false quando o backend estiver pronto

// Criar instância base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber erro 401 (não autorizado), redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API de autenticação
export const authAPI = {
  login: async (email: string, password: string) => {
    if (USE_MOCK_DATA) {
      // Simular login bem-sucedido com dados mockados
      const mockUser = {
        id: email === 'admin@hakim.com' ? '1' : '2',
        email,
        username: email.split('@')[0],
        role: email === 'admin@hakim.com' ? 'ADMIN' : 'USER'
      };
      
      const mockResponse = {
        user: mockUser,
        token: 'mock-jwt-token',
        hasActiveSubscription: email === 'admin@hakim.com'
      };
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  register: async (email: string, password: string, username?: string) => {
    if (USE_MOCK_DATA) {
      // Simular registro bem-sucedido com dados mockados
      const mockUser = {
        id: '3',
        email,
        username: username || email.split('@')[0],
        role: 'USER'
      };
      
      const mockResponse = {
        user: mockUser,
        token: 'mock-jwt-token',
        hasActiveSubscription: false
      };
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/auth/register', { email, password, username });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('previewPlaying');
    
    // Limpar bibliotecas específicas do usuário
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      localStorage.removeItem(`userLibrary_${user.id}`);
    }
  },

  getProfile: async () => {
    if (USE_MOCK_DATA) {
      // Retornar dados do usuário do localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return {
        data: {
          user,
          hasActiveSubscription: user.role === 'ADMIN',
          subscription: user.role === 'ADMIN' ? {
            planType: 'ANNUAL',
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          } : null
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    return api.get('/auth/profile');
  },
};

// API de audiolivros
export const booksAPI = {
  getAllBooks: async (page = 1, limit = 20, category?: string) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente
      const books = category 
        ? getBooksByCategory(category, page, limit) 
        : getAudiobooks(page, limit);
      
      const totalBooks = category 
        ? getTotalBooksByCategory(category) 
        : getTotalBooks();
      
      return {
        books,
        pagination: {
          page,
          limit,
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit)
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (category) params.append('category', category);

    const response = await api.get(`/books?${params.toString()}`);
    return response.data;
  },

  getBooksByCategory: async (category: string, page = 1, limit = 20) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente
      const books = getBooksByCategory(category, page, limit);
      const totalBooks = getTotalBooksByCategory(category);
      
      return {
        books,
        pagination: {
          page,
          limit,
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit)
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/books/category/${category}?${params.toString()}`);
    return response.data;
  },

  getBookById: async (id: string) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente
      const book = getBookById(id);
      if (!book) {
        throw new Error('Livro não encontrado');
      }
      return book;
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  searchBooks: async (query: string, page = 1, limit = 20) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente - filtragem simples
      const allBooks = getAudiobooks();
      const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        (book.category && book.category.toLowerCase().includes(query.toLowerCase()))
      );
      
      const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);
      
      return {
        books: paginatedBooks,
        pagination: {
          page,
          limit,
          totalBooks: filteredBooks.length,
          totalPages: Math.ceil(filteredBooks.length / limit)
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/books/search?${params.toString()}`);
    return response.data;
  },

  getTrendingBooks: async (limit = 5) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente - pegar livros aleatórios
      const allBooks = getAudiobooks();
      // Ordenar por avaliação mais alta (simulando trending)
      const sortedBooks = [...allBooks].sort((a, b) => b.rating - a.rating);
      return sortedBooks.slice(0, limit);
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('limit', limit.toString());

    const response = await api.get(`/books/trending?${params.toString()}`);
    return response.data;
  },

  getNewReleases: async (limit = 5) => {
    if (USE_MOCK_DATA) {
      // Usar dados mockados temporariamente - primeiros N livros
      const allBooks = getAudiobooks();
      return allBooks.slice(0, limit);
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('limit', limit.toString());

    const response = await api.get(`/books/new-releases?${params.toString()}`);
    return response.data;
  },
};

// API da biblioteca do usuário
export const libraryAPI = {
  getUserLibrary: async (page = 1, limit = 20) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Obter IDs dos livros na biblioteca do usuário
      const libraryKey = `userLibrary_${user.id}`;
      const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      
      // Obter detalhes dos livros
      const allBooks = getAudiobooks();
      const libraryBooks = allBooks.filter(book => libraryItems.includes(book.id));
      
      // Paginação
      const paginatedBooks = libraryBooks.slice((page - 1) * limit, page * limit);
      
      return {
        books: paginatedBooks,
        pagination: {
          page,
          limit,
          totalItems: libraryBooks.length,
          totalPages: Math.ceil(libraryBooks.length / limit)
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/library?${params.toString()}`);
    return response.data;
  },

  addToLibrary: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Adicionar à biblioteca do usuário
      const libraryKey = `userLibrary_${user.id}`;
      const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      
      if (!libraryItems.includes(bookId)) {
        libraryItems.push(bookId);
        localStorage.setItem(libraryKey, JSON.stringify(libraryItems));
      }
      
      return { message: 'Livro adicionado à biblioteca com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/library/add', { bookId });
    return response.data;
  },

  removeFromLibrary: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Remover da biblioteca do usuário
      const libraryKey = `userLibrary_${user.id}`;
      const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      const updatedItems = libraryItems.filter(id => id !== bookId);
      localStorage.setItem(libraryKey, JSON.stringify(updatedItems));
      
      return { message: 'Livro removido da biblioteca com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.delete(`/library/${bookId}`);
    return response.data;
  },

  checkBookInLibrary: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        return { inLibrary: false };
      }
      
      // Verificar biblioteca do usuário
      const libraryKey = `userLibrary_${user.id}`;
      const libraryItems = JSON.parse(localStorage.getItem(libraryKey) || '[]');
      return { inLibrary: libraryItems.includes(bookId) };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get(`/library/check/${bookId}`);
    return response.data;
  },
};

// API de avaliações (likes/dislikes)
export const ratingsAPI = {
  getUserRatings: async () => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Obter avaliações do usuário
      const likedKey = `likedBooks_${user.id}`;
      const dislikedKey = `dislikedBooks_${user.id}`;
      
      const likedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');
      const dislikedIds = JSON.parse(localStorage.getItem(dislikedKey) || '[]');
      
      // Obter detalhes dos livros
      const allBooks = getAudiobooks();
      const liked = allBooks.filter(book => likedIds.includes(book.id));
      const disliked = allBooks.filter(book => dislikedIds.includes(book.id));
      
      return { liked, disliked };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get('/ratings');
    return response.data;
  },

  rateBook: async (bookId: string, isLiked: boolean) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Obter avaliações atuais
      const likedKey = `likedBooks_${user.id}`;
      const dislikedKey = `dislikedBooks_${user.id}`;
      
      const likedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');
      const dislikedIds = JSON.parse(localStorage.getItem(dislikedKey) || '[]');
      
      // Adicionar à lista apropriada e remover da outra
      if (isLiked) {
        // Adicionar aos livros curtidos
        if (!likedIds.includes(bookId)) {
          likedIds.push(bookId);
        }
        // Remover dos livros não curtidos
        const newDislikedIds = dislikedIds.filter(id => id !== bookId);
        localStorage.setItem(likedKey, JSON.stringify(likedIds));
        localStorage.setItem(dislikedKey, JSON.stringify(newDislikedIds));
      } else {
        // Adicionar aos livros não curtidos
        if (!dislikedIds.includes(bookId)) {
          dislikedIds.push(bookId);
        }
        // Remover dos livros curtidos
        const newLikedIds = likedIds.filter(id => id !== bookId);
        localStorage.setItem(dislikedKey, JSON.stringify(dislikedIds));
        localStorage.setItem(likedKey, JSON.stringify(newLikedIds));
      }
      
      return { message: 'Livro avaliado com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/ratings', { bookId, isLiked });
    return response.data;
  },

  removeRating: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      // Remover das listas de avaliação
      const likedKey = `likedBooks_${user.id}`;
      const dislikedKey = `dislikedBooks_${user.id}`;
      
      const likedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');
      const dislikedIds = JSON.parse(localStorage.getItem(dislikedKey) || '[]');
      
      const newLikedIds = likedIds.filter(id => id !== bookId);
      const newDislikedIds = dislikedIds.filter(id => id !== bookId);
      
      localStorage.setItem(likedKey, JSON.stringify(newLikedIds));
      localStorage.setItem(dislikedKey, JSON.stringify(newDislikedIds));
      
      return { message: 'Avaliação removida com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.delete(`/ratings/${bookId}`);
    return response.data;
  },

  checkRating: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.id) {
        return { rated: false };
      }
      
      // Verificar avaliações
      const likedKey = `likedBooks_${user.id}`;
      const dislikedKey = `dislikedBooks_${user.id}`;
      
      const likedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');
      const dislikedIds = JSON.parse(localStorage.getItem(dislikedKey) || '[]');
      
      if (likedIds.includes(bookId)) {
        return { rated: true, isLiked: true };
      } else if (dislikedIds.includes(bookId)) {
        return { rated: true, isLiked: false };
      }
      
      return { rated: false };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get(`/ratings/check/${bookId}`);
    return response.data;
  },
};

// API de assinaturas
export const subscriptionAPI = {
  getCurrentSubscription: async () => {
    if (USE_MOCK_DATA) {
      // Obter o usuário atual
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Simular assinatura ativa para admin
      const hasActiveSubscription = user.role === 'ADMIN';
      
      return {
        hasActiveSubscription,
        subscription: hasActiveSubscription ? {
          id: '1',
          planType: 'ANNUAL',
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
          status: 'ACTIVE'
        } : null
      };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  createSubscription: async (planType: 'MONTHLY' | 'ANNUAL') => {
    if (USE_MOCK_DATA) {
      // Simular criação de assinatura
      const startDate = new Date();
      const endDate = new Date();
      
      if (planType === 'MONTHLY') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      
      const subscription = {
        id: Date.now().toString(),
        planType,
        startDate,
        endDate,
        status: 'ACTIVE'
      };
      
      // Atualizar o usuário para ter assinatura ativa
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('subscription_' + user.id, JSON.stringify(subscription));
      
      return {
        message: 'Assinatura criada com sucesso',
        subscription
      };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/subscriptions', { planType });
    return response.data;
  },

  cancelSubscription: async (subscriptionId: string) => {
    if (USE_MOCK_DATA) {
      // Simular cancelamento de assinatura
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.removeItem('subscription_' + user.id);
      
      return { message: 'Assinatura cancelada com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.put(`/subscriptions/cancel/${subscriptionId}`);
    return response.data;
  },

  checkAccess: async (bookId: string) => {
    if (USE_MOCK_DATA) {
      // Simular verificação de acesso
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const hasActiveSubscription = user.role === 'ADMIN' || 
                                  !!localStorage.getItem('subscription_' + user.id);
      
      return {
        hasAccess: hasActiveSubscription,
        requiresSubscription: true
      };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get(`/subscriptions/check-access/${bookId}`);
    return response.data;
  },
};

// API administrativa
export const adminAPI = {
  getAllBooks: async (page = 1, limit = 20) => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Retornar todos os livros
      const allBooks = getAudiobooks();
      const paginatedBooks = allBooks.slice((page - 1) * limit, page * limit);
      
      return {
        books: paginatedBooks,
        pagination: {
          page,
          limit,
          totalBooks: allBooks.length,
          totalPages: Math.ceil(allBooks.length / limit)
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/admin/books?${params.toString()}`);
    return response.data;
  },

  createBook: async (bookData: Partial<Book>) => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Simular criação de livro
      const newBook: Book = {
        id: Date.now().toString(),
        title: bookData.title || 'Sem título',
        author: bookData.author || 'Desconhecido',
        coverImage: bookData.coverImage || 'https://via.placeholder.com/300x450',
        duration: bookData.duration || '0h 0m',
        rating: bookData.rating || 0,
        category: bookData.category || '',
        description: bookData.description || 'Sem descrição',
        releaseDate: bookData.releaseDate || '',
        narrator: bookData.narrator || '',
        additionalText: bookData.additionalText || '',
        reviews: bookData.reviews || 0,
        // Salvar os livros adicionados no localStorage para simular persistência
        ...bookData
      };
      
      // Adicionar à lista de livros admin
      const adminBooks = JSON.parse(localStorage.getItem('adminBooks') || '[]');
      adminBooks.push(newBook);
      localStorage.setItem('adminBooks', JSON.stringify(adminBooks));
      
      return newBook;
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.post('/admin/books', bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<Book>) => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Simular atualização de livro
      const adminBooks = JSON.parse(localStorage.getItem('adminBooks') || '[]');
      const bookIndex = adminBooks.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error('Livro não encontrado');
      }
      
      const updatedBook = { ...adminBooks[bookIndex], ...bookData };
      adminBooks[bookIndex] = updatedBook;
      localStorage.setItem('adminBooks', JSON.stringify(adminBooks));
      
      return updatedBook;
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.put(`/admin/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string) => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Simular exclusão de livro
      const adminBooks = JSON.parse(localStorage.getItem('adminBooks') || '[]');
      const updatedBooks = adminBooks.filter(book => book.id !== id);
      localStorage.setItem('adminBooks', JSON.stringify(updatedBooks));
      
      return { message: 'Livro excluído com sucesso' };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.delete(`/admin/books/${id}`);
    return response.data;
  },

  getStatistics: async () => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Simular estatísticas
      const allBooks = getAudiobooks();
      const adminBooks = JSON.parse(localStorage.getItem('adminBooks') || '[]');
      
      // Gerar usuários mockados
      const mockUsers = [
        { id: '1', email: 'admin@hakim.com', username: 'Admin', role: 'ADMIN', createdAt: new Date().toISOString() },
        { id: '2', email: 'user@hakim.com', username: 'User', role: 'USER', createdAt: new Date().toISOString() }
      ];
      
      return {
        statistics: {
          totalBooks: allBooks.length + adminBooks.length,
          totalUsers: 2, // admin + user mockado
          totalActiveSubscriptions: 1 // apenas o admin
        },
        recentBooks: adminBooks.length > 0 ? adminBooks.slice(0, 5) : allBooks.slice(0, 5),
        recentUsers: mockUsers
      };
    }
    
    // Código real para quando o backend estiver pronto
    const response = await api.get('/admin/statistics');
    return response.data;
  },

  getAllUsers: async (page = 1, limit = 20) => {
    if (USE_MOCK_DATA) {
      // Verificar se o usuário é admin
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'ADMIN') {
        throw new Error('Acesso negado');
      }
      
      // Gerar usuários mockados
      const mockUsers = [
        { 
          id: '1', 
          email: 'admin@hakim.com', 
          username: 'Admin', 
          role: 'ADMIN', 
          createdAt: new Date().toISOString(),
          _count: { 
            library: 5, 
            subscriptions: 1 
          }
        },
        { 
          id: '2', 
          email: 'user@hakim.com', 
          username: 'User', 
          role: 'USER', 
          createdAt: new Date().toISOString(),
          _count: { 
            library: 2, 
            subscriptions: 0 
          }
        }
      ];
      
      return {
        users: mockUsers,
        pagination: {
          page: 1,
          limit: 20,
          totalUsers: mockUsers.length,
          totalPages: 1
        }
      };
    }
    
    // Código real para quando o backend estiver pronto
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },
};

export default api;