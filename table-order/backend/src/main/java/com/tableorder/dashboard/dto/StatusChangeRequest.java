package com.tableorder.dashboard.dto;

import com.tableorder.entity.OrderStatus;
import lombok.*;

@Getter @NoArgsConstructor @AllArgsConstructor
public class StatusChangeRequest {
    private OrderStatus status;
}
