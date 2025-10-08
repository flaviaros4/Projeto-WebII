package com.maintech.backend.controller;

import com.maintech.backend.dto.CadastroClienteRequest;
import com.maintech.backend.dto.LoginRequest;
import com.maintech.backend.dto.LoginResponse;
import com.maintech.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // RFO01 - Autocadastro de cliente
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarCliente(@RequestBody CadastroClienteRequest request) {
        try {
            String senhaGerada = authService.cadastrarCliente(
                request.getNome(),
                request.getEmail(), 
                request.getCpf(),
                request.getTelefone(),
                request.getEndereco()
            );
            
            return ResponseEntity.ok().body("Cliente cadastrado com sucesso. Senha: " + senhaGerada);
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // RFO02 - Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request.getEmail(), request.getSenha());
            // vai buscar o perfil e nome do usuário para retornar no response
            return ResponseEntity.ok(new LoginResponse(token, "CLIENTE", "Nome do Usuário"));
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}