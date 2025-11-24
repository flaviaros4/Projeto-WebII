import { ToastService } from '../../shared/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioService, FuncionarioModel } from './services/funcionario.service';
import { CadastroFuncionarioComponent } from './cadastro-funcionario.component'; 
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { FormsModule } from '@angular/forms'; 

type ViewFuncionario = { id: number; nome: string; email: string; dataNascimento: string; idade: number };

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule, CadastroFuncionarioComponent, ConfirmDialogComponent, FormsModule],
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.css']
})
export class ListarFuncionariosComponent implements OnInit {
  funcionarios: ViewFuncionario[] = [];
  showModal = false;
  editingId: number | null = null;
  showConfirm = false;
  candidateToRemove: number | null = null;
  currentUserId = 1;

  constructor(private service: FuncionarioService, private toast: ToastService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.list().subscribe({
      next: (list: FuncionarioModel[]) => {
        this.funcionarios = list.map(f => ({
          id: f.id,
          nome: f.nome,
          email: f.email,
          dataNascimento: f.dataNascimento,
          idade: this.calculateAge(f.dataNascimento)
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.toast.show('Falha ao carregar lista de funcionários.', 'error', 4000);
      }
    });
  }

  calculateAge(dateIso: string) {
    if (!dateIso) return 0;
    const d = new Date(dateIso + 'T00:00:00'); 
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  }

  novo() { this.editingId = null; this.showModal = true; }

  editar(id: number) { this.editingId = id; this.showModal = true; }

  remover(id: number) {
    this.service.count().subscribe({
        next: (count: number) => { 
            if (id === this.currentUserId) {
                this.toast.show('Você não pode remover a si mesmo.', 'error', 4000);
                return;
            }

            if (count <= 1) { 
                this.toast.show('Não é possível remover. Deve haver ao menos 1 funcionário.', 'warning', 4500);
                return;
            }

            this.candidateToRemove = id;
            this.showConfirm = true;
        },
        error: (err) => {
             console.error('Falha ao contar funcionários:', err);
             this.toast.show('Falha ao verificar regras de remoção.', 'error', 4000);
        }
    });
  }

  onModalClose(evt: { saved?: boolean }) {
    this.showModal = false; this.editingId = null;
    if (evt?.saved) this.load();
  }

  onConfirmClose(ok: boolean) {
    this.showConfirm = false;

    if (ok && this.candidateToRemove) {
      this.service.remove(this.candidateToRemove).subscribe({
        next: () => {
          this.load();
          this.toast.show('Funcionário removido', 'success', 3000);
        },
        error: (err) => {
          console.error('Falha na remoção:', err);
          const errorMsg = err.error?.message || 'Falha ao remover funcionário (erro do servidor)';
          this.toast.show(errorMsg, 'error', 3500);
        }
      });
    }
    this.candidateToRemove = null;
  }
}