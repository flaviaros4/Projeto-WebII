import { Injectable } from '@angular/core';
import { CategoriaModel } from '../categorias.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Categoria } from '../../../shared/models/categoria.model';

const STORAGE_KEY = 'app_categorias_v1';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
private readonly BASE_URL = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.BASE_URL);
  }

  private list: Categoria[] = [];

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.list = JSON.parse(raw) as Categoria[];
      else {

        this.list = [
          { id: 1, nome: 'Notebook' },
          { id: 2, nome: 'Desktop' },
          { id: 3, nome: 'Impressora' }
        ];
        this.saveToStorage();
      }
    } catch {
      this.list = [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list));
  }



  obterPorId(id: number): CategoriaModel | undefined {
    return this.list.find(c => c.id === id);
  }

  inserir(nome: string): CategoriaModel {
    const novo: CategoriaModel = {
      id: this.nextId(),
      nome: nome.trim()
    };
    this.list.push(novo);
    this.saveToStorage();
    return { ...novo };
  }

  atualizar(id: number, nome: string): boolean {
    const idx = this.list.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.list[idx].nome = nome.trim();
    this.saveToStorage();
    return true;
  }

  remover(id: number): boolean {
    const idx = this.list.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.list.splice(idx, 1);
    this.saveToStorage();
    return true;
  }

  private nextId(): number {
    return this.list.length ? Math.max(...this.list.map(c => c.id)) + 1 : 1;
  }
}
