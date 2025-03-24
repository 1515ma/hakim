// Versão ES Modules para bookRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
// Se estiver usando autenticação, use:
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @route GET /api/books
 * @desc Obter todos os livros paginados
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const category = req.query.category;
    const skip = (page - 1) * limit;
    
    // Opção 1: Use a variável whereCondition 
    const whereCondition = {
      isPublished: true
    };

    if (category) {
      whereCondition.category = category;
    }

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.book.count({ where: whereCondition })
    ]);

    return res.json({
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
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

/**
 * @route GET /api/books/:id
 * @desc Obter um livro pelo ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    return res.json(book);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    return res.status(500).json({ error: 'Erro ao buscar livro' });
  }
});

/**
 * @route GET /api/books/category/:category
 * @desc Obter livros por categoria
 * @access Public
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Filtrar por categoria e publicado
    const whereCondition = {
      category,
      isPublished: true
    };

    // Buscar livros e contar total para paginação
    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.book.count({ where: whereCondition })
    ]);

    return res.json({
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
    return res.status(500).json({ error: 'Erro ao buscar livros por categoria' });
  }
});

/**
 * @route GET /api/books/trending
 * @desc Obter livros em destaque (com maior avaliação)
 * @access Public
 */
router.get('/trending', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const books = await prisma.book.findMany({
      where: { isPublished: true },
      orderBy: [
        { rating: 'desc' },
        { reviews: 'desc' }
      ],
      take: limit
    });

    return res.json(books);
  } catch (error) {
    console.error('Erro ao buscar livros em destaque:', error);
    return res.status(500).json({ error: 'Erro ao buscar livros em destaque' });
  }
});

/**
 * @route GET /api/books/new-releases
 * @desc Obter novos lançamentos (mais recentes)
 * @access Public
 */
router.get('/new-releases', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const books = await prisma.book.findMany({
      where: { isPublished: true },
      orderBy: { id: 'desc' },
      take: limit
    });

    return res.json(books);
  } catch (error) {
    console.error('Erro ao buscar novos lançamentos:', error);
    return res.status(500).json({ error: 'Erro ao buscar novos lançamentos' });
  }
});

/**
 * @route GET /api/books/search
 * @desc Pesquisar livros por título, autor ou categoria
 * @access Public
 */
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ error: 'Termo de pesquisa não fornecido' });
    }

    // Buscar livros com pesquisa em múltiplos campos
    const books = await prisma.book.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { author: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      },
      skip,
      take: limit,
      orderBy: { rating: 'desc' }
    });

    // Contar total de livros que correspondem à pesquisa
    const totalBooks = await prisma.book.count({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { author: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      }
    });

    return res.json({
      books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao pesquisar livros:', error);
    return res.status(500).json({ error: 'Erro ao pesquisar livros' });
  }
});

export default router;