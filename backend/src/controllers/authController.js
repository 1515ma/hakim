import bcrypt from 'bcryptjs';
import prisma from '../db.js';
import { generateToken } from '../utils/jwt.js';

// Registrar novo usuário
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Verificar se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar novo usuário
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username
      }
    });

    // Gerar token JWT
    const token = generateToken(newUser.id);

    // Retornar usuário (sem a senha) e token
    return res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const token = generateToken(user.id);

    // Verificar se o usuário tem assinatura ativa
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    });

    // Retornar usuário (sem a senha) e token
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      hasActiveSubscription: !!activeSubscription,
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

// Obter perfil do usuário logado
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar usuário com dados adicionais
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            library: true,
            ratings: true
          }
        }
      }
    });

    // Verificar se o usuário tem assinatura ativa
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: {
          gte: new Date()
        }
      }
    });

    return res.status(200).json({
      user,
      hasActiveSubscription: !!activeSubscription,
      subscription: activeSubscription
    });
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    return res.status(500).json({ message: 'Erro ao obter perfil' });
  }
};

export {
  register,
  login,
  getProfile
};