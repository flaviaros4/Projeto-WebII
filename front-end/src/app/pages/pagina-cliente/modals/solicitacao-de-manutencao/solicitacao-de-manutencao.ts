import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './Solicitacao-de-Manutencao.html',
  styleUrls: ['./Solicitacao-de-Manutencao.css']
})
export class SolicitacaoManutencao {
  solicitacao = {
    descricao: '',
    categoria: '',
    descricaoDefeito: ''
  };

  constructor(public dialogRef: MatDialogRef<SolicitacaoManutencao>) {}

  cadastrarSolicitacao() {
    this.dialogRef.close(this.solicitacao);
  }

  fechar() {
    this.dialogRef.close();
  }
}
