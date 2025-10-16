import { Component } from '@angular/core';
import { MatDialogActions, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-finalizar-solicitacao',
  imports: [MatDialogActions],
  template: `<div class="container">
    <h2 mat-dialog-title>Deseja finalizar a solicitação?</h2>
    <mat-dialog-actions align="end">
      <button mat-button  (click)="cancelar()">Cancelar</button>
      <button mat-raised-button (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
  </div>`, 
  styles: [`
    .container {
      text-align: center;
      padding: 20px;
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2{
      text-align: center;
      font-size: 24px;  
      font-weight: bold;
    }
    button{
      margin-left: 8px;
      border-radius: 15px;
      background-color: #1976d2 !important;
      color: white !important;
      padding: 8px;
      border: none;
      
    }
    button:hover{ 
      background-color: #115293 !important;

    }
  `]
})
export class FinalizarSolicitacao {

constructor(public dialogRef: MatDialogRef<FinalizarSolicitacao>) {}

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.dialogRef.close();
  }
}
