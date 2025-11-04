package com.maintech.backend.service;

import com.maintech.backend.dto.SolicitacaoRequest;
import com.maintech.backend.model.*;
import com.maintech.backend.repository.CategoriaEquipamentoRepository;
import com.maintech.backend.repository.HistoricoSolicitacaoRepository;
import com.maintech.backend.repository.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maintech.backend.dto.ManutencaoRequest;
import com.maintech.backend.exception.RegraNegocioException;
import com.maintech.backend.model.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private HistoricoSolicitacaoRepository historicoRepository;

    // RF004 - Criar solicitação de manutenção
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

        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, null, EstadoSolicitacao.ABERTA, "Solicitação criada");
        
        return salva;
    }

    // RF003 - Listar solicitações do cliente
// RF003 - Listar solicitações do cliente
    public List<Solicitacao> getSolicitacoesCliente() {
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Apenas clientes podem ver suas solicitações");
        }

        Cliente cliente = (Cliente) usuario;
        return solicitacaoRepository.findByClienteOrderByDataHoraAberturaAsc(cliente);
    }

    // RF011 - Listar solicitações abertas
    public List<Solicitacao> getSolicitacoesAbertas() {
        return solicitacaoRepository.findByEstado(EstadoSolicitacao.ABERTA);
    }

    // RF012 - Efetuar orçamento
    public Solicitacao efetuarOrcamento(Long solicitacaoId, BigDecimal valor) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Funcionario)) {
            throw new RuntimeException("Apenas funcionários podem efetuar orçamentos");
        }

        Funcionario funcionario = (Funcionario) usuario;
        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();

        solicitacao.setValorOrcamento(valor);
        solicitacao.setEstado(EstadoSolicitacao.ORÇADA);
        solicitacao.setFuncionarioOrcamento(funcionario);

        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.ORÇADA, 
                          "Orçamento de R$ " + valor + " realizado por " + funcionario.getNome());
        
        return salva;
    }

    // RF006 - Aprovar serviço
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

        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();
        solicitacao.setEstado(EstadoSolicitacao.APROVADA);
        
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.APROVADA, 
                          "Orçamento aprovado pelo cliente");
        
        return salva;
    }

    public Solicitacao efetuarManutencao(Long solicitacaoId, ManutencaoRequest request) {
        // 1. Valida se é um funcionário
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Funcionario)) {
            throw new RegraNegocioException("Apenas funcionários podem efetuar manutenção.");
        }
        Funcionario funcionario = (Funcionario) usuario;

        // 2. Busca a solicitação
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        // 3. Valida o estado (conforme RF013, só pode APROVADA ou REDIRECIONADA)
        if (solicitacao.getEstado() != EstadoSolicitacao.APROVADA && solicitacao.getEstado() != EstadoSolicitacao.REDIRECIONADA) {
            throw new RegraNegocioException("Só é possível efetuar manutenção de solicitações com estado APROVADA ou REDIRECIONADA.");
        }

        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();

        // 4. Salva os novos dados na solicitação
        solicitacao.setDescricaoManutencao(request.getDescricaoManutencao());
        solicitacao.setOrientacoesCliente(request.getOrientacoesCliente());
        solicitacao.setDataHoraManutencao(LocalDateTime.now());
        solicitacao.setFuncionarioManutencao(funcionario); // Associa o funcionário que fez
        solicitacao.setEstado(EstadoSolicitacao.ARRUMADA); // Muda o estado

        Solicitacao salva = solicitacaoRepository.save(solicitacao);

        // 5. Adiciona ao histórico
        String observacao = "Manutenção realizada por " + funcionario.getNome() + ".";
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.ARRUMADA, observacao);

        return salva;
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

        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();
        solicitacao.setEstado(EstadoSolicitacao.REJEITADA);
        
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.REJEITADA, 
                          "Orçamento rejeitado. Motivo: " + motivo);
        
        return salva;
    }

    // RF009 - Resgatar serviço rejeitado
    public Solicitacao resgatarServico(Long solicitacaoId) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        // Verificar se é o cliente dono da solicitação
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente) || !solicitacao.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Apenas o cliente dono da solicitação pode resgatar o serviço");
        }

        // Verificar se está no estado REJEITADA
        if (solicitacao.getEstado() != EstadoSolicitacao.REJEITADA) {
            throw new RuntimeException("Só é possível resgatar serviços rejeitados");
        }

        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();
        solicitacao.setEstado(EstadoSolicitacao.APROVADA);
        
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.APROVADA, 
                          "Serviço resgatado pelo cliente");
        
        return salva;
    }

    // RF010 - Pagar serviço
    public Solicitacao pagarServico(Long solicitacaoId) {
        Solicitacao solicitacao = solicitacaoRepository.findById(solicitacaoId)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        // Verificar se é o cliente dono da solicitação
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (!(usuario instanceof Cliente) || !solicitacao.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Apenas o cliente dono da solicitação pode pagar o serviço");
        }

        // Verificar se está no estado ARRUMADA
        if (solicitacao.getEstado() != EstadoSolicitacao.ARRUMADA) {
            throw new RuntimeException("Só é possível pagar serviços que foram arrumados");
        }

        EstadoSolicitacao estadoAnterior = solicitacao.getEstado();
        solicitacao.setEstado(EstadoSolicitacao.PAGA);
        
        Solicitacao salva = solicitacaoRepository.save(solicitacao);
        
        // Adicionar histórico
        adicionarHistorico(salva, estadoAnterior, EstadoSolicitacao.PAGA, 
                          "Serviço pago pelo cliente");
        
        return salva;
    }

    // RF008 - Visualização completa da solicitação
    public Map<String, Object> getSolicitacaoDetalhada(Long id) {
        Solicitacao solicitacao = solicitacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        // Verificar permissão
        Usuario usuario = usuarioService.getUsuarioAtual();
        if (usuario instanceof Cliente && !solicitacao.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Você só pode visualizar suas próprias solicitações");
        }

        List<HistoricoSolicitacao> historico = historicoRepository.findBySolicitacaoOrderByDataHoraAsc(solicitacao);

        Map<String, Object> response = new HashMap<>();
        response.put("solicitacao", solicitacao);
        response.put("historico", historico);

        return response;
    }

    // Método para adicionar entrada no histórico
    private void adicionarHistorico(Solicitacao solicitacao, EstadoSolicitacao estadoAnterior, 
                                   EstadoSolicitacao estadoNovo, String observacao) {
        HistoricoSolicitacao historico = new HistoricoSolicitacao();
        historico.setSolicitacao(solicitacao);
        historico.setDataHora(LocalDateTime.now());
        historico.setEstadoAnterior(estadoAnterior);
        historico.setEstadoNovo(estadoNovo);
        historico.setUsuarioAlteracao(usuarioService.getUsuarioAtual());
        historico.setObservacao(observacao);
        historicoRepository.save(historico);
    }

    // Métodos auxiliares
    public Optional<Solicitacao> findById(Long id) {
        return solicitacaoRepository.findById(id);
    }

    public List<Solicitacao> findAll() {
        return solicitacaoRepository.findAll();
    }

    public Solicitacao save(Solicitacao solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }
}