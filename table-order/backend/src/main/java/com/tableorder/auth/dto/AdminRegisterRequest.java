package com.tableorder.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class AdminRegisterRequest {
    @NotBlank private String username;
    @NotBlank @Size(min = 4) private String password;
}
