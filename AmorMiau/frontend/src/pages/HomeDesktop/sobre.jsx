import React from 'react';
import { Header } from './index'; 
import styles from './styles.module.css';

const eventos = [
  {
    title: 'Feira de Adoção AmorMiau',
    date: '15 de Julho, 2026',
    location: 'Praça Central, São Bento do Sul',
    image: '/evento1.png',
    alt: 'Feira de adoção de animais',
    description: 'Venha conhecer pessoalmente os nossos gatinhos e encontrar o seu novo melhor amigo.',
  },
];

function EventoCard({ evento }) {
  return (
    <article className={styles.card}>
      <a href="#detalhes" className={styles.petLink} aria-label={`Ver detalhes de ${evento.title}`}>
        <img className={styles.petImage} src={evento.image} alt={evento.alt} />
      </a>
      <div className={styles.cardInfo}>
        <div className={styles.petHeading}>
          <h3>{evento.title}</h3>
          <span className={styles.age}>{evento.date}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: '8px 0' }}>{evento.location}</p>
        <p style={{ fontSize: '0.95rem' }}>{evento.description}</p>
        <a href="#inscrever" className={styles.cardCta} style={{ marginTop: '12px' }}>Participar</a>
      </div>
    </article>
  );
}

export default function SobreDesktop() {
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
          
          <span className={styles.eyebrow}>QUEM SOMOS</span>
          <h1 id="page-title">Nossa história de amor pelos animais</h1>
          <p>Conheça a missão, a equipe e o propósito por trás do projeto AmorMiau.</p>
        </div>

      </section>
    </main>
  );
}