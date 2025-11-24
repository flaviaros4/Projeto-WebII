import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = 'http://localhost:8080/relatorios';

  constructor(private http: HttpClient) { }

  gerarRelatorioPeriodo(inicio?: Date, fim?: Date): Observable<Blob> {
    let params = new HttpParams();
    if (inicio) {
      params = params.set('inicio', inicio.toISOString().split('T')[0]);
    }
    if (fim) {
      params = params.set('fim', fim.toISOString().split('T')[0]);
    }

    return this.http.get(`${this.apiUrl}/receita-periodo`, {
      params: params,
      responseType: 'blob'
    });
  }

  gerarRelatorioCategoria(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/receita-categoria`, {
      responseType: 'blob'
    });
  }
}