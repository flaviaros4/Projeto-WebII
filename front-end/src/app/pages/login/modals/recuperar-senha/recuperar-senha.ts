import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <div class="recuperar-senha-container">
      <h1>Esqueci minha senha</h1>
      <p>Informe o e-mail da sua conta:</p>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>E-mail</mat-label>
        <input matInput type="email" [(ngModel)]="email" placeholder="Seu e-mail" />
      </mat-form-field>
      <button mat-raised-button color="primary" class="full-width">Recuperar senha</button>
    </div>
  `,
  styleUrls: ['./recuperar-senha.css']
})
export class RecuperarSenha {
  email: string = '';
}