import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { crudRouter } from '../lib/crud.js';
import { textoOpcional, uf, urlOpcional } from '../lib/http.js';

const petSitterSchema = z.object({
  nome: z.string().trim().min(1, 'Informe o nome'),
  // Guardado só com dígitos e DDI (ex.: 5547999990000) para funcionar no link do WhatsApp
  telefone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido')),
  email: z
    .union([z.literal(''), z.email('E-mail inválido')])
    .transform((v) => v || null)
    .nullable()
    .optional(),
  cidade: z.string().trim().min(1, 'Informe a cidade'),
  estado: uf,
  regiao: textoOpcional,
  descricao: z.string().trim().min(1, 'Informe a descrição'),
  fotoUrl: urlOpcional,
  ativo: z.boolean(),
});

export default crudRouter({
  model: prisma.petSitter,
  criar: petSitterSchema.extend({ ativo: z.boolean().default(true) }),
  atualizar: petSitterSchema.partial(),
  filtroPublico: { ativo: true },
  // ?cidade=São Bento
  filtroLista: ({ cidade }) =>
    typeof cidade === 'string' && cidade.trim()
      ? { cidade: { contains: cidade.trim(), mode: 'insensitive' } }
      : {},
  ordem: { nome: 'asc' },
});
