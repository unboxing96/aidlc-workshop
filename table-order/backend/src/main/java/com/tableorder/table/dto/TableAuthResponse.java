package com.tableorder.table.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class TableAuthResponse {
    private Long tableId;
    private int tableNumber;
}
