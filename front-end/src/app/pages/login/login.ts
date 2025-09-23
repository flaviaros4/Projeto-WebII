// login.ts
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
import { RecuperarSenha } from './modals/recuperar-senha/recuperar-senha';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../shared/models/cliente.model';

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
  constructor(private dialog: MatDialog) {}

  abrirRecuperarSenha() {
    this.dialog.open(RecuperarSenha);
  }

  user = {
    email: '',
    senha: '' 
  };

  userAdmin = {
    email: 'admin@gmail.com',
    senha: 'admin321',
    nome: 'Administrador' 
  }

  validarLoginAdmin(email:string, senha:string): boolean {
    return email === this.userAdmin.email && senha === this.userAdmin.senha;
  } 

  hidePassword = true;
  loginValido: boolean = true;
  router = inject(Router);
  
  login() {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuariosCadastrados.find(
      (u: Usuario) => u.email === this.user.email && u.senha === this.user.senha
    );

    if (usuarioEncontrado) {
      this.loginValido = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
      this.router.navigate(['/cliente']);
      alert('Login realizado com sucesso!');
    } else if (this.validarLoginAdmin(this.user.email, this.user.senha)) {
      this.loginValido = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(this.userAdmin)); 
      this.router.navigate(['/funcionario']);
      alert('Login realizado com sucesso!');
    } else {
      this.loginValido = false;
      alert('E-mail ou senha inválidos.');
    }
  }
}