import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './Solicitacao-de-Manutencao.html',
  styleUrl: './Solicitacao-de-Manutencao.css'

})
export class SolicitacaoManutencao {
  descricaoEquipamento: string = '';
  categoria: string = '';
  descricaoDefeito: string = '';

  enviarSolicitacao() {
    if (!this.descricaoEquipamento || !this.categoria || !this.descricaoDefeito) {
      alert('Preencha todos os campos!');
      return;
    }

    const solicitacao = {
      descricaoEquipamento: this.descricaoEquipamento,
      categoria: this.categoria,
      descricaoDefeito: this.descricaoDefeito,
      dataHora: new Date(),
      estado: 'ABERTA'
    };

    console.log('Solicitação enviada:', solicitacao);
    alert('Solicitação enviada com sucesso!');
    
    // integrar com  backend 
    this.descricaoEquipamento = '';
    this.categoria = '';
    this.descricaoDefeito = '';
  }
}

