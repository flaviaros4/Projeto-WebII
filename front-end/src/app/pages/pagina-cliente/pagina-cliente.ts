import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ClienteService } from './services/pagina-cliente';
import { SolicitacaoManutencao } from './modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { VisualizarSolicitacao } from './modals/visualizar-solicitacao/visualizar-solicitacao';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './pagina-cliente.html',
  styleUrls: ['./pagina-cliente.css']
})
export class PaginaCliente {
  displayedColumns: string[] = ['dataHora', 'categoria', 'estado', 'acoes'];
  dataSource = new MatTableDataSource<Solicitacao>([]);

  constructor(private clienteService: ClienteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    const solicitacoes = this.clienteService.listarSolicitacoes();
    solicitacoes.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
    this.dataSource.data = solicitacoes;
  }

  novaSolicitacao() {
    const dialogRef = this.dialog.open(SolicitacaoManutencao, {
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nova: Solicitacao = {
          id: 0,
          dataHora: new Date().toISOString(),
          descricao: result.descricao,
          categoria: result.categoria,
          descricaoDefeito: result.descricaoDefeito || '',
          estado: 'ABERTA'
        };
        this.clienteService.cadastrarSolicitacao(nova);
        this.carregarSolicitacoes();
      }
    });
  }

  removerSolicitacao(solicitacao: Solicitacao) {
    this.clienteService.removerSolicitacao(solicitacao.id);
    this.carregarSolicitacoes();
  }

  aprovarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 'APROVADA';
    this.clienteService.atualizarSolicitacao(solicitacao);
    this.carregarSolicitacoes();
  }

  rejeitarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 'REJEITADA';
    this.clienteService.atualizarSolicitacao(solicitacao);
    this.carregarSolicitacoes();
  }

  resgatarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 'ABERTA';
    this.clienteService.atualizarSolicitacao(solicitacao);
    this.carregarSolicitacoes();
  }

  pagarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 'PAGA'; 
    this.clienteService.atualizarSolicitacao(solicitacao);
    this.carregarSolicitacoes();
  }

  visualizarSolicitacao(solicitacao: Solicitacao) {
    this.dialog.open(VisualizarSolicitacao, {
      width: '800px',
      data: solicitacao
    });
  }
}
