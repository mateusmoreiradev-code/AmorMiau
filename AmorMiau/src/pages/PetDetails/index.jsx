import styles from './styles.module.css';

function PawShapes() {
  return (
    <div className={styles.backgroundDecor} aria-hidden="true">
      <span className={`${styles.pawShape} ${styles.shape1}`} />
      <span className={`${styles.pawShape} ${styles.shape2}`} />
      <span className={`${styles.pawShape} ${styles.shape3}`} />
      <span className={`${styles.pawShape} ${styles.shape4}`} />
      <span className={`${styles.pawShape} ${styles.shape5}`} />
      <span className={`${styles.pawShape} ${styles.shape6}`} />
    </div>
  );
}

export default function PetDetails() {
  const handleClose = () => {
    window.location.href = '/';
  };

  return (
    <main className={styles.appContainer}>
      <section className={styles.mobileMockup}>
        <PawShapes />

        <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="Fechar e voltar para a página inicial">
          ✕
        </button>

        <div className={styles.catImageContainer}>
          <img
            className={styles.catImage}
            src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80"
            alt="Gato real"
          />
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h1>Luna</h1>
            <span className={styles.iconHeart} aria-label="Favoritar pet">
              ♥
            </span>
          </div>

          <div className={styles.location}>
            <span className={styles.iconLocation}>📍</span>
            <span>São Paulo, SP</span>
          </div>

          <div className={styles.attributes}>
            <div className={`${styles.attrBox} ${styles.attrSex}`}>
              <strong>Fêmea</strong>
              <span>Sexo</span>
            </div>
            <div className={`${styles.attrBox} ${styles.attrAge}`}>
              <strong>2 anos</strong>
              <span>Idade</span>
            </div>
            <div className={`${styles.attrBox} ${styles.attrWeight}`}>
              <strong>4kg</strong>
              <span>Peso</span>
            </div>
          </div>

          <div className={styles.ownerProfile}>
            <div className={styles.ownerImage}>🐾</div>
            <div className={styles.ownerInfo}>
              <h3>Camila Moreira</h3>
              <p>Adotante responsável</p>
            </div>

            <div className={styles.ownerActions}>
              <button type="button" className={styles.actionBtn} aria-label="Enviar mensagem">
                💬
              </button>
              <button type="button" className={styles.actionBtn} aria-label="Ligar">
                📞
              </button>
            </div>
          </div>

          <p className={styles.description}>
            Luna é uma gatinha doce, sociável e muito carinhosa. Ela adora companhia,
            brincadeiras leves e um cantinho confortável para descansar.
            <span className={styles.seeMore}> Ver mais</span>
          </p>

          <button type="button" className={styles.btnContinue}>
            Continuar
          </button>
        </div>
      </section>
    </main>
  );
}
