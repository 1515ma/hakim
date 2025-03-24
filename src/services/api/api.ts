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

// API de audiolivros real (conectando com o backend)
export const booksAPI = {
  getAllBooks: async (page = 1, limit = 20, category?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (category) params.append('category', category);

      const response = await api.get(`/books?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  },

  getBooksByCategory: async (category: string, page = 1, limit = 20) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await api.get(`/books/category/${category}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros por categoria:', error);
      throw error;
    }
  },

  getBookById: async (id: string) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw error;
    }
  },

  getTrendingBooks: async (limit = 5) => {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit.toString());

      const response = await api.get(`/books/trending?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar livros em destaque:', error);
      throw error;
    }
  },

  getNewReleases: async (limit = 5) => {
    try {
      const params = new URLSearchParams();
      params.append('limit', limit.toString());

      const response = await api.get(`/books/new-releases?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar novos lançamentos:', error);
      throw error;
    }
  },

  searchBooks: async (query: string, page = 1, limit = 20) => {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await api.get(`/books/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao pesquisar livros:', error);
      throw error;
    }
  }
};
// API administrativa (adicione após o booksAPI)
export const adminAPI = {
  getAllBooks: async (page = 1, limit = 20) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await api.get(`/admin/books?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os livros:', error);
      throw error;
    }
  },

  createBook: async (bookData: Partial<Book>) => {
    try {
      const response = await api.post('/admin/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  },

  updateBook: async (id: string, bookData: Partial<Book>) => {
    try {
      const response = await api.put(`/admin/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  },

  deleteBook: async (id: string) => {
    try {
      const response = await api.delete(`/admin/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      throw error;
    }
  },

  getStatistics: async () => {
    try {
      const response = await api.get('/admin/statistics');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
};

export default api;