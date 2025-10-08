package com.maintech.backend.service;

import com.maintech.backend.model.Cliente;
import com.maintech.backend.model.Endereco;
import com.maintech.backend.model.Perfil;
import com.maintech.backend.model.Usuario;
import com.maintech.backend.repository.ClienteRepository;
import com.maintech.backend.repository.UsuarioRepository;
import com.maintech.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String cadastrarCliente(String nome, String email, String cpf, String telefone, Endereco endereco) {
        // Verificar se email já existe
        if (usuarioRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        // Verificar se CPF já existe
        if (clienteRepository.findByCpf(cpf) != null) {
            throw new RuntimeException("CPF já cadastrado");
        }

        // Gerar senha aleatória de 4 números
        String senha = gerarSenhaAleatoria();

        // Criar cliente
        Cliente cliente = new Cliente();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setSenha(passwordEncoder.encode(senha)); // Criptografar senha
        cliente.setPerfil(Perfil.CLIENTE);
        cliente.setStatus(true);
        cliente.setCpf(cpf);
        cliente.setTelefone(telefone);
        cliente.setEndereco(endereco);

        clienteRepository.save(cliente);

        System.out.println("Senha gerada para " + email + ": " + senha);

        return senha;
    }

    public String login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        
        if (usuario != null && passwordEncoder.matches(senha, usuario.getSenha()) && usuario.getStatus()) {
            return jwtUtil.generateToken(usuario.getEmail(), usuario.getPerfil().name(), usuario.getNome());
        }
        
        throw new RuntimeException("Email ou senha inválidos");
    }

    private String gerarSenhaAleatoria() {
        Random random = new Random();
        int senha = 1000 + random.nextInt(9000); // Gera número entre 1000 e 9999
        return String.valueOf(senha);
    }
}