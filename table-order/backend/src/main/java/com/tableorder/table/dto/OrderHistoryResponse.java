package com.tableorder.table.dto;

import com.tableorder.entity.OrderHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class OrderHistoryResponse {
    private Long id;
    private String orderNumber;
    private int tableNumber;
    private String sessionId;
    private int totalAmount;
    private String items;
    private String orderedAt;
    private String completedAt;

    public static OrderHistoryResponse from(OrderHistoryEntity entity) {
        return new OrderHistoryResponse(
                entity.getId(),
                entity.getOrderNumber(),
                entity.getTableNumber(),
                entity.getSessionId(),
                entity.getTotalAmount(),
                entity.getItems(),
                entity.getOrderedAt().toString(),
                entity.getCompletedAt().toString()
        );
    }
}
