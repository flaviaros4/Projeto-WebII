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
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  user = {
    email: '',
    password: ''
  };

  
  userCliente = {
    email: 'teste@gmail.com',
    password: 'teste321'
  };

  userFuncionario = {
    email: 'teste2@gmail.com',
    password: 'teste321'
  };

  loginValido:boolean=true;

  router = inject(Router);

  validarLoginCliente(email: string, password: string): boolean {
    return email === this.userCliente.email && password === this.userCliente.password;
  }

  validarLoginFunc(email: string, password: string): boolean {
    return email === this.userFuncionario.email && password === this.userFuncionario.password;
  }

  login() {
    if (this.validarLoginCliente(this.user.email, this.user.password)) {
      this.loginValido = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(this.user.email));
      this.router.navigate(['cliente']); 
      alert('Login realizado com sucesso!')
    } else if (this.validarLoginFunc(this.user.email, this.user.password)){
      this.loginValido = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(this.user.email));
      this.router.navigate(['funcionario']);
      alert('Login realizado com sucesso!')
    } else{
      this.loginValido = false;
    }
  }
}