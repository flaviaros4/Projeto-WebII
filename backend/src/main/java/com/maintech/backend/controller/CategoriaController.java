package com.maintech.backend.controller;

import com.maintech.backend.model.CategoriaEquipamento;
import com.maintech.backend.repository.CategoriaEquipamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;

    @GetMapping
    public List<CategoriaEquipamento> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public CategoriaEquipamento createCategoria(@RequestBody CategoriaEquipamento categoria) {
        return categoriaRepository.save(categoria);
    }
}