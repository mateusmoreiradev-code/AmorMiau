import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, lerToken, salvarToken } from '../../api';
import { GatoEspiando } from '../../components/Gatos';
import RecursoAdmin from './RecursoAdmin';
import SobreAdmin from './SobreAdmin';
import { RECURSOS } from './recursos';
import styles from './admin.module.css';

const ABAS = [
  ...Object.entries(RECURSOS).map(([chave, r]) => ({ chave, rotulo: r.rotulo })),
  { chave: 'sobre', rotulo: 'Sobre nós' },
];

export default function Admin() {
  const [usuario, setUsuario] = useState(null);
  const [verificando, setVerificando] = useState(() => Boolean(lerToken()));
  const [sessaoExpirada, setSessaoExpirada] = useState(false);

  useEffect(() => {
    if (!lerToken()) return;
    api('/auth/me')
      .then(setUsuario)
      .catch(() => salvarToken(null))
      .finally(() => setVerificando(false));
  }, []);

  const aoExpirar = useCallback(() => {
    salvarToken(null);
    setUsuario(null);
    setSessaoExpirada(true);
  }, []);

  async function sair() {
    await api('/auth/logout', { metodo: 'POST' }).catch(() => {});
    salvarToken(null);
    setUsuario(null);
    setSessaoExpirada(false);
  }

  if (verificando) return <div className={styles.page}><p className={styles.muted}>Carregando…</p></div>;

  if (!usuario) {
    return (
      <Login
        aviso={sessaoExpirada ? 'Sua sessão expirou. Entre novamente.' : ''}
        aoEntrar={(u) => { setSessaoExpirada(false); setUsuario(u); }}
      />
    );
  }

  return <Painel usuario={usuario} aoSair={sair} aoExpirar={aoExpirar} />;
}

function Painel({ usuario, aoSair, aoExpirar }) {
  const [params, setParams] = useSearchParams();
  const aba = ABAS.some((a) => a.chave === params.get('aba')) ? params.get('aba') : ABAS[0].chave;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          AmorMiau <span>Painel</span>
        </div>
        <div className={styles.topbarActions}>
          <span className={styles.userName}>{usuario.nome}</span>
          <Link to="/" className={styles.linkButton} target="_blank">Ver site</Link>
          <button type="button" className={styles.secondary} onClick={aoSair}>Sair</button>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Seções do painel">
        {ABAS.map(({ chave, rotulo }) => (
          <button
            key={chave}
            type="button"
            className={`${styles.tab} ${aba === chave ? styles.tabActive : ''}`}
            aria-current={aba === chave ? 'page' : undefined}
            onClick={() => setParams({ aba: chave })}
          >
            {rotulo}
          </button>
        ))}
      </nav>

      <main className={styles.main}>
        {aba === 'sobre'
          ? <SobreAdmin aoExpirar={aoExpirar} />
          : <RecursoAdmin key={aba} recurso={RECURSOS[aba]} aoExpirar={aoExpirar} />}
      </main>
    </div>
  );
}

function Login({ aviso, aoEntrar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setErro('');
    setEntrando(true);
    try {
      const { token, usuario } = await api('/auth/login', { metodo: 'POST', corpo: { email, senha } });
      salvarToken(token);
      aoEntrar(usuario);
    } catch (e) {
      setErro(e.message);
      setEntrando(false);
    }
  }

  return (
    <div className={`${styles.page} ${styles.loginPage}`}>
      <form className={styles.loginCard} onSubmit={entrar}>
        <GatoEspiando className={styles.loginCat} pelo="#f4b98a" />
        <div className={styles.brand}>AmorMiau <span>Painel</span></div>
        <h1>Entrar</h1>
        <p className={styles.muted}>Acesso restrito à equipe do site.</p>

        {aviso && !erro && <p className={styles.error} role="status">{aviso}</p>}
        {erro && <p className={styles.error} role="alert">{erro}</p>}

        <div className={styles.field}>
          <label htmlFor="login-email">E-mail</label>
          <input id="login-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="login-senha">Senha</label>
          <input id="login-senha" type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button type="submit" className={styles.primary} disabled={entrando}>
          {entrando ? 'Entrando…' : 'Entrar'}
        </button>
        <Link to="/" className={styles.linkButton}>← Voltar ao site</Link>
      </form>
    </div>
  );
}
