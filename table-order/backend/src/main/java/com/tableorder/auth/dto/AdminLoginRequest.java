package com.tableorder.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class AdminLoginRequest {
    @NotBlank private String username;
    @NotBlank private String password;
}
