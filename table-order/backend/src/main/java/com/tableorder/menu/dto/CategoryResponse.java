package com.tableorder.menu.dto;

import com.tableorder.entity.CategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private int displayOrder;

    public static CategoryResponse from(CategoryEntity e) {
        return new CategoryResponse(e.getId(), e.getName(), e.getDisplayOrder());
    }
}
