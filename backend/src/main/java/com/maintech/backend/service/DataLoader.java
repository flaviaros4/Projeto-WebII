package com.maintech.backend.service;

import com.maintech.backend.model.*;
import com.maintech.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;
    
    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(" Iniciando carga de dados...");

        // 1. Criar categorias se não existirem
        criarCategorias();
        
        // 2. Criar funcionários se não existirem
        criarFuncionarios();
        
        // 3. Criar cliente de teste se não existir
        criarClienteTeste();

        System.out.println(" Carga de dados concluída!");
    }

    private void criarCategorias() {
        if (categoriaRepository.count() == 0) {
            System.out.println(" Criando categorias de teste...");
            
            String[] categorias = {"Notebook", "Desktop", "Impressora", "Mouse", "Teclado", "Monitor"};
            
            for (String nomeCategoria : categorias) {
                CategoriaEquipamento categoria = new CategoriaEquipamento();
                categoria.setNome(nomeCategoria);
                categoria.setStatus(true);
                categoriaRepository.save(categoria);
            }
            
            System.out.println("✅ " + categorias.length + " categorias criadas!");
        } else {
            System.out.println("ℹ️  Categorias já existem no banco");
        }
    }

    private void criarFuncionarios() {
        if (funcionarioRepository.count() == 0) {
            System.out.println("Criando funcionários de teste...");
            
            // Funcionário 1 - Maria
            Funcionario maria = new Funcionario();
            maria.setNome("Maria Silva");
            maria.setEmail("maria@maintech.com");
            maria.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            maria.setPerfil(Perfil.FUNCIONARIO);
            maria.setStatus(true);
            maria.setDataNascimento(java.time.LocalDate.of(1990, 5, 15));
            funcionarioRepository.save(maria);
            
            // Funcionário 2 - Mário
            Funcionario mario = new Funcionario();
            mario.setNome("Mário Souza");
            mario.setEmail("mario@maintech.com");
            mario.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            mario.setPerfil(Perfil.FUNCIONARIO);
            mario.setStatus(true);
            mario.setDataNascimento(java.time.LocalDate.of(1985, 8, 20));
            funcionarioRepository.save(mario);
            
            System.out.println("✅ 2 funcionários criados!");
        } else {
            System.out.println("ℹ️  Funcionários já existem no banco");
        }
    }

    private void criarClienteTeste() {
        if (clienteRepository.count() == 0) {
            System.out.println("Criando cliente de teste...");
            
            Cliente cliente = new Cliente();
            cliente.setNome("João Silva");
            cliente.setEmail("joao@email.com");
            cliente.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            cliente.setPerfil(Perfil.CLIENTE);
            cliente.setStatus(true);
            cliente.setCpf("123.456.789-00");
            cliente.setTelefone("(41) 99999-9999");
            
            Endereco endereco = new Endereco();
            endereco.setCep("80000-000");
            endereco.setLogradouro("Rua das Flores");
            endereco.setNumero("123");
            endereco.setBairro("Centro");
            endereco.setCidade("Curitiba");
            endereco.setEstado("PR");
            
            cliente.setEndereco(endereco);
            clienteRepository.save(cliente);
            
            System.out.println("Cliente de teste criado!");
        } else {
            System.out.println("Cliente de teste já existe no banco");
        }
    }
}