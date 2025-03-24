// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Importar rotas
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Configurações iniciais
dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Middleware para disponibilizar o Prisma para as rotas
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Rotas da API
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

// Rota de teste para verificar se a API está funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando!' });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

export default app;