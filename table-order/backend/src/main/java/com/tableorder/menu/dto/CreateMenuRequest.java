package com.tableorder.menu.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class CreateMenuRequest {
    @NotBlank private String name;
    @Min(0) private int price;
    private String description;
    private String imageUrl;
    @NotNull private Long categoryId;
}
