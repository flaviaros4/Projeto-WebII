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
        historico: i.historico ?? [],
        dataHoraOrcamento: i.dataHoraOrcamento ?? undefined,
        descricaoManutencao: i.descricaoManutencao ?? undefined,
        orientacoesCliente: i.orientacoesCliente ?? undefined
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

  mostrarOrcamento(solicitacaoId: number): Observable<Solicitacao> {
    return this.httpClient.get<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/orcamento`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  aprovarServico(solicitacaoId: number): Observable<Solicitacao> {
    return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/aprovar`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }

  rejeitarServico(solicitacaoId: number, motivo: string): Observable<Solicitacao> { 
    return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/rejeitar`, { motivo }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  resgatarServico(solicitacaoId: number): Observable<Solicitacao> {
    return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/resgatar`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }

   pagarServico(solicitacaoId: number, dataHoraPagamento?: string): Observable<Solicitacao> {
    const body = dataHoraPagamento ? { dataHoraPagamento } : {};
    return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/pagar`, body).pipe(
      catchError(err => throwError(() => err))
    );
  }

}
