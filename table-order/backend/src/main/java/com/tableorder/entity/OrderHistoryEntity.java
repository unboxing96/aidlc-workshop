package com.tableorder.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderHistoryEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String orderNumber;

    @Column(nullable = false)
    private Long tableId;

    @Column(nullable = false)
    private int tableNumber;

    @Column(nullable = false)
    private String sessionId;

    @Column(nullable = false)
    private int totalAmount;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String items;

    @Column(nullable = false)
    private LocalDateTime orderedAt;

    @Column(nullable = false)
    private LocalDateTime completedAt;
}
