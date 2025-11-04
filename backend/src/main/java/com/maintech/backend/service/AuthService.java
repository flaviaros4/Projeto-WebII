package com.maintech.backend.service;

import com.maintech.backend.dto.LoginResponse;
import com.maintech.backend.model.*;
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

    @Autowired
    private EmailService emailService;

    public void cadastrarCliente(String nome, String email, String cpf, String telefone, Endereco endereco) {
        if (usuarioRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        if (clienteRepository.findByCpf(cpf) != null) {
            throw new RuntimeException("CPF já cadastrado");
        }

        String senha = gerarSenhaAleatoria();

        Cliente cliente = new Cliente();
        cliente.setNome(nome);
        cliente.setEmail(email);
        cliente.setSenha(passwordEncoder.encode(senha)); // Criptografa a senha gerada
        cliente.setPerfil(Perfil.CLIENTE);
        cliente.setStatus(true);
        cliente.setCpf(cpf);
        cliente.setTelefone(telefone);
        cliente.setEndereco(endereco);

        clienteRepository.save(cliente);

        String assunto = "Bem-vindo à MainTech - Sua Senha de Acesso";
        String corpoEmail = "Olá, " + nome + "!\n\n"
                + "Seu cadastro em nosso sistema de manutenção foi realizado com sucesso.\n"
                + "Seu login é o seu e-mail (" + email + ") e sua senha é:\n\n"
                + "Senha: " + senha + "\n\n"
                + "\n\n"
                + "Atenciosamente,\n"
                + "Equipe MainTech";

        emailService.enviarEmail(cliente.getEmail(), assunto, corpoEmail);
    }

    public LoginResponse login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario != null && passwordEncoder.matches(senha, usuario.getSenha()) && usuario.getStatus()) {
            String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getPerfil().name(), usuario.getNome());
            return new LoginResponse(token, usuario.getPerfil().name(), usuario.getNome());
        }

        throw new RuntimeException("Email ou senha inválidos");
    }

    private String gerarSenhaAleatoria() {
        Random random = new Random();
        int senhaNum = 1000 + random.nextInt(9000);
        return String.valueOf(senhaNum);
    }
}