package com.ufrp.EquipCare.controller;

import com.ufrp.EquipCare.dto.LoginRequest;
import com.ufrp.EquipCare.dto.LoginResponse;
import com.ufrp.EquipCare.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        boolean valido = userService.autenticar(req.getEmail(), req.getSenha());
        if (valido) {
            return new LoginResponse(true, "Login realizado com sucesso!");
        }
        return new LoginResponse(false, "Credenciais inválidas.");
    }
}
