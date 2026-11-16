import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { HttpError, validar } from '../lib/http.js';
import { criarSessao, exigirGestor, usuarioPublico } from '../lib/auth.js';

const router = Router();

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email('E-mail inválido')),
  senha: z.string().min(1, 'Informe a senha'),
});

router.post('/login', async (request, response) => {
  const { email, senha } = validar(loginSchema, request.body);
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  const senhaOk = usuario ? await bcrypt.compare(senha, usuario.senhaHash) : false;

  if (!usuario || !senhaOk || !usuario.ativo) throw new HttpError(401, 'E-mail ou senha incorretos');

  const { token, expiraEm } = await criarSessao(usuario.id);
  response.json({ token, expiraEm, usuario: usuarioPublico(usuario) });
});

router.get('/me', exigirGestor, (request, response) => {
  response.json(usuarioPublico(request.usuario));
});

router.post('/logout', exigirGestor, async (request, response) => {
  await prisma.sessaoAutenticacao.update({
    where: { id: request.sessaoId },
    data: { revogadaEm: new Date() },
  });
  response.status(204).end();
});

export default router;
