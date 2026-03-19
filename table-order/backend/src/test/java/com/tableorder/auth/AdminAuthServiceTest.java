package com.tableorder.auth;

import com.tableorder.auth.dto.AdminLoginRequest;
import com.tableorder.auth.dto.AdminLoginResponse;
import com.tableorder.auth.dto.AdminRegisterRequest;
import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.config.JwtUtil;
import com.tableorder.entity.AdminEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminAuthServiceTest {

    @Mock private AdminRepository adminRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtUtil jwtUtil;
    @Mock private LoginAttemptService loginAttemptService;
    @InjectMocks private AdminAuthService adminAuthService;

    private AdminEntity admin;

    @BeforeEach
    void setUp() {
        admin = AdminEntity.builder().id(1L).username("admin").password("encoded").build();
    }

    @Test
    void register_성공() {
        when(adminRepository.existsByUsername("newuser")).thenReturn(false);
        when(passwordEncoder.encode("pass1234")).thenReturn("encoded");

        adminAuthService.register(new AdminRegisterRequest("newuser", "pass1234"));

        verify(adminRepository).save(any(AdminEntity.class));
    }

    @Test
    void register_중복_사용자명() {
        when(adminRepository.existsByUsername("admin")).thenReturn(true);

        assertThatThrownBy(() -> adminAuthService.register(new AdminRegisterRequest("admin", "pass1234")))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void login_성공() {
        when(loginAttemptService.isBlocked("admin")).thenReturn(false);
        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("pass1234", "encoded")).thenReturn(true);
        when(jwtUtil.generateToken("admin")).thenReturn("jwt-token");

        AdminLoginResponse response = adminAuthService.login(new AdminLoginRequest("admin", "pass1234"));

        assertThat(response.getToken()).isEqualTo("jwt-token");
        verify(loginAttemptService).resetAttempts("admin");
    }

    @Test
    void login_비밀번호_불일치() {
        when(loginAttemptService.isBlocked("admin")).thenReturn(false);
        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        assertThatThrownBy(() -> adminAuthService.login(new AdminLoginRequest("admin", "wrong")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("AUTH_FAILED");
        verify(loginAttemptService).recordFailure("admin");
    }

    @Test
    void login_사용자_없음() {
        when(loginAttemptService.isBlocked("unknown")).thenReturn(false);
        when(adminRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminAuthService.login(new AdminLoginRequest("unknown", "pass")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("AUTH_FAILED");
        verify(loginAttemptService).recordFailure("unknown");
    }

    @Test
    void login_계정_잠금() {
        when(loginAttemptService.isBlocked("admin")).thenReturn(true);

        assertThatThrownBy(() -> adminAuthService.login(new AdminLoginRequest("admin", "pass")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("ACCOUNT_LOCKED");
    }
}
