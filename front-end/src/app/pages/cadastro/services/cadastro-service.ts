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
    observe: 'response' as const
  };

  registrar(cliente: Cliente): Observable<boolean> {
    const payload: any = {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      telefone: cliente.telefone,
      endereco: cliente.endereco ?? null
    };

    return this.httpClient.post<null>(this.BASE_URL, payload, this.options).pipe(
      map((resp: HttpResponse<null>) => resp.status === 201),
      catchError(err => throwError(() => err))
    );
  }

  cadastrar(cliente: Cliente): Observable<boolean> {
    return this.registrar(cliente);
  }
}
