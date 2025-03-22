const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Teste mínimo para identificar o problema
async function main() {
  console.log('Iniciando seed básico...');

  // Criar um usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@hakim.com',
      password: hashedPassword,
      username: 'Admin',
      role: 'ADMIN'
    }
  });

  console.log(`Usuário admin criado com ID: ${admin.id}`);

  // Criar um único livro básico
  const book = await prisma.book.create({
    data: {
      title: 'Livro de Teste',
      author: 'Autor Teste',
      coverImage: 'https://example.com/cover.jpg',
      duration: '2h 30m',
      rating: 4.5,
      category: 'Teste',
      description: 'Este é um livro de teste.',
      isPublished: true
    }
  });

  console.log(`Livro de teste criado: ${book.title}`);
  console.log('Seed básico concluído!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });