package com.ufpr.EquipCare.service;

import com.ufpr.EquipCare.model.Cliente;
import com.ufpr.EquipCare.repository.ClienteRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}
