package com.tableorder.dashboard.dto;

import com.tableorder.entity.OrderStatus;
import lombok.*;
import java.time.LocalDateTime;

@Getter @AllArgsConstructor @Builder
public class OrderSummary {
    private Long orderId;
    private String orderNumber;
    private int totalAmount;
    private OrderStatus status;
    private String itemSummary;
    private LocalDateTime createdAt;
}
