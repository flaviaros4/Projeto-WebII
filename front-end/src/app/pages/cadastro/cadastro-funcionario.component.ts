import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FuncionarioService, FuncionarioModel } from './services/funcionario.service';

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
        const f = this.service.getById(this.editingId);
        if (f) {
          this.form.patchValue({
            email: f.email,
            nome: f.nome,
            dataNascimento: f.dataNascimento,
            senha: ''
          });
          // senha opcional em edição
          this.form.get('senha')?.clearValidators();
          this.form.get('senha')?.updateValueAndValidity();
        }
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

    if (this.editingId) {
      if (this.service.emailExists(email, this.editingId)) { alert('E-mail já em uso por outro funcionário.'); return; }
      const patch: Partial<FuncionarioModel> = { email, nome, dataNascimento };
      if (senha && senha.length >= 4) patch.senha = senha;
      this.service.update(this.editingId, patch);
      this.close.emit({ saved: true });
      return;
    }

    if (this.service.emailExists(email)) { alert('E-mail já cadastrado.'); return; }
    this.service.insert({ email, nome, dataNascimento, senha: senha || ' ' });
    this.close.emit({ saved: true });
  }


  get f() { return this.form.controls; }
}

