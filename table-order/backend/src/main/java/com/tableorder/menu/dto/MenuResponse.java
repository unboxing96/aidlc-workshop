package com.tableorder.menu.dto;

import com.tableorder.entity.MenuEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class MenuResponse {
    private Long id;
    private String name;
    private int price;
    private String description;
    private String imageUrl;
    private Long categoryId;
    private int displayOrder;

    public static MenuResponse from(MenuEntity e) {
        return new MenuResponse(e.getId(), e.getName(), e.getPrice(), e.getDescription(),
                e.getImageUrl(), e.getCategoryId(), e.getDisplayOrder());
    }
}
