import { Link } from 'react-router-dom';
import { GatoEspiando, GatoSentado, TrilhaDePatinhas } from '../../components/Gatos';
import styles from './styles.module.css';

/** Cartão de abertura das páginas, com o fundo de vidro e um gato espiando pela borda. */
export function Intro({ eyebrow, titulo, texto, pelo, detalhado = false }) {
  return (
    <div className={styles.introWrap}>
      <GatoEspiando className={styles.introCat} pelo={pelo} />
      <div className={styles.intro}>
        <svg className={styles.cornerContours} viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="glass-blue-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a7e7f6" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#78cce9" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#55afd2" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="glass-blue-bottom" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#67bfdf" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#8bd5eb" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#b7edf8" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path className={styles.abstractShape} fill="url(#glass-blue-top)" d="M786 0 L1000 0 L1000 154 C969 130 944 118 906 137 C866 157 827 138 801 108 C774 78 790 41 786 0 Z" />
          {detalhado && <path className={styles.abstractShape} fill="url(#glass-blue-top)" d="M866 0 L1000 0 L1000 105 C979 91 956 88 934 99 C907 112 881 96 866 75 C849 51 863 26 866 0 Z" />}
          <path className={styles.abstractShape} fill="url(#glass-blue-bottom)" d="M0 226 C36 244 72 283 117 281 C161 279 178 318 218 329 C253 339 257 368 286 386 C299 394 307 398 315 400 L0 400 Z" />
          {detalhado && (
            <>
              <path className={styles.abstractShape} fill="url(#glass-blue-bottom)" d="M0 303 C39 321 68 354 105 350 C141 346 155 378 192 379 C221 380 230 404 254 400 L0 400 Z" />
              <path className={styles.abstractHighlight} d="M790 0 C788 40 778 76 803 105 C830 136 866 151 906 135 C944 119 970 130 999 151" />
              <path className={styles.abstractHighlight} d="M0 229 C37 248 73 286 117 284 C162 282 179 321 219 332 C254 342 258 370 286 388 C299 396 307 399 314 399" />
            </>
          )}
        </svg>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 id="page-title">{titulo}</h1>
        {texto && <p>{texto}</p>}
      </div>
    </div>
  );
}

export function Rodape() {
  return (
    <footer className={styles.footer}>
      <TrilhaDePatinhas className={styles.footerPaws} quantidade={7} />
      <div className={styles.footerInner}>
        <GatoSentado className={styles.footerCat} />
        <div>
          <Link to="/" className={styles.footerBrand}>AmorMiau</Link>
          <p>Feito com carinho para que cada gatinho encontre um lar.</p>
        </div>
      </div>
    </footer>
  );
}
