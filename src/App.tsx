import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Cadastro from './paginas/Cadastro'
import PaginaNaoEncontrada from './paginas/PaginaNaoEncontrada'
import PaginaInicial from './paginas/PaginaInicial'
import InformacoesDoVeiculo from './paginas/InformacoesDoVeiculo'
import BarraSuperior from './componentes/BarraSuperior'
import ListaDeVeiculos from './paginas/ListaDeVeiculos'
import BarraInferior from './componentes/BarraInferior'
import EditandoVeiculo from './paginas/EditandoVeiculo'

export default function App() {

  return (
    <BrowserRouter>
      <BarraSuperior/>
      <Switch>
        <Route exact path='/'>
          <PaginaInicial/>
        </Route>
        <Route exact path='/veiculos'>
          <ListaDeVeiculos/>
        </Route>
        <Route path='/cadastro'>
          <Cadastro/>
        </Route>
        <Route exact path='/veiculos/:id'>
          <InformacoesDoVeiculo />
        </Route>
        <Route path='/veiculos/editar/:id'>
          <EditandoVeiculo />
        </Route>
        <Route>
          <PaginaNaoEncontrada/>
        </Route>
      </Switch>
      <BarraInferior/>
    </BrowserRouter>
  )
}
