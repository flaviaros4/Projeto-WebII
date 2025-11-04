import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ViaCepService } from '../../shared/services/via-cep';
import { CadastroService } from './services/cadastro-service';
import { Cliente, Endereco } from '../../shared/models/usuarios.model';
import { CadastroSucessoDialog } from './modals/cadastro-sucesso/cadastro-sucesso';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    NgxMaskDirective
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
   submit = false;

  cliente: Cliente = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    perfil: 'CLIENTE',
    endereco: {} as Endereco,
  }; 


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cadastroService: CadastroService,
    private viaCep: ViaCepService
  ) {
  }

 

 buscarCep() {
    const cep = this.cliente.endereco.cep || '';
    if (!cep) {
      return;
    }
    this.viaCep.buscarCep(cep).subscribe((data) => {
      if (data && !data.erro) {
        this.cliente.endereco = {
          cep: data.cep,
          logradouro: data.logradouro,
          numero: this.cliente.endereco?.numero || '',
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        };
      } else {
        alert('CEP não encontrado');
      }
    });
  }

  cadastrar() {
    if (this.submit) return;
    this.submit = true;

    this.cadastroService.registrar(this.cliente)
      .pipe(finalize(() => (this.submit = false)))
      .subscribe({
       next: () => {
          this.dialog
            .open(CadastroSucessoDialog, {
              data: { email: this.cliente.email },
              disableClose: true
            })
            .afterClosed()
            .subscribe(() => this.router.navigate(['/login']));
        },
        error: (err) => {
          alert('Erro ao cadastrar: ' + (err?.error || err?.message || 'Falha desconhecida'));
        }
      });
  }
}

