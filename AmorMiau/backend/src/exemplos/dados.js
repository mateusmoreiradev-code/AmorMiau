// Conteúdo fictício para demonstrar o site. Troque pelo conteúdo real pelo painel /admin.

const meses = (n) => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - n);
  return d.toISOString().slice(0, 10);
};

const GATOS = {
  laranja: { fundo: '#fde3c8', pelo: '#f0a35e', detalhe: '#d27a35', padrao: 'rajado', olhos: '#7cb342' },
  frajola: { fundo: '#d9ecf5', pelo: '#2f3038', focinho: '#ffffff', padrao: 'frajola', olhos: '#e9c46a' },
  siames: { fundo: '#e6e0f5', pelo: '#f3e6d3', detalhe: '#6b5345', padrao: 'siames', olhos: '#5aa9e6' },
  tricolor: { fundo: '#f8dcdc', pelo: '#ffffff', detalhe: '#e8954f', padrao: 'tricolor', olhos: '#9ccc65' },
  cinza: { fundo: '#dff0ea', pelo: '#9aa5b1', detalhe: '#77828e', padrao: 'rajado', olhos: '#f2c94c', piscando: true },
  preto: { fundo: '#fff1c9', pelo: '#2f3038', focinho: '#45464f', padrao: 'liso', olhos: '#f2c94c' },
  creme: { fundo: '#e3f1fb', pelo: '#f6d7a7', detalhe: '#e6b877', padrao: 'rajado', olhos: '#8d6e63' },
  branco: { fundo: '#e9f5d9', pelo: '#ffffff', focinho: '#fbeee6', padrao: 'liso', olhos: '#5aa9e6' },
  cinzaLiso: { fundo: '#fde2e4', pelo: '#b8c1cc', focinho: '#e7ebef', padrao: 'liso', olhos: '#e9c46a' },
};

export const ANIMAIS = [
  { arquivo: 'mel', gato: GATOS.laranja, nome: 'Mel', sexo: 'FEMEA', dataNascimento: meses(3), vacinado: true, etiquetas: ['Brincalhona', 'Carinhosa'], descricao: 'Filhote cheia de energia, adora correr atrás de bolinhas e dormir no colo depois.' },
  { arquivo: 'tom', gato: GATOS.frajola, nome: 'Tom', sexo: 'MACHO', dataNascimento: meses(18), vacinado: true, castrado: true, etiquetas: ['Tranquilo', 'Frajola'], descricao: 'Um cavalheiro: calmo, educado e ótimo com outros gatos.' },
  { arquivo: 'luna', gato: GATOS.siames, nome: 'Luna', sexo: 'FEMEA', dataNascimento: meses(32), vacinado: true, castrado: true, etiquetas: ['Calma', 'Gosta de colo'], descricao: 'Siamesa conversadeira que vai te seguir pela casa. Ideal para apartamento.' },
  { arquivo: 'pipoca', gato: GATOS.tricolor, nome: 'Pipoca', sexo: 'FEMEA', dataNascimento: meses(5), vacinado: true, etiquetas: ['Curiosa', 'Tricolor'], descricao: 'Explora cada cantinho da casa e faz amizade com todo mundo.' },
  { arquivo: 'fumaca', gato: GATOS.cinza, nome: 'Fumaça', sexo: 'MACHO', dataNascimento: meses(40), vacinado: true, castrado: true, situacao: 'RESERVADO', etiquetas: ['Dorminhoco', 'Independente'], descricao: 'Mestre das sonecas ao sol. Já está reservado, mas ainda dá para conhecer!' },
  { arquivo: 'nina', gato: GATOS.preto, nome: 'Nina', sexo: 'FEMEA', dataNascimento: meses(14), vacinado: true, castrado: true, etiquetas: ['Tímida', 'Pretinha'], descricao: 'No começo é tímida, mas depois de confiar vira a sombra do tutor.' },
  { arquivo: 'biscoito', gato: GATOS.creme, nome: 'Biscoito', sexo: 'MACHO', dataNascimento: meses(2), etiquetas: ['Filhote', 'Agitado'], descricao: 'O mais novo da turma. Vai precisar de paciência e muitos brinquedos.' },
  { arquivo: 'algodao', gato: GATOS.branco, nome: 'Algodão', sexo: 'MACHO', dataNascimento: meses(26), vacinado: true, castrado: true, etiquetas: ['Carinhoso', 'Olhos azuis'], descricao: 'Fofo como o nome. Adora carinho atrás das orelhas.' },
  { arquivo: 'chico', gato: GATOS.cinzaLiso, nome: 'Chico', sexo: 'MACHO', dataNascimento: meses(20), vacinado: true, castrado: true, situacao: 'ADOTADO', etiquetas: ['Adotado'], descricao: 'Encontrou um lar! Fica só no painel como histórico.' },
];

const data = (dias, hora) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return new Date(`${d.toISOString().slice(0, 10)}T${hora}:00-03:00`);
};

export const EVENTOS = [
  {
    arquivo: 'evento-feira-natal',
    banner: { fundo1: '#bfe6f4', fundo2: '#fbe2d6', bandeiras: ['#e98682', '#1b668c', '#f2c94c'], gato: GATOS.laranja },
    titulo: 'Feira de Adoção de Fim de Ano',
    descricao: 'Venha conhecer pessoalmente nossos gatinhos! Teremos voluntários para tirar dúvidas sobre adoção responsável.',
    dataInicio: data(26, '09:00'),
    dataFim: data(26, '16:00'),
    local: 'Praça Central, São Bento do Sul',
    linkInscricao: 'https://example.com/inscricao-feira',
  },
  {
    arquivo: 'evento-bazar',
    banner: { fundo1: '#fde2e4', fundo2: '#fff1c9', bandeiras: ['#1b668c', '#8bc6dc', '#e98682'], gato: GATOS.frajola },
    titulo: 'Bazar Solidário AmorMiau',
    descricao: 'Roupas, livros e artesanato com renda 100% revertida para ração e atendimento veterinário.',
    dataInicio: data(19, '10:00'),
    dataFim: data(19, '18:00'),
    local: 'Salão da comunidade, Centro',
  },
  {
    arquivo: 'evento-castracao',
    banner: { fundo1: '#dff0ea', fundo2: '#d9ecf5', bandeiras: ['#77b39a', '#f2c94c', '#1b668c'], gato: GATOS.cinza },
    titulo: 'Mutirão de Castração',
    descricao: 'Castração a preço social em parceria com clínicas veterinárias. Vagas limitadas, inscreva-se com antecedência.',
    dataInicio: data(68, '08:00'),
    local: 'Clínica veterinária parceira, Centro',
    linkInscricao: 'https://example.com/mutirao-castracao',
  },
  {
    arquivo: 'evento-primavera',
    banner: { fundo1: '#e9f5d9', fundo2: '#fde3c8', bandeiras: ['#e98682', '#77b39a', '#f2c94c'], gato: GATOS.tricolor },
    titulo: 'Feira de Adoção de Primavera',
    descricao: 'Edição que já aconteceu: aparece só no painel e em ?periodo=passados.',
    dataInicio: data(-37, '09:00'),
    dataFim: data(-37, '15:00'),
    local: 'Praça Central, São Bento do Sul',
  },
  {
    arquivo: 'evento-voluntarios',
    banner: { fundo1: '#e6e0f5', fundo2: '#d9ecf5', bandeiras: ['#6b5345', '#e98682', '#1b668c'], gato: GATOS.siames },
    titulo: 'Encontro de voluntários',
    descricao: 'Evento interno, ainda não publicado (fica oculto no site).',
    dataInicio: data(90, '19:00'),
    local: 'Sede AmorMiau',
    publicado: false,
  },
];

export const DOACOES = [
  { tipo: 'PIX', ordem: 1, titulo: 'Doe via Pix', descricao: 'Rápido e sem taxas. Qualquer valor ajuda a manter ração, areia e consultas em dia.', chavePix: 'doacoes@amormiau.example' },
  { tipo: 'TRANSFERENCIA', ordem: 2, titulo: 'Transferência bancária', descricao: 'Prefere TED ou depósito? Use os dados abaixo.', dadosBancarios: 'Banco Exemplo (000)\nAgência 0001 · Conta corrente 12345-6\nAssociação AmorMiau (dados fictícios)' },
  { tipo: 'ITENS', ordem: 3, titulo: 'Ração, areia e remédios', descricao: 'Aceitamos ração (filhote e adulto), areia sanitária, vermífugos, cobertores e caixas de transporte. Entregue em nossos eventos ou combine pelo WhatsApp.' },
  { tipo: 'APADRINHAMENTO', ordem: 4, titulo: 'Apadrinhe um gatinho', descricao: 'Com uma contribuição mensal você cobre os custos de um gato até ele encontrar um lar, e recebe fotos e notícias dele.', link: 'https://example.com/apadrinhamento' },
  { tipo: 'OUTRO', ordem: 5, titulo: 'Seja voluntário', descricao: 'Lar temporário, transporte, fotos para divulgação ou ajuda nas feiras: toda mão faz diferença.' },
];

export const PET_SITTERS = [
  { arquivo: 'sitter-ana', avatar: { fundo: '#d7eef7', pele: '#e8b996', cabelo: '#4a3226', roupa: '#1b668c', cabeloLongo: true, gato: GATOS.frajola }, nome: 'Ana Paula Souza', telefone: '5547900000001', email: 'ana@example.com', cidade: 'São Bento do Sul', estado: 'SC', regiao: 'Centro', descricao: 'Visitas diárias com alimentação, limpeza da caixinha e muita brincadeira. Envio fotos a cada visita.' },
  { arquivo: 'sitter-carla', avatar: { fundo: '#fde2e4', pele: '#8d5b3e', cabelo: '#1f1a17', roupa: '#e98682', cabeloLongo: true, gato: GATOS.laranja }, nome: 'Carla Mendes', telefone: '5547900000002', cidade: 'São Bento do Sul', estado: 'SC', regiao: 'Zona Norte', descricao: 'Veterinária em formação. Experiência com gatos idosos e administração de medicamentos.' },
  { arquivo: 'sitter-joao', avatar: { fundo: '#dff0ea', pele: '#f1c8a6', cabelo: '#b5651d', roupa: '#77b39a', gato: GATOS.cinza }, nome: 'João Pedro Lima', telefone: '5547900000003', email: 'joao@example.com', cidade: 'São Bento do Sul', estado: 'SC', regiao: 'Zona Sul', descricao: 'Tutor de três gatos resgatados. Atendo finais de semana e feriados.' },
  { arquivo: 'sitter-marina', avatar: { fundo: '#fff1c9', pele: '#d9a07a', cabelo: '#6b3e26', roupa: '#6b5345', cabeloLongo: true, gato: GATOS.siames }, nome: 'Marina Costa', telefone: '5547900000004', cidade: 'Rio Negrinho', estado: 'SC', descricao: 'Hospedagem domiciliar em ambiente telado, para quem vai viajar por vários dias.' },
];

export const SOBRE = {
  titulo: 'Nossa história de amor pelos animais',
  subtitulo: 'Conheça a missão, a equipe e o propósito por trás do projeto AmorMiau.',
  corpo: `O AmorMiau nasceu da vontade de um grupo de amigos de dar uma segunda chance a gatos abandonados. O que começou com um resgate na rua de casa virou uma rede de voluntários, lares temporários e parceiros.

Cada gato que chega até nós é avaliado por um veterinário, vacinado, vermifugado e castrado na idade certa. Só então ele vai para a vitrine, pronto para encontrar uma família.

Acreditamos em adoção responsável: conversamos com cada interessado, explicamos os cuidados e acompanhamos a adaptação depois da adoção.

Este texto é um exemplo. Edite-o no painel administrativo, na aba "Sobre nós".`,
};
