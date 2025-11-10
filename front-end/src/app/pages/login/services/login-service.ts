import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../login';
import { Usuario } from '../../../shared/models/usuarios.model';
import { map } from 'rxjs/internal/operators/map';
import { catchError, of, tap, throwError } from 'rxjs';

interface LoginPayload {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  perfil: 'CLIENTE' | 'FUNCIONARIO';
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
   constructor(private httpClient: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/auth/login';

  private tokenInternal: string | null = null;
  private usuarioInternal: Usuario | null = null;

  get usuarioLogado(): Usuario | null {
    return this.usuarioInternal;
  }

  get token(): string | null {
    return this.tokenInternal;
  }

  login(payload: LoginPayload): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<LoginResponse>(this.BASE_URL, payload, { headers }).pipe(
      tap(res => { this.tokenInternal = res.token; }),
      map(res => {
        const usuario: Usuario = {
          email: payload.email,
          nome: res.nome,
          perfil: res.perfil,
          status: true
        };
        this.usuarioInternal = usuario;
        return usuario;
      })
    );
  }

  logout(): void {
    this.tokenInternal = null;
    this.usuarioInternal = null;
  }

  isAuthenticated(): boolean {
    return !!this.tokenInternal;
  }
  
}
