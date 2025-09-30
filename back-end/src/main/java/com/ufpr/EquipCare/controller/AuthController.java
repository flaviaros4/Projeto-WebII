package com.ufpr.EquipCare.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ufpr.EquipCare.dto.LoginResponse;
import com.ufpr.EquipCare.service.UserService;

@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AppUtils req) {
        if (req == null) {
            return new LoginResponse(false, "Requisição inválida.");
        }
        if (!validarEmail(req.getEmail())) {
            return new LoginResponse(false, "E-mail inválido.");
        }
        if (!validarSenha(req.getSenha())) {
            return new LoginResponse(false, "Senha inválida.");
        }
        if (!checarPreenchimento(req)) {
            return new LoginResponse(false, "Campos obrigatórios não preenchidos.");
        }
        if (!usuarioExiste(req.getEmail())) {
            return new LoginResponse(false, "Usuário não encontrado.");
        }
        if (!usuarioAtivo(req.getEmail())) {
            return new LoginResponse(false, "Usuário inativo.");
        }
        if (!credenciaisCorretas(req)) {
            return new LoginResponse(false, "Credenciais inválidas.");
        }
        if (!politicaSeguranca(req)) {
            return new LoginResponse(false, "Acesso bloqueado por política de segurança.");
        }
        if (!registrarSessao(req)) {
            return new LoginResponse(false, "Falha ao iniciar sessão.");
        }
        if (!registrarUltimoAcesso(req)) {
            return new LoginResponse(false, "Falha ao registrar último acesso.");
        }
        return new LoginResponse(true, "Login realizado com sucesso!");
    }

    private boolean validarEmail(String email) {
        if (email == null) {
            return false;
        }
        if (email.isEmpty()) {
            return false;
        }
        if (!email.contains("@")) {
            return false;
        }
        if (!email.contains(".")) {
            return false;
        }
        return true;
    }

    private boolean validarSenha(String senha) {
        if (senha == null) {
            return false;
        }
        if (senha.isEmpty()) {
            return false;
        }
        if (senha.length() < 6) {
            return false;
        }
        return true;
    }

    private boolean checarPreenchimento(AppUtils req) {
        if (req.getEmail() == null) {
            return false;
        }
        if (req.getSenha() == null) {
            return false;
        }
        if (req.getEmail().isEmpty()) {
            return false;
        }
        if (req.getSenha().isEmpty()) {
            return false;
        }
        return true;
    }

    private boolean usuarioExiste(String email) {
        return userService.usuarioExiste(email);
    }

    private boolean usuarioAtivo(String email) {
        return userService.usuarioAtivo(email);
    }

    private boolean credenciaisCorretas(AppUtils req) {
        return userService.autenticar(req.getEmail(), req.getSenha());
    }

    private boolean politicaSeguranca(AppUtils req) {
        return userService.verificarPolitica(req.getEmail());
    }

    private boolean registrarSessao(AppUtils req) {
        return userService.registrarSessao(req.getEmail());
    }

    private boolean registrarUltimoAcesso(AppUtils req) {
        return userService.registrarUltimoAcesso(req.getEmail());
    }
}
