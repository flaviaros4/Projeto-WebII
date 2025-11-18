package com.maintech.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "solicitacoes")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String descricaoEquipamento;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaEquipamento categoria;

    @Column(nullable = false, length = 1000)
    private String descricaoDefeito;

    private LocalDateTime dataHoraAbertura;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitacao estado;

    private BigDecimal valorOrcamento;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "funcionario_orcamento_id")
    private Funcionario funcionarioOrcamento;

    // --- Campos RF014 (Manutenção) ---
    @Column(length = 2000)
    private String descricaoManutencao;

    @Column(length = 2000)
    private String orientacoesCliente;

    private LocalDateTime dataHoraManutencao;

    @ManyToOne
    @JoinColumn(name = "funcionario_manutencao_id")
    private Funcionario funcionarioManutencao;

    // --- Campos RF010 (Pagamento - Adicionado para garantir consistência) ---
    private LocalDateTime dataPagamento;

    // --- INÍCIO DOS NOVOS CAMPOS RF016 (Finalização) ---
    private LocalDateTime dataHoraFinalizacao;

    @ManyToOne
    @JoinColumn(name = "funcionario_finalizacao_id")
    private Funcionario funcionarioFinalizacao;
    // --- FIM DOS NOVOS CAMPOS ---

    @OneToMany(mappedBy = "solicitacao", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @OrderBy("dataHora ASC")
    private List<HistoricoSolicitacao> historico;


    public Solicitacao() {
        this.dataHoraAbertura = LocalDateTime.now();
        this.estado = EstadoSolicitacao.ABERTA;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescricaoEquipamento() { return descricaoEquipamento; }
    public void setDescricaoEquipamento(String descricaoEquipamento) { this.descricaoEquipamento = descricaoEquipamento; }
    public CategoriaEquipamento getCategoria() { return categoria; }
    public void setCategoria(CategoriaEquipamento categoria) { this.categoria = categoria; }
    public String getDescricaoDefeito() { return descricaoDefeito; }
    public void setDescricaoDefeito(String descricaoDefeito) { this.descricaoDefeito = descricaoDefeito; }
    public LocalDateTime getDataHoraAbertura() { return dataHoraAbertura; }
    public void setDataHoraAbertura(LocalDateTime dataHoraAbertura) { this.dataHoraAbertura = dataHoraAbertura; }
    public EstadoSolicitacao getEstado() { return estado; }
    public void setEstado(EstadoSolicitacao estado) { this.estado = estado; }
    public BigDecimal getValorOrcamento() { return valorOrcamento; }
    public void setValorOrcamento(BigDecimal valorOrcamento) { this.valorOrcamento = valorOrcamento; }
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    public Funcionario getFuncionarioOrcamento() { return funcionarioOrcamento; }
    public void setFuncionarioOrcamento(Funcionario funcionarioOrcamento) { this.funcionarioOrcamento = funcionarioOrcamento; }

    public String getDescricaoManutencao() { return descricaoManutencao; }
    public void setDescricaoManutencao(String descricaoManutencao) { this.descricaoManutencao = descricaoManutencao; }
    public String getOrientacoesCliente() { return orientacoesCliente; }
    public void setOrientacoesCliente(String orientacoesCliente) { this.orientacoesCliente = orientacoesCliente; }
    public LocalDateTime getDataHoraManutencao() { return dataHoraManutencao; }
    public void setDataHoraManutencao(LocalDateTime dataHoraManutencao) { this.dataHoraManutencao = dataHoraManutencao; }
    public Funcionario getFuncionarioManutencao() { return funcionarioManutencao; }
    public void setFuncionarioManutencao(Funcionario funcionarioManutencao) { this.funcionarioManutencao = funcionarioManutencao; }

    public LocalDateTime getDataPagamento() { return dataPagamento; }
    public void setDataPagamento(LocalDateTime dataPagamento) { this.dataPagamento = dataPagamento; }

    // Getters e Setters RF016
    public LocalDateTime getDataHoraFinalizacao() { return dataHoraFinalizacao; }
    public void setDataHoraFinalizacao(LocalDateTime dataHoraFinalizacao) { this.dataHoraFinalizacao = dataHoraFinalizacao; }
    public Funcionario getFuncionarioFinalizacao() { return funcionarioFinalizacao; }
    public void setFuncionarioFinalizacao(Funcionario funcionarioFinalizacao) { this.funcionarioFinalizacao = funcionarioFinalizacao; }

    public List<HistoricoSolicitacao> getHistorico() { return historico; }
    public void setHistorico(List<HistoricoSolicitacao> historico) { this.historico = historico; }
}