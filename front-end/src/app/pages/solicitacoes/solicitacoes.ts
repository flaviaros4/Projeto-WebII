import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { EfetuarOrcamento } from '../pagina-funcionario/modals/efetuar-orcamento/efetuar-orcamento';
import { Usuario } from '../../shared/models/usuarios.model';
import { MatDialog } from '@angular/material/dialog';
import { EfetuarManutencao } from './modals/efetuar-manutencao/efetuar-manutencao';
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
import { SolicitacaoService } from './services/solicitacao-service';

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
  displayedColumns: string[] = ['dataHora', 'cliente', 'descricao', 'estado', 'acoes'];
  dataSource = new MatTableDataSource<Solicitacao>([]); 
  
  mostrarFiltroPeriodo: boolean = false;
  dataInicioFiltro:  Date | null = null;
  dataFimFiltro: Date | null = null;
  
  funcionarioLogado: Usuario | null = null;

      range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });


  constructor(private dialog: MatDialog, 
            private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
  this.listarSolicitacoes();
  }

  listarSolicitacoes(): void {
    this.solicitacaoService.listarSolicitacoes().subscribe({
      next: solicitacoes => {
        const lista = (solicitacoes ?? []).slice().sort(
          (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
        );
        this.dataSource.data = lista;
      },
      error: () => alert('Falha ao carregar solicitações')
    });
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
  
  
  filtrarDataHoje() {
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    this.dataSource.data = this.dataSource.data.filter(solicitacao => {
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
        this.dataSource.data = this.dataSource.data.filter(solicitacao => {
            const dataSolicitacao = new Date(solicitacao.dataHora);
            return dataSolicitacao >= inicio && dataSolicitacao <= fim;
        });
        
    }

  efetuarOrcamento(solicitacao: Solicitacao) {
  const dialogRef = this.dialog.open(EfetuarOrcamento, {
    data: { id: solicitacao.id }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.listarSolicitacoes();
    }
  });
}

  efetuarManutencao(solicitacao: Solicitacao) {
    if (!solicitacao?.id) return;
    const dialogRef = this.dialog.open(EfetuarManutencao, {
      width: '800px',
      data: { id: solicitacao.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.listarSolicitacoes();
    });
  }
  
  finalizarSolicitacao(solicitacao: SolicitacaoFuncionario) {
    const dialogRef = this.dialog.open(FinalizarSolicitacao, {

      data: { solicitacao } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        solicitacao.estado = 'FINALIZADA';
      } 
});
  }

}
