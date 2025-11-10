import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from './services/categorias.service';
import { CategoriaModel } from './categorias.model';
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

  load() {
   this.service.listar().subscribe({
      next: (cats) => (this.categorias = cats || []),
      error: () => (this.categorias = [])
    });
  }

  novo() {
    this.editingId = null;
    this.form = { nome: '' };
    this.showModal = true;
  }

  editar(id: number) {
    const c = this.service.obterPorId(id);
    if (!c) return;
    this.editingId = id;
    this.form = { nome: c.nome };
    this.showModal = true;
  }

  save() {
    const nome = (this.form.nome || '').trim();
    if (!nome) {
      alert('Digite o nome da categoria.');
      return;
    }
    if (this.editingId) {
      this.service.atualizar(this.editingId, nome);
    } else {
      this.service.inserir(nome);
    }
    this.closeModal();
    this.load();
  }

  closeModal() {
    this.showModal = false;
    this.editingId = null;
    this.form = { nome: '' };
  }

  confirmRemove(id: number) {
    this.candidateToRemove = id;
    this.showConfirm = true;
  }

  onConfirmClose(ok: boolean) {
    this.showConfirm = false;
    if (ok && this.candidateToRemove != null) {
      const success = this.service.remover(this.candidateToRemove);
      if (success) {

      } else {
        alert('Falha ao remover categoria.');
      }
      this.load();
    }
    this.candidateToRemove = null;
  }
}
