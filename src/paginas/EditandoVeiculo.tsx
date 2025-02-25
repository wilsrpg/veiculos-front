import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { cores, Veiculo } from './PaginaInicial';

export default function EditandoVeiculo() {
  const [aguardandoServidor, setAguardandoServidor] = useState(true);
  const [veiculo, setVeiculo] = useState<Veiculo>();
  const {id} = useParams<{id: string}>();
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    document.title = 'Editando veículo - Veículos';

    const request = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    fetch(import.meta.env.VITE_SERVIDOR + '/veiculo/'+id, request)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error)
        alert('Falha ao obter informações do veículo do servidor:\n' + resp.error);
      else
        setVeiculo(resp);
    })
    .catch(e => alert('Falha na comunicação com o servidor.\n' + e))
    .finally(() => setAguardandoServidor(false));
  }, [])

  function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    enviar(dados);
  }

  function enviar(dados: { [k: string]: FormDataEntryValue }) {
    const request = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...dados, id: id})
    };
    fetch(import.meta.env.VITE_SERVIDOR + '/veiculo/'+id, request)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.erros || resp.error)
        alert('Falha ao salvar informações do veículo:'+(resp.erros.map((e: string) => '\n'+e) ?? resp.error));
      else
        alert('Informações do veículo atualizadas com sucesso.');
    })
    .catch(e => alert('Falha na comunicação com o servidor.'))
    .finally(() => setEnviando(false));
  }

  return (
    <div className='centralizado'>
      <h2>Editando informações do veículo: {veiculo?.nome}</h2>
      
      {aguardandoServidor
        ? <p>Buscando dados no servidor...</p>
        : veiculo
          ? <form className='centralizado' onSubmit={salvar}>
              <div className='conteudo-formulario'>
                <label htmlFor="marca">Marca:</label>
                <input id="marca" name="marca" required defaultValue={veiculo.marca}/>

                <label htmlFor="modelo">Modelo:</label>
                <input id="modelo" name="modelo" required defaultValue={veiculo.modelo}/>

                <label htmlFor="nome">Nome:</label>
                <input id="nome" name="nome" required defaultValue={veiculo.nome}/>

                <label htmlFor="cor">Cor:</label>
                <select id="cor" name="cor" required defaultValue={veiculo.cor}>
                  <option></option>
                  {cores.map((c, i) => <option value={i+1} key={i+1}>{c}</option>)}
                </select>

                <label htmlFor="ano">Ano:</label>
                <input id="ano" name="ano" type='number' min={1900} max={new Date(Date.now()).getFullYear()} required defaultValue={veiculo.ano}/>

                <label htmlFor="placa">Placa:</label>
                <input id="placa" name="placa" pattern='[a-zA-Z]{3}[0-9][a-zA-Z0-9][0-9]{2}' required defaultValue={veiculo.placa}/>

                <label htmlFor="renavam">Renavam:</label>
                <input id="renavam" name="renavam" pattern='[0-9]{11}' required defaultValue={veiculo.renavam}/>
              </div>

              <div>
                <button type='button' onClick={() => history.back()}>Voltar</button>
                <button type="submit" disabled={enviando}>Salvar</button>
              </div>
            </form>
          : <p>Veículo não encontrado.</p>
      }
    </div>
  )
}