// src/app/pages/listar-funcionarios/listar-funcionarios.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService, FuncionarioModel } from '../cadastro/services/funcionario.service';

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-funcionarios.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionarios {
  funcionarios: Array<{ id: number; nome: string; idade: number; email: string; dataNascimento: string }> = [];

  // Simula o funcionário logado (muda para o id real do usuário logado depois)
  currentUserId = 1;

  constructor(private service: FuncionarioService) {
    this.load();
  }

  private calculateAge(dateIso: string): number {
    if (!dateIso) return 0;
    const dob = new Date(dateIso + 'T00:00:00');
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  load() {
    const list = this.service.list();
    this.funcionarios = list.map(f => ({
      id: f.id,
      nome: f.nome,
      email: f.email,
      dataNascimento: f.dataNascimento,
      idade: this.calculateAge(f.dataNascimento)
    }));
  }

  novo() {
    const email = prompt('E-mail (único) do funcionário:');
    if (email === null) { alert('Operação cancelada'); return; }
    const emailStr = email.trim();
    if (!emailStr) { alert('E-mail obrigatório'); return; }
    if (!this.validateEmail(emailStr)) { alert('Email inválido'); return; }
    if (this.service.emailExists(emailStr)) { alert('E-mail já cadastrado'); return; }

    const nome = prompt('Nome completo:');
    if (nome === null) { alert('Operação cancelada'); return; }
    const nomeStr = nome.trim();
    if (!nomeStr) { alert('Nome obrigatório'); return; }

    const dataNascimento = prompt('Data de nascimento (AAAA-MM-DD):');
    if (dataNascimento === null) { alert('Operação cancelada'); return; }
    const dataStr = dataNascimento.trim();
    if (!this.validateIsoDate(dataStr)) { alert('Data inválida. Formato: AAAA-MM-DD'); return; }

    const senha = prompt('Senha (mínimo 4 caracteres):');
    if (senha === null) { alert('Operação cancelada'); return; }
    const senhaStr = senha;
    if (!senhaStr || senhaStr.length < 4) { alert('Senha inválida'); return; }

    this.service.insert({ email: emailStr, nome: nomeStr, dataNascimento: dataStr, senha: senhaStr });
    this.load();
    alert('Funcionário inserido com sucesso');
  }

  editar(id: number) {
    const f = this.service.getById(id);
    if (!f) { alert('Funcionário não encontrado'); return; }

    const novoEmail = prompt('E-mail:', f.email);
    if (novoEmail === null) { alert('Operação cancelada'); return; }
    const novoEmailStr = novoEmail.trim();
    if (!novoEmailStr) { alert('E-mail obrigatório'); return; }
    if (!this.validateEmail(novoEmailStr)) { alert('Email inválido'); return; }
    if (this.service.emailExists(novoEmailStr, id)) { alert('E-mail já usado por outro'); return; }

    const novoNome = prompt('Nome:', f.nome);
    if (novoNome === null) { alert('Operação cancelada'); return; }
    const novoNomeStr = novoNome.trim();
    if (!novoNomeStr) { alert('Nome obrigatório'); return; }

    const novaData = prompt('Data nascimento (AAAA-MM-DD):', f.dataNascimento);
    if (novaData === null) { alert('Operação cancelada'); return; }
    const novaDataStr = novaData.trim();
    if (!this.validateIsoDate(novaDataStr)) { alert('Data inválida'); return; }

    const novaSenha = prompt('Senha (deixe em branco para manter):', '');
    const patch: Partial<FuncionarioModel> = { email: novoEmailStr, nome: novoNomeStr, dataNascimento: novaDataStr };
    if (novaSenha && novaSenha.length >= 4) patch.senha = novaSenha;

    this.service.update(id, patch);
    this.load();
    alert('Funcionário atualizado');
  }

  remover(id: number) {
    if (id === this.currentUserId) {
      alert('Você não pode remover a si mesmo');
      return;
    }
    const total = this.service.count();
    if (total <= 1) {
      alert('Não é possível remover. Deve haver ao menos 1 funcionário.');
      return;
    }
    const confirmar = confirm('Confirma remoção deste funcionário?');
    if (!confirmar) return;

    const ok = this.service.remove(id);
    if (ok) {
      this.load();
      alert('Funcionário removido');
    } else {
      alert('Remoção falhou');
    }
  }

  private validateIsoDate(d?: string | null): boolean {
    if (!d) return false;
    const r = /^\d{4}-\d{2}-\d{2}$/;
    if (!r.test(d)) return false;
    const dt = new Date(d + 'T00:00:00');
    return !isNaN(dt.getTime());
  }

  private validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
