import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { linkWhatsApp, useApi } from '../../api';
import ListaEstado, { CardImagem } from './ListaEstado';
import { Intro, Rodape } from './Layout';
import { GatoDormindo } from '../../components/Gatos';
import styles from './styles.module.css';

const WHATSAPP_ADOCAO = '5547999494830';

const NOME_ESPECIE = { GATO: 'o gato', CACHORRO: 'o cachorro', OUTRO: 'o pet' };

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

const navClass = ({ isActive }) => `${styles.navButton} ${isActive ? styles.navActive : ''}`;

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
          {navigation.slice(0, 2).map(({ label, href, icon }) => (
            <NavLink key={href} to={href} end className={navClass} onClick={() => setMenuOpen(false)}>
              <NavIcon name={icon} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className={styles.drawerDivider} />

        <div className={styles.drawerLinks}>
          {navigation.slice(2).map(({ label, href, icon }) => (
            <NavLink key={href} to={href} end className={navClass} onClick={() => setMenuOpen(false)}>
              <NavIcon name={icon} />
              <span>{label}</span>
            </NavLink>
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
  const wppUrl = linkWhatsApp(
    WHATSAPP_ADOCAO,
    `Olá! Tenho interesse em adotar ${NOME_ESPECIE[pet.especie] ?? 'o pet'} ${pet.nome}.`,
  );

  return (
    <article className={styles.card}>
      <div className={styles.petLink}>
        <CardImagem src={pet.fotoUrl} alt={`Foto de ${pet.nome}`} />
        {pet.situacao === 'RESERVADO' && <span className={styles.availability}>Reservado</span>}
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.petHeading}>
          <h3>{pet.nome}</h3>
          {pet.idade && <span className={styles.age}>{pet.idade}</span>}
        </div>
        {pet.descricao && <p className={styles.cardText}>{pet.descricao}</p>}
        {pet.etiquetas.length > 0 && (
          <div className={styles.catTags} aria-label="Características">
            {pet.etiquetas.map((tag) => <span key={tag} className={styles.catTag}>{tag}</span>)}
          </div>
        )}
        <a href={wppUrl} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>Conhecer pet</a>
      </div>
    </article>
  );
}

export default function HomeDesktop() {
  const { dados: pets, carregando, erro } = useApi('/animais');

  return (
    <main className={styles.app} id="inicio">
      <Header />
      <section className={styles.content} id="adocao" aria-labelledby="page-title">
        <Intro eyebrow="ADOÇÃO RESPONSÁVEL" titulo="Encontre seu novo melhor amigo" texto="Um lar cheio de carinho pode começar com um encontro." pelo="#f4b98a" detalhado />
        <div className={styles.sectionHeading}>
          <div>
            <h2>Pets esperando por você</h2>
            <p>Conheça quem está pronto para fazer parte da sua família.</p>
          </div>
          <GatoDormindo className={styles.sectionCat} />
        </div>
        <ListaEstado
          carregando={carregando}
          erro={erro}
          vazio={pets?.length === 0}
          mensagemVazia="Nenhum pet disponível no momento. Volte em breve!"
        >
          <div className={styles.petGrid}>
            {pets?.map((pet) => <PetCard key={pet.id} pet={pet} />)}
          </div>
        </ListaEstado>
      </section>
      <Rodape />
    </main>
  );
}