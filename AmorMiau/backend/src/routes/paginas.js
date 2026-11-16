import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { exigirGestor } from '../lib/auth.js';
import { textoOpcional, urlOpcional, validar } from '../lib/http.js';

const router = Router();

const slugParam = z.object({ slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug inválido') });

const conteudoSchema = z.object({
  titulo: z.string().trim().min(1, 'Informe o título'),
  subtitulo: textoOpcional,
  corpo: z.string().default(''),
  imagemUrl: urlOpcional,
});

// Ex.: GET /api/paginas/sobre
router.get('/:slug', async (request, response) => {
  const { slug } = validar(slugParam, request.params);
  const pagina = await prisma.conteudoPagina.findUnique({ where: { slug } });
  if (!pagina) {
    response.status(404).json({ error: 'Página não encontrada' });
    return;
  }
  response.json(pagina);
});

// Cria ou substitui o conteúdo da página (ex.: PUT /api/paginas/sobre)
router.put('/:slug', exigirGestor, async (request, response) => {
  const { slug } = validar(slugParam, request.params);
  const dados = validar(conteudoSchema, request.body);
  const pagina = await prisma.conteudoPagina.upsert({
    where: { slug },
    create: { slug, ...dados },
    update: dados,
  });
  response.json(pagina);
});

export default router;
