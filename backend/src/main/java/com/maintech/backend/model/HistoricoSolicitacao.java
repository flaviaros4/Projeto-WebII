package com.maintech.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historicos_solicitacao")
public class HistoricoSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "solicitacao_id", nullable = false)
    private Solicitacao solicitacao;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
    private EstadoSolicitacao estadoAnterior;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSolicitacao estadoNovo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuarioAlteracao;

    private String observacao;

    public HistoricoSolicitacao() {}

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Solicitacao getSolicitacao() { return solicitacao; }
    public void setSolicitacao(Solicitacao solicitacao) { this.solicitacao = solicitacao; }
    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    public EstadoSolicitacao getEstadoAnterior() { return estadoAnterior; }
    public void setEstadoAnterior(EstadoSolicitacao estadoAnterior) { this.estadoAnterior = estadoAnterior; }
    public EstadoSolicitacao getEstadoNovo() { return estadoNovo; }
    public void setEstadoNovo(EstadoSolicitacao estadoNovo) { this.estadoNovo = estadoNovo; }
    public Usuario getUsuarioAlteracao() { return usuarioAlteracao; }
    public void setUsuarioAlteracao(Usuario usuarioAlteracao) { this.usuarioAlteracao = usuarioAlteracao; }
    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }
}