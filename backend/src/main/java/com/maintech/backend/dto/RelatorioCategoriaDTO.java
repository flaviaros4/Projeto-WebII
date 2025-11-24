package com.maintech.backend.dto;

import java.math.BigDecimal;

public class RelatorioCategoriaDTO {
    private String categoria;
    private BigDecimal valorTotal;

    public RelatorioCategoriaDTO(String categoria, BigDecimal valorTotal) {
        this.categoria = categoria;
        this.valorTotal = valorTotal;
    }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }
}