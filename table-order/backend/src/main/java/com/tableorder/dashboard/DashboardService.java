package com.tableorder.dashboard;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.InvalidStatusTransitionException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.dashboard.dto.*;
import com.tableorder.entity.*;
import com.tableorder.order.OrderRepository;
import com.tableorder.table.OrderHistoryRepository;
import com.tableorder.table.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    // TODO: [통합] Unit 3의 OrderRepository로 교체 (com.tableorder.order.OrderRepository)
    private final OrderRepository orderRepository;
    // TODO: [통합] Unit 1의 TableRepository로 교체 (com.tableorder.table.TableRepository)
    private final TableRepository tableRepository;
    private final OrderHistoryRepository orderHistoryRepository;
    private final ObjectMapper objectMapper;

    public List<DashboardTableCard> getDashboard() {
        return tableRepository.findAllByOrderByTableNumberAsc().stream()
                .map(this::toTableCard)
                .collect(Collectors.toList());
    }

    private DashboardTableCard toTableCard(TableEntity table) {
        List<OrderEntity> orders = table.getCurrentSessionId() != null
                ? orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(table.getId(), table.getCurrentSessionId())
                : List.of();

        int totalAmount = orders.stream().mapToInt(OrderEntity::getTotalAmount).sum();

        List<OrderSummary> recentOrders = orders.stream()
                .limit(5)
                .map(this::toOrderSummary)
                .collect(Collectors.toList());

        return DashboardTableCard.builder()
                .tableId(table.getId())
                .tableNumber(table.getTableNumber())
                .currentSessionId(table.getCurrentSessionId())
                .totalAmount(totalAmount)
                .orderCount(orders.size())
                .recentOrders(recentOrders)
                .hasNewOrder(false)
                .build();
    }

    private OrderSummary toOrderSummary(OrderEntity order) {
        List<OrderItemEntity> items = order.getItems();
        String itemSummary = items.isEmpty() ? ""
                : items.size() == 1 ? items.get(0).getMenuName()
                : items.get(0).getMenuName() + " 외 " + (items.size() - 1) + "건";

        return OrderSummary.builder()
                .orderId(order.getId())
                .orderNumber(order.getOrderNumber())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .itemSummary(itemSummary)
                .createdAt(order.getCreatedAt())
                .build();
    }

    public List<OrderDetailResponse> getTableOrders(Long tableId) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new NotFoundException("테이블을 찾을 수 없습니다."));

        if (table.getCurrentSessionId() == null) return List.of();

        return orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(tableId, table.getCurrentSessionId())
                .stream()
                .map(order -> OrderDetailResponse.builder()
                        .orderId(order.getId())
                        .orderNumber(order.getOrderNumber())
                        .tableNumber(table.getTableNumber())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus())
                        .items(order.getItems().stream()
                                .map(item -> OrderItemResponse.builder()
                                        .menuName(item.getMenuName())
                                        .quantity(item.getQuantity())
                                        .unitPrice(item.getUnitPrice())
                                        .build())
                                .collect(Collectors.toList()))
                        .createdAt(order.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void changeOrderStatus(Long orderId, OrderStatus newStatus) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("주문을 찾을 수 없습니다."));

        if (order.getStatus() == newStatus) {
            throw new InvalidStatusTransitionException("동일한 상태로 변경할 수 없습니다.");
        }

        order.setStatus(newStatus);
        orderRepository.save(order);
        // TODO: [통합] Unit 4의 SseEmitterService.broadcast(SseEvent.of(ORDER_STATUS_CHANGED, order)) 연결
    }

    @Transactional
    public void deleteOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("주문을 찾을 수 없습니다."));

        orderRepository.delete(order);
        // TODO: [통합] Unit 4의 SseEmitterService.broadcast(SseEvent.of(ORDER_DELETED, orderId)) 연결
    }

    @Transactional
    public void completeTableSession(Long tableId) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new NotFoundException("테이블을 찾을 수 없습니다."));

        if (table.getCurrentSessionId() == null) {
            throw new BusinessException("NO_ACTIVE_SESSION", "활성 세션이 없습니다.");
        }

        List<OrderEntity> orders = orderRepository.findByTableIdAndSessionIdOrderByCreatedAtDesc(tableId, table.getCurrentSessionId());

        long incompleteCount = orders.stream()
                .filter(o -> o.getStatus() != OrderStatus.COMPLETED)
                .count();

        if (incompleteCount > 0) {
            throw new BusinessException("INCOMPLETE_ORDERS", "미완료 주문 " + incompleteCount + "건이 있어 이용 완료할 수 없습니다.");
        }

        LocalDateTime completedAt = LocalDateTime.now();
        for (OrderEntity order : orders) {
            String itemsJson;
            try {
                itemsJson = objectMapper.writeValueAsString(
                        order.getItems().stream()
                                .map(item -> OrderItemResponse.builder()
                                        .menuName(item.getMenuName())
                                        .quantity(item.getQuantity())
                                        .unitPrice(item.getUnitPrice())
                                        .build())
                                .collect(Collectors.toList()));
            } catch (JsonProcessingException e) {
                itemsJson = "[]";
            }

            orderHistoryRepository.save(OrderHistoryEntity.builder()
                    .orderNumber(order.getOrderNumber())
                    .tableId(tableId)
                    .tableNumber(table.getTableNumber())
                    .sessionId(table.getCurrentSessionId())
                    .totalAmount(order.getTotalAmount())
                    .items(itemsJson)
                    .orderedAt(order.getCreatedAt())
                    .completedAt(completedAt)
                    .build());
        }

        orderRepository.deleteAll(orders);
        table.setCurrentSessionId(null);
        tableRepository.save(table);
        // TODO: [통합] Unit 4의 SseEmitterService.broadcast(SseEvent.of(TABLE_SESSION_COMPLETED, tableId)) 연결
    }

    public List<OrderHistoryResponse> getOrderHistory(Long tableId, LocalDate startDate, LocalDate endDate) {
        if (startDate == null) startDate = LocalDate.now().minusDays(10);
        if (endDate == null) endDate = LocalDate.now();

        return orderHistoryRepository.findByTableIdAndCompletedAtBetweenOrderByCompletedAtDesc(
                        tableId, startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX))
                .stream()
                .map(h -> OrderHistoryResponse.builder()
                        .id(h.getId())
                        .orderNumber(h.getOrderNumber())
                        .tableNumber(h.getTableNumber())
                        .sessionId(h.getSessionId())
                        .totalAmount(h.getTotalAmount())
                        .items(h.getItems())
                        .orderedAt(h.getOrderedAt())
                        .completedAt(h.getCompletedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
