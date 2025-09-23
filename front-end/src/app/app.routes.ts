import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';
import { Login } from './pages/login/login';

import { SolicitacaoManutencao } from './pages/pagina-cliente/modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { EfetuarOrcamento } from './pages/efetuar-orcamento/efetuar-orcamento';

import { PaginaCliente } from './pages/pagina-cliente/pagina-cliente';

import { PaginaFuncionario } from './pages/pagina-funcionario/pagina-funcionario';
import { ListarFuncionarios } from './pages/listar-funcionarios/listar-funcionarios';
import { Pagar } from './pages/pagar/pagar';
import { EfetuarManutencao } from './pages/efetuar-manutencao/efetuar-manutencao';


export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login},
  { path: 'orcamento', component: EfetuarOrcamento},
  { path: 'cliente', component: PaginaCliente},
  { path: 'funcionario', component: PaginaFuncionario},
  { path: 'funcionarios', component: ListarFuncionarios},
  { path: 'pagar', component: Pagar},
  { path: 'manutencao', component: EfetuarManutencao}
];
