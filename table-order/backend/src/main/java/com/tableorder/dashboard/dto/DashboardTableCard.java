package com.tableorder.dashboard.dto;

import lombok.*;
import java.util.List;

@Getter @AllArgsConstructor @Builder
public class DashboardTableCard {
    private Long tableId;
    private int tableNumber;
    private String currentSessionId;
    private int totalAmount;
    private int orderCount;
    private List<OrderSummary> recentOrders;
    private boolean hasNewOrder;
}
