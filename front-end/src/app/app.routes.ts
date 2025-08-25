import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';
import { App } from './app';
import { Login } from './pages/login/login';
import { SolicitacaoDeManutencao } from './pages/solicitacao-de-manutencao/solicitacao-de-manutencao';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login},
  {path: 'solicitacao', component:SolicitacaoDeManutencao}

];
