import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FuncionarioService, FuncionarioModel } from './services/funcionario.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnChanges {
  @Input() editingId?: number | null = null;
  @Output() close = new EventEmitter<{ saved?: boolean }>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private service: FuncionarioService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('editingId' in changes) {
      if (this.editingId) {
        this.service.getById(this.editingId).subscribe({
          next: (f) => {
            if (f) {
              this.form.patchValue({
                email: f.email,
                nome: f.nome,
                dataNascimento: f.dataNascimento,
                senha: ''
              });
              // Senha opcional em edição
              this.form.get('senha')?.clearValidators();
              this.form.get('senha')?.updateValueAndValidity();
            }
          },
          error: (err) => {
            console.error('Erro ao buscar funcionário:', err);
            alert('Funcionário não encontrado ou erro de comunicação com o servidor.');
            this.dismiss();
          }
        });

      } else {
        this.form.reset();
        this.form.get('senha')?.setValidators([Validators.required, Validators.minLength(4)]);
        this.form.get('senha')?.updateValueAndValidity();
      }
    }
  }

  dismiss() { this.close.emit({ saved: false }); }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value as { email?: string; nome?: string; dataNascimento?: string; senha?: string };
    const email = (raw.email ?? '').trim();
    const nome = (raw.nome ?? '').trim();
    const dataNascimento = (raw.dataNascimento ?? '').trim();
    const senha = raw.senha ?? '';

    if (!email || !nome || !dataNascimento) { alert('Preencha todos os campos obrigatórios'); return; }

    let save$: Observable<FuncionarioModel>;

    if (this.editingId) {
      const patch: Partial<FuncionarioModel> = { email, nome, dataNascimento };
      if (senha && senha.length >= 4) patch.senha = senha;
      save$ = this.service.update(this.editingId, patch);

    } else {
      save$ = this.service.insert({ email, nome, dataNascimento, senha: senha });
    }

    save$.subscribe({
        next: () => {
            this.close.emit({ saved: true });
        },
        error: (err) => {
            console.error('Falha ao salvar/criar:', err);
            
            let errorMsg = 'Falha ao salvar funcionário.';
            
            if (err.error?.message) {
                errorMsg = err.error.message;
            } else if (err.status === 409 || err.status === 400) { 
                 errorMsg = `Erro: ${err.error?.title || 'Verifique se o e-mail já está em uso.'}`;
            } else if (err.status === 0) {
                 errorMsg = 'Erro de conexão com o servidor. Verifique se o backend está rodando.';
            }

            alert(errorMsg);
        }
    });
  }

  get f() { return this.form.controls; }
}