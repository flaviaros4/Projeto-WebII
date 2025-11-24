package com.maintech.backend.dto;

import java.math.BigDecimal;
import java.util.Date;

public class RelatorioDiarioDTO {
    private Date data;
    private BigDecimal valorTotal;

    public RelatorioDiarioDTO(Date data, BigDecimal valorTotal) {
        this.data = data;
        this.valorTotal = valorTotal;
    }

    public Date getData() { return data; }
    public void setData(Date data) { this.data = data; }
    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }
}