package com.tableorder.order;

import com.tableorder.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Page<OrderEntity> findByTableIdAndSessionIdOrderByCreatedAtAsc(Long tableId, String sessionId, Pageable pageable);
    long countByOrderNumberStartingWith(String prefix);
}
