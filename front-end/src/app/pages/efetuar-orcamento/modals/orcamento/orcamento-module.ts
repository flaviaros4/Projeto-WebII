import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../../shared/models/usuarios.model';


export interface OrcamentoDialogData {
  id: number;
  dataHora: string;
  cliente: string;
  equipamento: string;
  estado: string;
  funcionario: Usuario; 
}
 
@Component({
  selector: 'app-orcamento-module',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="orcamento-modal-container">
      <h2>Efetuar Orçamento</h2>
      <div>
        <p><b>Cliente:</b> {{ data.cliente }}</p>
        <p><b>Equipamento:</b> {{ data.equipamento }}</p>
        <p><b>Data/Hora Solicitação:</b> {{ data.dataHora | date:'dd/MM/yyyy HH:mm':'pt-BR' }}</p>
        <p><b>Funcionário:</b> {{ data.funcionario.nome }}</p>
      </div>
      <div class="valor-orçamento">
      <p><b>R$:</b></p>
      <input type="number" [(ngModel)]="valorOrcamento" placeholder="Valor do orçamento" class="full-width" />
      </div>
      <button mat-raised-button color="primary" (click)="registrarOrcamento()">Registrar</button>
    </div>
  `,
  styleUrls: ['./orcamento.css']
})

export class OrcamentoModule {
  valorOrcamento: number = 0;

  constructor(
    public dialogRef: MatDialogRef<OrcamentoModule>,
    @Inject(MAT_DIALOG_DATA) public data: OrcamentoDialogData
  ) {}

  registrarOrcamento() {
    const registro = {
      ...this.data,
      valorOrcamento: this.valorOrcamento,
      dataOrcamento: new Date().toISOString(),
      estado: 'ORÇADA'
    };
    this.dialogRef.close(registro);
  }
}