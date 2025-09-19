import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-rejeitar-servico',
  template: `<div class="container"><h2 mat-dialog-title>Motivo da Rejeição</h2>
    <mat-dialog-content>
      <textarea [(ngModel)]="motivo" rows="4" class="motivo-input"></textarea>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
    </div>`,
    styles: [`
    .container {
      text-align: center;
      padding: 20px;
    }
    .motivo-input {
      width: 100%;
      padding: 8px;
    }
    button{
      margin-left: 8px;
      border-radius: 20px;
      background-color: #1976d2 !important;
      color: white !important;
      
    }
  `],
  imports: [MatDialogActions, MatDialogContent, FormsModule],
})
export class RejeitarServico {
   motivo: string = '';

  constructor(public dialogRef: MatDialogRef<RejeitarServico>) {}

  cancelar() {
    this.dialogRef.close();
  }

  confirmar() {
    this.dialogRef.close(this.motivo);
  }
}
