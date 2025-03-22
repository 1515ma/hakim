import axios from 'axios';
import { Book } from '@/types/book';

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
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  register: async (email: string, password: string, username?: string) => {
    const response = await api.post('/auth/register', { email, password, username });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('previewPlaying');
  },

  getProfile: async () => {
    return api.get('/auth/profile');
  },
};

// API de audiolivros
export const booksAPI = {
  getAllBooks: async (page = 1, limit = 20, category?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (category) params.append('category', category);

    const response = await api.get(`/books?${params.toString()}`);
    return response.data;
  },

  getBooksByCategory: async (category: string, page = 1, limit = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/books/category/${category}?${params.toString()}`);
    return response.data;
  },

  getBookById: async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  searchBooks: async (query: string, page = 1, limit = 20) => {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/books/search?${params.toString()}`);
    return response.data;
  },

  getTrendingBooks: async (limit = 5) => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());

    const response = await api.get(`/books/trending?${params.toString()}`);
    return response.data;
  },

  getNewReleases: async (limit = 5) => {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());

    const response = await api.get(`/books/new-releases?${params.toString()}`);
    return response.data;
  },
};

// API da biblioteca do usuário
export const libraryAPI = {
  getUserLibrary: async (page = 1, limit = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/library?${params.toString()}`);
    return response.data;
  },

  addToLibrary: async (bookId: string) => {
    const response = await api.post('/library/add', { bookId });
    return response.data;
  },

  removeFromLibrary: async (bookId: string) => {
    const response = await api.delete(`/library/${bookId}`);
    return response.data;
  },

  checkBookInLibrary: async (bookId: string) => {
    const response = await api.get(`/library/check/${bookId}`);
    return response.data;
  },
};

// API de avaliações (likes/dislikes)
export const ratingsAPI = {
  getUserRatings: async () => {
    const response = await api.get('/ratings');
    return response.data;
  },

  rateBook: async (bookId: string, isLiked: boolean) => {
    const response = await api.post('/ratings', { bookId, isLiked });
    return response.data;
  },

  removeRating: async (bookId: string) => {
    const response = await api.delete(`/ratings/${bookId}`);
    return response.data;
  },

  checkRating: async (bookId: string) => {
    const response = await api.get(`/ratings/check/${bookId}`);
    return response.data;
  },
};

// API de assinaturas
export const subscriptionAPI = {
  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  createSubscription: async (planType: 'MONTHLY' | 'ANNUAL') => {
    const response = await api.post('/subscriptions', { planType });
    return response.data;
  },

  cancelSubscription: async (subscriptionId: string) => {
    const response = await api.put(`/subscriptions/cancel/${subscriptionId}`);
    return response.data;
  },

  checkAccess: async (bookId: string) => {
    const response = await api.get(`/subscriptions/check-access/${bookId}`);
    return response.data;
  },
};

// API administrativa
export const adminAPI = {
  getAllBooks: async (page = 1, limit = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/admin/books?${params.toString()}`);
    return response.data;
  },

  createBook: async (bookData: Partial<Book>) => {
    const response = await api.post('/admin/books', bookData);
    return response.data;
  },

  updateBook: async (id: string, bookData: Partial<Book>) => {
    const response = await api.put(`/admin/books/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id: string) => {
    const response = await api.delete(`/admin/books/${id}`);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get('/admin/statistics');
    return response.data;
  },

  getAllUsers: async (page = 1, limit = 20) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },
};

export default api;