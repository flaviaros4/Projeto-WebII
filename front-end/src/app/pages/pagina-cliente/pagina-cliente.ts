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
import { MostrarOrcamento } from './modals/mostrar-orcamento/mostrar-orcamento';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './pagina-cliente.html',
  styleUrls: ['./pagina-cliente.css']
})
export class PaginaCliente {
  displayedColumns: string[] = ['dataHora', 'categoria', 'estado', 'acoes', 'acoesGerais'];
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

  mostrarOrcamento(solicitacao: Solicitacao) {
    const dialogRef = this.dialog.open(MostrarOrcamento, {
      width: '600px',
      data: solicitacao
    });
     dialogRef.afterClosed().subscribe(result => {
    if (result && solicitacao.id) {
      if (result.status === 'APROVADO') {
        alert(`Serviço Aprovado no Valor R$ ${solicitacao.precoOrcamento?.toFixed(2)}`);
        solicitacao.estado = 'APROVADO';
      } else if (result.status === 'REJEITADO') {
        solicitacao.estado = 'REJEITADO';
        solicitacao.motivoRejeicao = result.motivo;
        alert('Serviço Rejeitado');
      }
      this.clienteService.atualizarSolicitacao(solicitacao);
      this.carregarSolicitacoes(); 
    }
  });
  }

 

  resgatarServico(solicitacao: Solicitacao) {
  solicitacao.estado = 'APROVADO';

  if (!solicitacao.historico) solicitacao.historico = [];
  solicitacao.historico.push({
    dataHora: new Date().toISOString(),
    estado: 'Solicitação resgatada de REJEITADA para APROVADO'
  });

  this.clienteService.atualizarSolicitacao(solicitacao);
  alert('Serviço resgatado com sucesso! Agora ele está APROVADO.');
  this.carregarSolicitacoes();
}


  pagarSolicitacao(solicitacao: Solicitacao) {
    solicitacao.estado = 'PAGO'; 
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
