package com.maintech.backend.controller;

import com.maintech.backend.dto.OrcamentoRequest;
import com.maintech.backend.model.Solicitacao;
import com.maintech.backend.service.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orcamentos")
public class OrcamentoController {

    @Autowired
    private SolicitacaoService solicitacaoService;

    @PostMapping
    public ResponseEntity<?> efetuarOrcamento(@RequestBody OrcamentoRequest request) {
        try {
            Solicitacao solicitacao = solicitacaoService.efetuarOrcamento(
                request.getSolicitacaoId(), 
                request.getValor()
            );
            return ResponseEntity.ok(solicitacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}