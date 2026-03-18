package com.tableorder.order.dto;

import com.tableorder.entity.OrderItemEntity;
import lombok.*;

@Getter @Builder @AllArgsConstructor
public class OrderItemResponse {
    private Long id;
    private String menuName;
    private int quantity;
    private int unitPrice;

    public static OrderItemResponse from(OrderItemEntity item) {
        return OrderItemResponse.builder()
                .id(item.getId())
                .menuName(item.getMenuName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .build();
    }
}
