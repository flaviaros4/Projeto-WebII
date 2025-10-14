package com.maintech.backend.controller;

import com.maintech.backend.model.Cliente;
import com.maintech.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente) {
        try {
            if (clienteService.emailExists(cliente.getEmail())) {
                return ResponseEntity.badRequest().body("Email já cadastrado");
            }
            if (clienteService.cpfExists(cliente.getCpf())) {
                return ResponseEntity.badRequest().body("CPF já cadastrado");
            }
            Cliente clienteSalvo = clienteService.save(cliente);
            return ResponseEntity.ok(clienteSalvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao criar cliente: " + e.getMessage());
        }
    }
}