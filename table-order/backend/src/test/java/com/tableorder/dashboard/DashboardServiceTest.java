package com.tableorder.dashboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.InvalidStatusTransitionException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private TableRepository tableRepository;
    @Mock private OrderHistoryRepository orderHistoryRepository;
    @Spy private ObjectMapper objectMapper = new ObjectMapper();
    @InjectMocks private DashboardService dashboardService;

    private TableEntity table;
    private OrderEntity order;
    private OrderItemEntity item;

    @BeforeEach
    void setUp() {
        table = TableEntity.builder()
                .id(1L).tableNumber(1).accessToken("token1").currentSessionId("session1")
                .createdAt(LocalDateTime.now()).build();

        item = OrderItemEntity.builder()
                .id(1L).orderId(1L).menuName("김치찌개").quantity(1).unitPrice(9000).build();

        order = OrderEntity.builder()
                .id(1L).orderNumber("ORD-001").tableId(1L).sessionId("session1")
                .totalAmount(9000).status(OrderStatus.PENDING).createdAt(LocalDateTime.now())
                .items(List.of(item)).build();
    }

    @Test
    void getDashboard_returnsTableCards() {
        when(tableRepository.findAllByOrderByTableNumberAsc()).thenReturn(List.of(table));
        when(orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(1L, "session1"))
                .thenReturn(List.of(order));

        var result = dashboardService.getDashboard();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTableNumber()).isEqualTo(1);
        assertThat(result.get(0).getTotalAmount()).isEqualTo(9000);
        assertThat(result.get(0).getRecentOrders()).hasSize(1);
    }

    @Test
    void changeOrderStatus_success() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        dashboardService.changeOrderStatus(1L, OrderStatus.PREPARING);

        assertThat(order.getStatus()).isEqualTo(OrderStatus.PREPARING);
        verify(orderRepository).save(order);
    }

    @Test
    void changeOrderStatus_sameStatus_throws() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        assertThatThrownBy(() -> dashboardService.changeOrderStatus(1L, OrderStatus.PENDING))
                .isInstanceOf(InvalidStatusTransitionException.class);
    }

    @Test
    void changeOrderStatus_notFound_throws() {
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> dashboardService.changeOrderStatus(99L, OrderStatus.PREPARING))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void deleteOrder_success() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        dashboardService.deleteOrder(1L);

        verify(orderRepository).delete(order);
    }

    @Test
    void completeTableSession_success() {
        order.setStatus(OrderStatus.COMPLETED);
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(1L, "session1"))
                .thenReturn(List.of(order));

        dashboardService.completeTableSession(1L);

        verify(orderHistoryRepository).save(any(OrderHistoryEntity.class));
        verify(orderRepository).deleteAll(List.of(order));
        assertThat(table.getCurrentSessionId()).isNull();
    }

    @Test
    void completeTableSession_incompleteOrders_throws() {
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(1L, "session1"))
                .thenReturn(List.of(order));

        assertThatThrownBy(() -> dashboardService.completeTableSession(1L))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("미완료 주문");
    }

    @Test
    void completeTableSession_noSession_throws() {
        table.setCurrentSessionId(null);
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));

        assertThatThrownBy(() -> dashboardService.completeTableSession(1L))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("활성 세션");
    }
}
