import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from './services/categorias.service';
import { Categoria } from '../../shared/models/categoria.model';

@Component({
  selector: 'app-crud-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias {
  categorias: Categoria[] = [];

  showModal = false;
  editingId: number | null = null;
  form: { nome: string } = { nome: '' };

  showConfirm = false;
  candidateToRemove: number | null = null;

  constructor(private service: CategoriasService) {
    this.load();
  }

  load(): void {
    this.service.listar().subscribe({
      next: (cats: Categoria[] | null) => (this.categorias = cats || []),
      error: (err: any) => {
        console.error('Erro ao carregar categorias', err);
        this.categorias = [];
      }
    });
  }

  novo(): void {
    this.editingId = null;
    this.form = { nome: '' };
    this.showModal = true;
  }

  editar(id: number): void {
    this.service.obterPorId(id).subscribe({
      next: (c: Categoria | null) => {
        if (!c) {
          alert('Categoria não encontrada');
          return;
        }
        this.editingId = id;
        this.form = { nome: c.nome };
        this.showModal = true;
      },
      error: (err: any) => {
        console.error('Erro ao obter categoria', err);
        alert('Erro ao obter categoria');
      }
    });
  }

  save(): void {
    const nome = (this.form.nome || '').trim();
    if (!nome) {
      alert('Digite o nome da categoria.');
      return;
    }

    if (this.editingId != null) { // verificar explicitamente null
      this.service.atualizar(this.editingId, nome).subscribe({
        next: () => { this.closeModal(); this.load(); },
        error: (err: any) => {
          console.error('Erro ao atualizar', err);
          alert('Erro ao atualizar categoria');
        }
      });
    } else {
      this.service.inserir(nome).subscribe({
        next: () => { this.closeModal(); this.load(); },
        error: (err: any) => {
          console.error('Erro ao inserir', err);
          alert('Erro ao criar categoria');
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.form = { nome: '' };
  }

  confirmRemove(id: number): void {
    this.candidateToRemove = id;
    this.showConfirm = true;
  }

  onConfirmClose(ok: boolean): void {
    this.showConfirm = false;
    if (ok && this.candidateToRemove != null) {
      this.service.remover(this.candidateToRemove).subscribe({
        next: () => { this.load(); },
        error: (err: any) => {
          console.error('Erro ao remover', err);
          alert('Falha ao remover categoria.');
          this.load();
        }
      });
    }
    this.candidateToRemove = null;
  }
}
