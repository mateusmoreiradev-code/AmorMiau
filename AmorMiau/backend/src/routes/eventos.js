import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { crudRouter } from '../lib/crud.js';
import { urlOpcional } from '../lib/http.js';

const eventoSchema = z.object({
  titulo: z.string().trim().min(1, 'Informe o título'),
  descricao: z.string().trim().min(1, 'Informe a descrição'),
  // null/'' viram undefined para não serem convertidos em 01/01/1970
  dataInicio: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.coerce.date({ error: 'Informe a data de início' })),
  dataFim: z.coerce.date().nullable().optional(),
  local: z.string().trim().min(1, 'Informe o local'),
  imagemUrl: urlOpcional,
  linkInscricao: urlOpcional,
  publicado: z.boolean(),
});

const consulta = z.object({ periodo: z.enum(['proximos', 'passados', 'todos']).catch('proximos') });

export default crudRouter({
  model: prisma.evento,
  criar: eventoSchema.extend({ publicado: z.boolean().default(true) }),
  atualizar: eventoSchema.partial(),
  filtroPublico: { publicado: true },
  // ?periodo=proximos (padrão) | passados | todos
  filtroLista: (query) => {
    const { periodo } = consulta.parse(query);
    const agora = new Date();
    if (periodo === 'proximos') {
      const inicioDoDia = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
      // Inclui eventos de hoje e eventos de vários dias ainda em andamento
      return { OR: [{ dataInicio: { gte: inicioDoDia } }, { dataFim: { gte: agora } }] };
    }
    if (periodo === 'passados') return { dataInicio: { lt: agora } };
    return {};
  },
  ordem: { dataInicio: 'asc' },
});
