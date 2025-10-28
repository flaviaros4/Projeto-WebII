package com.maintech.backend.repository;

import com.maintech.backend.model.HistoricoSolicitacao;
import com.maintech.backend.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoSolicitacaoRepository extends JpaRepository<HistoricoSolicitacao, Long> {
    List<HistoricoSolicitacao> findBySolicitacaoOrderByDataHoraAsc(Solicitacao solicitacao);
}