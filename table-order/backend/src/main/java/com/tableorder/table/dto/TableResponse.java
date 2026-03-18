package com.tableorder.table.dto;

import com.tableorder.entity.TableEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public class TableResponse {
    private Long id;
    private int tableNumber;
    private String accessToken;
    private String currentSessionId;
    private String createdAt;

    public static TableResponse from(TableEntity e) {
        return new TableResponse(e.getId(), e.getTableNumber(), e.getAccessToken(),
                e.getCurrentSessionId(), e.getCreatedAt().toString());
    }
}
