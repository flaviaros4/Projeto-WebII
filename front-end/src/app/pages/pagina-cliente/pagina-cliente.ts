import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ClienteService } from './services/cliente-service';
import { SolicitacaoManutencao } from './modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { VisualizarSolicitacao } from './modals/visualizar-solicitacao/visualizar-solicitacao';
import { MostrarOrcamento } from './modals/mostrar-orcamento/mostrar-orcamento';
import { RouterLink } from '@angular/router';
import { NgxMaskPipe } from 'ngx-mask';
import { PagarServico } from './modals/pagar-servico/pagar-servico';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, RouterLink, NgxMaskPipe, PagarServico],
  templateUrl: './pagina-cliente.html',
  styleUrls: ['./pagina-cliente.css']
})
export class PaginaCliente {
  displayedColumns: string[] = ['dataHora', 'categoria', 'estado', 'acoes', 'acoesGerais'];
  dataSource = new MatTableDataSource<Solicitacao>([]);

  constructor(private clienteService: ClienteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarSolicitacoes();
  }

  listarSolicitacoes(): void {
    this.clienteService.listarSolicitacoes().subscribe({
      next: solicitacoes => {
        const lista = (solicitacoes ?? []).slice().sort(
          (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
        );
        this.dataSource.data = lista;
      },
      error: () => alert('Falha ao carregar solicitações')
    });
  }

  cadastrarSolicitacao() {
    const dialogRef = this.dialog.open(SolicitacaoManutencao, {
      width: '800px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.categoriaId) {
      this.clienteService.cadastrarSolicitacao(result).subscribe({
        next: () => this.listarSolicitacoes(),
        error: () => alert('Erro ao cadastrar solicitação')
      });
    }
  });
  }


  mostrarOrcamento(solicitacao: Solicitacao) {
    const dialogRef = this.dialog.open(MostrarOrcamento, {
      width: '600px',
      data: solicitacao
    });
     dialogRef.afterClosed().subscribe(result => {
    if (result && solicitacao.id) {
      if (result.status === 'APROVADA') {
        alert(`Serviço Aprovado no Valor R$ ${solicitacao.precoOrcamento?.toFixed(2)}`);
        solicitacao.estado = 'APROVADA';
      } else if (result.status === 'REJEITADA') {
        solicitacao.estado = 'REJEITADA';
        solicitacao.motivoRejeicao = result.motivo;
        alert('Serviço Rejeitado');
      }
      this.listarSolicitacoes();
    }
  });
  }

 

  resgatarServico(solicitacao: Solicitacao) {
  solicitacao.estado = 'APROVADA';

  if (!solicitacao.historico) solicitacao.historico = [];
  solicitacao.historico.push({
    dataHora: new Date().toISOString(),
    estado: 'Solicitação resgatada de REJEITADA para APROVADO'
  });

  alert('Serviço resgatado com sucesso! Agora ele está APROVADO.');
  this.listarSolicitacoes();
}

  abrirModalPagamento(solicitacao: Solicitacao) {
    const dialogRef = this.dialog.open(PagarServico, {
        width: '450px',
        data: { solicitacao } 
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result && result.status === 'PAGO') {
           
            this.pagarSolicitacao(solicitacao, result.dataHoraPagamento);
        }
    });
}


  pagarSolicitacao(solicitacao: Solicitacao, dataHoraPagamento: string) {
 
    solicitacao.estado = 'PAGA'; 
    
   
    solicitacao.dataPagamento = dataHoraPagamento; 
    
    
    if (!solicitacao.historico) solicitacao.historico = [];
    solicitacao.historico.push({
        dataHora: dataHoraPagamento,
        estado: 'PAGA'
    });


    alert('Pagamento confirmado com sucesso! A solicitação está PAGA.');
    this.listarSolicitacoes();
}

  visualizarSolicitacao(solicitacao: Solicitacao) {
    this.dialog.open(VisualizarSolicitacao, {
      width: '800px',
      data: solicitacao
    });
  }
}
