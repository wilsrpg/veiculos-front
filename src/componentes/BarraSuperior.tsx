import { Link } from "react-router-dom";
import Notificacao from "./Notificacao";

export default function BarraSuperior() {
  return (
    <nav>
      <Link to={'/'}>Página inicial</Link>
      <Link to='/veiculos'>Lista de veículos</Link>
      <Link to='/cadastro'>Cadastrar veículo</Link>
      {/*<Notificacao/>*/}
    </nav>
  )
}