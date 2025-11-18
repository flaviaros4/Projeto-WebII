import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-visualizar-solicitacao',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCardModule],
  templateUrl: './visualizar-solicitacao.html',
  styleUrls: ['./visualizar-solicitacao.css']
})
export class VisualizarSolicitacao {
  constructor(
    public dialogRef: MatDialogRef<VisualizarSolicitacao>,
    @Inject(MAT_DIALOG_DATA) public solicitacao: Solicitacao
  ) {}

  fechar() {
    this.dialogRef.close();
  }

  executarAcao(acao: string) {
    console.log('Executando ação:', acao);
  }
}
