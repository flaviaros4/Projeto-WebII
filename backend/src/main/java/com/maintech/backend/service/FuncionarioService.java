package com.maintech.backend.service;

import com.maintech.backend.dto.FuncionarioDTO;
import com.maintech.backend.exception.RecursoDuplicadoException;
import com.maintech.backend.exception.RegraNegocioException;
import com.maintech.backend.model.Funcionario;
import com.maintech.backend.model.Perfil;
import com.maintech.backend.model.Usuario;
import com.maintech.backend.repository.FuncionarioRepository;
import com.maintech.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // Para checar e-mail globalmente

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioService usuarioService; // Para saber quem está logado

    public List<Funcionario> getFuncionariosAtivos() {
        return funcionarioRepository.findByStatusTrue();
    }

    public Optional<Funcionario> getFuncionarioById(Long id) {
        return funcionarioRepository.findById(id);
    }

    public Funcionario criarFuncionario(FuncionarioDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RecursoDuplicadoException("Este e-mail já está em uso.");
        }
        if (!StringUtils.hasText(dto.getSenha())) {
            throw new RegraNegocioException("A senha é obrigatória para criar um novo funcionário.");
        }

        Funcionario func = new Funcionario();
        func.setNome(dto.getNome());
        func.setEmail(dto.getEmail());
        func.setDataNascimento(dto.getDataNascimento());
        func.setSenha(passwordEncoder.encode(dto.getSenha()));
        func.setPerfil(Perfil.FUNCIONARIO);
        func.setStatus(true);

        return funcionarioRepository.save(func);
    }


    public Funcionario atualizarFuncionario(Long id, FuncionarioDTO dto) {
        Funcionario func = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        if (!func.getEmail().equalsIgnoreCase(dto.getEmail()) && usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RecursoDuplicadoException("Este e-mail já está em uso por outro usuário.");
        }

        func.setNome(dto.getNome());
        func.setEmail(dto.getEmail());
        func.setDataNascimento(dto.getDataNascimento());

        // Só atualiza a senha se uma nova senha for fornecida
        if (StringUtils.hasText(dto.getSenha())) {
            func.setSenha(passwordEncoder.encode(dto.getSenha()));
        }

        return funcionarioRepository.save(func);
    }

    public void desativarFuncionario(Long id) {
        // Regra 1: Não pode remover a si mesmo
        Usuario usuarioLogado = usuarioService.getUsuarioAtual();
        if (usuarioLogado.getId().equals(id)) {
            throw new RegraNegocioException("Não é possível remover a si mesmo.");
        }

        if (funcionarioRepository.countByStatusTrue() <= 1) {
            throw new RegraNegocioException("Não é possível remover. Deve haver ao menos 1 funcionário ativo.");
        }

        Funcionario func = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        func.setStatus(false); // Remoção lógica
        funcionarioRepository.save(func);
    }
}