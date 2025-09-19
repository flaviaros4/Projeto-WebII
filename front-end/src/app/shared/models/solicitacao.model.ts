
export type EstadoSolicitacao = 
  | 'ABERTA'
  | 'ORÇADA'
  | 'APROVADA'
  | 'REJEITADA'
  | 'ARRUMADA'
  | 'PAGA';

export interface Solicitacao {
  id: number; 
  descricao: string;
  categoria: string;
  descricaoDefeito: string;
  dataHora: string; 
  estado: EstadoSolicitacao;

}
