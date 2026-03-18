package com.tableorder.order.dto;

import com.tableorder.entity.OrderEntity;
import com.tableorder.entity.OrderItemEntity;
import lombok.*;
import java.util.List;

@Getter @Builder @AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private Long tableId;
    private String sessionId;
    private int totalAmount;
    private String status;
    private List<OrderItemResponse> items;
    private String createdAt;

    public static OrderResponse from(OrderEntity order) {
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .tableId(order.getTableId())
                .sessionId(order.getSessionId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(order.getItems().stream().map(OrderItemResponse::from).toList())
                .createdAt(order.getCreatedAt().toString())
                .build();
    }
}
