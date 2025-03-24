import prisma from '../db.js';

// Obter a assinatura atual do usuário
const getCurrentSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      },
      orderBy: {
        endDate: 'desc'
      }
    });

    return res.status(200).json({
      hasActiveSubscription: !!subscription,
      subscription
    });
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    return res.status(500).json({ message: 'Erro ao buscar assinatura' });
  }
};

// Criar nova assinatura (simulando pagamento)
const createSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planType } = req.body;

    if (!planType || !['MONTHLY', 'ANNUAL'].includes(planType)) {
      return res.status(400).json({ message: 'Tipo de plano inválido' });
    }

    // Calcular datas de início e fim
    const startDate = new Date();
    const endDate = new Date();
    
    if (planType === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Cancelar assinaturas ativas existentes
    await prisma.subscription.updateMany({
      where: {
        userId,
        status: 'ACTIVE'
      },
      data: {
        status: 'CANCELLED'
      }
    });

    // Criar nova assinatura
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planType,
        startDate,
        endDate,
        status: 'ACTIVE'
      }
    });

    return res.status(201).json({
      message: 'Assinatura criada com sucesso',
      subscription
    });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return res.status(500).json({ message: 'Erro ao criar assinatura' });
  }
};

// Cancelar assinatura
const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subscriptionId } = req.params;

    // Verificar se a assinatura existe e pertence ao usuário
    const subscription = await prisma.subscription.findFirst({
      where: {
        id: subscriptionId,
        userId,
        status: 'ACTIVE'
      }
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Assinatura não encontrada' });
    }

    // Cancelar assinatura
    await prisma.subscription.update({
      where: {
        id: subscriptionId
      },
      data: {
        status: 'CANCELLED'
      }
    });

    return res.status(200).json({ message: 'Assinatura cancelada com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    return res.status(500).json({ message: 'Erro ao cancelar assinatura' });
  }
};

// Verificar acesso a um conteúdo específico
const checkAccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    // Verificar se o livro existe
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Verificar se o usuário tem assinatura ativa
    const hasActiveSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    });

    return res.status(200).json({
      hasAccess: !!hasActiveSubscription,
      requiresSubscription: true
    });
  } catch (error) {
    console.error('Erro ao verificar acesso:', error);
    return res.status(500).json({ message: 'Erro ao verificar acesso' });
  }
};

export {
  getCurrentSubscription,
  createSubscription,
  cancelSubscription,
  checkAccess
};