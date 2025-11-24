package com.maintech.backend.dto;

public class ManutencaoRequest {
    private String descricaoManutencao;
    private String orientacoesCliente;

     // usados apenas em redirecionamento
     private Long novoFuncionarioId;
     private String motivo;

    // Getters e Setters
    public String getDescricaoManutencao() {
        return descricaoManutencao;
    }

    public void setDescricaoManutencao(String descricaoManutencao) {
        this.descricaoManutencao = descricaoManutencao;
    }

    public String getOrientacoesCliente() {
        return orientacoesCliente;
    }

    public void setOrientacoesCliente(String orientacoesCliente) {
        this.orientacoesCliente = orientacoesCliente;
    }
    public Long getNovoFuncionarioId() {
        return novoFuncionarioId;
    }
    public void setNovoFuncionarioId(Long novoFuncionarioId) {
        this.novoFuncionarioId = novoFuncionarioId;
    }
    public String getMotivo() {
        return motivo;
    }
    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}