
import { Routes } from '@angular/router';

import { CadastroFuncionarioComponent } from './pages/crud-funcionarios/cadastro-funcionario.component';
import { Login } from './pages/login/login';

import { SolicitacaoManutencao } from './pages/pagina-cliente/modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { EfetuarOrcamento } from './pages/pagina-funcionario/modals/efetuar-orcamento/efetuar-orcamento';

import { PaginaCliente } from './pages/pagina-cliente/pagina-cliente';
import { PaginaFuncionario } from './pages/pagina-funcionario/pagina-funcionario';
import { ListarFuncionariosComponent } from './pages/crud-funcionarios/listar-funcionarios.component';
import { EfetuarManutencao } from './pages/efetuar-manutencao/efetuar-manutencao';
import { Cadastro } from './pages/cadastro/cadastro';
import { Categorias } from './pages/crud-categorias/categorias';
import { Solicitacoes } from './pages/solicitacoes/solicitacoes';
import { Relatorios } from './pages/relatorios/relatorios';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro},
  { path: 'login', component: Login },
  { path: 'orcamento', component: EfetuarOrcamento },
  { path: 'cliente', component: PaginaCliente,
    canActivate: [authGuard],
    data: { perfil: ['CLIENTE'] }
  },
  { path: 'funcionario', component: PaginaFuncionario,
    canActivate: [authGuard],
    data: { perfil: ['FUNCIONARIO'] }
  },
  { path: 'funcionarios', component: ListarFuncionariosComponent },
  { path: 'manutencao', component: EfetuarManutencao },
  {path: 'categorias', component: Categorias},
  {path: 'solicitacoes', component: Solicitacoes,
    canActivate: [authGuard],
    data: { perfil: ['FUNCIONARIO'] }
  },
  {path: 'relatorios', component: Relatorios},
];
