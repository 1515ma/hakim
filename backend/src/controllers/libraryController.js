const prisma = require('../db');

// Obter todos os livros na biblioteca do usuário
const getUserLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [libraryEntries, totalItems] = await Promise.all([
      prisma.library.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { addedAt: 'desc' },
        include: { book: true }
      }),
      prisma.library.count({
        where: { userId }
      })
    ]);

    // Formatar a resposta para incluir apenas os livros
    const books = libraryEntries.map(entry => ({
      ...entry.book,
      addedAt: entry.addedAt
    }));

    return res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar biblioteca do usuário:', error);
    return res.status(500).json({ message: 'Erro ao buscar biblioteca do usuário' });
  }
};

// Adicionar livro à biblioteca
const addToLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    // Verificar se o livro existe
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verificar se o livro já está na biblioteca
    const existingEntry = await prisma.library.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    if (existingEntry) {
      return res.status(400).json({ message: 'Livro já está na biblioteca' });
    }

    // Adicionar livro à biblioteca
    await prisma.library.create({
      data: {
        userId,
        bookId
      }
    });

    return res.status(201).json({ message: 'Livro adicionado à biblioteca com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar livro à biblioteca:', error);
    return res.status(500).json({ message: 'Erro ao adicionar livro à biblioteca' });
  }
};

// Remover livro da biblioteca
const removeFromLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    // Verificar se o livro está na biblioteca
    const existingEntry = await prisma.library.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    if (!existingEntry) {
      return res.status(404).json({ message: 'Livro não encontrado na biblioteca' });
    }

    // Remover livro da biblioteca
    await prisma.library.delete({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    return res.status(200).json({ message: 'Livro removido da biblioteca com sucesso' });
  } catch (error) {
    console.error('Erro ao remover livro da biblioteca:', error);
    return res.status(500).json({ message: 'Erro ao remover livro da biblioteca' });
  }
};

// Verificar se um livro está na biblioteca do usuário
const checkBookInLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const existingEntry = await prisma.library.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId
        }
      }
    });

    return res.status(200).json({ inLibrary: !!existingEntry });
  } catch (error) {
    console.error('Erro ao verificar livro na biblioteca:', error);
    return res.status(500).json({ message: 'Erro ao verificar livro na biblioteca' });
  }
};

module.exports = {
  getUserLibrary,
  addToLibrary,
  removeFromLibrary,
  checkBookInLibrary
};