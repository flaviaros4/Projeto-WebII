import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';
import { App } from './app';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login}
];
