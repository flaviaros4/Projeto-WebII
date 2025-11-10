import { Component, signal } from '@angular/core';
import {Router, RouterLink, RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { LoginService } from './pages/login/services/login-service';

registerLocaleData(localePT);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {  
  constructor(private router: Router, private loginService: LoginService) {}
  protected readonly title = signal('manutencao-equipamentos');
logout(): void {
  this.loginService.logout(); // limpa token e usuário
  this.router.navigate(['/login']); // redireciona para a página de login
}
}
