package com.tableorder.auth;

import com.tableorder.auth.dto.AdminLoginRequest;
import com.tableorder.auth.dto.AdminLoginResponse;
import com.tableorder.auth.dto.AdminRegisterRequest;
import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.config.JwtUtil;
import com.tableorder.entity.AdminEntity;
import com.tableorder.table.dto.MessageResponse;
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

    @Test
    void 회원가입_성공() {
        when(adminRepository.existsByUsername("admin")).thenReturn(false);
        when(passwordEncoder.encode("1234")).thenReturn("encoded");
        when(adminRepository.save(any())).thenReturn(AdminEntity.builder().build());

        AdminRegisterRequest request = createRegisterRequest("admin", "1234");
        MessageResponse response = adminAuthService.register(request);

        assertThat(response.getMessage()).contains("완료");
        verify(adminRepository).save(any());
    }

    @Test
    void 회원가입_중복_사용자명() {
        when(adminRepository.existsByUsername("admin")).thenReturn(true);

        assertThatThrownBy(() -> adminAuthService.register(createRegisterRequest("admin", "1234")))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void 로그인_성공() {
        AdminEntity admin = AdminEntity.builder().username("admin").password("encoded").build();
        when(loginAttemptService.isBlocked("admin")).thenReturn(false);
        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("1234", "encoded")).thenReturn(true);
        when(jwtUtil.generateToken("admin")).thenReturn("jwt-token");

        AdminLoginResponse response = adminAuthService.login(createLoginRequest("admin", "1234"));

        assertThat(response.getToken()).isEqualTo("jwt-token");
        verify(loginAttemptService).resetAttempts("admin");
    }

    @Test
    void 로그인_비밀번호_불일치() {
        AdminEntity admin = AdminEntity.builder().username("admin").password("encoded").build();
        when(loginAttemptService.isBlocked("admin")).thenReturn(false);
        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("wrong", "encoded")).thenReturn(false);

        assertThatThrownBy(() -> adminAuthService.login(createLoginRequest("admin", "wrong")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("AUTH_FAILED");
        verify(loginAttemptService).recordFailure("admin");
    }

    @Test
    void 로그인_사용자_없음() {
        when(loginAttemptService.isBlocked("nouser")).thenReturn(false);
        when(adminRepository.findByUsername("nouser")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminAuthService.login(createLoginRequest("nouser", "1234")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("AUTH_FAILED");
    }

    @Test
    void 로그인_계정_잠금() {
        when(loginAttemptService.isBlocked("admin")).thenReturn(true);

        assertThatThrownBy(() -> adminAuthService.login(createLoginRequest("admin", "1234")))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("ACCOUNT_LOCKED");
    }

    // Helper: reflection으로 @Getter only DTO에 값 설정
    private AdminRegisterRequest createRegisterRequest(String username, String password) {
        try {
            AdminRegisterRequest req = new AdminRegisterRequest();
            var uf = AdminRegisterRequest.class.getDeclaredField("username"); uf.setAccessible(true); uf.set(req, username);
            var pf = AdminRegisterRequest.class.getDeclaredField("password"); pf.setAccessible(true); pf.set(req, password);
            return req;
        } catch (Exception e) { throw new RuntimeException(e); }
    }

    private AdminLoginRequest createLoginRequest(String username, String password) {
        try {
            AdminLoginRequest req = new AdminLoginRequest();
            var uf = AdminLoginRequest.class.getDeclaredField("username"); uf.setAccessible(true); uf.set(req, username);
            var pf = AdminLoginRequest.class.getDeclaredField("password"); pf.setAccessible(true); pf.set(req, password);
            return req;
        } catch (Exception e) { throw new RuntimeException(e); }
    }
}
