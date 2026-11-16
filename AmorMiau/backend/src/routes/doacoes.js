import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { crudRouter } from '../lib/crud.js';
import { textoOpcional, urlOpcional } from '../lib/http.js';

const doacaoSchema = z.object({
  tipo: z.enum(['PIX', 'TRANSFERENCIA', 'DINHEIRO', 'ITENS', 'APADRINHAMENTO', 'OUTRO']),
  titulo: z.string().trim().min(1, 'Informe o título'),
  descricao: z.string().trim().min(1, 'Informe a descrição'),
  chavePix: textoOpcional,
  dadosBancarios: textoOpcional,
  link: urlOpcional,
  ordem: z.coerce.number().int(),
  ativo: z.boolean(),
});

export default crudRouter({
  model: prisma.formaDoacao,
  criar: doacaoSchema.extend({ ordem: z.coerce.number().int().default(0), ativo: z.boolean().default(true) }),
  atualizar: doacaoSchema.partial(),
  filtroPublico: { ativo: true },
  ordem: [{ ordem: 'asc' }, { criadoEm: 'asc' }],
});
