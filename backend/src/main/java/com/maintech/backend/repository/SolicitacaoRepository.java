package com.maintech.backend.repository;

import com.maintech.backend.model.Cliente;
import com.maintech.backend.model.EstadoSolicitacao;
import com.maintech.backend.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
    
    // Método para buscar solicitações de um cliente ordenadas por data (mais recente primeiro)
    List<Solicitacao> findByClienteOrderByDataHoraAberturaDesc(Cliente cliente);
    
    // Método para buscar solicitações por estado
    List<Solicitacao> findByEstado(EstadoSolicitacao estado);
    
    // Método para buscar solicitações de um cliente específico
    List<Solicitacao> findByCliente(Cliente cliente);
    
    // Método para verificar se existem solicitações em um determinado estado
    boolean existsByEstado(EstadoSolicitacao estado);
}