package com.maintech.backend.repository;

import com.maintech.backend.model.Cliente;
import com.maintech.backend.model.EstadoSolicitacao;
import com.maintech.backend.model.Funcionario;
import com.maintech.backend.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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
       "(s.estado <> com.maintech.backend.model.EstadoSolicitacao.REDIRECIONADA) or " +
       "(s.estado = com.maintech.backend.model.EstadoSolicitacao.REDIRECIONADA and s.funcionarioManutencao = :func)")
    List<Solicitacao> findVisiveisParaFuncionario(Funcionario func);
}