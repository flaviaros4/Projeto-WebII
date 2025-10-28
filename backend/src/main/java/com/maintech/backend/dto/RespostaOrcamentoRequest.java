package com.maintech.backend.dto;

public class RespostaOrcamentoRequest {
    private String motivo; // Apenas para rejeição

    public RespostaOrcamentoRequest() {}

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}