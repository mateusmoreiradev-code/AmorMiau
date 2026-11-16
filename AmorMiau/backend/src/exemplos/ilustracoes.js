// Gera ilustrações SVG simples para os dados de exemplo (retratos de gato, banners de evento e avatares).

const ROSA = '#e98682';
const ESCURO = '#173d53';

/**
 * Cabeça de gato desenhada em torno de (0, 0), com cerca de 240 x 230 de tamanho.
 * padrao: 'liso' | 'rajado' | 'frajola' | 'siames' | 'tricolor'
 */
function cabecaGato(id, { pelo, detalhe = pelo, focinho = '#fff7ee', olhos = '#7cb342', padrao = 'liso', piscando = false }) {
  const clip = `cabeca-${id}`;
  const contorno = 'M-108 -40 L-96 -150 L-38 -92 C-14 -100 14 -100 38 -92 L96 -150 L108 -40 C122 -4 116 50 84 76 C52 100 -52 100 -84 76 C-116 50 -122 -4 -108 -40 Z';

  const padroes = {
    liso: '',
    rajado: `
      <g fill="${detalhe}" opacity="0.9">
        <path d="M-10 -96 C-12 -70 -8 -56 0 -46 C8 -56 12 -70 10 -96 Z"/>
        <path d="M-44 -90 C-40 -68 -30 -58 -22 -54 C-26 -70 -30 -82 -32 -94 Z"/>
        <path d="M44 -90 C40 -68 30 -58 22 -54 C26 -70 30 -82 32 -94 Z"/>
        <path d="M-120 0 C-96 -4 -80 0 -72 8 C-88 10 -104 10 -120 16 Z"/>
        <path d="M-120 28 C-98 24 -84 28 -76 34 C-92 36 -106 38 -120 44 Z"/>
        <path d="M120 0 C96 -4 80 0 72 8 C88 10 104 10 120 16 Z"/>
        <path d="M120 28 C98 24 84 28 76 34 C92 36 106 38 120 44 Z"/>
      </g>`,
    frajola: `
      <path d="M-14 -60 C-8 -30 -40 10 -60 40 C-40 96 40 96 60 40 C40 10 8 -30 14 -60 C6 -66 -6 -66 -14 -60 Z" fill="${focinho}"/>`,
    siames: `
      <ellipse cx="0" cy="28" rx="78" ry="62" fill="${detalhe}" opacity="0.85"/>
      <path d="M-108 -40 L-96 -150 L-38 -92 Z M108 -40 L96 -150 L38 -92 Z" fill="${detalhe}"/>`,
    tricolor: `
      <path d="M-130 -160 L-10 -160 C-20 -110 -40 -60 -70 -20 C-90 10 -110 20 -130 20 Z" fill="${detalhe}"/>
      <path d="M130 -160 L40 -160 C40 -120 60 -80 90 -50 C104 -38 118 -34 130 -34 Z" fill="#3a3a44"/>
      <path d="M60 50 C80 40 100 44 130 30 L130 120 L50 120 Z" fill="${detalhe}" opacity="0.9"/>`,
  };

  const olho = (x) =>
    piscando
      ? `<path d="M${x - 20} -4 Q${x} 10 ${x + 20} -4" fill="none" stroke="${ESCURO}" stroke-width="6" stroke-linecap="round"/>`
      : `<ellipse cx="${x}" cy="-6" rx="19" ry="23" fill="${olhos}"/>
         <ellipse cx="${x}" cy="-6" rx="7" ry="18" fill="${ESCURO}"/>
         <circle cx="${x + 6}" cy="-15" r="5" fill="#fff"/>`;

  return `
  <defs><clipPath id="${clip}"><path d="${contorno}"/></clipPath></defs>
  <path d="${contorno}" fill="${pelo}"/>
  <g clip-path="url(#${clip})">${padroes[padrao]}</g>
  <path d="M-92 -62 L-86 -126 L-52 -90 Z M92 -62 L86 -126 L52 -90 Z" fill="${ROSA}" opacity="0.75"/>
  ${padrao === 'frajola' ? '' : `<ellipse cx="-22" cy="44" rx="28" ry="22" fill="${focinho}"/><ellipse cx="22" cy="44" rx="28" ry="22" fill="${focinho}"/>`}
  ${olho(-46)}${olho(46)}
  <path d="M-12 26 L12 26 L0 40 Z" fill="${ROSA}" stroke="${ROSA}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M0 40 Q-6 56 -20 52 M0 40 Q6 56 20 52" fill="none" stroke="${ESCURO}" stroke-width="4" stroke-linecap="round"/>
  <g stroke="${pelo === '#2f3038' ? '#ffffff' : ESCURO}" stroke-width="3" stroke-linecap="round" opacity="0.55">
    <path d="M-52 40 L-128 26 M-52 50 L-126 56 M52 40 L128 26 M52 50 L126 56"/>
  </g>`;
}

function patinhas(cor, opacidade, posicoes) {
  return posicoes
    .map(
      ([x, y, r]) => `
    <g transform="translate(${x} ${y}) rotate(${r})" fill="${cor}" opacity="${opacidade}">
      <path d="M0 4 C-11 4 -17 13 -15 20 C-13 27 -5 25 0 24 C5 25 13 27 15 20 C17 13 11 4 0 4 Z"/>
      <ellipse cx="-16" cy="-4" rx="5" ry="6.5"/><ellipse cx="-6" cy="-12" rx="5" ry="7"/>
      <ellipse cx="6" cy="-12" rx="5" ry="7"/><ellipse cx="16" cy="-4" rx="5" ry="6.5"/>
    </g>`,
    )
    .join('');
}

/** Retrato de gato no formato do card da vitrine (400 x 354). */
export function retratoGato(id, gato) {
  const { fundo, pelo, peito = gato.focinho ?? '#fff7ee' } = gato;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 354">
  <rect width="400" height="354" fill="${fundo}"/>
  <circle cx="330" cy="60" r="90" fill="#ffffff" opacity="0.25"/>
  <circle cx="40" cy="300" r="70" fill="#ffffff" opacity="0.2"/>
  ${patinhas('#ffffff', 0.35, [[60, 70, -20], [345, 250, 25], [95, 150, 10]])}
  <ellipse cx="200" cy="380" rx="150" ry="120" fill="${pelo}"/>
  ${gato.padrao === 'frajola' || gato.padrao === 'tricolor' ? `<ellipse cx="200" cy="370" rx="70" ry="80" fill="${peito}"/>` : ''}
  <g transform="translate(200 205)">${cabecaGato(id, gato)}</g>
</svg>`;
}

/** Banner de evento (400 x 354) com bandeirinhas e um gato. */
export function bannerEvento(id, { fundo1, fundo2, bandeiras, gato }) {
  const triangulos = Array.from({ length: 9 }, (_, i) => {
    const x = 10 + i * 46;
    return `<path d="M${x} 34 L${x + 40} 38 L${x + 18} 74 Z" fill="${bandeiras[i % bandeiras.length]}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 354">
  <defs><linearGradient id="fundo-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${fundo1}"/><stop offset="1" stop-color="${fundo2}"/>
  </linearGradient></defs>
  <rect width="400" height="354" fill="url(#fundo-${id})"/>
  <path d="M-10 30 Q200 52 410 30" fill="none" stroke="${ESCURO}" stroke-width="2.5" opacity="0.5"/>
  ${triangulos}
  ${patinhas('#ffffff', 0.4, [[50, 300, -30], [350, 120, 20], [340, 310, 35]])}
  <ellipse cx="200" cy="384" rx="140" ry="100" fill="${gato.pelo}"/>
  <g transform="translate(200 238) scale(0.8)">${cabecaGato(id, gato)}</g>
</svg>`;
}

/** Avatar ilustrado de pet sitter (400 x 354), segurando um gatinho. */
export function avatarPessoa(id, { fundo, pele, cabelo, roupa, cabeloLongo = false, gato }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 354">
  <rect width="400" height="354" fill="${fundo}"/>
  <circle cx="70" cy="70" r="80" fill="#ffffff" opacity="0.22"/>
  ${cabeloLongo ? `<path d="M120 150 C110 60 290 60 280 150 L292 290 L108 290 Z" fill="${cabelo}"/>` : ''}
  <path d="M60 354 C66 270 130 240 200 240 C270 240 334 270 340 354 Z" fill="${roupa}"/>
  <rect x="182" y="200" width="36" height="48" rx="12" fill="${pele}"/>
  <ellipse cx="200" cy="150" rx="68" ry="76" fill="${pele}"/>
  <path d="M132 146 C126 84 170 64 204 66 C246 68 276 96 268 146 C258 116 236 100 200 100 C166 100 144 116 132 146 Z" fill="${cabelo}"/>
  <circle cx="176" cy="156" r="7" fill="${ESCURO}"/><circle cx="224" cy="156" r="7" fill="${ESCURO}"/>
  <path d="M180 186 Q200 202 220 186" fill="none" stroke="${ESCURO}" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="160" cy="180" rx="12" ry="7" fill="${ROSA}" opacity="0.45"/><ellipse cx="240" cy="180" rx="12" ry="7" fill="${ROSA}" opacity="0.45"/>
  <g transform="translate(280 300) scale(0.42)">${cabecaGato(id, gato)}</g>
  <ellipse cx="250" cy="340" rx="26" ry="16" fill="${pele}"/><ellipse cx="312" cy="340" rx="26" ry="16" fill="${pele}"/>
</svg>`;
}
