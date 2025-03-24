import express from 'express';
import { getUserLibrary, addToLibrary, removeFromLibrary, checkBookInLibrary } from '../controllers/libraryController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Todas as rotas de biblioteca requerem autenticação
router.use(authenticate);

// Rotas da biblioteca
router.get('/', getUserLibrary);
router.post('/add', addToLibrary);
router.delete('/:bookId', removeFromLibrary);
router.get('/check/:bookId', checkBookInLibrary);

export default router;