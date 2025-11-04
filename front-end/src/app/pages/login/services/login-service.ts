import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../login';
import { Usuario } from '../../../shared/models/usuarios.model';
import { map } from 'rxjs/internal/operators/map';
import { catchError, of, throwError } from 'rxjs';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   constructor(private httpClient: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/auth/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as "response"
  };

  public get usuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  public set usuarioLogado(usuario: Usuario | null) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {
    return this.httpClient.post<Usuario>(this.BASE_URL, JSON.stringify(login), this.httpOptions).pipe(
      map((resp: HttpResponse<Usuario>) => {
        if (resp.status == 200) {
          return resp.body;
        }
        return null;
      }),
      catchError((err) => {
        if (err.status == 401) {
          return of(null);
        }
        return throwError(() => err);
      })
    );
  }
}
