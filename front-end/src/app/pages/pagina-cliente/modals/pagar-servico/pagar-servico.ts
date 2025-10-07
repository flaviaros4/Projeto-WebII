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
    
    const dataHoraPagamento = new Date().toISOString();
    
    
    this.dialogRef.close({ 
      id: this.data.solicitacao.id,
      dataHoraPagamento: dataHoraPagamento,
      status: 'PAGO' 
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}