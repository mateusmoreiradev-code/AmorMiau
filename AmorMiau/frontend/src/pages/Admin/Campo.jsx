import { useId, useState } from 'react';
import { enviarImagem } from '../../api';
import styles from './admin.module.css';

/** Um campo do formulário do painel, escolhido pelo `campo.tipo`. */
export default function Campo({ campo, valor, erro, aoAlterar, aoEnviarImagem, tratarErro }) {
  const id = useId();
  const { nome, rotulo, tipo, obrigatorio, ajuda, meia, placeholder, maxLength, opcoes, linhas = 5 } = campo;
  const classe = `${styles.field} ${meia ? styles.half : ''} ${erro ? styles.fieldError : ''}`;
  const descricao = erro || ajuda ? `${id}-ajuda` : undefined;
  const comum = { id, name: nome, 'aria-invalid': Boolean(erro), 'aria-describedby': descricao };

  if (tipo === 'checkbox') {
    return (
      <div className={classe}>
        <label className={styles.check}>
          <input type="checkbox" {...comum} checked={valor} onChange={(e) => aoAlterar(e.target.checked)} />
          <span>{rotulo}</span>
        </label>
        <Ajuda id={descricao} erro={erro} ajuda={ajuda} />
      </div>
    );
  }

  let controle;
  if (tipo === 'imagem') {
    controle = <CampoImagem id={id} valor={valor} aoAlterar={aoAlterar} aoEnviar={aoEnviarImagem} tratarErro={tratarErro} />;
  } else if (tipo === 'textarea') {
    controle = <textarea {...comum} rows={linhas}value={valor} placeholder={placeholder} required={obrigatorio} onChange={(e) => aoAlterar(e.target.value)} />;
  } else if (tipo === 'select') {
    controle = (
      <select {...comum} value={valor} onChange={(e) => aoAlterar(e.target.value)}>
        {opcoes.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
      </select>
    );
  } else {
    const tipoInput = { data: 'date', dataHora: 'datetime-local', numero: 'number' }[tipo] ?? 'text';
    controle = (
      <input
        {...comum}
        type={tipoInput}
        value={valor}
        placeholder={placeholder}
        maxLength={maxLength}
        required={obrigatorio}
        onChange={(e) => aoAlterar(maxLength === 2 ? e.target.value.toUpperCase() : e.target.value)}
      />
    );
  }

  return (
    <div className={classe}>
      <label htmlFor={id}>
        {rotulo}
        {obrigatorio && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      {controle}
      <Ajuda id={descricao} erro={erro} ajuda={ajuda} />
    </div>
  );
}

function Ajuda({ id, erro, ajuda }) {
  if (!id) return null;
  return <small id={id} className={erro ? styles.errorText : styles.hint}>{erro ?? ajuda}</small>;
}

function CampoImagem({ id, valor, aoAlterar, aoEnviar, tratarErro }) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function escolher(evento) {
    const arquivo = evento.target.files?.[0];
    evento.target.value = '';
    if (!arquivo) return;
    setErro('');
    setEnviando(true);
    aoEnviar(true);
    try {
      aoAlterar(await enviarImagem(arquivo));
    } catch (e) {
      setErro(tratarErro(e));
    } finally {
      setEnviando(false);
      aoEnviar(false);
    }
  }

  return (
    <div className={styles.imageField}>
      {valor
        ? <img className={styles.imagePreview} src={valor} alt="Pré-visualização" />
        : <span className={`${styles.imagePreview} ${styles.thumbEmpty}`} aria-hidden="true">🐾</span>}
      <div className={styles.imageButtons}>
        <label className={styles.secondary}>
          {enviando ? 'Enviando…' : valor ? 'Trocar imagem' : 'Escolher imagem'}
          <input id={id} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className={styles.visuallyHidden} onChange={escolher} disabled={enviando} />
        </label>
        {valor && !enviando && (
          <button type="button" className={styles.linkButton} onClick={() => aoAlterar('')}>Remover imagem</button>
        )}
        <small className={erro ? styles.errorText : styles.hint}>{erro || 'JPG, PNG, WEBP ou GIF, até 5 MB.'}</small>
      </div>
    </div>
  );
}
