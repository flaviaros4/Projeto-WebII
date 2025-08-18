import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { Cadastro } from './pages/cadastro/cadastro';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Cadastro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('manutencao-equipamentos');
}
