import React from 'react';
import { Header } from './index'; 
import styles from './styles.module.css';

const petSitters = [
  {
    name: 'Arthur Mário Araújo',
    contact: '55988142436',
    location: 'Praça Central, São Bento do Sul',
    image: '/petSitter.png',
    alt: 'Arthur Mário Araújo',
    description: 'Cuidado, carinho e segurança para o seu pet na sua ausência.',
  },
];

function PetSittersCard({ petSitter }) {
    const wppUrl = `https://wa.me/${encodeURIComponent(petSitter.contact)}?text=Olá!%20Tenho%20interesse%20em%20adotar%20o%20gato%20${encodeURIComponent(petSitter.name)}.`;

  return (
    <article className={styles.card}>
      <a href="#detalhes" className={styles.petLink} aria-label={`Ver detalhes de ${petSitter.title}`}>
        <img className={styles.petImage} src={petSitter.image} alt={petSitter.alt} />
      </a>
      <div className={styles.cardInfo}>
        <div className={styles.petHeading}>
          <h3>{petSitter.title}</h3>
          <span className={styles.age}>{petSitter.date}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: '8px 0' }}>{petSitter.location}</p>
        <p style={{ fontSize: '0.95rem' }}>{petSitter.description}</p>
        <a href={wppUrl} className={styles.cardCta} style={{ marginTop: '12px' }}>Entre em contato</a>
      </div>
    </article>
  );
}

export default function PetSittersDesktop() {
  return (
    <main className={styles.app} id="inicio">
      <Header />

      <section className={styles.content} id="eventos" aria-labelledby="page-title">
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
          
          <span className={styles.eyebrow}>CUIDADO ESPECIALIZADO</span>
          <h1 id="page-title">Encontre uma PetSitter de confiança</h1>
          <p>Profissionais qualificados para cuidar do seu gatinho enquanto você estiver fora.</p>
        </div>

        <div className={styles.sectionHeading}>
          <div>
            <h2>Profissionais cadastradas</h2>
            <p>Escolha uma cuidadora de confiança para dar carinho ao seu pet.</p>
          </div>
        </div>

        <div className={styles.petGrid}>
          {petSitters.map((petSitter) => (
            <PetSittersCard key={petSitter.title} petSitter={petSitter} />
          ))}
        </div>
      </section>
    </main>
  );
}