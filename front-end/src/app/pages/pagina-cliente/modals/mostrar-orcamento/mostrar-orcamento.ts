import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { MatButtonModule } from '@angular/material/button';
import { RejeitarServico } from '../rejeitar-servico/rejeitar-servico';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-mostrar-orcamento',
  imports: [MatButton],
  templateUrl: './mostrar-orcamento.html',
  styleUrl: './mostrar-orcamento.css'
})
export class MostrarOrcamento {
  constructor(
    public dialogRef: MatDialogRef<MostrarOrcamento>,
    @Inject(MAT_DIALOG_DATA) public data: Solicitacao,
    private dialog: MatDialog
  ) {}

  aprovar() {
    this.dialogRef.close({ status: 'APROVADO' });
  }

  rejeitar() {
    const dialogMotivo = this.dialog.open(RejeitarServico, {
      width: '500px'
    });

    dialogMotivo.afterClosed().subscribe(motivo => {
      if (motivo) {
        this.dialogRef.close({ status: 'REJEITADO', motivo });
      }
    });
  }

  fechar() {
    this.dialogRef.close();
  }
}
