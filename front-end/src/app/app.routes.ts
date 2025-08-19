import { Routes } from '@angular/router';

import { Cadastro } from './pages/cadastro/cadastro';

import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro },
  { path: 'login', component: Login}
];
