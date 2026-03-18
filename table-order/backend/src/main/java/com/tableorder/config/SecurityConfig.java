package com.tableorder.config;

import com.tableorder.auth.JwtAuthFilter;
import com.tableorder.auth.TableTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final TableTokenFilter tableTokenFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(f -> f.disable()))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/register", "/api/admin/login").permitAll()
                .requestMatchers("/api/tables/auth").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/menus", "/api/menus/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories", "/api/categories/**").permitAll()
                .requestMatchers("/api/images/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/tables").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/tables").authenticated()
                .requestMatchers("/api/tables/*/complete").authenticated()
                .requestMatchers("/api/tables/*/history").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/menus", "/api/categories", "/api/images").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/menus/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/menus/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(tableTokenFilter, JwtAuthFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
