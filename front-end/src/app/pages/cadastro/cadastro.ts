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
import { Usuario } from '../../shared/models/cliente.model';
import { CadastroSucessoDialog } from './modals/cadastro-sucesso/cadastro-sucesso';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  user: Usuario = {
    cpf: '',
    nome: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: ''
  };

  senhaGerada: string | null = null;

  private viaCepService = inject(ViaCepService);
  private cadastroService = inject(CadastroService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  buscarCep(cep: string) {
    this.viaCepService.buscarCep(cep).subscribe(dados => {
      if (dados.erro) {
        alert('CEP não encontrado!');
      } else {
        this.user.logradouro = dados.logradouro;
        this.user.bairro = dados.bairro;
        this.user.cidade = dados.localidade;
        this.user.uf = dados.uf;
      }
    });
  }

  private gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
 cadastrar() {
    this.senhaGerada = this.gerarSenha();
    this.user.senha = this.senhaGerada;
    this.cadastroService.registrar(this.user);
    const dialogRef = this.dialog.open(CadastroSucessoDialog, {
      data: { email: this.user.email }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    }
    );
  }
}
