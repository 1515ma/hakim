const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');

// Todas as rotas administrativas requerem autenticação e role de admin
router.use(authenticate, isAdmin);

// Rotas de livros
router.get('/books', adminController.getAllBooks);
router.post('/books', adminController.createBook);
router.put('/books/:id', adminController.updateBook);
router.delete('/books/:id', adminController.deleteBook);

// Estatísticas do sistema
router.get('/statistics', adminController.getStatistics);

// Gerenciamento de usuários
router.get('/users', adminController.getAllUsers);

module.exports = router;