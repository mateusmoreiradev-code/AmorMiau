import { createHash, randomBytes } from 'node:crypto';
import { prisma } from './prisma.js';
import { HttpError } from './http.js';

const DURACAO_SESSAO_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias
const PERFIS_GESTORES = ['ADMINISTRADOR'];

export const hashToken = (token) => createHash('sha256').update(token).digest('hex');

export async function criarSessao(usuarioId) {
  const token = randomBytes(32).toString('base64url');
  const expiraEm = new Date(Date.now() + DURACAO_SESSAO_MS);
  await prisma.sessaoAutenticacao.create({
    data: { tokenHash: hashToken(token), usuarioId, expiraEm },
  });
  return { token, expiraEm };
}

function lerToken(request) {
  const header = request.get('authorization') ?? '';
  const [tipo, token] = header.split(' ');
  return tipo?.toLowerCase() === 'bearer' && token ? token : null;
}

/** Exige um dono do site logado (perfil ADMINISTRADOR). Não existe cadastro público de contas. */
export async function exigirGestor(request, _response, next) {
  const token = lerToken(request);
  if (!token) throw new HttpError(401, 'Faça login para continuar');

  const sessao = await prisma.sessaoAutenticacao.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { usuario: true },
  });

  if (!sessao || sessao.revogadaEm || sessao.expiraEm < new Date() || !sessao.usuario.ativo) {
    throw new HttpError(401, 'Sessão inválida ou expirada');
  }
  if (!PERFIS_GESTORES.includes(sessao.usuario.tipo)) {
    throw new HttpError(403, 'Sem permissão para esta ação');
  }

  request.usuario = sessao.usuario;
  request.sessaoId = sessao.id;
  next();
}

export const usuarioPublico = ({ id, nome, email, tipo }) => ({ id, nome, email, tipo });
