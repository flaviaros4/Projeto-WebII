
import { Injectable } from '@angular/core';

export interface FuncionarioModel {
  id: number;
  email: string;
  nome: string;
  dataNascimento: string; // 'YYYY-MM-DD'
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private storageKey = 'app_funcionarios_v1';

  constructor() { this.ensureSeedData(); }

  private ensureSeedData() {
    const arr = this.getAllRaw();
    if (!arr || arr.length === 0) {
      const seed: FuncionarioModel[] = [
        { id: 1, email: 'maria@empresa.com', nome: 'Maria Silva', dataNascimento: '1992-04-12', senha: '1234' },
        { id: 2, email: 'joao@empresa.com', nome: 'João Souza', dataNascimento: '1983-08-07', senha: '1234' }
      ];
      this.saveAll(seed);
    }
  }

  private getAllRaw(): FuncionarioModel[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  private saveAll(arr: FuncionarioModel[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
  }

  list(): FuncionarioModel[] { return this.getAllRaw(); }

  getById(id: number): FuncionarioModel | undefined {
    return this.list().find(f => f.id === id);
  }

  insert(f: Omit<FuncionarioModel, 'id'>): FuncionarioModel {
    const arr = this.list();
    const nextId = arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
    const novo: FuncionarioModel = { id: nextId, ...f };
    arr.push(novo);
    this.saveAll(arr);
    return novo;
  }

  update(id: number, patch: Partial<Omit<FuncionarioModel, 'id'>>): FuncionarioModel | undefined {
    const arr = this.list();
    const i = arr.findIndex(x => x.id === id);
    if (i === -1) return;
    arr[i] = { ...arr[i], ...patch };
    this.saveAll(arr);
    return arr[i];
  }

  remove(id: number): boolean {
    const arr = this.list();
    const newArr = arr.filter(x => x.id !== id);
    if (newArr.length === arr.length) return false;
    this.saveAll(newArr);
    return true;
  }

  emailExists(email: string, exceptId?: number): boolean {
    const arr = this.list();
    return arr.some(f => f.email.toLowerCase() === email.toLowerCase() && f.id !== exceptId);
  }

  count(): number { return this.list().length; }
}

