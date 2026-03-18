package com.tableorder.table.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor
public class CreateTableRequest {
    @Min(1) private int tableNumber;
}
