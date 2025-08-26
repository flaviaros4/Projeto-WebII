import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';

import { Login } from './pages/login/login';
import { SolicitacaoDeManutencao } from './pages/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { EfetuarOrcamento } from './pages/efetuar-orcamento/efetuar-orcamento';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login},
  {path: 'solicitacao', component:SolicitacaoDeManutencao},
  {path: 'orcamento', component:EfetuarOrcamento}
];
