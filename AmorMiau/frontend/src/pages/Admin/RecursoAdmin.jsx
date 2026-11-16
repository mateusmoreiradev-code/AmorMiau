import { useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import Campo from './Campo';
import { paraApi, paraFormulario } from './recursos';
import styles from './admin.module.css';

/** Lista + formulário de cadastro/edição para um recurso descrito em recursos.js. */
export default function RecursoAdmin({ recurso, aoExpirar }) {
  const [itens, setItens] = useState(null);
  const [erroLista, setErroLista] = useState('');
  const [editando, setEditando] = useState(null); // null = lista; {} = novo; item = edição
  const [aviso, setAviso] = useState('');

  const tratarErro = useCallback(
    (erro) => {
      if (erro.status === 401) aoExpirar();
      return erro.message;
    },
    [aoExpirar],
  );

  const carregar = useCallback(() => {
    api(`${recurso.rota}/admin${recurso.consultaAdmin ?? ''}`)
      .then((dados) => {
        setItens(dados);
        setErroLista('');
      })
      .catch((erro) => setErroLista(tratarErro(erro)));
  }, [recurso, tratarErro]);

  useEffect(carregar, [carregar]);

  async function remover(item) {
    const { titulo } = recurso.resumo(item);
    if (!window.confirm(`Remover "${titulo}"? Essa ação não pode ser desfeita.`)) return;
    try {
      await api(`${recurso.rota}/${item.id}`, { metodo: 'DELETE' });
      setAviso(`"${titulo}" foi removido.`);
      carregar();
    } catch (erro) {
      setAviso('');
      setErroLista(tratarErro(erro));
    }
  }

  function aoSalvar(item, novo) {
    // Atualiza a lista na hora; o recarregamento abaixo acerta a ordenação
    setItens((atual) => (novo ? [item, ...(atual ?? [])] : atual?.map((i) => (i.id === item.id ? item : i))));
    setEditando(null);
    setAviso(`"${recurso.resumo(item).titulo}" foi ${novo ? 'cadastrado' : 'atualizado'}.`);
    carregar();
  }

  if (editando) {
    return (
      <Formulario
        recurso={recurso}
        item={editando.id ? editando : null}
        aoCancelar={() => setEditando(null)}
        aoSalvar={aoSalvar}
        tratarErro={tratarErro}
      />
    );
  }

  return (
    <section>
      <div className={styles.toolbar}>
        <h2>{recurso.rotulo}</h2>
        <button type="button" className={styles.primary} onClick={() => { setAviso(''); setEditando({}); }}>
          + {recurso.novo}
        </button>
      </div>

      {aviso && <p className={styles.success} role="status">{aviso}</p>}
      {erroLista && <p className={styles.error} role="alert">{erroLista}</p>}

      {itens === null && !erroLista && <p className={styles.muted}>Carregando…</p>}
      {itens?.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum {recurso.singular} cadastrado ainda.</p>
        </div>
      )}

      {itens?.length > 0 && (
        <ul className={styles.list}>
          {itens.map((item) => {
            const r = recurso.resumo(item);
            return (
              <li key={item.id} className={`${styles.row} ${r.oculto ? styles.rowHidden : ''}`}>
                {!recurso.semImagem && (
                  r.imagem
                    ? <img className={styles.thumb} src={r.imagem} alt="" />
                    : <span className={`${styles.thumb} ${styles.thumbEmpty}`} aria-hidden="true">🐾</span>
                )}
                <div className={styles.rowText}>
                  <strong>{r.titulo}</strong>
                  {r.subtitulo && <span>{r.subtitulo}</span>}
                </div>
                <span className={`${styles.badge} ${r.oculto ? styles.badgeMuted : ''}`}>{r.selo}</span>
                <div className={styles.rowActions}>
                  <button type="button" className={styles.secondary} onClick={() => { setAviso(''); setEditando(item); }}>
                    Editar
                  </button>
                  <button type="button" className={styles.danger} onClick={() => remover(item)}>
                    Remover
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function Formulario({ recurso, item, aoCancelar, aoSalvar, tratarErro }) {
  const [form, setForm] = useState(() => paraFormulario(recurso.campos, item));
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [enviandoImagem, setEnviandoImagem] = useState(false);

  const alterar = (nome, valor) => setForm((atual) => ({ ...atual, [nome]: valor }));

  async function salvar(evento) {
    evento.preventDefault();
    setSalvando(true);
    setErros({});
    setErroGeral('');
    try {
      const corpo = paraApi(recurso.campos, form);
      const salvo = item
        ? await api(`${recurso.rota}/${item.id}`, { metodo: 'PUT', corpo })
        : await api(recurso.rota, { metodo: 'POST', corpo });
      aoSalvar(salvo, !item);
    } catch (erro) {
      setErros(erro.detalhes ?? {});
      setErroGeral(tratarErro(erro));
      setSalvando(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={salvar} noValidate>
      <div className={styles.toolbar}>
        <h2>{item ? `Editar ${recurso.singular}` : recurso.novo}</h2>
        <button type="button" className={styles.secondary} onClick={aoCancelar}>Voltar</button>
      </div>

      {erroGeral && <p className={styles.error} role="alert">{erroGeral}. Confira os campos destacados.</p>}

      <div className={styles.fields}>
        {recurso.campos.map((campo) => (
          <Campo
            key={campo.nome}
            campo={campo}
            valor={form[campo.nome]}
            erro={erros[campo.nome]?.[0]}
            aoAlterar={(valor) => alterar(campo.nome, valor)}
            aoEnviarImagem={setEnviandoImagem}
            tratarErro={tratarErro}
          />
        ))}
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.secondary} onClick={aoCancelar}>Cancelar</button>
        <button type="submit" className={styles.primary} disabled={salvando || enviandoImagem}>
          {salvando ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
