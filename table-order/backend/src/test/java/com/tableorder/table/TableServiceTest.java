package com.tableorder.table;

import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.OrderEntity;
import com.tableorder.entity.OrderStatus;
import com.tableorder.entity.TableEntity;
import com.tableorder.order.OrderRepository;
import com.tableorder.table.dto.*;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Test
    void 테이블_생성_성공() {
        when(tableRepository.existsByTableNumber(1)).thenReturn(false);
        when(tableRepository.save(any())).thenAnswer(inv -> {
            TableEntity t = inv.getArgument(0);
            t.setId(1L);
            t.setCreatedAt(LocalDateTime.now());
            return t;
        });

        TableResponse response = tableService.createTable(createTableRequest(1));
        assertThat(response.getTableNumber()).isEqualTo(1);
        assertThat(response.getAccessToken()).isNotBlank();
    }

    @Test
    void 테이블_생성_중복() {
        when(tableRepository.existsByTableNumber(1)).thenReturn(true);
        assertThatThrownBy(() -> tableService.createTable(createTableRequest(1)))
                .isInstanceOf(DuplicateException.class);
    }

    @Test
    void 토큰_인증_성공() {
        TableEntity table = TableEntity.builder().id(1L).tableNumber(5).accessToken("token-123").build();
        when(tableRepository.findByAccessToken("token-123")).thenReturn(Optional.of(table));

        TableAuthResponse response = tableService.authenticateByToken(createAuthRequest("token-123"));
        assertThat(response.getTableId()).isEqualTo(1L);
        assertThat(response.getTableNumber()).isEqualTo(5);
    }

    @Test
    void 토큰_인증_실패() {
        when(tableRepository.findByAccessToken("invalid")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> tableService.authenticateByToken(createAuthRequest("invalid")))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void 이용완료_성공() {
        TableEntity table = TableEntity.builder().id(1L).tableNumber(1).currentSessionId("session-1").build();
        OrderEntity order = OrderEntity.builder().id(1L).orderNumber("ORD-1").tableId(1L).sessionId("session-1")
                .totalAmount(10000).status(OrderStatus.PENDING).createdAt(LocalDateTime.now())
                .items(List.of()).build();

        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(orderRepository.findByTableIdAndSessionId(1L, "session-1")).thenReturn(List.of(order));

        MessageResponse response = tableService.completeTableSession(1L);

        assertThat(response.getMessage()).contains("완료");
        assertThat(order.getStatus()).isEqualTo(OrderStatus.COMPLETED);
        assertThat(table.getCurrentSessionId()).isNull();
        verify(orderHistoryRepository).save(any());
        verify(orderRepository).deleteByTableIdAndSessionId(1L, "session-1");
    }

    @Test
    void 이용완료_활성세션_없음() {
        TableEntity table = TableEntity.builder().id(1L).currentSessionId(null).build();
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));

        assertThatThrownBy(() -> tableService.completeTableSession(1L))
                .isInstanceOf(BusinessException.class)
                .extracting("code").isEqualTo("NO_ACTIVE_SESSION");
    }

    @Test
    void 이용완료_테이블_없음() {
        when(tableRepository.findById(99L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> tableService.completeTableSession(99L))
                .isInstanceOf(NotFoundException.class);
    }

    private CreateTableRequest createTableRequest(int tableNumber) {
        try {
            CreateTableRequest req = new CreateTableRequest();
            var f = CreateTableRequest.class.getDeclaredField("tableNumber"); f.setAccessible(true); f.set(req, tableNumber);
            return req;
        } catch (Exception e) { throw new RuntimeException(e); }
    }

    private TableAuthRequest createAuthRequest(String token) {
        try {
            TableAuthRequest req = new TableAuthRequest();
            var f = TableAuthRequest.class.getDeclaredField("accessToken"); f.setAccessible(true); f.set(req, token);
            return req;
        } catch (Exception e) { throw new RuntimeException(e); }
    }
}
