import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirmação';
  @Input() message = 'Deseja prosseguir?';
  @Output() close = new EventEmitter<boolean>();

  confirm() { this.close.emit(true); }
  cancel() { this.close.emit(false); }
}
