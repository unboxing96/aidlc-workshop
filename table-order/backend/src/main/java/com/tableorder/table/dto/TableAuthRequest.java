package com.tableorder.table.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class TableAuthRequest {
    @NotBlank private String accessToken;
}
