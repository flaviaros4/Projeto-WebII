export type Perfil = 'CLIENTE' | 'FUNCIONARIO';

export interface Endereco {
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string | null;
  bairro?: string;
  cidade?: string;
  estado?: string; 
}

export interface Usuario {
  id?: number;
  email: string;
  senha?: string;
  nome: string;
  perfil: Perfil;
  dataCriacao?: string;
  status?: boolean;
}

export interface Cliente extends Usuario {
  cpf: string;
  endereco?: Endereco;
  telefone?: string;
}

export interface Funcionario extends Usuario {
  dataNascimento?: string;
}