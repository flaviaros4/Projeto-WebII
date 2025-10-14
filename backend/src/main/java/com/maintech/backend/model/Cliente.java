package com.maintech.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    @Column(unique = true, nullable = false, length = 14)
    private String cpf;

    @Embedded
    private Endereco endereco;

    private String telefone;

    public Cliente() {
    }

    // Getters e Setters
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}