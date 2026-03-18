package com.tableorder.menu.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class CreateCategoryRequest {
    @NotBlank private String name;
}
