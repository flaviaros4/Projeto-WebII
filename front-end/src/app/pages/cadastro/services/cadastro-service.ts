import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {
  registrar(usuario: Usuario): boolean {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usarioExistente = usuarios.find((u: Usuario) => u.email === usuario.email);
    if (usarioExistente) {
      return false;
    }
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return true;
  }

}
