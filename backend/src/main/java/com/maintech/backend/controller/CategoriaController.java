package com.maintech.backend.controller;

import com.maintech.backend.model.CategoriaEquipamento;
import com.maintech.backend.service.CategoriaService; // Importar o Service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Importar
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<CategoriaEquipamento> getAllCategorias() {
        return categoriaService.findAllActive();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaEquipamento> getCategoriaById(@PathVariable Long id) {
        return categoriaService.findById(id)
                .map(categoria -> ResponseEntity.ok(categoria))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CategoriaEquipamento createCategoria(@RequestBody CategoriaEquipamento categoria) {
        return categoriaService.create(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaEquipamento> updateCategoria(@PathVariable Long id, @RequestBody CategoriaEquipamento
            categoriaDetails) {
        try {
            CategoriaEquipamento categoriaAtualizada = categoriaService.update(id, categoriaDetails);
            return ResponseEntity.ok(categoriaAtualizada);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        try {
            categoriaService.deleteLogico(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}