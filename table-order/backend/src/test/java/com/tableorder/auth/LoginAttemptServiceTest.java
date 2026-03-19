package com.tableorder.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class LoginAttemptServiceTest {

    private LoginAttemptService service;

    @BeforeEach
    void setUp() {
        service = new LoginAttemptService();
    }

    @Test
    void 실패_기록_없으면_차단_아님() {
        assertThat(service.isBlocked("user")).isFalse();
    }

    @Test
    void 실패_4회_차단_아님() {
        for (int i = 0; i < 4; i++) service.recordFailure("user");
        assertThat(service.isBlocked("user")).isFalse();
    }

    @Test
    void 실패_5회_차단() {
        for (int i = 0; i < 5; i++) service.recordFailure("user");
        assertThat(service.isBlocked("user")).isTrue();
    }

    @Test
    void 리셋_후_차단_해제() {
        for (int i = 0; i < 5; i++) service.recordFailure("user");
        service.resetAttempts("user");
        assertThat(service.isBlocked("user")).isFalse();
    }
}
