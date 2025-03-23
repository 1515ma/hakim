const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware básico
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rota para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Hakim API está funcionando!' });
});

// Depois que está funcionando, adicione as rotas uma por uma para identificar qual está com problema
// Descomente uma rota por vez para testar
/*
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

const libraryRoutes = require('./routes/libraryRoutes');
app.use('/api/library', libraryRoutes);

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api/ratings', ratingRoutes);

const subscriptionRoutes = require('./routes/subscriptionRoutes');
app.use('/api/subscriptions', subscriptionRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
*/

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocorreu um erro no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = app;