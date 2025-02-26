import { useEffect } from 'react'

export type Veiculo = {
  id: string;
  marca: string;
  modelo: string;
  nome: string;
  cor: number;
  ano: string;
  placa: string;
  renavam: string;
}
export const cores = [
  '01-Amarelo', '02-Azul',    '03-Bege',     '04-Branco',
  '05-Cinza',   '06-Dourado', '07-Grená',    '08-Laranja',
  '09-Marrom',  '10-Prata',   '11-Preto',    '12-Rosa',
  '13-Roxo',    '14-Verde',   '15-Vermelho', '16-Fantasia'
];

export default function PaginaInicial() {
  useEffect (()=> {
    document.title = 'Página inicial - Veículos';
  }, [])

  return (
    <div className='centralizado'>
      <h2>Página inicial</h2>
    </div>
  )
}