import { z } from 'zod';

// Mensagens de validação padrão em português
z.config(z.locales.pt());

export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function validar(schema, dados) {
  const resultado = schema.safeParse(dados);
  if (!resultado.success) {
    throw new HttpError(400, 'Dados inválidos', z.flattenError(resultado.error).fieldErrors);
  }
  return resultado.data;
}

export const idParam = z.object({ id: z.uuid('ID inválido') });

/** Campos de texto opcionais: string vazia vira null (permite "apagar" o valor). */
export const textoOpcional = z
  .string()
  .trim()
  .transform((v) => (v === '' ? null : v))
  .nullable()
  .optional();

export const urlOpcional = z
  .union([z.literal(''), z.url('URL inválida'), z.string().startsWith('/uploads/')])
  .transform((v) => (v === '' ? null : v))
  .nullable()
  .optional();

export const uf = z
  .string()
  .trim()
  .length(2, 'Use a sigla do estado (ex.: SC)')
  .transform((v) => v.toUpperCase());

export function errorHandler(error, request, response, _next) {
  if (error instanceof HttpError) {
    response.status(error.status).json({ error: error.message, details: error.details });
    return;
  }
  if (error?.code === 'P2025') {
    response.status(404).json({ error: 'Registro não encontrado' });
    return;
  }
  if (error?.code === 'P2003') {
    response.status(409).json({ error: 'Registro está em uso e não pode ser removido' });
    return;
  }
  if (error?.name === 'MulterError') {
    response.status(400).json({ error: `Erro no upload: ${error.message}` });
    return;
  }
  if (error?.type === 'entity.parse.failed') {
    response.status(400).json({ error: 'JSON inválido' });
    return;
  }
  console.error(error);
  response.status(500).json({ error: 'Erro interno do servidor' });
}
