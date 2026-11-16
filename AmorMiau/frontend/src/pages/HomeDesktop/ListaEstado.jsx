import { GatoSentado } from '../../components/Gatos';
import styles from './styles.module.css';

/**
 * Mostra "carregando", erro ou lista vazia; quando há itens, renderiza os filhos.
 */
export default function ListaEstado({ carregando, erro, vazio, mensagemVazia, children }) {
  if (carregando) return <p className={styles.statusMessage}>Carregando…</p>;
  if (erro) {
    return (
      <p className={styles.statusMessage} role="alert">
        Não foi possível carregar agora. Tente novamente em instantes.
      </p>
    );
  }
  if (vazio) {
    return (
      <div className={styles.statusMessage}>
        <GatoSentado className={styles.statusCat} pelo="#f7e3c6" />
        <p>{mensagemVazia}</p>
      </div>
    );
  }
  return children;
}

/** Imagem do card, com um marcador quando não há foto cadastrada. */
export function CardImagem({ src, alt }) {
  if (!src) {
    return (
      <div className={`${styles.petImage} ${styles.imagePlaceholder}`} role="img" aria-label={alt}>
        <GatoSentado className={styles.placeholderCat} />
      </div>
    );
  }
  return <img className={styles.petImage} src={src} alt={alt} loading="lazy" />;
}
