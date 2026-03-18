package com.tableorder.table;

import com.tableorder.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByTableIdAndSessionId(Long tableId, String sessionId);
    void deleteByTableIdAndSessionId(Long tableId, String sessionId);
}
