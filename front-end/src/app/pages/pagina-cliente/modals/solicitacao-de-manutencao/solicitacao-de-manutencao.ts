import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../../../shared/models/categoria.model';
import { CategoriasService } from '../../../crud-categorias/services/categorias.service';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './solicitacao-de-manutencao.html',
  styleUrls: ['./solicitacao-de-manutencao.css']
})
export class SolicitacaoManutencao {
  categorias: Categoria[] = [];

  solicitacao = {
    descricao: '',
    categoria: '',
    descricaoDefeito: '',
    categoriaId: null as number | null
  };

  constructor(public dialogRef: MatDialogRef<SolicitacaoManutencao>,
    private categoriaService: CategoriasService
  ) {}

ngOnInit(): void {
    this.categoriaService.listar().subscribe({
      next: (cats) => (this.categorias = cats || []),
      error: () => (this.categorias = [])
    });
  }

  cadastrarSolicitacao() {
    if (!this.solicitacao.categoriaId) return;
    this.dialogRef.close(this.solicitacao);
  }

  fechar() {
    this.dialogRef.close();
  }
}
