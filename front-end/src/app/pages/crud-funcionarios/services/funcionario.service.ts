import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs'; 


export interface FuncionarioModel {
  id: number;
  email: string;
  nome: string;
  dataNascimento: string; 
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
private readonly BASE_URL = 'http://localhost:8080/api/funcionarios';
  constructor(private http: HttpClient) { 
  }

  list(): Observable<FuncionarioModel[]> {
    return this.http.get<FuncionarioModel[]>(this.BASE_URL);
  }

  getById(id: number): Observable<FuncionarioModel> {
    return this.http.get<FuncionarioModel>(`${this.BASE_URL}/${id}`);
  }

  insert(f: Omit<FuncionarioModel, 'id'>): Observable<FuncionarioModel> {
    return this.http.post<FuncionarioModel>(this.BASE_URL, f);
  }

  
  update(id: number, patch: Partial<Omit<FuncionarioModel, 'id'>>): Observable<FuncionarioModel> {
   
    return this.http.put<FuncionarioModel>(`${this.BASE_URL}/${id}`, patch);
  }

  
  remove(id: number): Observable<any> {
    
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  count(): Observable<number> {
    return this.list().pipe(
        map(list => list.length)
    );
  }
  
  emailExists(email: string, exceptId?: number): boolean {
    return false; 
  }
}