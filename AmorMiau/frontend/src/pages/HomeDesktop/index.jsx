import { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importe o Link aqui
import styles from './styles.module.css';

const pets = [
  {
    name: 'Destruidor de Mundos',
    age: '3 meses',
    image: '/image.png',
    alt: 'Gato disponível para adoção',
    tags: ['Tranquilo', 'Frajolinha'],
  },
  {
    name: 'Penelope',
    age: '3 meses',
    image: '/image.png',
    alt: 'Gato disponível para adoção',
    tags: ['Tranquilo', 'Frajolinha'],
  },
];

// 2. Corrigido para apontar para a raiz "/" em vez de "/index"
const navigation = [
  { label: 'Adoção', href: '/', icon: 'heart' },
  { label: 'Eventos', href: '/eventos', icon: 'calendar' },
  { label: 'Doações', href: '/doacoes', icon: 'gift' },
  { label: 'PetSitters', href: '/petsitters', icon: 'people' },
  { label: 'Sobre nós', href: '/sobre', icon: 'info' },
];

export function NavIcon({ name }) {
  const iconPaths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    gift: <><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M2 6h20v4H2zM12 6v15M12 6H8.5a2.5 2.5 0 1 1 2.5-2.5V6Zm0 0h3.5a2.5 2.5 0 1 0-2.5-2.5V6Z" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{iconPaths[name]}</svg>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* 3. Substituído <a> por <Link to="/"> */}
      <Link className={styles.brand} to="/" aria-label="AmorMiau, início" onClick={() => setMenuOpen(false)}>AmorMiau</Link>
      
      <nav id="main-navigation" className={`${styles.navbarOptions} ${menuOpen ? styles.navbarOpen : ''}`} aria-label="Navegação principal">
        <div className={styles.drawerHeader}>
          <span className={styles.drawerBrand}><span className={styles.brandMark} aria-hidden="true">♥</span> AmorMiau</span>
          <button type="button" className={styles.drawerClose} aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>‹</button>
        </div>
        
        <div className={styles.drawerLinks}>
          {navigation.slice(0, 2).map(({ label, href, icon }, index) => (
            /* 4. Substituído <a> por <Link to={href}> */
            <Link key={href} to={href} className={`${styles.navButton} ${index === 0 ? styles.navActive : ''}`} aria-current={index === 0 ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
              <NavIcon name={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        
        <div className={styles.drawerDivider} />
        
        <div className={styles.drawerLinks}>
          {navigation.slice(2).map(({ label, href, icon }) => (
            /* 5. Substituído <a> por <Link to={href}> */
            <Link key={href} to={href} className={styles.navButton} onClick={() => setMenuOpen(false)}>
              <NavIcon name={icon} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        
        <div className={styles.drawerPromo}>
          <span className={styles.pawIllustration} aria-hidden="true">🐾</span>
          <p>Um novo melhor amigo espera por você.</p>
          <a href="#adocao" onClick={() => setMenuOpen(false)}>Encontrar um pet</a>
        </div>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className={styles.menuBackdrop}
          aria-label="Fechar menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      <button
        type="button"
        className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

function PetCard({ pet }) {
  const wppUrl = `https://wa.me/5547999494830?text=Olá!%20Tenho%20interesse%20em%20adotar%20o%20gato%20${encodeURIComponent(pet.name)}.`;

  return (
    <article className={styles.card}>
      <a href="#detalhes" className={styles.petLink} aria-label={`Ver detalhes de ${pet.name}`}>
        <img className={styles.petImage} src={pet.image} alt={pet.alt} />
      </a>
      <div className={styles.cardInfo}>
        <div className={styles.petHeading}>
          <h3>{pet.name}</h3>
          <span className={styles.age}>{pet.age}</span>
        </div>
        <div className={styles.catTags} aria-label="Características">
          {pet.tags.map((tag) => <span key={tag} className={styles.catTag}>{tag}</span>)}
        </div>
        <a href={wppUrl} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>Conhecer pet</a>
      </div>
    </article>
  );
}

export default function HomeDesktop() {
  return (
    <main className={styles.app} id="inicio">
      <Header />
      <section className={styles.content} id="adocao" aria-labelledby="page-title">
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
            <path className={styles.abstractShape} fill="url(#glass-blue-top)" d="M866 0 L1000 0 L1000 105 C979 91 956 88 934 99 C907 112 881 96 866 75 C849 51 863 26 866 0 Z" />
            <path className={styles.abstractShape} fill="url(#glass-blue-bottom)" d="M0 226 C36 244 72 283 117 281 C161 279 178 318 218 329 C253 339 257 368 286 386 C299 394 307 398 315 400 L0 400 Z" />
            <path className={styles.abstractShape} fill="url(#glass-blue-bottom)" d="M0 303 C39 321 68 354 105 350 C141 346 155 378 192 379 C221 380 230 404 254 400 L0 400 Z" />
            <path className={styles.abstractHighlight} d="M790 0 C788 40 778 76 803 105 C830 136 866 151 906 135 C944 119 970 130 999 151" />
            <path className={styles.abstractHighlight} d="M0 229 C37 248 73 286 117 284 C162 282 179 321 219 332 C254 342 258 370 286 388 C299 396 307 399 314 399" />
          </svg>
          <span className={styles.eyebrow}>ADOÇÃO RESPONSÁVEL</span>
          <h1 id="page-title">Encontre seu novo melhor amigo</h1>
          <p>Um lar cheio de carinho pode começar com um encontro.</p>
        </div>
        <div className={styles.sectionHeading}>
          <div>
            <h2>Pets esperando por você</h2>
            <p>Conheça quem está pronto para fazer parte da sua família.</p>
          </div>
          <a href="#todos-pets" className={styles.seeAll}>Ver todos <span aria-hidden="true">→</span></a>
        </div>
        <div className={styles.petGrid}>
          {pets.map((pet) => <PetCard key={pet.name} pet={pet} />)}
        </div>
      </section>
    </main>
  );
}