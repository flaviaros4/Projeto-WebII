import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

interface SolicitacaoFuncionario {
  id: number;
  dataHora: string;
  cliente: string;
  equipamento: string;
  estado: string;
}

@Component({
  selector: 'app-pagina-funcionario',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './pagina-funcionario.html',
  styleUrl: './pagina-funcionario.css'
})

export class PaginaFuncionario implements OnInit {
  displayedColumns: string[] = ['dataHora', 'cliente', 'equipamento', 'acoes'];
  solicitacoes: SolicitacaoFuncionario[] = [];

  ngOnInit(): void {
    // dados fictícios
    this.solicitacoes = [
      { id: 1, dataHora: '2025-08-31 14:20', cliente: 'Flávia Rosa', equipamento: 'Notebook aplle', estado: 'ABERTA' },
      { id: 2, dataHora: '2025-08-30 09:10', cliente: 'Leticia Sanches', equipamento: 'Impressora HP', estado: 'ABERTA' },
      { id: 3, dataHora: '2025-08-29 11:00', cliente: 'Leon Trindade', equipamento: 'Celular Samsung A31', estado: 'ABERTA' },
       {id: 4, dataHora: '2025-08-28 11:00', cliente: 'Leonardo Alberto', equipamento: 'Celular Iphone 15', estado: 'ABERTA' },
      {id: 5, dataHora: '2025-08-20 11:00', cliente: 'Arthur Dias', equipamento: 'Notebook Dell', estado: 'ABERTA' },
    ];
  }

  efetuarOrcamento(id: number) {
    alert(`Efetuar Orçamento da solicitação #${id}`);
    // aqui depois vai chamar o RF012 
  }
}
