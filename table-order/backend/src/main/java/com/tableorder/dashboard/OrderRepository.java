package com.tableorder.dashboard;

import com.tableorder.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// TODO: [통합] Unit 3(주문)의 OrderRepository가 완성되면 이 파일 삭제하고 Unit 3의 Repository를 참조할 것
// 통합 시 패키지 경로 변경: com.tableorder.order.OrderRepository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findBySessionIdOrderByCreatedAtDesc(String sessionId);
    List<OrderEntity> findByTableIdAndSessionIdOrderByCreatedAtDesc(Long tableId, String sessionId);
}
