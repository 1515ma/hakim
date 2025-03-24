import app from './app.js';
const PORT = process.env.PORT || 3001;

// Iniciar o servidor HTTP
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🔗 API disponível em http://localhost:${PORT}/api/health`);
});