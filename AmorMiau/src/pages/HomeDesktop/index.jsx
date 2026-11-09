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

function Cat({children, gender}){
  return(
    <div className={styles.cat}>
      <h2>{children}</h2>
      <img src='public/male.png'/>
    </div>
  );
}

function CatAge({children}){
  return(
    <div className={styles.catAge}>
      <h3>{children}</h3>
    </div>
  );
}

function CatTag({children}){
  return(
    <p className={styles.catTag}>{children}</p>
  );
}

function CardAdocao(){
    return (
      <div className={styles.card}>
        <img src='public/image.png'/>

        <div className={styles.cardInfo}>
          <Cat>Destruidor de Mundos</Cat>
          <CatAge>3 meses</CatAge>
          <div className={styles.catTags}>
            <CatTag>Tranquilo</CatTag>
            <CatTag>Frajolinha</CatTag>
          </div>
        </div>
      </div>
    );
}

function Content() {
  return (
    <section className={styles.content}>
        <CardAdocao></CardAdocao>
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