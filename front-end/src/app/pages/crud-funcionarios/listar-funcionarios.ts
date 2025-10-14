
// src/app/pages/crud-funcionarios/listar-funcionarios.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ajuste o caminho se o service estiver em outro local
// Em muitos projetos ele fica em: src/app/pages/cadastro/services/funcionario.service.ts
import { FuncionarioService } from './services/funcionario.service';
import { ToastService } from '../../shared/toast/toast.service';


interface FuncionarioView {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
  idade: number;
}

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-funcionarios.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionarios {
  funcionarios: FuncionarioView[] = [];

  // modal / edição
  showModal = false;
  editingId: number | null = null;
  form: { email: string; nome: string; dataNascimento: string; senha: string } = {
    email: '',
    nome: '',
    dataNascimento: '',
    senha: ''
  };

  // confirm dialog
  showConfirm = false;
  candidateToRemove: number | null = null;

  // id do usuário atual (mock). Ajuste conforme seu auth
  currentUserId = 1;

  constructor(private service: FuncionarioService, private toast: ToastService) {
    this.load();
  }

  load() {
    // espera que service.list() retorne lista com {id, email, nome, dataNascimento}
    const list = this.service.list();
    this.funcionarios = list.map((f: any) => ({
      id: f.id,
      nome: f.nome,
      email: f.email,
      dataNascimento: f.dataNascimento,
      idade: this.calculateAge(f.dataNascimento)
    }));
  }

  calculateAge(dateIso: string) {
    if (!dateIso) return 0;
    const d = new Date(dateIso);
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  }

  // abrir modal para novo
  novo() {
    this.editingId = null;
    this.form = { email: '', nome: '', dataNascimento: '', senha: '' };
    this.showModal = true;
  }

  // abrir modal para editar
  editar(id: number) {
    const f = this.service.getById(id);
    if (!f) {
      this.toast.show('Funcionário não encontrado', 'error');
      return;
    }
    this.editingId = id;
    this.form = { email: f.email, nome: f.nome, dataNascimento: f.dataNascimento, senha: '' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingId = null;
  }

  // salvar — cria ou atualiza
  save() {
    const raw = this.form;
    // validações básicas
    if (!raw.email || !raw.nome || !raw.dataNascimento || !raw.senha) {
      this.toast.show('Preencha todos os campos', 'warning');
      return;
    }

    // e-mail único
    const all = this.service.list();
    const emailExists = all.some((x: any) => x.email === raw.email && x.id !== this.editingId);
    if (emailExists) {
      this.toast.show('E-mail já cadastrado', 'error');
      return;
    }

    if (this.editingId == null) {
      // inserir
      const created = this.service.insert({ email: raw.email, nome: raw.nome, dataNascimento: raw.dataNascimento, senha: raw.senha });
      if (created) {
        this.toast.show('Funcionário criado', 'success');
        this.load();
        this.closeModal();
      } else {
        this.toast.show('Falha ao criar funcionário', 'error');
      }
    } else {
      // atualizar
      const ok = this.service.update(this.editingId, { email: raw.email, nome: raw.nome, dataNascimento: raw.dataNascimento, senha: raw.senha });
      if (ok) {
        this.toast.show('Alterações salvas', 'success');
        this.load();
        this.closeModal();
      } else {
        this.toast.show('Falha ao salvar alterações', 'error');
      }
    }
  }

  // inicia o processo de remoção (abre diálogo)
  confirmRemove(id: number) {
    // não pode remover a si mesmo
    if (id === this.currentUserId) {
      this.toast.show('Você não pode remover a si mesmo.', 'error');
      return;
    }

    // se só houver 1 funcionário, não permite
    if (this.service.count() <= 1) {
      this.toast.show('Não é possível remover. Deve haver ao menos 1 funcionário.', 'warning');
      return;
    }

    this.candidateToRemove = id;
    this.showConfirm = true;
  }

  // trata confirmação
  onConfirmClose(ok: boolean) {
    this.showConfirm = false;
    if (!ok || this.candidateToRemove == null) {
      this.candidateToRemove = null;
      return;
    }

    const success = this.service.remove(this.candidateToRemove);
    if (success) {
      this.toast.show('Funcionário removido', 'success');
      this.load();
    } else {
      this.toast.show('Falha ao remover funcionário', 'error');
    }
    this.candidateToRemove = null;
  }
}
