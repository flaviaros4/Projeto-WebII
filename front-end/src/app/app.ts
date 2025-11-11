import { Component, signal, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { registerLocaleData, CommonModule } from '@angular/common'; 
import localePT from '@angular/common/locales/pt';
import { LoginService } from './pages/login/services/login-service';
import { Observable } from 'rxjs';
import { Perfil } from './shared/models/usuarios.model';

registerLocaleData(localePT);


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit { 
  private router = inject(Router);
  private loginService = inject(LoginService);
  
  protected readonly title = signal('manutencao-equipamentos');
  
  
  isAuthenticated$!: Observable<boolean>; 
  

  userProfile: Perfil | null = null;

  ngOnInit(): void {
    this.isAuthenticated$ = this.loginService.isAuthenticated$;
    
    
    this.isAuthenticated$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.userProfile = this.loginService.getUserProfile();
      } else {
        this.userProfile = null;
      }
    });
  }

  home() {
    const user = this.loginService.usuarioLogado;
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate([user.perfil === 'FUNCIONARIO' ? '/funcionario' : '/cliente']);
  }

 

  logout(): void {
    this.loginService.logout(); 
    this.router.navigate(['/login']);
  }
}