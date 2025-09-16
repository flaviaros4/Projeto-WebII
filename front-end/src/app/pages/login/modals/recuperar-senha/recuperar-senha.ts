import { Component } from '@angular/core';

@Component({
  selector: 'app-recuperar-senha',
  template: `
  <div class="recuperar-senha-container">
  <h1>Esqueci minha senha</h1><br />
  <p>Informe o e-mail da sua conta:</p>
  <input type="email" placeholder="Seu e-mail" />
  <button>Recuperar senha</button>
  </div>
`,
styleUrls: ['./recuperar-senha.css']
})
export class RecuperarSenha {

}
