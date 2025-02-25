import { useEffect, useState } from 'react'
import { cores, Veiculo } from './PaginaInicial';
import { Link, useHistory, useParams } from 'react-router-dom';

export default function InformacoesDoVeiculo() {
  const [aguardandoServidor, setAguardandoServidor] = useState(true);
  const [veiculo, setVeiculo] = useState<Veiculo>();
  const {id} = useParams<{id: string}>();
  const historico = useHistory();

  useEffect(()=>{
    document.title = 'Informações do veículo';

    const request = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    fetch(import.meta.env.VITE_SERVIDOR + '/veiculo/'+id, request)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (resp.error)
        alert('Falha ao obter informações do veículo do servidor:\n' + resp.error);
      else
        setVeiculo(resp);
    })
    .catch(e => alert('Falha na comunicação com o servidor.\n' + e))
    .finally(() => setAguardandoServidor(false));
  }, [])

  function excluir() {
    if (confirm('Confirma exclusão do veículo "'+veiculo?.nome+'"?')) {
      const request = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      };
      fetch(import.meta.env.VITE_SERVIDOR + '/veiculo/'+id, request)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.error)
          alert('Falha ao excluir veículo:\n' + resp.error);
        else {
          alert('Veículo excluído com sucesso.');
          historico.push('/veiculos');
        }
      })
      .catch(e => alert('Falha na comunicação com o servidor.\n' + e))
      .finally(() => setAguardandoServidor(false));}

  }

  return (
    <div className='centralizado'>
      <h2>Informações do veículo: {veiculo?.nome}</h2>
      {aguardandoServidor
        ? <p>Buscando dados no servidor...</p>
        : veiculo
          ? <div>
              <p>Marca: {veiculo.marca}</p>
              <p>Modelo: {veiculo.modelo}</p>
              <p>Nome: {veiculo.nome}</p>
              <p>Cor: {cores[veiculo.cor-1]}</p>
              <p>Ano: {veiculo.ano}</p>
              <p>Placa: {veiculo.placa}</p>
              <p>RENAVAM: {veiculo.renavam}</p>
              <div>
                <Link to={'/veiculos/editar/' + veiculo.id}><button>Editar</button></Link>
                <button onClick={excluir}>Excluir</button>
              </div>
            </div>
          : <p>Veículo não encontrado.</p>
      }
    </div>
  )
}