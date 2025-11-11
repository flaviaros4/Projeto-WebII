import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { MatButtonModule } from '@angular/material/button';
import { RejeitarServico } from '../rejeitar-servico/rejeitar-servico';
import { MatButton } from '@angular/material/button';
import { ClienteService } from '../../services/cliente-service';

@Component({
  selector: 'app-mostrar-orcamento',
  imports: [MatButton, MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './mostrar-orcamento.html',
  styleUrl: './mostrar-orcamento.css'
})
export class MostrarOrcamento {
   carregando = false;
  erro?: string;

  constructor(
    public dialogRef: MatDialogRef<MostrarOrcamento>,
    @Inject(MAT_DIALOG_DATA) public data: Solicitacao,
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) {
    if (this.data?.id) {
      this.carregarOrcamento(this.data.id);
    }
  }

  private carregarOrcamento(id: number) {
    this.carregando = true;
    this.clienteService.mostrarOrcamento(id).subscribe({
      next: (s) => {
        this.data.precoOrcamento = s.precoOrcamento;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Falha ao carregar orçamento';
        this.carregando = false;
      }
    });
  }

  aprovarServico() {
    if (!this.data?.id) return;
    this.clienteService.aprovarServico(this.data.id).subscribe({
      next: (s) => this.dialogRef.close({ status: 'APROVADA', solicitacao: s }),
      error: () => (this.erro = 'Erro ao aprovar serviço')
    });
  }

  rejeitarServico() {
    if (!this.data?.id) return;
    const ref = this.dialog.open(RejeitarServico, { width: '420px' });
    ref.afterClosed().subscribe((motivo?: string) => {
      const motivoTrim = (motivo ?? '').trim();
      if (!motivoTrim) return;

      this.clienteService.rejeitarServico(this.data.id!, motivoTrim).subscribe({
        next: (s) => this.dialogRef.close({ status: 'REJEITADA', solicitacao: s }),
        error: () => this.erro = 'Erro ao rejeitar serviço'
      });
    });
  }

  fechar() {
    this.dialogRef.close();
  }
}
