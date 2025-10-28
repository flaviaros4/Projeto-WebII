package com.maintech.backend.controller;

import com.maintech.backend.dto.RespostaOrcamentoRequest;
import com.maintech.backend.dto.SolicitacaoRequest;
import com.maintech.backend.model.Solicitacao;
import com.maintech.backend.service.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoService solicitacaoService;

    @PostMapping
    public ResponseEntity<?> criarSolicitacao(@RequestBody SolicitacaoRequest request) {
        try {
            Solicitacao solicitacao = solicitacaoService.criarSolicitacao(request);
            return ResponseEntity.ok(solicitacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/minhas")
    public ResponseEntity<?> getMinhasSolicitacoes() {
        try {
            List<Solicitacao> solicitacoes = solicitacaoService.getSolicitacoesCliente();
            return ResponseEntity.ok(solicitacoes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/abertas")
    public ResponseEntity<?> getSolicitacoesAbertas() {
        try {
            List<Solicitacao> solicitacoes = solicitacaoService.getSolicitacoesAbertas();
            return ResponseEntity.ok(solicitacoes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Aprovar orçamento
    @PostMapping("/{id}/aprovar")
    public ResponseEntity<?> aprovarOrcamento(@PathVariable Long id) {
        try {
            Solicitacao solicitacao = solicitacaoService.aprovarOrcamento(id);
            return ResponseEntity.ok(solicitacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // Rejeitar orçamento
    @PostMapping("/{id}/rejeitar")
    public ResponseEntity<?> rejeitarOrcamento(@PathVariable Long id, 
                                             @RequestBody RespostaOrcamentoRequest request) {
        try {
            Solicitacao solicitacao = solicitacaoService.rejeitarOrcamento(id, request.getMotivo());
            return ResponseEntity.ok(solicitacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}