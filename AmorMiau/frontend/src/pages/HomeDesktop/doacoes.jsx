import React from 'react';
import { Header } from './index'; 
import styles from './styles.module.css';

export default function DoacoesDesktop() {
  return (
    <main className={styles.app} id="inicio">
      {/* Reaproveitamos o Header exatamente igual */}
      <Header />

      <section className={styles.content} id="eventos" aria-labelledby="page-title">
        {/* Mantemos o mesmo fundo decorativo em SVG para garantir a identidade visual */}
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
            <path className={styles.abstractShape} fill="url(#glass-blue-bottom)" d="M0 226 C36 244 72 283 117 281 C161 279 178 318 218 329 C253 339 257 368 286 386 C299 394 307 398 315 400 L0 400 Z" />
          </svg>
          
          <span className={styles.eyebrow}>COMO DOAR</span>
            <h1 id="page-title">Ajude-nos a salvar mais vidas</h1>
            <p>Sua contribuição mantém nossos resgates, ração e atendimento veterinário em dia.</p>
        </div>

      </section>
    </main>
  );
}