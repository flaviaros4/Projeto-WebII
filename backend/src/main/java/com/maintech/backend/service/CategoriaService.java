package com.maintech.backend.service;

import com.maintech.backend.exception.RecursoDuplicadoException; // IMPORTAR
import com.maintech.backend.model.CategoriaEquipamento;
import com.maintech.backend.repository.CategoriaEquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;

    public List<CategoriaEquipamento> findAllActive() {
        return categoriaRepository.findByStatusTrue();
    }

    public Optional<CategoriaEquipamento> findById(Long id) {
        return categoriaRepository.findById(id);
    }


    public CategoriaEquipamento create(CategoriaEquipamento categoria) {

        if (categoriaRepository.existsByNomeIgnoreCase(categoria.getNome())) {
            throw new RecursoDuplicadoException("Não pode cadastrar um nome de outra categoria existente.");
        }

        if (categoria.getStatus() == null) {
            categoria.setStatus(true);
        }
        return categoriaRepository.save(categoria);
    }

    public CategoriaEquipamento update(Long id, CategoriaEquipamento categoriaDetails) {
        CategoriaEquipamento categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o id: " + id));

        if (!categoria.getNome().equalsIgnoreCase(categoriaDetails.getNome()) &&
                categoriaRepository.existsByNomeIgnoreCase(categoriaDetails.getNome())) {
            throw new RecursoDuplicadoException("Não pode atualizar: o nome desta categoria já existe.");
        }

        categoria.setNome(categoriaDetails.getNome());
        return categoriaRepository.save(categoria);
    }

    public void deleteLogico(Long id) {
        CategoriaEquipamento categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o id: " + id));

        categoria.setStatus(false);
        categoriaRepository.save(categoria);
    }
}