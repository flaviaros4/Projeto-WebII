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

  
  storedUser = {
    email: 'teste@gmail.com',
    password: 'usuarioteste321'
  };

  loginValido:boolean=true;

  router = inject(Router);

  validarLogin(email: string, password: string): boolean {
    return email === this.storedUser.email && password === this.storedUser.password;
  }

  login() {
    if (this.validarLogin(this.user.email, this.user.password)) {
      this.loginValido = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(this.user.email));
      this.router.navigate(['']); 
      alert('Login realizado com sucesso!')
    } else {
      this.loginValido = false;
    }
  }
}