import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  BASE_URL = 'http://localhost:8080/api/solicitacoes';

  constructor(private httpClient: HttpClient) { }

  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response',
  };

   listarSolicitacoes(): Observable<Solicitacao[]> {
  return this.httpClient.get<any[]>(`${this.BASE_URL}`).pipe(
    map(list => (list || []).map(i => ({
      id: i.id,
      descricao: i.descricaoEquipamento ?? '',
      categoria: i.categoria?.nome ?? '',
      descricaoDefeito: i.descricaoDefeito ?? '',
      dataHora: i.dataHoraAbertura ?? '',
      estado: i.estado,
      funcionarioDestinoId: i.funcionarioManutencao?.id ?? i['funcionario_manutencao_id'] ?? null
    })))
  );
}

    detalhesSolicitacao(id: number): Observable<{ solicitacao: Solicitacao; cliente: any; funcionario: any }> {
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
        const funcionario = resp?.funcionario ?? src?.funcionario ?? null;
        const cliente = resp?.cliente ?? src?.cliente ?? null;
        return { solicitacao, cliente, funcionario };
      })
    );
  }

  efetuarManutencao(solicitacaoId: number, descricaoManutencao: any, orientacoesCliente: any): Observable<Solicitacao> {
    const body = { descricaoManutencao, orientacoesCliente };
    return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/efetuar-manutencao`, body, this.options).pipe(
      map((resp) => resp.body as Solicitacao)
    );
  }


   redirecionarSolicitacao(solicitacaoId: number, novoFuncionarioId: number, motivo?: string): Observable<Solicitacao> {
  const body = { novoFuncionarioId, motivo };
  return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/redirecionar`, body, this.options).pipe(
    map(resp => resp.body as Solicitacao)
  );
}

 listarFuncionarios(): Observable<any[]> {
  return this.httpClient.get<any[]>(`http://localhost:8080/api/funcionarios`).pipe(
    map(list => (list || []).map((f: any) => ({
      id: f.id,
      usuarioId: f.usuario?.id ?? f.usuarioId,
      nome: f.nome ?? f.fullName ?? f.login
    })))
  );
}

finalizarSolicitacao(solicitacaoId: number): Observable<Solicitacao> {
  return this.httpClient.post<Solicitacao>(`${this.BASE_URL}/${solicitacaoId}/finalizar`, {}, this.options).pipe(
    map(resp => resp.body as Solicitacao)
  );

}
}