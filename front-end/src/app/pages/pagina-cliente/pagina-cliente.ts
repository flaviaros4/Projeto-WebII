import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Solicitacao {
  id: number;
  dataHora: string;
  equipamento: string;
  estado: string;
}

@Component({
  selector: 'app-pagina-cliente',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './pagina-cliente.html',
  styleUrl: './pagina-cliente.css'



})
export class PaginaCliente implements OnInit {
  displayedColumns: string[] = ['dataHora', 'equipamento', 'estado', 'acoes'];
  solicitacoes: Solicitacao[] = [];

  ngOnInit(): void {
    // Exemplo de massa de dados fictícios
    this.solicitacoes = [
      { id: 1, dataHora: '2025-08-31 14:20', equipamento: 'Notebook Dell Inspiron', estado: 'ORÇADA' },
      { id: 2, dataHora: '2025-08-30 10:10', equipamento: 'Impressora HP LaserJet', estado: 'APROVADA' },
      { id: 3, dataHora: '2025-08-29 09:00', equipamento: 'Desktop Gamer', estado: 'REJEITADA' },
      { id: 4, dataHora: '2025-08-28 11:30', equipamento: 'Mouse Logitech', estado: 'ARRUMADA' }
    ];
  }

  getAcao(estado: string): string {
    switch (estado) {
      case 'ORÇADA': return 'aprovar-rejeitar';
      case 'REJEITADA': return 'resgatar';
      case 'ARRUMADA': return 'pagar';
      default: return 'visualizar';
    }
  }
}
