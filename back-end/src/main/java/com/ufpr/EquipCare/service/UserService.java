package com.ufrp.EquipCare.service;

import com.ufrp.EquipCare.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final User usuarioPadrao =
            new User("admin@maintech.com", "123");

    public boolean autenticar(String email, String senha) {
        return usuarioPadrao.getEmail().equals(email)
            && usuarioPadrao.getSenha().equals(senha);
    }
}
