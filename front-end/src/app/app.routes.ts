// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { CadastroFuncionarioComponent } from './pages/crud-funcionarios/cadastro-funcionario.component';
import { Login } from './pages/login/login';

import { SolicitacaoManutencao } from './pages/pagina-cliente/modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { EfetuarOrcamento } from './pages/efetuar-orcamento/efetuar-orcamento';

import { PaginaCliente } from './pages/pagina-cliente/pagina-cliente';
import { PaginaFuncionario } from './pages/pagina-funcionario/pagina-funcionario';
import { ListarFuncionariosComponent } from './pages/crud-funcionarios/listar-funcionarios.component';
import { Pagar } from './pages/pagar/pagar';
import { EfetuarManutencao } from './pages/efetuar-manutencao/efetuar-manutencao';
import { Cadastro } from './pages/cadastro/cadastro';
import { Categorias } from './pages/crud-categorias/categorias';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { Redirecionar } from './pages/redirecionar/redirecionar';
import { Relatorios } from './pages/relatorios/relatorios';

export const routes: Routes = [
  { path: 'cadastro', component: Cadastro},
  { path: 'login', component: Login },
  { path: 'orcamento', component: EfetuarOrcamento },
  { path: 'cliente', component: PaginaCliente },
  { path: 'funcionario', component: PaginaFuncionario },
  { path: 'funcionarios', component: ListarFuncionariosComponent },
  { path: 'pagar', component: Pagar },
  { path: 'manutencao', component: EfetuarManutencao },
  {path: 'categorias', component: Categorias},
  {path: 'solicitacoes', component: Solicitacoes},
  {path: 'relatorios', component: Relatorios},
];
