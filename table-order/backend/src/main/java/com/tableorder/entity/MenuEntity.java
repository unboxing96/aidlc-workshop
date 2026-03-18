package com.tableorder.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "menus")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MenuEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private int price;

    @Column(length = 500)
    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private Long categoryId;

    @Column(nullable = false)
    private int displayOrder;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { this.createdAt = LocalDateTime.now(); }
}
