// Cria o usuário administrador e o conteúdo inicial da página "Sobre nós".
// Uso: npm run seed   (lê ADMIN_NOME, ADMIN_EMAIL e ADMIN_SENHA do .env)
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma.js';

const nome = process.env.ADMIN_NOME ?? 'Administrador AmorMiau';
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const senha = process.env.ADMIN_SENHA;

if (!email || !senha || senha.length < 8) {
  console.error('Defina ADMIN_EMAIL e ADMIN_SENHA (mínimo 8 caracteres) no .env antes de rodar o seed.');
  process.exit(1);
}

const senhaHash = await bcrypt.hash(senha, 12);
const admin = await prisma.usuario.upsert({
  where: { email },
  create: { nome, email, senhaHash, tipo: 'ADMINISTRADOR' },
  update: { nome, senhaHash, tipo: 'ADMINISTRADOR', ativo: true },
});
console.log(`Administrador pronto: ${admin.email}`);

await prisma.conteudoPagina.upsert({
  where: { slug: 'sobre' },
  create: {
    slug: 'sobre',
    titulo: 'Nossa história de amor pelos animais',
    subtitulo: 'Conheça a missão, a equipe e o propósito por trás do projeto AmorMiau.',
    corpo: 'Escreva aqui a história do projeto. Este texto pode ser editado pelo painel.',
  },
  update: {},
});
console.log('Página "sobre" pronta.');

await prisma.$disconnect();
