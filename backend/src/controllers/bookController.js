import prisma from '../db.js';

// Obter todos os livros com paginação
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Opcionalmente filtrar por categoria
    const whereClause = {};
    if (req.query.category) {
      whereClause.category = req.query.category;
    }

    // Adicionar filtro de publicação
    whereClause.isPublished = true;

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.book.count({ where: whereClause })
    ]);

    return res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return res.status(500).json({ message: 'Erro ao buscar livros' });
  }
};

// Obter livros por categoria
const getBooksByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: { 
          category,
          isPublished: true
        },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.book.count({ 
        where: { 
          category,
          isPublished: true
        }
      })
    ]);

    return res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar livros por categoria:', error);
    return res.status(500).json({ message: 'Erro ao buscar livros por categoria' });
  }
};

// Obter detalhes de um livro específico
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Se o livro não estiver publicado, apenas admins podem vê-lo
    if (!book.isPublished && (!req.user || req.user.role !== 'ADMIN')) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return res.status(500).json({ message: 'Erro ao buscar livro' });
  }
};

// Buscar livros
const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (!query || query.length < 2) {
      return res.status(400).json({ message: 'A busca deve ter pelo menos 2 caracteres' });
    }

    const whereClause = {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    };

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.book.count({ where: whereClause })
    ]);

    return res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return res.status(500).json({ message: 'Erro ao buscar livros' });
  }
};

// Obter livros em destaque (trending)
const getTrendingBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    // Aqui poderíamos implementar lógica mais complexa para determinar
    // quais livros estão em alta, baseado em visualizações, avaliações, etc.
    // Por simplicidade, vamos pegar os livros com maior rating
    const books = await prisma.book.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: [
        { rating: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error('Erro ao buscar livros em destaque:', error);
    return res.status(500).json({ message: 'Erro ao buscar livros em destaque' });
  }
};

// Obter novos lançamentos
const getNewReleases = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const books = await prisma.book.findMany({
      where: { isPublished: true },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error('Erro ao buscar novos lançamentos:', error);
    return res.status(500).json({ message: 'Erro ao buscar novos lançamentos' });
  }
};

export {
  getAllBooks,
  getBooksByCategory,
  getBookById,
  searchBooks,
  getTrendingBooks,
  getNewReleases
};