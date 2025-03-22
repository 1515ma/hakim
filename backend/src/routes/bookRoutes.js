const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate, checkSubscription } = require('../middleware/auth');

// Rotas públicas
router.get('/', bookController.getAllBooks);
router.get('/category/:category', bookController.getBooksByCategory);
router.get('/trending', bookController.getTrendingBooks);
router.get('/new-releases', bookController.getNewReleases);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);

// Rotas que requerem autenticação para acesso completo ao conteúdo
// Implementaremos lógica para verificar assinatura nas funcionalidades específicas

module.exports = router;