package com.maintech.backend.controller;

import com.maintech.backend.model.Solicitacao;
import com.maintech.backend.repository.SolicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @GetMapping
    public List<Solicitacao> getAllSolicitacoes() {
        return solicitacaoRepository.findAll();
    }

    @PostMapping
    public Solicitacao createSolicitacao(@RequestBody Solicitacao solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }
}