import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { SolicitacaoService } from '../../services/solicitacao-service';
import { Redirecionar } from '../redirecionar/redirecionar';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, DatePipe],
  templateUrl: './efetuar-manutencao.html',
  styleUrl: './efetuar-manutencao.css'
})
export class EfetuarManutencao {
  descricaoManutencao: string = '';
  orientacoesCliente: string = '';

  solicitacao?: Solicitacao;
  cliente?: string;

  constructor(
    public dialogRef: MatDialogRef<EfetuarManutencao>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private solicitacaoService: SolicitacaoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  this.detalhesSolicitacao(this.data.id);
  }

   detalhesSolicitacao(id: number): void {
    this.solicitacaoService.detalhesSolicitacao(id).subscribe({
      next: ({ solicitacao, cliente }) => {
        this.solicitacao = solicitacao;
        this.cliente = cliente?.nome ?? '';
      }, 
      error: () => alert('Falha ao carregar detalhes da solicitação') 
    });

  }
  
  efetuarManutencao() {
    this.solicitacaoService.efetuarManutencao(this.data.id, this.descricaoManutencao, this.orientacoesCliente).subscribe({
      next: (solicitacao) => {
        alert('Manutenção efetuada com sucesso.');
        this.dialogRef.close(solicitacao);
      },
      error: () => alert('Falha ao efetuar manutenção.')
    });
  }

  fechar() {
    this.dialogRef.close();
  }

 redirecionar() {
    const ref = this.dialog.open(Redirecionar, { data: { id: this.data.id } });
    ref.afterClosed().subscribe(result => {
      if (result) this.dialogRef.close(result);
    });
  }
}