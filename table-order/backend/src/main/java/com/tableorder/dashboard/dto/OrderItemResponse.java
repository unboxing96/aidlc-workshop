package com.tableorder.dashboard.dto;

import lombok.*;

@Getter @AllArgsConstructor @Builder
public class OrderItemResponse {
    private String menuName;
    private int quantity;
    private int unitPrice;
}
