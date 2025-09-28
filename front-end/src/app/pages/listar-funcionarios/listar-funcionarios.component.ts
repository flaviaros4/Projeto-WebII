import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../cadastro/services/funcionario.service';
import { CadastroFuncionarioComponent } from '../cadastro/cadastro-funcionario.component';
import { ConfirmDialogComponent } from '../cadastro/confirm-dialog.component';

type ViewFuncionario = { id: number; nome: string; email: string; dataNascimento: string; idade: number };

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule, CadastroFuncionarioComponent, ConfirmDialogComponent],
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionariosComponent {
  funcionarios: ViewFuncionario[] = [];
  showModal = false;
  editingId: number | null = null;
  showConfirm = false;
  candidateToRemove: number | null = null;

  // simula id do usuário logado — substitua se tiver Auth real
  currentUserId = 1;

  constructor(private service: FuncionarioService) { this.load(); }

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

  calculateAge(dateIso: string) {
    if (!dateIso) return 0;
    const d = new Date(dateIso + 'T00:00:00'); const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  }

  novo() { this.editingId = null; this.showModal = true; }

  editar(id: number) { this.editingId = id; this.showModal = true; }

  remover(id: number) {
    if (id === this.currentUserId) { alert('Você não pode remover a si mesmo'); return; }
    if (this.service.count() <= 1) { alert('Não é possível remover. Deve haver ao menos 1 funcionário.'); return; }
    this.candidateToRemove = id; this.showConfirm = true;
  }

  onModalClose(evt: { saved?: boolean }) {
    this.showModal = false; this.editingId = null;
    if (evt?.saved) this.load();
  }

  onConfirmClose(ok: boolean) {
    this.showConfirm = false;
    if (ok && this.candidateToRemove) {
      const success = this.service.remove(this.candidateToRemove);
      if (success) { this.load(); alert('Funcionário removido.'); }
      else { alert('Falha na remoção.'); }
    }
    this.candidateToRemove = null;
  }
}
