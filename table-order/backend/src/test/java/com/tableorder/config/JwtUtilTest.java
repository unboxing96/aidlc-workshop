package com.tableorder.config;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private final JwtUtil jwtUtil = new JwtUtil(
            "tableorder-jwt-secret-key-must-be-at-least-256-bits-long-for-hs256", 57600000);

    @Test
    void generateAndValidateToken() {
        String token = jwtUtil.generateToken("admin");
        assertTrue(jwtUtil.isValid(token));
        assertEquals("admin", jwtUtil.extractSubject(token));
    }

    @Test
    void invalidTokenReturnsFalse() {
        assertFalse(jwtUtil.isValid("invalid.token.here"));
    }
}
