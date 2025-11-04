package com.maintech.backend.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoDuplicadoException.class)
    public ResponseEntity<Map<String, String>> handleRecursoDuplicado(RecursoDuplicadoException ex) {
        Map<String, String> erro = Map.of("erro", ex.getMessage());
        return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RegraNegocioException.class)
    public ResponseEntity<Map<String, String>> handleRegraNegocio(RegraNegocioException ex) {
        // Retorna um erro 400 (Bad Request) com a mensagem da regra de negócio
        Map<String, String> erro = Map.of("erro", ex.getMessage());
        return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        String mensagemErro = "Erro de integridade de dados.";

        if (ex.getMostSpecificCause().getMessage().contains("viola a restrição de unicidade")) {

            if (ex.getMostSpecificCause().getMessage().contains("ukkbc0pb71nnd05mh8aktuh366")) {
                mensagemErro = "Não pode cadastrar: o nome desta categoria já existe.";
            } else if (ex.getMostSpecificCause().getMessage().contains("uk_m1k6b5r3w1wsp8l1k1mgu6y1s")) {
                mensagemErro = "Erro: Este e-mail já está em uso.";
            } else {
                mensagemErro = "Erro: Este registro já existe (ex: CPF ou E-mail duplicado).";
            }
            Map<String, String> erro = Map.of("erro", mensagemErro);
            return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
        }

        Map<String, String> erro = Map.of("erro", "Erro interno no servidor.");
        return new ResponseEntity<>(erro, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}