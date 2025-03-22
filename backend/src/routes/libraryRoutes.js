const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { authenticate } = require('../middleware/auth');

// Todas as rotas de biblioteca requerem autenticação
router.use(authenticate);

// Rotas da biblioteca
router.get('/', libraryController.getUserLibrary);
router.post('/add', libraryController.addToLibrary);
router.delete('/:bookId', libraryController.removeFromLibrary);
router.get('/check/:bookId', libraryController.checkBookInLibrary);

module.exports = router;