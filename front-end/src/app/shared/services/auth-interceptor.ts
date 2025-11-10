import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../../pages/login/services/login-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const token = loginService.token;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        loginService.logout();
        router.navigate(['/login'], { queryParams: { error: 'Sessão expirada' } });
      }
      return throwError(() => err);
    })
  );
};