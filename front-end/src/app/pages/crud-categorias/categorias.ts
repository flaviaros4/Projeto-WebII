import { Component } from '@angular/core';
import { CategoriasService } from './services/categorias';
import { categoriaModel } from '../../shared/models/categoria.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-crud-categorias',
  imports: [MatIcon],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias {
  categorias : categoriaModel[] = [];

  ngOnInit() {
    this.categorias = this.categoriaService.listarCategorias();
  }
  listarCategorias(): categoriaModel[] {
    return this.categorias;
  }

 constructor(private categoriaService: CategoriasService) { }
}
