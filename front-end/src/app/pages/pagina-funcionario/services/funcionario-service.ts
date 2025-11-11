import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
  BASE_URL = 'http://localhost:8080/api/solicitacoes';

  constructor(private httpClient: HttpClient) { }

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response',
  };

  solicitacoesAbertas(): Observable<Solicitacao[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/abertas`).pipe(
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
        cliente: i.cliente?.nome ?? ''
      } as Solicitacao)))
    );

  }

  detalhesSolicitacao(id: number): Observable<{ solicitacao: Solicitacao; cliente: any }> {
    return this.httpClient.get<any>(`${this.BASE_URL}/${id}/detalhes`).pipe(
      map(resp => {
        const src = resp?.solicitacao ?? resp ?? {};
        const solicitacao: Solicitacao = {
          id: src.id,
          descricao: src.descricaoEquipamento ?? '',
          categoria: src.categoria?.nome ?? '',
          descricaoDefeito: src.descricaoDefeito ?? '',
          dataHora: src.dataHoraAbertura ?? '',
          estado: src.estado as Solicitacao['estado'],
        };
        const cliente = resp?.cliente ?? src?.cliente ?? null;
        return { solicitacao, cliente };
      })
    );
  }

  efetuarOrcamento(solicitacaoId: number, valor: number): Observable<Solicitacao> {
  const body = { solicitacaoId, valor };
  return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/efetuar-orcamento`, body, this.options).pipe(
    map((resp: HttpResponse<Solicitacao>) => {
      if ((resp.status === 200 || resp.status === 201) && resp.body) return resp.body;
      throw new Error('Resposta inesperada do servidor');
    }),
    catchError(err => throwError(() => err))
  );
}
}
