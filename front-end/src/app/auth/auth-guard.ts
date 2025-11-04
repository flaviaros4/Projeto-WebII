import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../pages/login/services/login-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const usuarioLogado = loginService.usuarioLogado;
  let url = state.url;


  if (!usuarioLogado) {
    router.navigate(['/login'], { queryParams: { error: "Proibido acesso a " + url } });
    return false;
  }

  
  if (route.data && route.data['perfil'] && route.data['perfil'].indexOf(usuarioLogado.perfil) === -1) {
    router.navigate(['/login'], { queryParams: { error: "Proibido acesso a " + url } });
    return false;
  }

  return true;
};
