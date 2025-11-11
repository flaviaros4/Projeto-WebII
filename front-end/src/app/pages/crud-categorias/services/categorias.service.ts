import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../../shared/models/categoria.model'; // se o path estiver certo

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private readonly BASE_URL = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.BASE_URL);
  }

  obterPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.BASE_URL}/${id}`);
  }

  inserir(nome: string): Observable<Categoria> {
    const novaCategoria: Partial<Categoria> = {
      nome: nome.trim(),
      status: true
    };
    return this.http.post<Categoria>(this.BASE_URL, novaCategoria);
  }

  atualizar(id: number, nome: string): Observable<Categoria> {
    const atualizada: Partial<Categoria> = {
      nome: nome.trim(),
      status: true
    };
    return this.http.put<Categoria>(`${this.BASE_URL}/${id}`, atualizada);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
