import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Dados iniciais para seed com releaseDate removido temporariamente
const initialBooks = [
  {
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1603284569248-821525309698?q=80&w=1976&auto=format&fit=crop',
    duration: '21h 8m',
    rating: 4.8,
    category: 'Sci-Fi',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    // releaseDate removido
    narrator: 'Scott Brick',
    additionalText: 'Winner of the 1966 Hugo Award for Best Novel and widely considered one of the greatest science fiction novels of all time.',
    reviews: 12475,
    previewFile: 'https://example.com/audio/dune-preview.mp3',
    isPublished: true
  },
  // Remova o campo releaseDate de todos os outros livros também
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    duration: '5h 35m',
    rating: 4.9,
    category: 'Self-Help',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    // releaseDate removido
    narrator: 'James Clear',
    reviews: 8976,
    previewFile: 'https://example.com/audio/atomic-habits-preview.mp3',
    isPublished: true
  },
  // Restante dos livros...
];

// Usuário administrador inicial
const adminUser = {
  email: 'admin@hakim.com',
  password: 'admin123',
  username: 'Admin',
  role: 'ADMIN'
};

// Função principal para seed
async function main() {
  console.log('Iniciando seed...');

  // Adicionar usuário admin
  const hashedPassword = await bcrypt.hash(adminUser.password, 12);
  const admin = await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: {
      email: adminUser.email,
      password: hashedPassword,
      username: adminUser.username,
      role: adminUser.role
    }
  });

  console.log(`Usuário admin criado com ID: ${admin.id}`);

  // Adicionar livros
  for (const book of initialBooks) {
    const createdBook = await prisma.book.create({
      data: book
    });
    console.log(`Livro criado: ${createdBook.title}`);
  }

  console.log(`Seed concluído! ${initialBooks.length} livros foram adicionados.`);
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });