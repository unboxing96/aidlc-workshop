package com.tableorder.dashboard.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter @AllArgsConstructor @Builder
public class OrderHistoryResponse {
    private Long id;
    private String orderNumber;
    private int tableNumber;
    private String sessionId;
    private int totalAmount;
    private String items;
    private LocalDateTime orderedAt;
    private LocalDateTime completedAt;
}
