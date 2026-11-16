import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { exigirGestor } from '../lib/auth.js';
import { idParam, textoOpcional, uf, urlOpcional, validar } from '../lib/http.js';

const router = Router();

/** Situações que aparecem na vitrine pública. */
const SITUACOES_VITRINE = ['DISPONIVEL', 'RESERVADO'];
const ESPECIES = ['GATO', 'CACHORRO', 'OUTRO'];
const SEXOS = ['FEMEA', 'MACHO', 'DESCONHECIDO'];
const SITUACOES = ['RASCUNHO', 'DISPONIVEL', 'RESERVADO', 'ADOTADO', 'ARQUIVADO'];
const include = { etiquetas: { include: { etiqueta: true } } };

const animalSchema = z.object({
  nome: z.string().trim().min(1, 'Informe o nome'),
  especie: z.enum(ESPECIES).default('GATO'),
  raca: textoOpcional,
  sexo: z.enum(SEXOS).default('DESCONHECIDO'),
  dataNascimento: z.coerce.date().nullable().optional(),
  descricao: z.string().trim().default(''),
  cidade: z.string().trim().min(1, 'Informe a cidade'),
  estado: uf,
  vacinado: z.boolean().default(false),
  castrado: z.boolean().default(false),
  situacao: z.enum(SITUACOES).default('DISPONIVEL'),
  fotoUrl: urlOpcional,
  etiquetas: z.array(z.string().trim().min(1)).max(10).optional(),
});

// Na atualização nenhum campo é obrigatório e não aplicamos defaults
// (senão um PUT parcial sobrescreveria, por exemplo, a situação).
const animalUpdateSchema = z.object({
  nome: z.string().trim().min(1, 'Informe o nome'),
  especie: z.enum(ESPECIES),
  raca: textoOpcional,
  sexo: z.enum(SEXOS),
  dataNascimento: z.coerce.date().nullable(),
  descricao: z.string().trim(),
  cidade: z.string().trim().min(1, 'Informe a cidade'),
  estado: uf,
  vacinado: z.boolean(),
  castrado: z.boolean(),
  situacao: z.enum(SITUACOES),
  fotoUrl: urlOpcional,
  etiquetas: z.array(z.string().trim().min(1)).max(10),
}).partial();

const filtrosSchema = z.object({
  especie: z.enum(ESPECIES).optional(),
  sexo: z.enum(SEXOS).optional(),
  cidade: z.string().trim().optional(),
  situacao: z.enum(SITUACOES).optional(),
});

function idadeTexto(dataNascimento) {
  if (!dataNascimento) return null;
  const hoje = new Date();
  let meses = (hoje.getFullYear() - dataNascimento.getFullYear()) * 12 + hoje.getMonth() - dataNascimento.getMonth();
  if (hoje.getDate() < dataNascimento.getDate()) meses -= 1;
  if (meses < 1) return 'Menos de 1 mês';
  if (meses < 12) return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  const anos = Math.floor(meses / 12);
  return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
}

function mapear({ etiquetas, ...animal }) {
  return {
    ...animal,
    idade: idadeTexto(animal.dataNascimento),
    etiquetas: etiquetas.map((e) => e.etiqueta.nome),
  };
}

/** Converte a lista de nomes em registros da tabela de ligação, criando etiquetas novas. */
function etiquetasData(nomes) {
  return [...new Set(nomes)].map((nome) => ({
    etiqueta: { connectOrCreate: { where: { nome }, create: { nome } } },
  }));
}

function whereFiltros(query) {
  const { especie, sexo, cidade, situacao } = validar(filtrosSchema, query);
  return {
    ...(especie && { especie }),
    ...(sexo && { sexo }),
    ...(situacao && { situacao }),
    ...(cidade && { cidade: { contains: cidade, mode: 'insensitive' } }),
  };
}

// Vitrine pública
router.get('/', async (request, response) => {
  const { situacao: _ignorada, ...filtros } = whereFiltros(request.query);
  const animais = await prisma.animal.findMany({
    where: { ...filtros, situacao: { in: SITUACOES_VITRINE } },
    include,
    orderBy: { criadoEm: 'desc' },
  });
  response.json(animais.map(mapear));
});

// Todos os animais, inclusive rascunhos e adotados (painel)
router.get('/admin', exigirGestor, async (request, response) => {
  const animais = await prisma.animal.findMany({
    where: whereFiltros(request.query),
    include,
    orderBy: { criadoEm: 'desc' },
  });
  response.json(animais.map(mapear));
});

router.get('/:id', async (request, response) => {
  const { id } = validar(idParam, request.params);
  const animal = await prisma.animal.findFirst({
    where: { id, situacao: { in: SITUACOES_VITRINE } },
    include,
  });
  if (!animal) {
    response.status(404).json({ error: 'Animal não encontrado' });
    return;
  }
  response.json(mapear(animal));
});

router.post('/', exigirGestor, async (request, response) => {
  const { etiquetas = [], ...dados } = validar(animalSchema, request.body);
  const animal = await prisma.animal.create({
    data: {
      ...dados,
      responsavelId: request.usuario.id,
      etiquetas: { create: etiquetasData(etiquetas) },
    },
    include,
  });
  response.status(201).json(mapear(animal));
});

router.put('/:id', exigirGestor, async (request, response) => {
  const { id } = validar(idParam, request.params);
  const { etiquetas, ...dados } = validar(animalUpdateSchema, request.body);
  const animal = await prisma.animal.update({
    where: { id },
    data: {
      ...dados,
      ...(etiquetas && { etiquetas: { deleteMany: {}, create: etiquetasData(etiquetas) } }),
    },
    include,
  });
  response.json(mapear(animal));
});

router.delete('/:id', exigirGestor, async (request, response) => {
  const { id } = validar(idParam, request.params);
  await prisma.animal.delete({ where: { id } });
  response.status(204).end();
});

export default router;
