import api from './api';

// API de audiolivros
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