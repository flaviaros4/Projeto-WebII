package com.maintech.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.maintech.backend.dto.RelatorioCategoriaDTO;
import com.maintech.backend.dto.RelatorioDiarioDTO;
import com.maintech.backend.model.Cliente;
import com.maintech.backend.model.EstadoSolicitacao;
import com.maintech.backend.model.Funcionario;
import com.maintech.backend.model.Solicitacao;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    // Método para buscar solicitações de um cliente ordenadas por data (mais recente primeiro)
    List<Solicitacao> findByClienteOrderByDataHoraAberturaAsc(Cliente cliente);
    // Método para buscar solicitações por estado
    List<Solicitacao> findByEstado(EstadoSolicitacao estado);

    // Método para buscar solicitações de um cliente específico
    List<Solicitacao> findByCliente(Cliente cliente);

    // Método para verificar se existem solicitações em um determinado estado
    boolean existsByEstado(EstadoSolicitacao estado);

    List<Solicitacao> findByEstadoAndFuncionarioManutencao(EstadoSolicitacao estado, Funcionario funcionario);
    @Query("select s from Solicitacao s where " +
       "s.estado <> com.maintech.backend.model.EstadoSolicitacao.REDIRECIONADA or " +
       "(s.estado = com.maintech.backend.model.EstadoSolicitacao.REDIRECIONADA and s.funcionarioManutencao.id = :funcId)")
    List<Solicitacao> findVisiveisParaFuncionario(@Param("funcId") Long funcId);

    @Query("SELECT new com.maintech.backend.dto.RelatorioDiarioDTO(CAST(s.dataPagamento AS date), SUM(s.valorOrcamento)) " +
           "FROM Solicitacao s " +
           "WHERE s.dataPagamento BETWEEN :inicio AND :fim " +
           "AND s.valorOrcamento IS NOT NULL " +
           "GROUP BY CAST(s.dataPagamento AS date) " +
           "ORDER BY CAST(s.dataPagamento AS date) ASC")
    List<RelatorioDiarioDTO> findReceitaPorPeriodo(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);

    @Query("SELECT new com.maintech.backend.dto.RelatorioCategoriaDTO(c.nome, SUM(s.valorOrcamento)) " +
           "FROM Solicitacao s " +
           "JOIN s.categoria c " +
           "WHERE s.valorOrcamento IS NOT NULL " +
           "AND s.dataPagamento IS NOT NULL " +
           "GROUP BY c.nome")
    List<RelatorioCategoriaDTO> findReceitaPorCategoria();
}