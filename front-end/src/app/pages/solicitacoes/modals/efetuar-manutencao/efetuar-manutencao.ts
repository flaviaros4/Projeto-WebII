import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  constructor(
    public dialogRef: MatDialogRef<EfetuarManutencao>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  efetuarManutencao() {
    const registro = {
      ...this.data,
      descricaoManutencao: this.descricaoManutencao,
      orientacoesCliente: this.orientacoesCliente,
      funcionarioManutencao: this.data.funcionario,
    };
    this.dialogRef.close(registro);
  }

  fechar() {
    this.dialogRef.close();
  }
}