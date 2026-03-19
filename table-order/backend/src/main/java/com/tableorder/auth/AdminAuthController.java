package com.tableorder.auth;

import com.tableorder.auth.dto.AdminLoginRequest;
import com.tableorder.auth.dto.AdminLoginResponse;
import com.tableorder.auth.dto.AdminRegisterRequest;
import com.tableorder.table.dto.MessageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthService adminAuthService;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody AdminRegisterRequest request) {
        adminAuthService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        return ResponseEntity.ok(adminAuthService.login(request));
    }
}
