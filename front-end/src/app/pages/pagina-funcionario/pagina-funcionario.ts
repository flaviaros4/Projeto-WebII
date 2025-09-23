import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrcamentoModule } from '../efetuar-orcamento/modals/orcamento/orcamento-module';
import { Usuario } from '../../shared/models/cliente.model';

interface SolicitacaoFuncionario {
  id: number;
  dataHora: string;
  cliente: string;
  equipamento: string;
  estado: string;
}

@Component({
  selector: 'app-pagina-funcionario',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './pagina-funcionario.html',
  styleUrl: './pagina-funcionario.css'
})
export class PaginaFuncionario implements OnInit {
  displayedColumns: string[] = ['dataHora', 'cliente', 'equipamento', 'acoes'];
  solicitacoes: SolicitacaoFuncionario[] = [];
  funcionarioLogado: Usuario | null = null;
  
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Dados fictícios (para testes)
    this.solicitacoes = [
      { id: 1, dataHora: '2025-08-31 14:20', cliente: 'Flávia Rosa', equipamento: 'Notebook aplle', estado: 'ABERTA' },
      { id: 2, dataHora: '2025-08-30 09:10', cliente: 'Leticia Sanches', equipamento: 'Impressora HP', estado: 'ABERTA' },
      { id: 3, dataHora: '2025-08-29 11:00', cliente: 'Leon Trindade', equipamento: 'Celular Samsung A31', estado: 'ABERTA' },
      { id: 4, dataHora: '2025-08-28 11:00', cliente: 'Leonardo Alberto', equipamento: 'Celular Iphone 15', estado: 'ABERTA' },
      { id: 5, dataHora: '2025-08-20 11:00', cliente: 'Arthur Dias', equipamento: 'Notebook Dell', estado: 'ABERTA' },
    ];

   
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    if (usuarioLogadoString) {
      this.funcionarioLogado = JSON.parse(usuarioLogadoString);
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
}