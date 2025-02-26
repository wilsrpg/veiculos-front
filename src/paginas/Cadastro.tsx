import React, { useEffect, useState } from 'react'
import { cores } from './PaginaInicial';
import { useHistory } from 'react-router-dom';

export default function Cadastro() {
  const [enviando, setEnviando] = useState(false);
  const historico = useHistory();

  useEffect(() => {
    document.title = 'Cadastrando veículo - Veículos';
  }, [])

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    enviar(dados);
  }

  function enviar(dados: { [k: string]: FormDataEntryValue }) {
    const request = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...dados})
    };
    fetch(import.meta.env.VITE_SERVIDOR+'/veiculos', request)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.erros || resp.error)
        alert('Falha ao cadastrar veículo:'+(resp.erros.map((e: string) => '\n'+e) ?? resp.error));
      else {
        alert('Veículo cadastrado com sucesso.');
        historico.push('/veiculos/' + resp.id);
      }
    })
    .catch(e => alert('Falha na comunicação com o servidor.'))
    .finally(() => setEnviando(false));
  }

  return (
    <div className='centralizado'>
      <h2>Cadastro de veículos</h2>

      <form className='centralizado' onSubmit={cadastrar}>
        <div className='conteudo-formulario'>
          <label htmlFor="marca">Marca:</label>
          <input id="marca" name="marca" required/>

          <label htmlFor="modelo">Modelo:</label>
          <input id="modelo" name="modelo" required/>

          <label htmlFor="nome">Nome:</label>
          <input id="nome" name="nome" required/>

          <label htmlFor="cor">Cor:</label>
          <select id="cor" name="cor" required>
            <option></option>
            {cores.map((c, i) => <option value={i+1} key={i+1}>{c}</option>)}
          </select>

          <label htmlFor="ano">Ano:</label>
          <input id="ano" name="ano" type='number' min={1900} max={new Date(Date.now()).getFullYear()} required/>

          <label htmlFor="placa">Placa:</label>
          <input id="placa" name="placa" pattern='[a-zA-Z]{3}[0-9][a-zA-Z0-9][0-9]{2}' required/>

          <label htmlFor="renavam">Renavam:</label>
          <input id="renavam" name="renavam" pattern='[0-9]{11}' required/>
        </div>

        <button type="submit" disabled={enviando}>Cadastrar</button>
      </form>
    </div>
  )
}