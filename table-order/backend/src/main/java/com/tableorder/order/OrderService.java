package com.tableorder.order;

import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.*;
import com.tableorder.menu.MenuRepository;
import com.tableorder.order.dto.*;
import com.tableorder.table.TableRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final TableRepository tableRepository;
    private final MenuRepository menuRepository;

    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request) {
        TableEntity table = tableRepository.findById(request.getTableId())
                .orElseThrow(() -> new NotFoundException("테이블을 찾을 수 없습니다"));

        // 세션 자동 시작
        if (table.getCurrentSessionId() == null) {
            table.setCurrentSessionId(UUID.randomUUID().toString());
            tableRepository.save(table);
        }

        // 주문 항목 스냅샷 생성 + totalAmount 서버 재계산
        List<OrderItemEntity> items = request.getItems().stream().map(itemReq -> {
            MenuEntity menu = menuRepository.findById(itemReq.getMenuId())
                    .orElseThrow(() -> new NotFoundException("메뉴를 찾을 수 없습니다"));
            return OrderItemEntity.builder()
                    .menuName(menu.getName())
                    .unitPrice(menu.getPrice())
                    .quantity(itemReq.getQuantity())
                    .build();
        }).toList();

        int totalAmount = items.stream().mapToInt(i -> i.getUnitPrice() * i.getQuantity()).sum();

        OrderEntity order = OrderEntity.builder()
                .orderNumber(generateOrderNumber())
                .tableId(table.getId())
                .sessionId(table.getCurrentSessionId())
                .totalAmount(totalAmount)
                .status(OrderStatus.PENDING)
                .build();

        OrderEntity saved = orderRepository.save(order);

        // OrderItem에 orderId 설정 후 저장
        List<OrderItemEntity> savedItems = items.stream().map(item -> {
            item.setOrderId(saved.getId());
            return orderItemRepository.save(item);
        }).toList();

        saved.setItems(new java.util.ArrayList<>(savedItems));

        return OrderResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> getOrdersByTable(Long tableId, int page, int size) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new NotFoundException("테이블을 찾을 수 없습니다"));

        if (table.getCurrentSessionId() == null) {
            return Page.empty();
        }

        return orderRepository.findByTableIdAndSessionIdOrderByCreatedAtAsc(
                tableId, table.getCurrentSessionId(), PageRequest.of(page, Math.min(size, 50))
        ).map(OrderResponse::from);
    }

    private String generateOrderNumber() {
        String datePrefix = "ORD-" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")) + "-";
        long count = orderRepository.countByOrderNumberStartingWith(datePrefix);
        return datePrefix + String.format("%04d", count + 1);
    }
}
