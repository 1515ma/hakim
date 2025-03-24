// Middleware para verificar se o usuário é um administrador
const isAdmin = (req, res, next) => {
  try {
    // O middleware authenticate já deve ter sido executado antes deste
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado - Faça login primeiro' });
    }

    // Verificar se o usuário tem a role de ADMIN
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acesso proibido - Permissão de administrador necessária' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar permissões de administrador' });
  }
};

export { isAdmin };