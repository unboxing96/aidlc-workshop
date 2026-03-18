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
    void 실패_기록_없으면_차단되지_않음() {
        assertThat(service.isBlocked("user1")).isFalse();
    }

    @Test
    void 실패_4회까지는_차단되지_않음() {
        for (int i = 0; i < 4; i++) service.recordFailure("user1");
        assertThat(service.isBlocked("user1")).isFalse();
    }

    @Test
    void 실패_5회_이상이면_차단() {
        for (int i = 0; i < 5; i++) service.recordFailure("user1");
        assertThat(service.isBlocked("user1")).isTrue();
    }

    @Test
    void 리셋_후_차단_해제() {
        for (int i = 0; i < 5; i++) service.recordFailure("user1");
        service.resetAttempts("user1");
        assertThat(service.isBlocked("user1")).isFalse();
    }

    @Test
    void 다른_사용자는_영향_없음() {
        for (int i = 0; i < 5; i++) service.recordFailure("user1");
        assertThat(service.isBlocked("user2")).isFalse();
    }
}
