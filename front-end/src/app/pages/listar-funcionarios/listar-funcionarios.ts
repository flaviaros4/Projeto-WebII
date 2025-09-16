import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Funcionario {
  id: number;
  nome: string;
  idade: number;
}

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-funcionarios.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionarios {

  funcionarios: Funcionario[] = [
    { id: 1, nome: 'Maria Silva', idade: 30 },
    { id: 2, nome: 'João Souza', idade: 40 },
    { id: 3, nome: 'Ana Pereira', idade: 25 }
  ];

  novo() {
    alert('Clique em Novo');
  }

  editar(id: number) {
    alert('Editar funcionário ' + id);
  }

  remover(id: number) {
    alert('Remover funcionário ' + id);
  }
}
