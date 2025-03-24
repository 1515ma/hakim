import { PrismaClient } from '@prisma/client';
// Supondo que seu db.js exporte uma instância do PrismaClient
import prisma from '../db.js';

// Obter todos os livros (incluindo não publicados)
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.book.count()
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

// Criar novo livro
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      coverImage,
      duration,
      rating,
      category,
      description,
      releaseDate,
      narrator,
      additionalText,
      reviews,
      audioFile,
      previewFile,
      isPublished
    } = req.body;

    // Validar campos obrigatórios
    if (!title || !author || !description) {
      return res.status(400).json({ message: 'Campos obrigatórios: título, autor e descrição' });
    }

    // Criar novo livro
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        coverImage: coverImage || '', // URL da imagem de capa
        duration: duration || '0h 0m',
        rating: parseFloat(rating) || 0,
        category,
        description,
        releaseDate,
        narrator,
        additionalText,
        reviews: parseInt(reviews) || 0,
        audioFile,
        previewFile,
        isPublished: isPublished !== undefined ? isPublished : true
      }
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    return res.status(500).json({ message: 'Erro ao criar livro' });
  }
};

// Atualizar livro existente
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      coverImage,
      duration,
      rating,
      category,
      description,
      releaseDate,
      narrator,
      additionalText,
      reviews,
      audioFile,
      previewFile,
      isPublished
    } = req.body;

    // Verificar se o livro existe
    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Atualizar livro
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        coverImage,
        duration,
        rating: rating !== undefined ? parseFloat(rating) : undefined,
        category,
        description,
        releaseDate,
        narrator,
        additionalText,
        reviews: reviews !== undefined ? parseInt(reviews) : undefined,
        audioFile,
        previewFile,
        isPublished
      }
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    return res.status(500).json({ message: 'Erro ao atualizar livro' });
  }
};

// Excluir livro
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o livro existe
    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Excluir livro
    await prisma.book.delete({
      where: { id }
    });

    return res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    return res.status(500).json({ message: 'Erro ao excluir livro' });
  }
};

// Obter estatísticas do sistema
const getStatistics = async (req, res) => {
  try {
    const [
      totalBooks,
      totalUsers,
      totalActiveSubscriptions,
      recentBooks,
      recentUsers
    ] = await Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.subscription.count({
        where: {
          status: 'ACTIVE',
          endDate: {
            gte: new Date()
          }
        }
      }),
      prisma.book.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true
        }
      })
    ]);

    return res.status(200).json({
      statistics: {
        totalBooks,
        totalUsers,
        totalActiveSubscriptions
      },
      recentBooks,
      recentUsers
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
};

// Listar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          _count: {
            select: {
              library: true,
              subscriptions: {
                where: {
                  status: 'ACTIVE',
                  endDate: {
                    gte: new Date()
                  }
                }
              }
            }
          }
        }
      }),
      prisma.user.count()
    ]);

    return res.status(200).json({
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
    return res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// Modificado para usar export
export {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getStatistics,
  getAllUsers
};