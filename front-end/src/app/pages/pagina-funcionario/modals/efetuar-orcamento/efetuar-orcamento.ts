import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solicitacao } from '../../../../shared/models/solicitacao.model';
import { FuncionarioService } from '../../services/funcionario-service';
import { Cliente, Usuario } from '../../../../shared/models/usuarios.model';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';


 
@Component({
  selector: 'app-orcamento-module',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, NgxMaskDirective, MatInputModule],
  templateUrl: './efetuar-orcamento.html',
  styleUrls: ['./efetuar-orcamento.css']
})

export class EfetuarOrcamento {
  valor: string | number | null = null;

 cliente?: Cliente | null;
 solicitacao?: Solicitacao;

  constructor(
    public dialogRef: MatDialogRef<EfetuarOrcamento>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private funcionarioService: FuncionarioService
  ) {}

   ngOnInit(): void {
    this.funcionarioService.detalhesSolicitacao(this.data.id).subscribe({
      next: (resp) => {
        this.solicitacao = resp.solicitacao;
        this.cliente = resp.cliente;
      },
      error: () => alert('Erro ao carregar detalhes')
    });
  }


  efetuarOrcamento() {
    const valor = typeof this.valor === 'string'
      ? Number(String(this.valor).replace(/[R$\s.]/g, '').replace(',', '.'))
      : this.valor;

    if (!this.solicitacao?.id || !valor || valor <= 0) {
      alert('Informe um valor válido e a descrição do serviço.');
      return;
    }

    this.funcionarioService.efetuarOrcamento(this.solicitacao.id, valor).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => alert('Erro ao efetuar orçamento')
    });
  }

}