package com.tableorder.menu;

import com.tableorder.entity.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
    List<MenuEntity> findByCategoryIdOrderByDisplayOrderAsc(Long categoryId);
    List<MenuEntity> findAllByOrderByDisplayOrderAsc();
    int countByCategoryId(Long categoryId);
}
