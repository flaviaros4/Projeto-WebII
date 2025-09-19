
export type EstadoSolicitacao = 
  | 'ABERTA'
  | 'ORÇADA'
  | 'APROVADO'
  | 'REJEITADO'
  | 'ARRUMADO'
  | 'PAGO';

 
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
  motivoRejeicao?: string;
  historico?: Historico[];
  dataPagamento?: string;
}
