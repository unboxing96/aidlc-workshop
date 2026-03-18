package com.tableorder.auth;

import com.tableorder.auth.dto.AdminLoginRequest;
import com.tableorder.auth.dto.AdminLoginResponse;
import com.tableorder.auth.dto.AdminRegisterRequest;
import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.config.JwtUtil;
import com.tableorder.entity.AdminEntity;
import com.tableorder.table.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminAuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final LoginAttemptService loginAttemptService;

    public MessageResponse register(AdminRegisterRequest request) {
        if (adminRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateException("이미 존재하는 사용자명입니다");
        }
        AdminEntity admin = AdminEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        adminRepository.save(admin);
        return new MessageResponse("회원가입이 완료되었습니다");
    }

    public AdminLoginResponse login(AdminLoginRequest request) {
        if (loginAttemptService.isBlocked(request.getUsername())) {
            throw new BusinessException("ACCOUNT_LOCKED", "로그인 시도 초과. 15분 후 재시도하세요");
        }
        AdminEntity admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    loginAttemptService.recordFailure(request.getUsername());
                    return new BusinessException("AUTH_FAILED", "사용자명 또는 비밀번호가 올바르지 않습니다");
                });
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            loginAttemptService.recordFailure(request.getUsername());
            throw new BusinessException("AUTH_FAILED", "사용자명 또는 비밀번호가 올바르지 않습니다");
        }
        loginAttemptService.resetAttempts(request.getUsername());
        return new AdminLoginResponse(jwtUtil.generateToken(admin.getUsername()));
    }
}
