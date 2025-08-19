import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    // Módulos essenciais
    CommonModule,
    RouterLink,
    FormsModule, // Necessário para o [(ngModel)]

    // Módulos do Angular Material que estão a ser usados no HTML
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  // Definição das propriedades que o HTML usa
  user = {
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  senhasNaoCoincidem: boolean = false;
  cadastroSucesso: boolean = false;

  router = inject(Router);

  cadastrar() {
    // Reseta as flags de validação
    this.senhasNaoCoincidem = false;
    this.cadastroSucesso = false;

    // Verifica se as senhas são iguais
    if (this.user.password !== this.user.confirmPassword) {
      this.senhasNaoCoincidem = true;
      return; // Interrompe a execução se as senhas forem diferentes
    }

    // Lógica para salvar o usuário (usando localStorage como no exemplo de login)
    const novoUsuario = {
      nome: this.user.nome,
      email: this.user.email,
      password: this.user.password
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.cadastroSucesso = true;

    // Redireciona para a página de login após 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
