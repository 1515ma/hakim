import { verifyToken } from '../utils/jwt.js';
import prisma from '../db.js';

// Middleware para verificar se o usuário está autenticado
const authenticate = async (req, res, next) => {
  try {
    // Verificar se o token está presente no header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Não autorizado - Token não fornecido' });
    }

    // Extrair e verificar o token
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Verificar se o usuário existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado - Usuário não encontrado' });
    }

    // Adicionar o usuário ao objeto de requisição
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Não autorizado - ' + error.message });
  }
};

// Middleware para verificar se o usuário tem assinatura ativa
const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    });

    if (!activeSubscription) {
      return res.status(403).json({ 
        message: 'Acesso negado - Assinatura necessária',
        requiresSubscription: true
      });
    }

    req.subscription = activeSubscription;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar assinatura - ' + error.message });
  }
};

export {
  authenticate,
  checkSubscription
};