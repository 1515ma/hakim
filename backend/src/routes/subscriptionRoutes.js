const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { authenticate } = require('../middleware/auth');

// Todas as rotas de assinatura requerem autenticação
router.use(authenticate);

// Rotas de assinatura
router.get('/current', subscriptionController.getCurrentSubscription);
router.post('/', subscriptionController.createSubscription);
router.put('/cancel/:subscriptionId', subscriptionController.cancelSubscription);
router.get('/check-access/:bookId', subscriptionController.checkAccess);

module.exports = router;