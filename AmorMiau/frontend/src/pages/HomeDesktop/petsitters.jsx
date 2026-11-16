import { Header } from './index';
import { linkWhatsApp, useApi } from '../../api';
import ListaEstado, { CardImagem } from './ListaEstado';
import { Intro, Rodape } from './Layout';
import { GatoDormindo } from '../../components/Gatos';
import styles from './styles.module.css';

function PetSittersCard({ petSitter }) {
  const wppUrl = linkWhatsApp(
    petSitter.telefone,
    `Olá, ${petSitter.nome}! Vi seu perfil no AmorMiau e gostaria de saber mais sobre o seu serviço de pet sitter.`,
  );
  const local = [petSitter.regiao, `${petSitter.cidade}/${petSitter.estado}`].filter(Boolean).join(' · ');

  return (
    <article className={styles.card}>
      <div className={styles.petLink}>
        <CardImagem src={petSitter.fotoUrl} alt={`Foto de ${petSitter.nome}`} />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.petHeading}>
          <h3>{petSitter.nome}</h3>
        </div>
        <p className={styles.cardMeta}>{local}</p>
        <p className={styles.cardText}>{petSitter.descricao}</p>
        <a href={wppUrl} target="_blank" rel="noopener noreferrer" className={styles.cardCta}>Entre em contato</a>
      </div>
    </article>
  );
}

export default function PetSittersDesktop() {
  const { dados: petSitters, carregando, erro } = useApi('/petsitters');

  return (
    <main className={styles.app} id="inicio">
      <Header />

      <section className={styles.content} id="petsitters" aria-labelledby="page-title">
        <Intro eyebrow="CUIDADO ESPECIALIZADO" titulo="Encontre uma PetSitter de confiança" texto="Profissionais qualificados para cuidar do seu gatinho enquanto você estiver fora." pelo="#f7e3c6" />

        <div className={styles.sectionHeading}>
          <div>
            <h2>Profissionais cadastradas</h2>
            <p>Escolha uma cuidadora de confiança para dar carinho ao seu pet.</p>
          </div>
          <GatoDormindo className={styles.sectionCat} />
        </div>

        <ListaEstado
          carregando={carregando}
          erro={erro}
          vazio={petSitters?.length === 0}
          mensagemVazia="Nenhuma pet sitter cadastrada no momento."
        >
          <div className={styles.petGrid}>
            {petSitters?.map((petSitter) => <PetSittersCard key={petSitter.id} petSitter={petSitter} />)}
          </div>
        </ListaEstado>
      </section>
      <Rodape />
    </main>
  );
}
