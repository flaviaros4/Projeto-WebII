import { Injectable } from '@angular/core';
import { Solicitacao } from '../../../shared/models/solicitacao.model';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private solicitacoesPadrao: Solicitacao[] = [
    {
      id: 1,
      dataHora: new Date('2025-09-17T14:30:00').toISOString(),
      descricao: 'Desktop HP',
      categoria: 'Desktop',
      descricaoDefeito: 'Alto-falantes não funcionam',
      estado: 'ORÇADA'
    },
    {
      id: 2,
      dataHora: new Date('2025-09-16T11:15:00').toISOString(),
      descricao: 'Tablet Samsung',
      categoria: 'Tablet',
      descricaoDefeito: 'Carregador conectado, mas não liga',
      estado: 'ARRUMADA'
    },
    {
      id: 3,
      dataHora: new Date('2025-09-15T16:45:00').toISOString(),
      descricao: 'Notebook Acer',
      categoria: 'Notebook',
      descricaoDefeito: 'Teclas não respondem',
      estado: 'REJEITADA'
    }
  ];

  constructor() {
    this.garantirPadrao();
  }

  private garantirPadrao() {
    let solicitacoes = this.listarSolicitacoes();

    this.solicitacoesPadrao.forEach(padrao => {
      if (!solicitacoes.find(s => s.id === padrao.id)) {
        solicitacoes.push(padrao);
      }
    });

    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
  }

  listarSolicitacoes(): Solicitacao[] {
    const solicitacoes = localStorage.getItem(LS_CHAVE);
    return solicitacoes ? JSON.parse(solicitacoes) : [];
  }

  cadastrarSolicitacao(solicitacao: Solicitacao): void {
    const solicitacoes = this.listarSolicitacoes();
    solicitacao.id = new Date().getTime();
    solicitacoes.push(solicitacao);
    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
  }

  removerSolicitacao(id: number): void {
    let solicitacoes = this.listarSolicitacoes();
    solicitacoes = solicitacoes.filter(s => s.id !== id);
    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
    this.garantirPadrao();
  }

  atualizarSolicitacao(solicitacao: Solicitacao): void {
    const solicitacoes = this.listarSolicitacoes();
    const index = solicitacoes.findIndex(s => s.id === solicitacao.id);
    if (index !== -1) {
      solicitacoes[index] = solicitacao;
      localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
    }
  }
}
