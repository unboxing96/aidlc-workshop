package com.tableorder.dashboard.dto;

import com.tableorder.entity.OrderStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @AllArgsConstructor @Builder
public class OrderDetailResponse {
    private Long orderId;
    private String orderNumber;
    private int tableNumber;
    private int totalAmount;
    private OrderStatus status;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;
}
