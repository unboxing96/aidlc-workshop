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

    public static OrderHistoryResponse from(OrderHistoryEntity e) {
        return new OrderHistoryResponse(e.getId(), e.getOrderNumber(), e.getTableNumber(),
                e.getSessionId(), e.getTotalAmount(), e.getItems(),
                e.getOrderedAt().toString(), e.getCompletedAt().toString());
    }
}
