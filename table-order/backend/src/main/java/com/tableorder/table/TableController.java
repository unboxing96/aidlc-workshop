package com.tableorder.table;

import com.tableorder.table.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class TableController {

    private final TableService tableService;

    @PostMapping
    public ResponseEntity<TableResponse> createTable(@Valid @RequestBody CreateTableRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tableService.createTable(request));
    }

    @GetMapping
    public ResponseEntity<List<TableResponse>> getAllTables() {
        return ResponseEntity.ok(tableService.getAllTables());
    }

    @PostMapping("/auth")
    public ResponseEntity<TableAuthResponse> authenticate(@Valid @RequestBody TableAuthRequest request) {
        return ResponseEntity.ok(tableService.authenticateByToken(request.getAccessToken()));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<MessageResponse> completeSession(@PathVariable Long id) {
        tableService.completeTableSession(id);
        return ResponseEntity.ok(new MessageResponse("이용 완료 처리되었습니다"));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<OrderHistoryResponse>> getOrderHistory(@PathVariable Long id) {
        return ResponseEntity.ok(tableService.getOrderHistory(id));
    }
}
