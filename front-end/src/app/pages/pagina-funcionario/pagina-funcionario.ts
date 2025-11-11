import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Usuario } from '../../shared/models/usuarios.model';
import { Solicitacao } from '../../shared/models/solicitacao.model';
import { FuncionarioService } from './services/funcionario-service';
import { EfetuarOrcamento } from './modals/efetuar-orcamento/efetuar-orcamento';


@Component({
  selector: 'app-pagina-funcionario',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './pagina-funcionario.html',
  styleUrl: './pagina-funcionario.css'
})
export class PaginaFuncionario implements OnInit {
  displayedColumns: string[] = ['dataHora', 'cliente', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<Solicitacao>([]);


  constructor(private dialog: MatDialog, private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
   this.solicitacoesAbertas();
  }

  solicitacoesAbertas(): void {
    this.funcionarioService.solicitacoesAbertas().subscribe({
      next: solicitacoes => {
        const lista = (solicitacoes ?? []).slice().sort(
          (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
        );
        this.dataSource.data = lista;
      },
      error: () => alert('Falha ao carregar solicitações')
    });
  }
  

  efetuarOrcamento(solicitacao: Solicitacao) {
  const dialogRef = this.dialog.open(EfetuarOrcamento, {
    data: { id: solicitacao.id }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.solicitacoesAbertas();
    }
  });
}

  
}