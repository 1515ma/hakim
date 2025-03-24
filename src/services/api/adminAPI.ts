import api from './api';
import { Book } from '@/types/book';

// API administrativa
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
  },

  // Adicione isso ao seu objeto adminAPI
    getAllUsers: async (page = 1, limit = 20) => {
        try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await api.get(`/admin/users?${params.toString()}`);
        return response.data;
        } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
        }
    }
};