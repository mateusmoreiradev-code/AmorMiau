import { Router } from 'express';
import { exigirGestor } from './auth.js';
import { idParam, validar } from './http.js';

/**
 * Cria rotas REST padrão para um model do Prisma:
 *   GET    /           lista pública (apenas itens visíveis)
 *   GET    /admin      lista completa (gestor)
 *   GET    /:id        item (público se visível; gestor vê todos)
 *   POST   /           cria (gestor)
 *   PUT    /:id        atualiza (gestor)
 *   DELETE /:id        remove (gestor)
 */
export function crudRouter({ model, criar, atualizar, filtroPublico, filtroLista, ordem, mapear = (x) => x, aoCriar = (d) => d }) {
  const router = Router();

  router.get('/', async (request, response) => {
    const where = { ...filtroPublico, ...(filtroLista?.(request.query) ?? {}) };
    const itens = await model.findMany({ where, orderBy: ordem });
    response.json(itens.map(mapear));
  });

  router.get('/admin', exigirGestor, async (request, response) => {
    const itens = await model.findMany({ where: filtroLista?.(request.query) ?? {}, orderBy: ordem });
    response.json(itens.map(mapear));
  });

  router.get('/:id', async (request, response) => {
    const { id } = validar(idParam, request.params);
    const item = await model.findFirst({ where: { id, ...filtroPublico } });
    if (!item) {
      response.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    response.json(mapear(item));
  });

  router.post('/', exigirGestor, async (request, response) => {
    const dados = validar(criar, request.body);
    const item = await model.create({ data: aoCriar(dados, request) });
    response.status(201).json(mapear(item));
  });

  router.put('/:id', exigirGestor, async (request, response) => {
    const { id } = validar(idParam, request.params);
    const dados = validar(atualizar, request.body);
    const item = await model.update({ where: { id }, data: dados });
    response.json(mapear(item));
  });

  router.delete('/:id', exigirGestor, async (request, response) => {
    const { id } = validar(idParam, request.params);
    await model.delete({ where: { id } });
    response.status(204).end();
  });

  return router;
}
