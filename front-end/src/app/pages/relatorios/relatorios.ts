import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RelatorioService } from './services/relatorio-service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    MatIconModule, CommonModule, MatFormFieldModule, MatInputModule, 
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, 
    ReactiveFormsModule, FormsModule, MatCardContent, MatCardTitle, MatCard
  ],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class Relatorios {
  dataInicial: Date | undefined;
  dataFinal: Date | undefined;

  constructor(private relatorioService: RelatorioService) {}

  downloadPdfPeriodo() {
    this.relatorioService.gerarRelatorioPeriodo(this.dataInicial, this.dataFinal)
      .subscribe({
        next: (blob) => this.baixarArquivo(blob, 'receita_periodo.pdf'),
        error: (err) => console.error('Erro ao baixar PDF', err)
      });
  }

  downloadPdfCategoria() {
    this.relatorioService.gerarRelatorioCategoria()
      .subscribe({
        next: (blob) => this.baixarArquivo(blob, 'receita_categoria.pdf'),
        error: (err) => console.error('Erro ao baixar PDF', err)
      });
  }

  private baixarArquivo(blob: Blob, nomeArquivo: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}