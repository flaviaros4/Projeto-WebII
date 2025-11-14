package com.maintech.backend.config;

import com.maintech.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;

import static org.springframework.security.crypto.password.Pbkdf2PasswordEncoder.SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256;

import java.util.List;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(
                                                                                     SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/clientes/cadastro").permitAll()
                        .requestMatchers("/health").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                         
                        // --- Endpoints de Categoria --- 
                        .requestMatchers(HttpMethod.GET, "/api/categorias", "/api/categorias/**").hasAnyRole("CLIENTE","FUNCIONARIO")
                        .requestMatchers("/api/categorias/**").hasRole("FUNCIONARIO")

                       
                        // --- Endpoints de Funcionário ---
                        .requestMatchers("/api/solicitacoes/{id}/efetuar-orcamento").hasRole("FUNCIONARIO")
                        .requestMatchers("/api/funcionarios/**").hasRole("FUNCIONARIO")
                        .requestMatchers(HttpMethod.GET, "/api/solicitacoes").hasRole("FUNCIONARIO")
                        .requestMatchers("/api/solicitacoes/abertas").hasRole("FUNCIONARIO")
                        .requestMatchers("/api/solicitacoes/{id}/efetuar-manutencao").hasRole("FUNCIONARIO")
                        .requestMatchers("/api/solicitacoes/{id}/detalhes").hasRole("FUNCIONARIO")

                        // --- Endpoints de Cliente ---
                        .requestMatchers("/api/solicitacoes/minhas").hasRole("CLIENTE")
                        .requestMatchers("/api/solicitacoes/{id}/aprovar").hasRole("CLIENTE")
                        .requestMatchers("/api/solicitacoes/{id}/rejeitar").hasRole("CLIENTE")
                        .requestMatchers("/api/solicitacoes/{id}/resgatar").hasRole("CLIENTE")

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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}