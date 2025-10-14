package com.maintech.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/health")
    public String healthCheck() {
        return "MainTech API é braba e está rodando!";
    }
    
    @GetMapping("/")
    public String home() {
        return "Welcome to MainTech API - Use /health to check status";
    }
}