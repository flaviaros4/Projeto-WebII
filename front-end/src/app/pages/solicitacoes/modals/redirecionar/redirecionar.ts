import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SolicitacaoService } from '../../services/solicitacao-service';

@Component({
  standalone: true,
  selector: 'app-redirecionar',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  template: `
  <div class="container">
    <h2>Redirecionar Manutenção</h2>

    <mat-form-field appearance="outline" class="full">
      <mat-label>Funcionário</mat-label>
      <mat-select [(ngModel)]="novoFuncionarioId">
        <mat-option *ngFor="let f of funcionarios" [value]="f.id">{{ f.nome }}</mat-option>
      </mat-select>
    </mat-form-field>

    <div *ngIf="!carregando && !funcionarios.length" class="info">Nenhum funcionário encontrado.</div>
    <div *ngIf="erro" class="erro">{{ erro }}</div>

    <div class="botoes">
      <button mat-stroked-button (click)="fechar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="confirmar()" [disabled]="!novoFuncionarioId || carregando">Redirecionar</button>
    </div>
  </div>
  `,
  styles: [`
    .container { text-align:center; padding:20px; display:flex; flex-direction:column; }
    .full { width:100%; }
    .botoes { margin-top:12px; }
    .info { color:#666; margin-top:6px; }
    .erro { color:#c00; margin-top:6px; }
  `]
})
export class Redirecionar {
  novoFuncionarioId: number | null = null;
  funcionarios: any[] = [];
  carregando = true;
  erro?: string;

  constructor(
    public dialogRef: MatDialogRef<Redirecionar>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private solicitacaoService: SolicitacaoService
  ) {
    this.carregarFuncionarios();
  }

  private carregarFuncionarios() {
    this.solicitacaoService.listarFuncionarios().subscribe({
      next: (lista) => {
        this.funcionarios = lista;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Falha ao carregar funcionários.';
        this.carregando = false;
      }
    });
  }

  confirmar() {
    if (!this.novoFuncionarioId) return;
    this.solicitacaoService.redirecionarSolicitacao(this.data.id, this.novoFuncionarioId).subscribe({
      next: s => this.dialogRef.close(s),
      error: () => alert('Falha ao redirecionar solicitação.')
    });
  }

  fechar() { this.dialogRef.close(); }
}