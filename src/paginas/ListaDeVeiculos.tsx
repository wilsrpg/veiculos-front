import { useEffect, useState } from 'react'
import { cores, Veiculo } from './PaginaInicial';

export default function ListaDeVeiculos() {
  const [aguardandoServidor, setAguardandoServidor] = useState(true);
  const [veiculos, setVeiculos] = useState<Veiculo[]>();

  useEffect (() => {
    document.title = 'Lista de veículos';
    
    const request = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    fetch(import.meta.env.VITE_SERVIDOR + '/veiculos', request)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error)
        alert('Falha ao obter veículos do servidor:\n' + resp.error);
      else
        setVeiculos(resp);
    })
    .catch(e => alert('Falha na comunicação com o servidor.\n' + e))
    .finally(() => setAguardandoServidor(false));

  }, [])

  return (
    <div className='centralizado'>
      <h2>Catálogo de veículos</h2>
      {aguardandoServidor
        ? <span>Buscando dados no servidor...</span>
        : veiculos == undefined
          ? <span>Falha na comunicaçao com o servidor.</span>
          : <>
            {veiculos.length == 0
              ? <span>Nenhum veículo encontrado.</span>
              : veiculos.length == 1
                ? <span>1 veículo cadastrado.</span>
                : <span>{veiculos.length} veículos cadastrados.</span>
            }
            <table>
              <tbody>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Nome</th>
                  <th>Cor</th>
                  <th>Ano</th>
                  <th>Placa</th>
                  <th>RENAVAM</th>
                </tr>
                {veiculos != undefined
                ? veiculos.map((v, i) => (
                  <tr key={i}>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td><a href={'/veiculos/'+v.id}>{v.nome}</a></td>
                    <td>{cores[v.cor-1]}</td>
                    <td>{v.ano}</td>
                    <td>{v.placa}</td>
                    <td>{v.renavam}</td>
                  </tr>
                ))
                : <tr><td colSpan={7}>Nenhum veículo cadastrado.</td></tr>
                }
              </tbody>
            </table>
            </>
      }
    </div>
  )
}