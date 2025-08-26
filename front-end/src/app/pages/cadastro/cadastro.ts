import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  user = {
    cpf: '',
    nome: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '', 
    uf: '',
    telefone: ''
  };

  senhaGerada: string | null = null;

constructor(private http: HttpClient) {}

   buscarCep(cep: string) {
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((dados: any) => {
          if (dados.erro) {
            alert("CEP não encontrado!");
          } else {
            this.user.logradouro = dados.logradouro;
            this.user.bairro = dados.bairro;
            this.user.cidade = dados.localidade;
            this.user.uf = dados.uf;
          }
        });
    }
  }

  private gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  cadastroSucesso: boolean = false;

  router = inject(Router);

  cadastrar() {

    this.cadastroSucesso = false;

    this.senhaGerada = this.gerarSenha();


    const novoUsuario = {
      cpf: this.user.cpf,
      nome: this.user.nome,
      email: this.user.email,
      telefone: this.user.telefone,
      cep: this.user.cep,
      logradouro: this.user.logradouro,
      bairro: this.user.bairro,
      cidade: this.user.cidade,
      uf: this.user.uf,
      senha: this.senhaGerada
    };

    

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.cadastroSucesso = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
