package com.tableorder.table;

import com.tableorder.common.exception.BusinessException;
import com.tableorder.common.exception.DuplicateException;
import com.tableorder.common.exception.NotFoundException;
import com.tableorder.entity.OrderEntity;
import com.tableorder.entity.OrderHistoryEntity;
import com.tableorder.entity.OrderStatus;
import com.tableorder.entity.TableEntity;
import com.tableorder.table.dto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TableService {

    private final TableRepository tableRepository;
    private final OrderRepository orderRepository;
    private final OrderHistoryRepository orderHistoryRepository;
    private final ObjectMapper objectMapper;

    public TableResponse createTable(CreateTableRequest request) {
        if (tableRepository.existsByTableNumber(request.getTableNumber())) {
            throw new DuplicateException("이미 존재하는 테이블 번호입니다");
        }
        TableEntity table = TableEntity.builder()
                .tableNumber(request.getTableNumber())
                .build();
        return TableResponse.from(tableRepository.save(table));
    }

    public TableAuthResponse authenticateByToken(String accessToken) {
        TableEntity table = tableRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> new NotFoundException("유효하지 않은 테이블 토큰입니다"));
        return new TableAuthResponse(table.getId(), table.getTableNumber());
    }

    public List<TableResponse> getAllTables() {
        return tableRepository.findAll().stream().map(TableResponse::from).toList();
    }

    @Transactional
    public void completeTableSession(Long tableId) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new NotFoundException("테이블을 찾을 수 없습니다"));
        if (table.getCurrentSessionId() == null) {
            throw new BusinessException("NO_ACTIVE_SESSION", "활성 세션이 없습니다");
        }
        List<OrderEntity> orders = orderRepository.findByTableIdAndSessionId(tableId, table.getCurrentSessionId());
        LocalDateTime now = LocalDateTime.now();
        for (OrderEntity order : orders) {
            if (order.getStatus() != OrderStatus.COMPLETED) {
                order.setStatus(OrderStatus.COMPLETED);
            }
            OrderHistoryEntity history = OrderHistoryEntity.builder()
                    .orderNumber(order.getOrderNumber())
                    .tableId(tableId)
                    .tableNumber(table.getTableNumber())
                    .sessionId(order.getSessionId())
                    .totalAmount(order.getTotalAmount())
                    .items(serializeItems(order))
                    .orderedAt(order.getCreatedAt())
                    .completedAt(now)
                    .build();
            orderHistoryRepository.save(history);
        }
        orderRepository.deleteByTableIdAndSessionId(tableId, table.getCurrentSessionId());
        table.setCurrentSessionId(null);
        tableRepository.save(table);
    }

    public List<OrderHistoryResponse> getOrderHistory(Long tableId) {
        if (!tableRepository.existsById(tableId)) {
            throw new NotFoundException("테이블을 찾을 수 없습니다");
        }
        return orderHistoryRepository.findByTableIdOrderByCompletedAtDesc(tableId)
                .stream().map(OrderHistoryResponse::from).toList();
    }

    private String serializeItems(OrderEntity order) {
        try {
            return objectMapper.writeValueAsString(
                    order.getItems().stream().map(item -> new ItemDto(item.getMenuName(), item.getQuantity(), item.getUnitPrice())).toList()
            );
        } catch (JsonProcessingException e) {
            return "[]";
        }
    }

    private record ItemDto(String menuName, int quantity, int unitPrice) {}
}
