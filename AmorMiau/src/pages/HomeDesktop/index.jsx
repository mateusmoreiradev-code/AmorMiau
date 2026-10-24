import styles from './styles.module.css';

function NavButton({ children, href }) {
  return (
    <a href={href} className={styles.navButton}>
      {children}
    </a>
  );
}

function NavBar() {
  return (
    <header className={styles.header}>
      <h1>AmorMiau</h1>
      <nav className={styles.navbarOptions} aria-label="Navegação principal">
        <NavButton href="#">Adoção</NavButton>
        <NavButton href="#">Eventos</NavButton>
        <NavButton href="#">Doações</NavButton>
        <NavButton href="#">PetSitters</NavButton>
        <NavButton href="#">Sobre Nós</NavButton>
      </nav>
    </header>
  );
}

function TituloDescricao({ titulo, descricao }) {
  return (
    <div className={styles.tituloDescricao}>
      <h2>{titulo}</h2>
      <p>{descricao}</p>
    </div>
  );
}

function Content() {
  return (
    <section className={styles.content}>
      <TituloDescricao
        titulo="Adoção"
        descricao="Encontre seu novo parceiro de quatro patas."
      />
    </section>
  );
}

export default function HomeDesktop() {
  return (
    <main className={styles.app}>
      <NavBar />
      <Content />
    </main>
  );
}