
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Perfil, Usuario } from '../../shared/models/usuarios.model';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    RouterLink,
    MatCheckbox,
    MatDialogModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
    constructor(private dialog: MatDialog, private loginService: LoginService) {}

  usuario: Usuario = {
    email: '',
    senha: '',
    perfil: {} as Perfil,
    nome: ''
  };

  hidePassword = true;
  loginValido = true;
  router = inject(Router);

  login(): void {
    const payload = { email: this.usuario.email, senha: this.usuario.senha! };

    this.loginService.login(payload).subscribe({
      next: (usuarioLogado) => {
        if (usuarioLogado.perfil === 'FUNCIONARIO') {
          this.router.navigate(['/funcionario']);
        } else {
          this.router.navigate(['/cliente']);
        }
      },
      error: () => {
        this.loginValido = false;
      }
    });
  }


}