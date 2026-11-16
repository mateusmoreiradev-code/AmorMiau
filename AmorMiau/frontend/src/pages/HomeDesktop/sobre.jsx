import { Header } from './index';
import { useApi } from '../../api';
import { Intro, Rodape } from './Layout';
import { GatoDormindo } from '../../components/Gatos';
import styles from './styles.module.css';

const PADRAO = {
  titulo: 'Nossa história de amor pelos animais',
  subtitulo: 'Conheça a missão, a equipe e o propósito por trás do projeto AmorMiau.',
};

export default function SobreDesktop() {
  const { dados: pagina, carregando } = useApi('/paginas/sobre');
  const titulo = pagina?.titulo ?? PADRAO.titulo;
  const subtitulo = pagina ? pagina.subtitulo : PADRAO.subtitulo;
  // Linhas em branco separam parágrafos
  const paragrafos = (pagina?.corpo ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <main className={styles.app} id="inicio">
      <Header />

      <section className={styles.content} id="sobre" aria-labelledby="page-title">
        <Intro eyebrow="QUEM SOMOS" titulo={titulo} texto={subtitulo} pelo="#ffffff" />

        {!carregando && (paragrafos.length > 0 || pagina?.imagemUrl) && (
          <article className={styles.aboutBody}>
            <GatoDormindo className={styles.aboutCat} pelo="#f4b98a" />
            {pagina?.imagemUrl && <img className={styles.aboutImage} src={pagina.imagemUrl} alt="" />}
            {paragrafos.map((texto, i) => <p key={i}>{texto}</p>)}
          </article>
        )}
      </section>
      <Rodape />
    </main>
  );
}
