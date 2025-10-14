package com.maintech.backend.repository;

import com.maintech.backend.model.CategoriaEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaEquipamentoRepository extends JpaRepository<CategoriaEquipamento, Long> {
}