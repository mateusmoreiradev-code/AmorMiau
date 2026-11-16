import { Header } from './index';
import { formatarData, useApi } from '../../api';
import ListaEstado, { CardImagem } from './ListaEstado';
import { Intro, Rodape } from './Layout';
import { GatoDormindo } from '../../components/Gatos';
import styles from './styles.module.css';

function dataEvento({ dataInicio, dataFim }) {
  const inicio = formatarData(dataInicio);
  const fim = dataFim ? formatarData(dataFim) : '';
  return fim && fim !== inicio ? `${inicio} a ${fim}` : inicio;
}

function EventoCard({ evento }) {
  const horario = formatarData(evento.dataInicio, { hour: '2-digit', minute: '2-digit' });

  return (
    <article className={styles.card}>
      <div className={styles.petLink}>
        <CardImagem src={evento.imagemUrl} alt={evento.titulo} />
      </div>
      <div className={styles.cardInfo}>
        <div className={`${styles.petHeading} ${styles.stackedHeading}`}>
          <h3>{evento.titulo}</h3>
          <span className={styles.age}>{dataEvento(evento)}</span>
        </div>
        <p className={styles.cardMeta}>{evento.local} · {horario}</p>
        <p className={styles.cardText}>{evento.descricao}</p>
        {evento.linkInscricao && (
          <a href={evento.linkInscricao} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>
            Participar
          </a>
        )}
      </div>
    </article>
  );
}

export default function EventosDesktop() {
  const { dados: eventos, carregando, erro } = useApi('/eventos');

  return (
    <main className={styles.app} id="inicio">
      <Header />

      <section className={styles.content} id="eventos" aria-labelledby="page-title">
        <Intro eyebrow="AGENDA AMORMIAU" titulo="Nossos Eventos" texto="Fique por dentro de feiras de adoção, mutirões e encontros." pelo="#c9d3da" />

        <div className={styles.sectionHeading}>
          <div>
            <h2>Próximos eventos</h2>
            <p>Participe e apoie a nossa causa.</p>
          </div>
          <GatoDormindo className={styles.sectionCat} />
        </div>

        <ListaEstado
          carregando={carregando}
          erro={erro}
          vazio={eventos?.length === 0}
          mensagemVazia="Nenhum evento marcado no momento. Fique de olho!"
        >
          <div className={styles.petGrid}>
            {eventos?.map((evento) => <EventoCard key={evento.id} evento={evento} />)}
          </div>
        </ListaEstado>
      </section>
      <Rodape />
    </main>
  );
}
