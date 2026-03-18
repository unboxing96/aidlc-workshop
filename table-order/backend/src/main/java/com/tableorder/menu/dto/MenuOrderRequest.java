package com.tableorder.menu.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter @NoArgsConstructor
public class MenuOrderRequest {
    @NotEmpty private List<MenuOrderItem> items;

    @Getter @NoArgsConstructor @AllArgsConstructor
    public static class MenuOrderItem {
        private Long id;
        private int displayOrder;
    }
}
