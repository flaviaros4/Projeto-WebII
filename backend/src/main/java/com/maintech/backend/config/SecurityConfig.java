package com.maintech.backend.config;

import com.maintech.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder; // Importação necessária

import static org.springframework.security.crypto.password.Pbkdf2PasswordEncoder.SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/clientes/cadastro").permitAll()
                                .requestMatchers("/health").permitAll()


                                .requestMatchers("/api/categorias/**").hasRole("FUNCIONARIO")
                                .requestMatchers("/api/orcamentos/**").hasRole("FUNCIONARIO")

                                 .requestMatchers("/api/funcionarios/**").hasRole("FUNCIONARIO")

                                // (Exemplo para endpoints de Cliente)
                                .requestMatchers("/api/solicitacoes/minhas").hasRole("CLIENTE")
                                .requestMatchers("/api/solicitacoes/abertas").hasRole("FUNCIONARIO")

                                .requestMatchers("/api/solicitacoes/{id}/efetuar-manutencao").hasRole("FUNCIONARIO")

                                // (solicitacoes/{id}/detalhes)
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        String secretPepper = "";
        int saltLength = 16;
        int iterations = 310000;

        return new Pbkdf2PasswordEncoder(
                secretPepper,
                saltLength,
                iterations,
                PBKDF2WithHmacSHA256
        );
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}