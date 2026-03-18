package com.tableorder.dashboard;

import com.tableorder.entity.OrderHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderHistoryRepository extends JpaRepository<OrderHistoryEntity, Long> {
    List<OrderHistoryEntity> findByTableIdAndCompletedAtBetweenOrderByCompletedAtDesc(
            Long tableId, LocalDateTime start, LocalDateTime end);
}
