package com.tableorder.table.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter @NoArgsConstructor @AllArgsConstructor
public class CreateTableRequest {
    @Min(1)
    private int tableNumber;
}
