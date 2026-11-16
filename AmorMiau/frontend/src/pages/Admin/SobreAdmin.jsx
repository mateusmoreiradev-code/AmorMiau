import { useEffect, useState } from 'react';
import { api } from '../../api';
import Campo from './Campo';
import styles from './admin.module.css';

const CAMPOS = [
  { nome: 'titulo', rotulo: 'Título', tipo: 'texto', obrigatorio: true },
  { nome: 'subtitulo', rotulo: 'Subtítulo', tipo: 'texto' },
  { nome: 'imagemUrl', rotulo: 'Imagem (opcional)', tipo: 'imagem' },
  { nome: 'corpo', rotulo: 'Texto da página', tipo: 'textarea', linhas: 14, ajuda: 'Deixe uma linha em branco entre os parágrafos.' },
];

const VAZIO = { titulo: '', subtitulo: '', imagemUrl: '', corpo: '' };

export default function SobreAdmin({ aoExpirar }) {
  const [form, setForm] = useState(null);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [salvando, setSalvando] = useState(false);
  const [enviandoImagem, setEnviandoImagem] = useState(false);

  useEffect(() => {
    api('/paginas/sobre')
      .then((p) => setForm({ titulo: p.titulo, subtitulo: p.subtitulo ?? '', imagemUrl: p.imagemUrl ?? '', corpo: p.corpo }))
      .catch(() => setForm(VAZIO)); // 404: página ainda não criada
  }, []);

  const tratarErro = (erro) => {
    if (erro.status === 401) aoExpirar();
    return erro.message;
  };

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErros({});
    setMensagem({ tipo: '', texto: '' });
    try {
      await api('/paginas/sobre', { metodo: 'PUT', corpo: form });
      setMensagem({ tipo: 'ok', texto: 'Página "Sobre nós" atualizada.' });
    } catch (erro) {
      setErros(erro.detalhes ?? {});
      setMensagem({ tipo: 'erro', texto: tratarErro(erro) });
    } finally {
      setSalvando(false);
    }
  }

  if (!form) return <p className={styles.muted}>Carregando…</p>;

  return (
    <form className={styles.form} onSubmit={salvar} noValidate>
      <div className={styles.toolbar}>
        <h2>Sobre nós</h2>
        <a className={styles.secondary} href="/sobre" target="_blank" rel="noopener noreferrer">Ver página</a>
      </div>

      {mensagem.texto && (
        <p className={mensagem.tipo === 'ok' ? styles.success : styles.error} role={mensagem.tipo === 'ok' ? 'status' : 'alert'}>
          {mensagem.texto}
        </p>
      )}

      <div className={styles.fields}>
        {CAMPOS.map((campo) => (
          <Campo
            key={campo.nome}
            campo={campo}
            valor={form[campo.nome]}
            erro={erros[campo.nome]?.[0]}
            aoAlterar={(valor) => setForm((atual) => ({ ...atual, [campo.nome]: valor }))}
            aoEnviarImagem={setEnviandoImagem}
            tratarErro={tratarErro}
          />
        ))}
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.primary} disabled={salvando || enviandoImagem}>
          {salvando ? 'Salvando…' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}
