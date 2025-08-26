import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';
import { Login } from './pages/login/login';

import { SolicitacaoDeManutencao } from './pages/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { EfetuarOrcamento } from './pages/efetuar-orcamento/efetuar-orcamento';

import { PaginaCliente } from './pages/pagina-cliente/pagina-cliente';

import { PaginaFuncionario } from './pages/pagina-funcionario/pagina-funcionario';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login},
  { path: 'orcamento', component: EfetuarOrcamento},
  { path: 'solicitacao', component: SolicitacaoDeManutencao},
  { path: 'cliente', component: PaginaCliente},
  { path: 'funcionario', component: PaginaFuncionario}
];
