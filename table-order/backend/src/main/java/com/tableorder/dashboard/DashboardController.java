package com.tableorder.dashboard;

import com.tableorder.dashboard.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<List<DashboardTableCard>> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboard());
    }

    @GetMapping("/tables/{tableId}/orders")
    public ResponseEntity<List<OrderDetailResponse>> getTableOrders(@PathVariable Long tableId) {
        return ResponseEntity.ok(dashboardService.getTableOrders(tableId));
    }

    @PatchMapping("/orders/{orderId}/status")
    public ResponseEntity<Void> changeOrderStatus(
            @PathVariable Long orderId,
            @RequestBody StatusChangeRequest request) {
        dashboardService.changeOrderStatus(orderId, request.getStatus());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        dashboardService.deleteOrder(orderId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tables/{tableId}/complete")
    public ResponseEntity<Void> completeTableSession(@PathVariable Long tableId) {
        dashboardService.completeTableSession(tableId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tables/{tableId}/history")
    public ResponseEntity<List<OrderHistoryResponse>> getOrderHistory(
            @PathVariable Long tableId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(dashboardService.getOrderHistory(tableId, startDate, endDate));
    }
}
