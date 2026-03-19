package com.tableorder.table;

import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.*;
import com.tableorder.table.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
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
class TableServiceTest {

    @Mock private TableRepository tableRepository;
    @Mock private OrderRepository orderRepository;
    @Mock private OrderHistoryRepository orderHistoryRepository;
    @Spy private ObjectMapper objectMapper = new ObjectMapper();
    @InjectMocks private TableService tableService;

    private TableEntity table;

    @BeforeEach
    void setUp() {
        table = TableEntity.builder()
                .id(1L).tableNumber(1).accessToken("token-123").currentSessionId("session-1")
                .build();
        table.setCreatedAt(LocalDateTime.now());
    }

    @Test
    void createTable_성공() {
        when(tableRepository.existsByTableNumber(1)).thenReturn(false);
        TableEntity saved = TableEntity.builder().id(1L).tableNumber(1).accessToken("uuid").build();
        saved.setCreatedAt(LocalDateTime.now());
        when(tableRepository.save(any())).thenReturn(saved);

        TableResponse response = tableService.createTable(new CreateTableRequest(1));

        assertThat(response.getTableNumber()).isEqualTo(1);
    }

    @Test
    void createTable_중복() {
        when(tableRepository.existsByTableNumber(1)).thenReturn(true);

        assertThatThrownBy(() -> tableService.createTable(new CreateTableRequest(1)))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void authenticateByToken_성공() {
        when(tableRepository.findByAccessToken("token-123")).thenReturn(Optional.of(table));

        TableAuthResponse response = tableService.authenticateByToken("token-123");

        assertThat(response.getTableId()).isEqualTo(1L);
        assertThat(response.getTableNumber()).isEqualTo(1);
    }

    @Test
    void authenticateByToken_실패() {
        when(tableRepository.findByAccessToken("invalid")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tableService.authenticateByToken("invalid"))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void completeTableSession_성공() {
        OrderEntity order = OrderEntity.builder()
                .id(1L).orderNumber("ORD-001").tableId(1L).sessionId("session-1")
                .totalAmount(10000).status(OrderStatus.PENDING).build();
        order.setCreatedAt(LocalDateTime.now());

        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(orderRepository.findByTableIdAndSessionId(1L, "session-1")).thenReturn(List.of(order));

        tableService.completeTableSession(1L);

        verify(orderHistoryRepository).save(any(OrderHistoryEntity.class));
        verify(orderRepository).deleteByTableIdAndSessionId(1L, "session-1");
        assertThat(table.getCurrentSessionId()).isNull();
    }

    @Test
    void completeTableSession_세션없음() {
        table.setCurrentSessionId(null);
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));

        assertThatThrownBy(() -> tableService.completeTableSession(1L))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("NO_ACTIVE_SESSION");
    }
}
