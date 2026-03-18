package com.tableorder.menu.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class UpdateMenuRequest {
    private String name;
    private Integer price;
    private String description;
    private String imageUrl;
    private Long categoryId;
}
