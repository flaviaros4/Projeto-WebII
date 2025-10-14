package com.maintech.backend.service;

import com.maintech.backend.model.Cliente;
import com.maintech.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Optional<Cliente> findByEmail(String email) {
        Cliente cliente = clienteRepository.findByEmail(email);
        return Optional.ofNullable(cliente);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public boolean emailExists(String email) {
        return clienteRepository.existsByEmail(email);
    }

    public boolean cpfExists(String cpf) {
        return clienteRepository.existsByCpf(cpf);
    }

    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }
}