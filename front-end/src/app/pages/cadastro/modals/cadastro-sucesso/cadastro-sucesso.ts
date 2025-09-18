import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-cadastro-sucesso-dialog',
  template: `
    <div>
      <h2 mat-dialog-title>Cadastro realizado com sucesso!</h2>
      <mat-dialog-content>
        <p>Sua senha foi enviada para o e-mail <b>{{data.email}}</b>.</p>
        <p>Você será redirecionado para a tela de login.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-raised-button color="primary" (click)="fechar()">OK</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`

    div {
      text-align: center;
      padding: 2rem;         
    }
    button {
      background-color: #1976d2 !important;
      color: white !important;
      border-radius: 8px;
    }
  `],
  imports: [MatDialogActions, MatDialogContent]
})
export class CadastroSucessoDialog {
  constructor(
    public dialogRef: MatDialogRef<CadastroSucessoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
