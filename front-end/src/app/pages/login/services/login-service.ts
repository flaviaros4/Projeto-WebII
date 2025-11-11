import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Perfil } from '../../../shared/models/usuarios.model'; 

interface LoginPayload { 
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  perfil: 'CLIENTE' | 'FUNCIONARIO';
  nome: string;
}

const AUTH_KEY = 'usuarioLogado';
const TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  BASE_URL = 'http://localhost:8080/api/auth/login'; 

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkInitialState());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  private checkInitialState(): boolean {
    return !!localStorage.getItem(TOKEN_KEY) && !!localStorage.getItem(AUTH_KEY);
  }


  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  
  get usuarioLogado(): Usuario | null {
    const usuarioJson = localStorage.getItem(AUTH_KEY);
    if (usuarioJson) {
      try {
        return JSON.parse(usuarioJson) as Usuario;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getUserProfile(): Perfil | null {
    return this.usuarioLogado?.perfil || null;
  }

  

  login(payload: LoginPayload): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<LoginResponse>(this.BASE_URL, payload, { headers }).pipe(
      tap(res => {
        
        localStorage.setItem(TOKEN_KEY, res.token);
        
        const usuario: Usuario = {
          email: payload.email,
          nome: res.nome,
          perfil: res.perfil,
          status: true 
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
        this.isAuthenticatedSubject.next(true); 
      }),
      map(() => {
        return this.usuarioLogado!;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTH_KEY);
    this.isAuthenticatedSubject.next(false);
  }
}