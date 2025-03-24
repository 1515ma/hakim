import express from 'express';
import { getCurrentSubscription, createSubscription, cancelSubscription, checkAccess } from '../controllers/subscriptionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Todas as rotas de assinatura requerem autenticação
router.use(authenticate);

// Rotas de assinatura
router.get('/current', getCurrentSubscription);
router.post('/', createSubscription);
router.put('/cancel/:subscriptionId', cancelSubscription);
router.get('/check-access/:bookId', checkAccess);

export default router;