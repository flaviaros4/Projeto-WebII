import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/models/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {
  registrar(usuario: Usuario): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

}
