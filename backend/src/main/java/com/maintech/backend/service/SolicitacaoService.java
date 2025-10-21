package com.maintech.backend.service;

import com.maintech.backend.dto.SolicitacaoRequest;
import com.maintech.backend.model.*;
import com.maintech.backend.repository.CategoriaEquipamentoRepository;
import com.maintech.backend.repository.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Solicitacao criarSolicitacao(SolicitacaoRequest request) {
        CategoriaEquipamento categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Apenas clientes podem criar solicitações");
        }

        Cliente cliente = (Cliente) usuario;

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setDescricaoEquipamento(request.getDescricaoEquipamento());
        solicitacao.setCategoria(categoria);
        solicitacao.setDescricaoDefeito(request.getDescricaoDefeito());
        solicitacao.setCliente(cliente);
        solicitacao.setEstado(EstadoSolicitacao.ABERTA);

        return solicitacaoRepository.save(solicitacao);
    }

    public List<Solicitacao> getSolicitacoesCliente() {
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Apenas clientes podem ver suas solicitações");
        }

        Cliente cliente = (Cliente) usuario;
        return solicitacaoRepository.findByClienteOrderByDataHoraAberturaDesc(cliente);
    }

    public List<Solicitacao> getSolicitacoesAbertas() {
        return solicitacaoRepository.findByEstado(EstadoSolicitacao.ABERTA);
    }

    public Solicitacao efetuarOrcamento(Long solicitacaoId, BigDecimal valor) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Funcionario)) {
            throw new RuntimeException("Apenas funcionários podem efetuar orçamentos");
        }

        Funcionario funcionario = (Funcionario) usuario;

        solicitacao.setValorOrcamento(valor);
        solicitacao.setEstado(EstadoSolicitacao.ORÇADA);
        solicitacao.setFuncionarioOrcamento(funcionario);

        return solicitacaoRepository.save(solicitacao);
    }

    public Solicitacao aprovarOrcamento(Long solicitacaoId) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente) || !solicitacao.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Apenas o cliente dono da solicitação pode aprovar o orçamento");
        }

        if (solicitacao.getEstado() != EstadoSolicitacao.ORÇADA) {
            throw new RuntimeException("Só é possível aprovar solicitações com orçamento pendente");
        }

        solicitacao.setEstado(EstadoSolicitacao.APROVADA);
        return solicitacaoRepository.save(solicitacao);
    }

    public Solicitacao rejeitarOrcamento(Long solicitacaoId, String motivo) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente) || !solicitacao.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Apenas o cliente dono da solicitação pode rejeitar o orçamento");
        }

        if (solicitacao.getEstado() != EstadoSolicitacao.ORÇADA) {
            throw new RuntimeException("Só é possível rejeitar solicitações com orçamento pendente");
        }

        solicitacao.setEstado(EstadoSolicitacao.REJEITADA);
        return solicitacaoRepository.save(solicitacao);
    }
}