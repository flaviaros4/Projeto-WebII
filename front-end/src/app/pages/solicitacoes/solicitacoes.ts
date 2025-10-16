import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { OrcamentoModule } from '../efetuar-orcamento/modals/orcamento/orcamento-module';
import { Usuario } from '../../shared/models/cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { EfetuarManutencao } from '../pagina-funcionario/modals/efetuar-manutencao/efetuar-manutencao';
import { FinalizarSolicitacao } from './modals/finalizar-solicitacao/finalizar-solicitacao';
import { SolicitacaoManutencao } from '../pagina-cliente/modals/solicitacao-de-manutencao/solicitacao-de-manutencao';

interface SolicitacaoFuncionario {
  id: number;
  dataHora: string;
  cliente: string;
  equipamento: string;
  estado: string;
}



@Component({
  selector: 'app-solicitacoes',
  imports: [MatIconModule, CommonModule, MatTableModule],
  templateUrl: './solicitacoes.html',
  styleUrl: './solicitacoes.css'
})
export class Solicitacoes {
displayedColumns: string[] = ['dataHora', 'cliente', 'equipamento', 'estado', 'acoes'];
  solicitacoes: SolicitacaoFuncionario[] = [];
  funcionarioLogado: Usuario | null = null;
  
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Dados fictícios (para testes)
    this.solicitacoes = [
      { id: 1, dataHora: '2025-08-31 14:20', cliente: 'Flávia Rosa', equipamento: 'Notebook Apple', estado: 'ABERTA' },
      { id: 2, dataHora: '2025-08-30 09:10', cliente: 'Leticia Sanches', equipamento: 'Impressora HP', estado: 'ORÇADA' },
      { id: 3, dataHora: '2025-08-29 11:00', cliente: 'Leon Trindade', equipamento: 'Celular Samsung A31', estado: 'REJEITADA' },
      { id: 4, dataHora: '2025-08-28 11:00', cliente: 'Leonardo Alberto', equipamento: 'Celular Iphone 15', estado: 'APROVADA' },
      { id: 5, dataHora: '2025-08-20 11:00', cliente: 'Arthur Dias', equipamento: 'Notebook Dell', estado: 'REDIRECIONADA' },
      { id: 6, dataHora: '2025-08-18 11:00', cliente: 'João Paulo', equipamento: 'Tablet Samsung', estado: 'ARRUMADA' },
      { id: 7, dataHora: '2025-08-15 11:00', cliente: 'Maria Santos', equipamento: 'Smartwatch Apple', estado: 'PAGA' },
      { id: 8, dataHora: '2025-08-10 11:00', cliente: 'José Silva', equipamento: 'Desktop HP', estado: 'FINALIZADA' },

    ];

   
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    if (usuarioLogadoString) {
      this.funcionarioLogado = JSON.parse(usuarioLogadoString);
    }
  }

  defineCorEstado(estado: string): string {
    switch (estado) {
      case 'ABERTA':
        return 'cor-aberta';
      case 'ORÇADA':
        return 'cor-orcada';
      case 'REJEITADA':
        return 'cor-rejeitada';
      case 'APROVADA':
        return 'cor-aprovada';
      case 'REDIRECIONADA':
        return 'cor-redirecionada';
      case 'ARRUMADA':
        return 'cor-arrumada';
      case 'PAGA':
        return 'cor-paga';
      case 'FINALIZADA':
        return 'cor-finalizada';
      default:
        return '';
    }
  }

  

  efetuarOrcamento(solicitacao: SolicitacaoFuncionario) {
    this.dialog.open(OrcamentoModule, {
      data: {
        ...solicitacao,
        funcionario: this.funcionarioLogado
      }
    });
  }

  efetuarManutencao(solicitacao: SolicitacaoFuncionario) {
    this.dialog.open(EfetuarManutencao, {
      data: {
        ...solicitacao,
        funcionario: this.funcionarioLogado
      }
    });
  }

  finalizarSolicitacao(solicitacao: SolicitacaoFuncionario) {
    const dialogRef = this.dialog.open(FinalizarSolicitacao, {
      width: '400px',
      data: { solicitacao } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        solicitacao.estado = 'FINALIZADA';
      } 
});
  }
  
  }
