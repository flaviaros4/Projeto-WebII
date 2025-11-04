import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../../../shared/models/usuarios.model';

@Injectable({
  providedIn: 'root'
})


export class CadastroService {
  constructor(private httpClient: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/auth/cadastro';

  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const,
    responseType: 'text' as const
  };

  registrar(cliente: Cliente): Observable<boolean> {
    const payload: any = {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco ?? null
    };

    return (this.httpClient.post(this.BASE_URL, payload, this.options) as Observable<HttpResponse<string>>).pipe(
      map((resp: HttpResponse<string>) => resp.status >= 200 && resp.status < 300),
      catchError(err => throwError(() => err))
    );
  }
}