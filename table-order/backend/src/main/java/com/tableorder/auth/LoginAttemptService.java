package com.tableorder.auth;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCK_MINUTES = 15;

    private final ConcurrentHashMap<String, LoginAttempt> attempts = new ConcurrentHashMap<>();

    public boolean isBlocked(String username) {
        LoginAttempt attempt = attempts.get(username);
        if (attempt == null || attempt.count < MAX_ATTEMPTS) return false;
        if (attempt.lastFailure.plusMinutes(LOCK_MINUTES).isBefore(LocalDateTime.now())) {
            attempts.remove(username);
            return false;
        }
        return true;
    }

    public void recordFailure(String username) {
        attempts.compute(username, (k, v) -> v == null
                ? new LoginAttempt(1, LocalDateTime.now())
                : new LoginAttempt(v.count + 1, LocalDateTime.now()));
    }

    public void resetAttempts(String username) {
        attempts.remove(username);
    }

    private record LoginAttempt(int count, LocalDateTime lastFailure) {}
}
