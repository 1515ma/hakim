import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Todas as rotas administrativas requerem autenticação e permissão de admin
router.use(authenticate);
router.use(isAdmin);

// Rotas de livros
router.get('/books', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Buscar todos os livros, inclusive não publicados
    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.book.count()
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
    console.error('Erro ao buscar livros (admin):', error);
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Criar um novo livro
router.post('/books', async (req, res) => {
  try {
    const bookData = req.body;
    
    const newBook = await prisma.book.create({
      data: {
        title: bookData.title,
        author: bookData.author,
        coverImage: bookData.coverImage || '',
        duration: bookData.duration || '0h 0m',
        rating: Number(bookData.rating) || 0,
        category: bookData.category || null,
        description: bookData.description,
        releaseDate: bookData.releaseDate || null,
        narrator: bookData.narrator || null,
        additionalText: bookData.additionalText || null,
        reviews: Number(bookData.reviews) || 0,
        audioFile: bookData.audioFile || null,
        previewFile: bookData.previewFile || null,
        isPublished: bookData.isPublished || false
      }
    });
    
    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// Atualizar um livro
router.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = req.body;
    
    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    // Atualizar livro
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: bookData.title,
        author: bookData.author,
        coverImage: bookData.coverImage || existingBook.coverImage,
        duration: bookData.duration || existingBook.duration,
        rating: Number(bookData.rating) || existingBook.rating,
        category: bookData.category || existingBook.category,
        description: bookData.description,
        releaseDate: bookData.releaseDate || existingBook.releaseDate,
        narrator: bookData.narrator || existingBook.narrator,
        additionalText: bookData.additionalText || existingBook.additionalText,
        reviews: Number(bookData.reviews) || existingBook.reviews,
        audioFile: bookData.audioFile || existingBook.audioFile,
        previewFile: bookData.previewFile || existingBook.previewFile,
        isPublished: typeof bookData.isPublished === 'boolean' ? bookData.isPublished : existingBook.isPublished
      }
    });
    
    return res.json(updatedBook);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// Excluir um livro
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o livro existe
    const existingBook = await prisma.book.findUnique({ where: { id } });
    if (!existingBook) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    
    // Excluir livro
    await prisma.book.delete({ where: { id } });
    
    return res.json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});

// Obter estatísticas para o painel administrativo
router.get('/statistics', async (req, res) => {
  try {
    // Obter contagens
    const [totalBooks, totalUsers, totalActiveSubscriptions] = await Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.subscription.count({
        where: {
          status: 'ACTIVE'
        }
      })
    ]);
    
    // Obter livros recentes
    const recentBooks = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    // Obter usuários recentes
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    return res.json({
      statistics: {
        totalBooks,
        totalUsers,
        totalActiveSubscriptions
      },
      recentBooks,
      recentUsers
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
});

// Obter todos os usuários
router.get('/users', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Buscar usuários com contagem de relacionamentos
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            library: true,
            subscriptions: true
          }
        }
      }
    });

    const totalUsers = await prisma.user.count();

    return res.json({
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

export default router;