// Cadastra animais, eventos, formas de doação, pet sitters e o texto "Sobre nós" de exemplo.
//
//   npm run exemplos            recria os exemplos (apaga só os exemplos anteriores)
//   npm run exemplos:remover    apaga os exemplos e mantém o que foi cadastrado pelo painel
//
// Os exemplos são reconhecidos pelas imagens em /uploads/exemplos/ (e pelos títulos, nas doações).
import 'dotenv/config';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { prisma } from './lib/prisma.js';
import { UPLOAD_DIR } from './lib/upload.js';
import { avatarPessoa, bannerEvento, retratoGato } from './exemplos/ilustracoes.js';
import { ANIMAIS, DOACOES, EVENTOS, PET_SITTERS, SOBRE } from './exemplos/dados.js';

const PASTA = join(UPLOAD_DIR, 'exemplos');
const PREFIXO = '/uploads/exemplos/';
const somenteRemover = process.argv.includes('--remover');

function salvarSvg(nome, svg) {
  writeFileSync(join(PASTA, `${nome}.svg`), svg);
  return `${PREFIXO}${nome}.svg`;
}

async function removerExemplos() {
  const animais = await prisma.animal.deleteMany({ where: { fotoUrl: { startsWith: PREFIXO } } });
  const eventos = await prisma.evento.deleteMany({ where: { imagemUrl: { startsWith: PREFIXO } } });
  const sitters = await prisma.petSitter.deleteMany({ where: { fotoUrl: { startsWith: PREFIXO } } });
  const doacoes = await prisma.formaDoacao.deleteMany({ where: { titulo: { in: DOACOES.map((d) => d.titulo) } } });
  // Etiquetas que ficaram sem nenhum animal
  await prisma.etiqueta.deleteMany({ where: { animais: { none: {} } } });
  const sobre = await prisma.conteudoPagina.findUnique({ where: { slug: 'sobre' } });
  if (sobre?.corpo === SOBRE.corpo) {
    await prisma.conteudoPagina.update({
      where: { slug: 'sobre' },
      data: { corpo: 'Escreva aqui a história do projeto. Este texto pode ser editado pelo painel.' },
    });
  }
  rmSync(PASTA, { recursive: true, force: true });
  console.log(`Exemplos removidos: ${animais.count} animais, ${eventos.count} eventos, ${doacoes.count} doações, ${sitters.count} pet sitters.`);
}

async function criarExemplos() {
  const admin = await prisma.usuario.findFirst({ where: { tipo: 'ADMINISTRADOR', ativo: true }, orderBy: { criadoEm: 'asc' } });
  if (!admin) {
    console.error('Nenhum administrador encontrado. Rode "npm run seed" antes.');
    process.exitCode = 1;
    return;
  }

  mkdirSync(PASTA, { recursive: true });

  for (const { arquivo, gato, etiquetas, ...animal } of ANIMAIS) {
    await prisma.animal.create({
      data: {
        especie: 'GATO',
        cidade: 'São Bento do Sul',
        estado: 'SC',
        situacao: 'DISPONIVEL',
        ...animal,
        dataNascimento: new Date(animal.dataNascimento),
        fotoUrl: salvarSvg(arquivo, retratoGato(arquivo, gato)),
        responsavelId: admin.id,
        etiquetas: {
          create: etiquetas.map((nome) => ({ etiqueta: { connectOrCreate: { where: { nome }, create: { nome } } } })),
        },
      },
    });
  }

  for (const { arquivo, banner, ...evento } of EVENTOS) {
    await prisma.evento.create({ data: { ...evento, imagemUrl: salvarSvg(arquivo, bannerEvento(arquivo, banner)) } });
  }

  await prisma.formaDoacao.createMany({ data: DOACOES });

  for (const { arquivo, avatar, ...sitter } of PET_SITTERS) {
    await prisma.petSitter.create({ data: { ...sitter, fotoUrl: salvarSvg(arquivo, avatarPessoa(arquivo, avatar)) } });
  }

  // Só preenche o "Sobre nós" se ainda estiver com o texto padrão (não sobrescreve texto real)
  const sobre = await prisma.conteudoPagina.findUnique({ where: { slug: 'sobre' } });
  if (!sobre || sobre.corpo.startsWith('Escreva aqui')) {
    await prisma.conteudoPagina.upsert({ where: { slug: 'sobre' }, create: { slug: 'sobre', ...SOBRE }, update: SOBRE });
  }

  console.log(`Exemplos criados: ${ANIMAIS.length} animais, ${EVENTOS.length} eventos, ${DOACOES.length} formas de doação, ${PET_SITTERS.length} pet sitters.`);
}

await removerExemplos();
if (!somenteRemover) await criarExemplos();
await prisma.$disconnect();
