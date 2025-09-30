import { Injectable } from '@angular/core';
import { categoriaModel } from '../../../shared/models/categoria.model';

const LSCHAVE = 'categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  listarCategorias(): categoriaModel[] {
    const categorias = localStorage[LSCHAVE];
    return categorias ? JSON.parse(categorias) : [];
  }

  inserirCategoria(categoria: categoriaModel): void { 
    const categorias = this.listarCategorias();
    categoria.id = new Date().getTime();
    categorias.push(categoria);
    localStorage[LSCHAVE] = JSON.stringify(categorias);
  }

  atualizarCategoria(categoria: categoriaModel): void {
    const categorias = this.listarCategorias();
    
    categorias.forEach((obj, index, objs) => {
      if (categoria.id === obj.id) {
        objs[index] = categoria;
      }
    });

    localStorage[LSCHAVE] = JSON.stringify(categorias);
  }

  removerCategoria(id: number): void {
    let categorias = this.listarCategorias();
    categorias = categorias.filter(categoria => categoria.id !== id);
    localStorage[LSCHAVE] = JSON.stringify(categorias);
  }
  

}
