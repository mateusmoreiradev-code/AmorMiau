import { useEffect, useState } from 'react';

const CHAVE_TOKEN = 'amormiau_token';

export function lerToken() {
  try {
    return localStorage.getItem(CHAVE_TOKEN);
  } catch {
    return null;
  }
}

export function salvarToken(token) {
  try {
    if (token) localStorage.setItem(CHAVE_TOKEN, token);
    else localStorage.removeItem(CHAVE_TOKEN);
  } catch {
    // Navegador sem armazenamento: o login dura só até recarregar a página
  }
}

export class ApiError extends Error {
  constructor(status, mensagem, detalhes) {
    super(mensagem);
    this.status = status;
    this.detalhes = detalhes ?? {};
  }
}

/** Chama a API. `corpo` vira JSON; FormData é enviado como multipart. */
export async function api(caminho, { metodo = 'GET', corpo } = {}) {
  const headers = {};
  const token = lerToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let body;
  if (corpo instanceof FormData) body = corpo;
  else if (corpo !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(corpo);
  }

  let resposta;
  try {
    resposta = await fetch(`/api${caminho}`, { method: metodo, headers, body });
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor.');
  }

  if (resposta.status === 204) return null;
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new ApiError(resposta.status, dados?.error ?? 'Algo deu errado. Tente novamente.', dados?.details);
  }
  return dados;
}

export async function enviarImagem(arquivo) {
  const form = new FormData();
  form.append('imagem', arquivo);
  const { url } = await api('/uploads', { metodo: 'POST', corpo: form });
  return url;
}

/** Busca dados públicos ao montar o componente. */
export function useApi(caminho) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null });

  useEffect(() => {
    let ativo = true;
    api(caminho)
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((erro) => ativo && setEstado({ dados: null, carregando: false, erro }));
    return () => {
      ativo = false;
    };
  }, [caminho]);

  return estado;
}

export function formatarData(iso, opcoes = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(iso));
}

export function linkWhatsApp(telefone, mensagem) {
  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}
