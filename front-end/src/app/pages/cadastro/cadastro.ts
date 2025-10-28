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
import { Cliente } from '../../shared/models/usuarios.model';
import { CadastroSucessoDialog } from './modals/cadastro-sucesso/cadastro-sucesso';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';

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
  
  cliente: Cliente = {
    nome: '',
    email: '',
    cpf: '',
    perfil: 'CLIENTE',
    endereco: {} as any
  }; 


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cadastroService: CadastroService,
    private viaCep: ViaCepService
  ) {
if (!this.cliente.endereco) {
      this.cliente.endereco = {} as any;
    }
  }

 

  buscarCep() {
  const cep = (this.cliente.endereco?.cep || '').replace(/\D/g, '');
  if (!cep || cep.length !== 8) {
    alert('CEP inválido');
    return;
  }

  this.viaCep.buscarCep(cep).subscribe({
    next: (resp: any) => {
      if (!resp || resp.erro) {
        alert('CEP não encontrado');
        return;
      }

      this.cliente.endereco = {
        cep: resp.cep,
        logradouro: resp.logradouro,
        numero: this.cliente.endereco?.numero || '',
        complemento: resp.complemento || '',
        bairro: resp.bairro,
        cidade: resp.localidade,
        estado: resp.estado
      };
    },
    error: () => alert('Erro ao consultar CEP')
  });
}



  cadastrar() {
    this.cadastroService.cadastrar(this.cliente).subscribe({
      next: (sucesso: boolean) => {
        
        if (sucesso) {
          this.dialog.open(CadastroSucessoDialog).afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        } else {
          alert('Erro no cadastro. Verifique os dados e tente novamente.');
        }
        

      }});
  }
}

