package com.tableorder.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.List;

@Getter @NoArgsConstructor @AllArgsConstructor
public class OrderCreateRequest {
    @NotNull private Long tableId;
    @NotNull @Size(min = 1, message = "주문 항목이 비어있습니다")
    @Valid
    private List<OrderItemRequest> items;
}
