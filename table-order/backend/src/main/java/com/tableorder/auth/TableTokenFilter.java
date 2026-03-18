package com.tableorder.auth;

import com.tableorder.table.TableRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class TableTokenFilter extends OncePerRequestFilter {

    private final TableRepository tableRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("X-Table-Token");
        if (token != null) {
            var table = tableRepository.findByAccessToken(token);
            if (table.isPresent()) {
                request.setAttribute("tableId", table.get().getId());
                request.setAttribute("tableNumber", table.get().getTableNumber());
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write("{\"code\":\"INVALID_TABLE_TOKEN\",\"message\":\"유효하지 않은 테이블 토큰입니다\"}");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
