import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Solicitacao } from '../../../../shared/models/solicitacao.model'; 


export interface PagarServicoDialogData {
  solicitacao: Solicitacao;
}

@Component({
  selector: 'app-pagar-servico',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, CurrencyPipe, MatIconModule],
  templateUrl: './pagar-servico.html',
  styleUrls: ['./pagar-servico.css']
})
export class PagarServico {
  
  constructor(
    public dialogRef: MatDialogRef<PagarServico>,
    @Inject(MAT_DIALOG_DATA) public data: PagarServicoDialogData
  ) {}

  confirmarPagamento(): void {
    const payload = {
      status: 'PAGA',
      dataHoraPagamento: new Date().toISOString()
    };
    this.dialogRef.close(payload);
  }

  fechar(): void {
    this.dialogRef.close();
  }
}