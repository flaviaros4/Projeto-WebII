export type EstadoSolicitacao =
  | 'ABERTA'
  | 'ORÇADA'
  | 'APROVADA'
  | 'REJEITADA'
  | 'REDIRECIONADA'
  | 'ARRUMADA'
  | 'PAGA'
  | 'FINALIZADA';

export interface Historico {
  dataHora: string;
  estado: string;
}

export interface Solicitacao {
  id: number;
  descricao: string;           
  categoria: string;          
  descricaoDefeito: string;
  dataHora: string;           
  estado: EstadoSolicitacao;
  precoOrcamento?: number;
  dataHoraOrcamento?: string;    
  motivoRejeicao?: string;
  historico?: Historico[];
  dataHoraPagamento?: string;
  descricaoManutencao?: string;
  orientacoesCliente?: string;
 
}