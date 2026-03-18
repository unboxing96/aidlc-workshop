package com.tableorder.order;

import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.*;
import com.tableorder.menu.MenuRepository;
import com.tableorder.order.dto.*;
import com.tableorder.table.TableRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private OrderItemRepository orderItemRepository;
    @Mock private TableRepository tableRepository;
    @Mock private MenuRepository menuRepository;
    @InjectMocks private OrderService orderService;

    private TableEntity table;
    private MenuEntity menu;

    @BeforeEach
    void setUp() {
        table = TableEntity.builder()
                .id(1L).tableNumber(1).accessToken("token-1").currentSessionId(null)
                .createdAt(LocalDateTime.now()).build();
        menu = MenuEntity.builder()
                .id(1L).name("치킨").price(18000).categoryId(1L).displayOrder(0)
                .createdAt(LocalDateTime.now()).build();
    }

    @Test
    void createOrder_성공_세션자동시작() {
        // given
        OrderCreateRequest request = new OrderCreateRequest(1L, List.of(new OrderItemRequest(1L, 2)));
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(menuRepository.findById(1L)).thenReturn(Optional.of(menu));
        when(orderRepository.countByOrderNumberStartingWith(anyString())).thenReturn(0L);
        when(orderRepository.save(any(OrderEntity.class))).thenAnswer(inv -> {
            OrderEntity o = inv.getArgument(0);
            o.setId(1L);
            o.setCreatedAt(LocalDateTime.now());
            return o;
        });
        when(orderItemRepository.save(any(OrderItemEntity.class))).thenAnswer(inv -> {
            OrderItemEntity i = inv.getArgument(0);
            i.setId(1L);
            return i;
        });

        // when
        OrderResponse response = orderService.createOrder(request);

        // then
        assertThat(response.getTotalAmount()).isEqualTo(36000); // 18000 * 2
        assertThat(response.getStatus()).isEqualTo("PENDING");
        assertThat(response.getItems()).hasSize(1);
        assertThat(table.getCurrentSessionId()).isNotNull(); // 세션 자동 시작
        verify(tableRepository).save(table);
    }

    @Test
    void createOrder_존재하지않는테이블() {
        OrderCreateRequest request = new OrderCreateRequest(999L, List.of(new OrderItemRequest(1L, 1)));
        when(tableRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("테이블을 찾을 수 없습니다");
    }

    @Test
    void createOrder_존재하지않는메뉴() {
        OrderCreateRequest request = new OrderCreateRequest(1L, List.of(new OrderItemRequest(999L, 1)));
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(menuRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.createOrder(request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("메뉴를 찾을 수 없습니다");
    }

    @Test
    void getOrdersByTable_세션없으면빈결과() {
        when(tableRepository.findById(1L)).thenReturn(Optional.of(table)); // currentSessionId == null

        Page<OrderResponse> result = orderService.getOrdersByTable(1L, 0, 50);

        assertThat(result.getContent()).isEmpty();
    }

    @Test
    void getOrdersByTable_성공() {
        table.setCurrentSessionId("session-1");
        OrderEntity order = OrderEntity.builder()
                .id(1L).orderNumber("ORD-20260318-0001").tableId(1L).sessionId("session-1")
                .totalAmount(18000).status(OrderStatus.PENDING).createdAt(LocalDateTime.now())
                .items(new ArrayList<>()).build();

        when(tableRepository.findById(1L)).thenReturn(Optional.of(table));
        when(orderRepository.findByTableIdAndSessionIdOrderByCreatedAtAsc(eq(1L), eq("session-1"), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(order)));

        Page<OrderResponse> result = orderService.getOrdersByTable(1L, 0, 50);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getOrderNumber()).isEqualTo("ORD-20260318-0001");
    }
}
