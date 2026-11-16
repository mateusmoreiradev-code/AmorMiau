import { formatarData } from '../../api';

const opcoes = (mapa) => Object.entries(mapa).map(([valor, rotulo]) => ({ valor, rotulo }));

export const SITUACAO_ANIMAL = {
  DISPONIVEL: 'Disponível',
  RESERVADO: 'Reservado',
  ADOTADO: 'Adotado',
  RASCUNHO: 'Rascunho (oculto)',
  ARQUIVADO: 'Arquivado (oculto)',
};

export const TIPO_DOACAO = {
  PIX: 'Pix',
  TRANSFERENCIA: 'Transferência bancária',
  DINHEIRO: 'Dinheiro',
  ITENS: 'Itens (ração, areia, remédios...)',
  APADRINHAMENTO: 'Apadrinhamento',
  OUTRO: 'Outra',
};

/**
 * Cada recurso descreve a rota da API, os campos do formulário e como resumir um item na lista.
 * Tipos de campo: texto, textarea, data, dataHora, select, checkbox, imagem, etiquetas, numero.
 */
export const RECURSOS = {
  animais: {
    rotulo: 'Animais',
    singular: 'animal',
    rota: '/animais',
    novo: 'Novo animal',
    campos: [
      { nome: 'fotoUrl', rotulo: 'Foto', tipo: 'imagem' },
      { nome: 'nome', rotulo: 'Nome', tipo: 'texto', obrigatorio: true },
      { nome: 'situacao', rotulo: 'Situação', tipo: 'select', opcoes: opcoes(SITUACAO_ANIMAL), padrao: 'DISPONIVEL', ajuda: 'Só "Disponível" e "Reservado" aparecem na vitrine.' },
      { nome: 'especie', rotulo: 'Espécie', tipo: 'select', opcoes: opcoes({ GATO: 'Gato', CACHORRO: 'Cachorro', OUTRO: 'Outro' }), padrao: 'GATO', meia: true },
      { nome: 'sexo', rotulo: 'Sexo', tipo: 'select', opcoes: opcoes({ FEMEA: 'Fêmea', MACHO: 'Macho', DESCONHECIDO: 'Não informado' }), padrao: 'DESCONHECIDO', meia: true },
      { nome: 'dataNascimento', rotulo: 'Nascimento (aproximado)', tipo: 'data', meia: true, ajuda: 'Usado para mostrar a idade.' },
      { nome: 'raca', rotulo: 'Raça', tipo: 'texto', meia: true },
      { nome: 'etiquetas', rotulo: 'Características', tipo: 'etiquetas', ajuda: 'Separe por vírgula. Ex.: Tranquilo, Frajolinha' },
      { nome: 'descricao', rotulo: 'Descrição', tipo: 'textarea' },
      { nome: 'cidade', rotulo: 'Cidade', tipo: 'texto', obrigatorio: true, padrao: 'São Bento do Sul', meia: true },
      { nome: 'estado', rotulo: 'UF', tipo: 'texto', obrigatorio: true, padrao: 'SC', meia: true, maxLength: 2 },
      { nome: 'vacinado', rotulo: 'Vacinado', tipo: 'checkbox', meia: true },
      { nome: 'castrado', rotulo: 'Castrado', tipo: 'checkbox', meia: true },
    ],
    resumo: (a) => ({
      titulo: a.nome,
      subtitulo: [a.idade, a.etiquetas.join(', ')].filter(Boolean).join(' · '),
      imagem: a.fotoUrl,
      selo: SITUACAO_ANIMAL[a.situacao].replace(/ \(oculto\)/, ''),
      oculto: !['DISPONIVEL', 'RESERVADO'].includes(a.situacao),
    }),
  },

  eventos: {
    rotulo: 'Eventos',
    singular: 'evento',
    rota: '/eventos',
    consultaAdmin: '?periodo=todos',
    novo: 'Novo evento',
    campos: [
      { nome: 'imagemUrl', rotulo: 'Imagem', tipo: 'imagem' },
      { nome: 'titulo', rotulo: 'Título', tipo: 'texto', obrigatorio: true },
      { nome: 'dataInicio', rotulo: 'Início', tipo: 'dataHora', obrigatorio: true, meia: true },
      { nome: 'dataFim', rotulo: 'Término (opcional)', tipo: 'dataHora', meia: true },
      { nome: 'local', rotulo: 'Local', tipo: 'texto', obrigatorio: true },
      { nome: 'descricao', rotulo: 'Descrição', tipo: 'textarea', obrigatorio: true },
      { nome: 'linkInscricao', rotulo: 'Link de inscrição (opcional)', tipo: 'texto', placeholder: 'https://...', ajuda: 'Se preenchido, aparece o botão "Participar".' },
      { nome: 'publicado', rotulo: 'Publicado no site', tipo: 'checkbox', padrao: true },
    ],
    resumo: (e) => ({
      titulo: e.titulo,
      subtitulo: `${formatarData(e.dataInicio, { dateStyle: 'short', timeStyle: 'short' })} · ${e.local}`,
      imagem: e.imagemUrl,
      selo: !e.publicado ? 'Oculto' : new Date(e.dataFim ?? e.dataInicio) < new Date() ? 'Já aconteceu' : 'Publicado',
      oculto: !e.publicado,
    }),
  },

  doacoes: {
    rotulo: 'Doações',
    singular: 'forma de doação',
    rota: '/doacoes',
    novo: 'Nova forma de doação',
    semImagem: true,
    campos: [
      { nome: 'tipo', rotulo: 'Tipo', tipo: 'select', opcoes: opcoes(TIPO_DOACAO), padrao: 'PIX', meia: true },
      { nome: 'ordem', rotulo: 'Ordem na página', tipo: 'numero', padrao: 0, meia: true, ajuda: 'Menor aparece primeiro.' },
      { nome: 'titulo', rotulo: 'Título', tipo: 'texto', obrigatorio: true, placeholder: 'Ex.: Doe via Pix' },
      { nome: 'descricao', rotulo: 'Descrição', tipo: 'textarea', obrigatorio: true },
      { nome: 'chavePix', rotulo: 'Chave Pix (opcional)', tipo: 'texto', ajuda: 'Aparece com botão para copiar.' },
      { nome: 'dadosBancarios', rotulo: 'Dados bancários (opcional)', tipo: 'textarea', placeholder: 'Banco, agência, conta, titular...' },
      { nome: 'link', rotulo: 'Link (opcional)', tipo: 'texto', placeholder: 'https://...', ajuda: 'Ex.: vaquinha online ou lista de desejos.' },
      { nome: 'ativo', rotulo: 'Visível no site', tipo: 'checkbox', padrao: true },
    ],
    resumo: (d) => ({
      titulo: d.titulo,
      subtitulo: TIPO_DOACAO[d.tipo],
      selo: d.ativo ? 'Visível' : 'Oculto',
      oculto: !d.ativo,
    }),
  },

  petsitters: {
    rotulo: 'Pet sitters',
    singular: 'pet sitter',
    rota: '/petsitters',
    novo: 'Nova pet sitter',
    campos: [
      { nome: 'fotoUrl', rotulo: 'Foto', tipo: 'imagem' },
      { nome: 'nome', rotulo: 'Nome', tipo: 'texto', obrigatorio: true },
      { nome: 'telefone', rotulo: 'WhatsApp', tipo: 'texto', obrigatorio: true, meia: true, placeholder: '55 47 99999-0000', ajuda: 'Com DDI 55 e DDD.' },
      { nome: 'email', rotulo: 'E-mail (opcional)', tipo: 'texto', meia: true },
      { nome: 'cidade', rotulo: 'Cidade', tipo: 'texto', obrigatorio: true, padrao: 'São Bento do Sul', meia: true },
      { nome: 'estado', rotulo: 'UF', tipo: 'texto', obrigatorio: true, padrao: 'SC', meia: true, maxLength: 2 },
      { nome: 'regiao', rotulo: 'Bairro / região atendida (opcional)', tipo: 'texto' },
      { nome: 'descricao', rotulo: 'Descrição', tipo: 'textarea', obrigatorio: true },
      { nome: 'ativo', rotulo: 'Visível no site', tipo: 'checkbox', padrao: true },
    ],
    resumo: (p) => ({
      titulo: p.nome,
      subtitulo: `${p.cidade}/${p.estado} · ${p.telefone}`,
      imagem: p.fotoUrl,
      selo: p.ativo ? 'Visível' : 'Oculto',
      oculto: !p.ativo,
    }),
  },
};

// ---- Conversão entre o formato da API e os campos do formulário ----

const doisDigitos = (n) => String(n).padStart(2, '0');

function isoParaDataHoraLocal(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}T${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;
}

export function paraFormulario(campos, item) {
  return Object.fromEntries(
    campos.map(({ nome, tipo, padrao }) => {
      const valor = item ? item[nome] : padrao;
      if (tipo === 'checkbox') return [nome, Boolean(valor)];
      if (valor === null || valor === undefined) return [nome, ''];
      if (tipo === 'data') return [nome, valor.slice(0, 10)];
      if (tipo === 'dataHora') return [nome, isoParaDataHoraLocal(valor)];
      if (tipo === 'etiquetas') return [nome, valor.join(', ')];
      return [nome, valor];
    }),
  );
}

export function paraApi(campos, form) {
  return Object.fromEntries(
    campos.map(({ nome, tipo }) => {
      const valor = form[nome];
      if (tipo === 'data') return [nome, valor || null];
      if (tipo === 'dataHora') return [nome, valor ? new Date(valor).toISOString() : null];
      if (tipo === 'etiquetas') return [nome, valor.split(',').map((t) => t.trim()).filter(Boolean)];
      if (tipo === 'numero') return [nome, Number(valor) || 0];
      return [nome, valor];
    }),
  );
}
