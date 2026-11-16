import { useState } from 'react';
import { Header } from './index';
import { useApi } from '../../api';
import ListaEstado from './ListaEstado';
import { Intro, Rodape } from './Layout';
import { GatoDormindo } from '../../components/Gatos';
import styles from './styles.module.css';

const ROTULO_TIPO = {
  PIX: 'Pix',
  TRANSFERENCIA: 'Transferência',
  DINHEIRO: 'Dinheiro',
  ITENS: 'Itens',
  APADRINHAMENTO: 'Apadrinhamento',
  OUTRO: 'Outra forma',
};

function CopiarPix({ chave }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(chave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sem permissão para a área de transferência: a chave continua visível para copiar à mão
    }
  }

  return (
    <div className={styles.pixBox}>
      <span className={styles.pixLabel}>Chave Pix</span>
      <code className={styles.pixKey}>{chave}</code>
      <button type="button" className={styles.cardCta} onClick={copiar}>
        {copiado ? 'Chave copiada!' : 'Copiar chave'}
      </button>
    </div>
  );
}

function DoacaoCard({ forma }) {
  return (
    <article className={`${styles.card} ${styles.cardNoImage}`}>
      <div className={styles.cardInfo}>
        <span className={styles.catTag}>{ROTULO_TIPO[forma.tipo]}</span>
        <div className={styles.petHeading} style={{ marginTop: 12 }}>
          <h3>{forma.titulo}</h3>
        </div>
        <p className={styles.cardText}>{forma.descricao}</p>
        {forma.dadosBancarios && <p className={`${styles.cardText} ${styles.preLine}`}>{forma.dadosBancarios}</p>}
        {forma.chavePix && <CopiarPix chave={forma.chavePix} />}
        {forma.link && (
          <a href={forma.link} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>
            Quero ajudar
          </a>
        )}
      </div>
    </article>
  );
}

export default function DoacoesDesktop() {
  const { dados: formas, carregando, erro } = useApi('/doacoes');

  return (
    <main className={styles.app} id="inicio">
      <Header />

      <section className={styles.content} id="doacoes" aria-labelledby="page-title">
        <Intro eyebrow="COMO DOAR" titulo="Ajude-nos a salvar mais vidas" texto="Sua contribuição mantém nossos resgates, ração e atendimento veterinário em dia." pelo="#8a8f99" />

        <div className={styles.sectionHeading}>
          <div>
            <h2>Formas de ajudar</h2>
            <p>Toda ajuda faz diferença, de qualquer valor.</p>
          </div>
          <GatoDormindo className={styles.sectionCat} />
        </div>

        <ListaEstado
          carregando={carregando}
          erro={erro}
          vazio={formas?.length === 0}
          mensagemVazia="As formas de doação serão divulgadas em breve."
        >
          <div className={styles.petGrid}>
            {formas?.map((forma) => <DoacaoCard key={forma.id} forma={forma} />)}
          </div>
        </ListaEstado>
      </section>
      <Rodape />
    </main>
  );
}
