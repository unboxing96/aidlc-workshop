package com.tableorder.dashboard;

import com.tableorder.dashboard.dto.*;
import com.tableorder.entity.OrderStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardControllerTest {

    @Mock private DashboardService dashboardService;
    @InjectMocks private DashboardController dashboardController;

    @Test
    void getDashboard_returns200() {
        when(dashboardService.getDashboard()).thenReturn(List.of());
        ResponseEntity<List<DashboardTableCard>> response = dashboardController.getDashboard();
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }

    @Test
    void getTableOrders_returns200() {
        when(dashboardService.getTableOrders(1L)).thenReturn(List.of());
        ResponseEntity<List<OrderDetailResponse>> response = dashboardController.getTableOrders(1L);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }

    @Test
    void changeOrderStatus_returns200() {
        ResponseEntity<Void> response = dashboardController.changeOrderStatus(1L, new StatusChangeRequest(OrderStatus.PREPARING));
        verify(dashboardService).changeOrderStatus(1L, OrderStatus.PREPARING);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }

    @Test
    void deleteOrder_returns200() {
        ResponseEntity<Void> response = dashboardController.deleteOrder(1L);
        verify(dashboardService).deleteOrder(1L);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }

    @Test
    void completeTableSession_returns200() {
        ResponseEntity<Void> response = dashboardController.completeTableSession(1L);
        verify(dashboardService).completeTableSession(1L);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }

    @Test
    void getOrderHistory_returns200() {
        when(dashboardService.getOrderHistory(eq(1L), any(), any())).thenReturn(List.of());
        ResponseEntity<List<OrderHistoryResponse>> response = dashboardController.getOrderHistory(1L, null, null);
        assertThat(response.getStatusCode().value()).isEqualTo(200);
    }
}
