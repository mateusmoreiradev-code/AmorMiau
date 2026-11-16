// Ilustrações de gato usadas como decoração no site. Todas são decorativas (aria-hidden).

const TRACO = '#173d53';

/** Gato espiando por cima de uma borda: só a cabeça e as patinhas aparecem. */
export function GatoEspiando({ pelo = '#f4b98a', olhos = TRACO, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 66" aria-hidden="true" focusable="false">
      <g stroke={TRACO} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M30 34 L33 8 L52 24 Z" fill={pelo} />
        <path d="M90 34 L87 8 L68 24 Z" fill={pelo} />
        <path d="M22 60 C20 36 36 20 60 20 C84 20 100 36 98 60 Z" fill={pelo} />
        <path d="M35 17 L37 27 M85 17 L83 27" stroke="#e98682" strokeWidth="3" />
        <ellipse cx="34" cy="60" rx="12" ry="6.5" fill={pelo} />
        <ellipse cx="86" cy="60" rx="12" ry="6.5" fill={pelo} />
        <path d="M30 57 v5 M38 57 v5 M82 57 v5 M90 57 v5" strokeWidth="1.8" />
        <path d="M56 47 h8 l-4 4 Z" fill="#e98682" strokeWidth="1.6" />
        <path d="M60 51 q-3 4 -7 2 M60 51 q3 4 7 2" fill="none" strokeWidth="2" />
        <path d="M44 48 L28 45 M44 51 L29 53 M76 48 L92 45 M76 51 L91 53" strokeWidth="1.5" />
      </g>
      <ellipse cx="48" cy="40" rx="3.4" ry="4.6" fill={olhos} />
      <ellipse cx="72" cy="40" rx="3.4" ry="4.6" fill={olhos} />
      <circle cx="49.2" cy="38.4" r="1.1" fill="#fff" />
      <circle cx="73.2" cy="38.4" r="1.1" fill="#fff" />
    </svg>
  );
}

/** Gato enrolado dormindo, com "zzz". */
export function GatoDormindo({ pelo = '#cfe3ea', className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 150 82" aria-hidden="true" focusable="false">
      <g stroke={TRACO} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M128 66 C142 74 120 82 84 79" fill="none" strokeWidth="9" stroke={TRACO} />
        <path d="M128 66 C142 74 120 82 84 79" fill="none" strokeWidth="4.5" stroke={pelo} />
        <path d="M34 78 C18 78 12 64 18 50 C26 32 54 24 86 26 C118 28 136 44 134 60 C132 72 120 78 104 78 Z" fill={pelo} />
        <path d="M24 44 L22 24 L38 36 Z" fill={pelo} />
        <path d="M46 36 L56 20 L60 40 Z" fill={pelo} />
        <path d="M18 60 C16 44 28 36 40 36 C54 36 64 46 62 60 C60 72 50 78 38 78 C26 78 20 70 18 60 Z" fill={pelo} />
        <path d="M27 56 q4 3 8 0 M44 56 q4 3 8 0" fill="none" strokeWidth="2" />
        <path d="M37 63 h5 l-2.5 2.5 Z" fill="#e98682" strokeWidth="1.4" />
        <path d="M76 44 q8 -6 16 0 M88 36 q6 -4 12 0" fill="none" strokeWidth="1.8" opacity="0.45" />
      </g>
      <g fill="#1b668c" fontFamily="Nunito, sans-serif" fontWeight="900" opacity="0.55">
        <text x="70" y="18" fontSize="13">z</text>
        <text x="81" y="10" fontSize="10">z</text>
        <text x="90" y="5" fontSize="7">z</text>
      </g>
    </svg>
  );
}

/** Gato sentado de costas, olhando para o lado, com o rabo enrolado. */
export function GatoSentado({ pelo = '#ffffff', className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 96 120" aria-hidden="true" focusable="false">
      <g stroke={TRACO} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M66 112 C92 112 92 84 78 80" fill="none" strokeWidth="9" />
        <path d="M66 112 C92 112 92 84 78 80" fill="none" strokeWidth="4.5" stroke={pelo} />
        <path d="M22 114 C14 90 20 60 38 52 L58 52 C76 60 82 90 74 114 Z" fill={pelo} />
        <path d="M27 38 L26 12 L42 26 Z" fill={pelo} />
        <path d="M69 38 L70 12 L54 26 Z" fill={pelo} />
        <path d="M22 44 C22 28 34 22 48 22 C62 22 74 28 74 44 C74 58 62 64 48 64 C34 64 22 58 22 44 Z" fill={pelo} />
        <path d="M30 18 L32 27 M66 18 L64 27" stroke="#e98682" strokeWidth="3" />
        <path d="M37 45 q3 -3 6 0 M53 45 q3 -3 6 0" fill="none" strokeWidth="2.2" />
        <path d="M45 50 h6 l-3 3 Z" fill="#e98682" strokeWidth="1.4" />
        <path d="M34 114 v-14 M62 114 v-14" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Uma patinha. */
export function Patinha({ cor = '#e98682', className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g fill={cor}>
        <path d="M16 15 C10 15 6.5 20 7.5 24 C8.5 28 13 27 16 26.5 C19 27 23.5 28 24.5 24 C25.5 20 22 15 16 15 Z" />
        <ellipse cx="7" cy="12" rx="3" ry="3.8" transform="rotate(-20 7 12)" />
        <ellipse cx="12.5" cy="6.8" rx="3" ry="4" />
        <ellipse cx="19.5" cy="6.8" rx="3" ry="4" />
        <ellipse cx="25" cy="12" rx="3" ry="3.8" transform="rotate(20 25 12)" />
      </g>
    </svg>
  );
}

/** Trilha de patinhas, para separar seções. */
export function TrilhaDePatinhas({ className, quantidade = 6 }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: quantidade }, (_, i) => (
        <Patinha
          key={i}
          cor={i % 2 ? '#8bc6dc' : '#e98682'}
          style={{
            width: 18,
            height: 18,
            transform: `translateY(${i % 2 ? -7 : 5}px) rotate(${i % 2 ? 100 : 80}deg)`,
            opacity: 0.35 + (i / quantidade) * 0.5,
          }}
        />
      ))}
    </div>
  );
}
