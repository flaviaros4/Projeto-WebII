import { Injectable } from '@angular/core';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

constructor(private httpClient: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/solicitacoes';

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response',
  };

  listarSolicitacoes(): Observable<Solicitacao[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/minhas`).pipe(
      map(list => (list || []).map(i => ({
        id: i.id,
        descricao: i.descricaoEquipamento ?? '',
        categoria: i.categoria?.nome ?? '',
        descricaoDefeito: i.descricaoDefeito ?? '',
        dataHora: i.dataHoraAbertura ?? '',
        estado: i.estado as Solicitacao['estado'],
        precoOrcamento: i.valorOrcamento ?? undefined,
        motivoRejeicao: i.motivoRejeicao ?? undefined,
        historico: i.historico ?? []
      } as Solicitacao)))
    );
  }

  cadastrarSolicitacao(s: { descricao: string; descricaoDefeito: string; categoriaId: number }): Observable<Solicitacao | null> {
    const payload = {
      descricaoEquipamento: s.descricao,
      descricaoDefeito: s.descricaoDefeito,
      categoriaId: s.categoriaId
    };

    return this.httpClient.post<Solicitacao>(this.BASE_URL, payload, this.options).pipe(
      map((resp: HttpResponse<Solicitacao>) => resp.status === 201 ? resp.body : null),
      catchError(err => throwError(() => err))
    );
  }

 
}
