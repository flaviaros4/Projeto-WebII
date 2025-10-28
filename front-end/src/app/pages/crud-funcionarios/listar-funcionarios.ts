import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



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
  imports: [
    CommonModule,
    FormsModule,
   
  ],
  templateUrl: './listar-funcionarios.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionariosComponent {
  funcionarios: FuncionarioView[] = [];

  showModal = false;
  editingId: number | null = null;
  form: { email: string; nome: string; dataNascimento: string; senha: string } = {
    email: '',
    nome: '',
    dataNascimento: '',
    senha: ''
  };

  showConfirm = false;
  candidateToRemove: number | null = null;


  currentUserId = 1;

  constructor(private service: FuncionarioService, private toast: ToastService) {
    this.load();
  }

  load() {
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

  novo() {
    this.editingId = null;
    this.form = { email: '', nome: '', dataNascimento: '', senha: '' };
    this.showModal = true;
  }

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

  save() {
    const raw = this.form;
    if (!raw.email || !raw.nome || !raw.dataNascimento || !raw.senha) {
      this.toast.show('Preencha todos os campos', 'warning');
      return;
    }

    const all = this.service.list();
    const emailExists = all.some((x: any) => x.email === raw.email && x.id !== this.editingId);
    if (emailExists) {
      this.toast.show('E-mail já cadastrado', 'error');
      return;
    }

    if (this.editingId == null) {
      const created = this.service.insert({ email: raw.email, nome: raw.nome, dataNascimento: raw.dataNascimento, senha: raw.senha });
      if (created) {
        this.toast.show('Funcionário criado', 'success');
        this.load();
        this.closeModal();
      } else {
        this.toast.show('Falha ao criar funcionário', 'error');
      }
    } else {
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

  confirmRemove(id: number) {
    if (id === this.currentUserId) {
      this.toast.show('Você não pode remover a si mesmo.', 'error');
      return;
    }

    if (this.service.count() <= 1) {
      this.toast.show('Não é possível remover. Deve haver ao menos 1 funcionário.', 'warning');
      return;
    }

    this.candidateToRemove = id;
    this.showConfirm = true;
  }

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
