import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { OrcamentoModule } from '../efetuar-orcamento/modals/orcamento/orcamento-module';
import { Usuario } from '../../shared/models/usuarios.model';
import { MatDialog } from '@angular/material/dialog';
import { EfetuarManutencao } from '../pagina-funcionario/modals/efetuar-manutencao/efetuar-manutencao';
import { FinalizarSolicitacao } from './modals/finalizar-solicitacao/finalizar-solicitacao';
import { SolicitacaoManutencao } from '../pagina-cliente/modals/solicitacao-de-manutencao/solicitacao-de-manutencao';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatSelect } from "@angular/material/select";

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

registerLocaleData(localePt);

interface SolicitacaoFuncionario {
  id: number;
  dataHora: string;
  cliente: string;
  equipamento: string;
  estado: string;
}



@Component({
  selector: 'app-solicitacoes',
  imports: [MatIconModule, CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, ReactiveFormsModule, MatMenu, MatMenuTrigger, MatSelect, MatOption, FormsModule, MatMenuItem],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, 
  ],
  templateUrl: './solicitacoes.html',
  styleUrl: './solicitacoes.css'
})
export class Solicitacoes {
  mostrarFiltroPeriodo: boolean = false;
  dataInicioFiltro:  Date | null = null;
  dataFimFiltro: Date | null = null;


  todasSolicitacoes: SolicitacaoFuncionario[] = [];

displayedColumns: string[] = ['dataHora', 'cliente', 'equipamento', 'estado', 'acoes'];
  solicitacoes: SolicitacaoFuncionario[] = [];
  funcionarioLogado: Usuario | null = null;

      range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
  
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Dados fictícios (para testes)
    const dadosIniciais = [
      { id: 1, dataHora: '2025-08-31 14:20', cliente: 'Flávia Rosa', equipamento: 'Notebook Apple', estado: 'ABERTA' },
      { id: 2, dataHora: '2025-08-30 09:10', cliente: 'Leticia Sanches', equipamento: 'Impressora HP', estado: 'ORÇADA' },
      { id: 3, dataHora: '2025-08-29 11:00', cliente: 'Leon Trindade', equipamento: 'Celular Samsung A31', estado: 'REJEITADA' },
      { id: 4, dataHora: '2025-08-28 11:00', cliente: 'Leonardo Alberto', equipamento: 'Celular Iphone 15', estado: 'APROVADA' },
      { id: 5, dataHora: '2025-08-20 11:00', cliente: 'Arthur Dias', equipamento: 'Notebook Dell', estado: 'REDIRECIONADA' },
      { id: 6, dataHora: '2025-08-18 11:00', cliente: 'João Paulo', equipamento: 'Tablet Samsung', estado: 'ARRUMADA' },
      { id: 7, dataHora: '2025-08-15 11:00', cliente: 'Maria Santos', equipamento: 'Smartwatch Apple', estado: 'PAGA' },
      { id: 8, dataHora: '2025-08-10 11:00', cliente: 'José Silva', equipamento: 'Desktop HP', estado: 'FINALIZADA' },
    ];


    this.todasSolicitacoes = dadosIniciais; 

    this.solicitacoes = dadosIniciais;

   
    const usuarioLogadoString = localStorage.getItem('usuarioLogado');
    if (usuarioLogadoString) {
      this.funcionarioLogado = JSON.parse(usuarioLogadoString);
    }
  }

  defineCorEstado(estado: string): string {
    switch (estado) {
      case 'ABERTA':
        return 'cor-aberta';
      case 'ORÇADA':
        return 'cor-orcada';
      case 'REJEITADA':
        return 'cor-rejeitada';
      case 'APROVADA':
        return 'cor-aprovada';
      case 'REDIRECIONADA':
        return 'cor-redirecionada';
      case 'ARRUMADA':
        return 'cor-arrumada';
      case 'PAGA':
        return 'cor-paga';
      case 'FINALIZADA':
        return 'cor-finalizada';
      default:
        return '';
    }
  }
  
   carregarTodasSolicitacoes() {
    this.ngOnInit();

    this.solicitacoes = this.todasSolicitacoes;

    this.dataInicioFiltro = null;

    this.dataFimFiltro = null;
  }

  filtrarDataHoje() {
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    this.solicitacoes = this.solicitacoes.filter(solicitacao => {
      const dataSolicitacao = new Date(solicitacao.dataHora);
      return dataSolicitacao.toDateString() === hoje.toDateString();
    });
    this.dataInicioFiltro = new Date();
    this.dataFimFiltro = new Date();
  } 

  filtrarPorIntervalo() {
        this.mostrarFiltroPeriodo = true;
        this.dataInicioFiltro = null;
        this.dataFimFiltro = null;
    }

    filtrarPeriodo(): void {
        if (!this.dataInicioFiltro || !this.dataFimFiltro) {
            alert('Selecione ambas as datas.');
            return;
        }
        const inicio = new Date(this.dataInicioFiltro.getTime());
        inicio.setHours(0, 0, 0, 0);
        const fim = new Date(this.dataFimFiltro.getTime());
        fim.setHours(23, 59, 59, 999);
        this.solicitacoes = this.todasSolicitacoes.filter(solicitacao => {
            const dataSolicitacao = new Date(solicitacao.dataHora);
            return dataSolicitacao >= inicio && dataSolicitacao <= fim;
        });
        
    }

  efetuarOrcamento(solicitacao: SolicitacaoFuncionario) {
    this.dialog.open(OrcamentoModule, {
      data: {
        ...solicitacao,
        funcionario: this.funcionarioLogado
      }
    });
  }

  efetuarManutencao(solicitacao: SolicitacaoFuncionario) {
    this.dialog.open(EfetuarManutencao, {
      data: {
        ...solicitacao,
        funcionario: this.funcionarioLogado
      }
    });
  }

  finalizarSolicitacao(solicitacao: SolicitacaoFuncionario) {
    const dialogRef = this.dialog.open(FinalizarSolicitacao, {
      width: '400px',
      data: { solicitacao } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        solicitacao.estado = 'FINALIZADA';
      } 
});
  }

}
